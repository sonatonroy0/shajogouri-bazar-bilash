
import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  language: 'en' | 'bn';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const content = {
    en: {
      tagline: 'Handcrafted Elegance for Every Woman',
      quickLinks: 'Quick Links',
      customerService: 'Customer Service',
      followUs: 'Follow Us',
      paymentMethods: 'Payment Methods',
      newsletter: 'Stay Updated',
      newsletterText: 'Subscribe to get special offers and updates',
      links: {
        about: 'About Us',
        contact: 'Contact',
        faq: 'FAQ',
        shipping: 'Shipping Info',
        returns: 'Returns',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        blog: 'Blog',
        careers: 'Careers'
      },
      support: {
        help: 'Help Center',
        track: 'Track Order',
        size: 'Size Guide',
        care: 'Care Instructions'
      },
      contact: {
        phone: '+880 1234-567890',
        email: 'hello@shajogouri.com',
        address: 'Dhanmondi, Dhaka-1205, Bangladesh'
      },
      payments: ['Cash on Delivery', 'bKash', 'Nagad', 'Rocket', 'Cards'],
      copyright: '© 2024 Shajogouri. All rights reserved.',
      madeWith: 'Made with',
      in: 'in Bangladesh'
    },
    bn: {
      tagline: 'প্রতিটি নারীর জন্য হাতে তৈরি কারুকাজ',
      quickLinks: 'দ্রুত লিঙ্ক',
      customerService: 'গ্রাহক সেবা',
      followUs: 'আমাদের ফলো করুন',
      paymentMethods: 'পেমেন্ট পদ্ধতি',
      newsletter: 'আপডেট পান',
      newsletterText: 'বিশেষ অফার এবং আপডেট পেতে সাবস্ক্রাইব করুন',
      links: {
        about: 'আমাদের সম্পর্কে',
        contact: 'যোগাযোগ',
        faq: 'প্রশ্ন ও উত্তর',
        shipping: 'ডেলিভারি তথ্য',
        returns: 'রিটার্ন নীতি',
        privacy: 'গোপনীয়তা নীতি',
        terms: 'শর্তাবলী',
        blog: 'ব্লগ',
        careers: 'ক্যারিয়ার'
      },
      support: {
        help: 'সহায়তা কেন্দ্র',
        track: 'অর্ডার ট্র্যাক',
        size: 'সাইজ গাইড',
        care: 'যত্নের নির্দেশনা'
      },
      contact: {
        phone: '+৮৮০ ১২৩৪-৫৬৭৮৯০',
        email: 'hello@shajogouri.com',
        address: 'ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ'
      },
      payments: ['ক্যাশ অন ডেলিভারি', 'বিকাশ', 'নগদ', 'রকেট', 'কার্ড'],
      copyright: '© ২০২৪ শাজগৌরী। সকল অধিকার সংরক্ষিত।',
      madeWith: 'তৈরি করা হয়েছে',
      in: 'বাংলাদেশে'
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Contact */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                  Shajogouri
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {content[language].tagline}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-3 text-pink-400" />
                  <span className="text-sm">{content[language].contact.phone}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-3 text-pink-400" />
                  <span className="text-sm">{content[language].contact.email}</span>
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin className="h-4 w-4 mr-3 text-pink-400 mt-0.5" />
                  <span className="text-sm">{content[language].contact.address}</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-3">{content[language].followUs}</h4>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-pink-600 p-2">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-pink-600 p-2">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-pink-600 p-2">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{content[language].quickLinks}</h4>
              <ul className="space-y-2">
                {Object.entries(content[language].links).slice(0, 5).map(([key, value]) => (
                  <li key={key}>
                    <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4">{content[language].customerService}</h4>
              <ul className="space-y-2">
                {Object.entries(content[language].support).map(([key, value]) => (
                  <li key={key}>
                    <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-3">{content[language].paymentMethods}</h4>
              <div className="flex flex-wrap gap-2">
                {content[language].payments.map((method, index) => (
                  <span 
                    key={index}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-xl text-white max-w-xs">
                <p className="font-semibold text-sm mb-1">
                  {language === 'en' ? 'Free Shipping' : 'ফ্রি ডেলিভারি'}
                </p>
                <p className="text-xs opacity-90">
                  {language === 'en' ? 'Orders above ৳2000' : '২০০০ টাকার উপরে অর্ডার'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>{content[language].copyright}</p>
            <div className="flex items-center mt-2 md:mt-0">
              <span>{content[language].madeWith}</span>
              <Heart className="h-4 w-4 mx-1 text-pink-400 fill-current" />
              <span>{content[language].in}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
