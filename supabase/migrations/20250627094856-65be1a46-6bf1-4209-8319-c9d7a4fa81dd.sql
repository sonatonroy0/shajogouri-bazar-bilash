
-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  namebn TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  description TEXT,
  descriptionbn TEXT,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  stock_count INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_sale BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT,
  courier_service TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  product_name_bn TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create settings table for site configuration
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('site_name', 'Shajogouri'),
  ('site_name_bn', 'শাজগুড়ি'),
  ('hero_title', 'Discover Beautiful Fashion & Jewelry'),
  ('hero_title_bn', 'সুন্দর ফ্যাশন এবং গহনা আবিষ্কার করুন'),
  ('hero_subtitle', 'Handpicked collection of elegant jewelry and fashion accessories for the modern woman'),
  ('hero_subtitle_bn', 'আধুনিক নারীর জন্য মার্জিত গহনা এবং ফ্যাশন অ্যাক্সেসরিজের হস্তনির্বাচিত সংগ্রহ'),
  ('hero_image', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200'),
  ('phone', '+8801712345678'),
  ('email', 'info@shajogouri.com'),
  ('address', 'Dhaka, Bangladesh'),
  ('address_bn', 'ঢাকা, বাংলাদেশ'),
  ('whatsapp_number', '8801712345678'),
  ('facebook_page_id', 'shajogouri')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products (public read, admin write)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert products" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update products" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete products" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Create RLS policies for order_items
CREATE POLICY "Users can view order items" ON public.order_items FOR SELECT USING (
  order_id IN (
    SELECT id FROM public.orders 
    WHERE user_id = auth.uid() OR auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true)
  )
);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can create profile" ON public.profiles FOR INSERT WITH CHECK (true);

-- Create RLS policies for settings
CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins can update settings" ON public.settings FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Admins can insert settings" ON public.settings FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable realtime for tables
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.order_items REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.settings REPLICA IDENTITY FULL;

-- Add tables to realtime publication
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE public.products, public.orders, public.order_items, public.profiles, public.settings;
