
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Gift, Bell, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NewsletterProps {
  language: 'en' | 'bn';
}

const Newsletter: React.FC<NewsletterProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const content = {
    en: {
      badge: 'VIP Members Only',
      title: 'Join Our VIP Community',
      subtitle: 'Get exclusive access to new collections, special discounts, and handpicked styling tips',
      benefits: [
        'Early access to new collections',
        '10% off on your first order',
        'Exclusive member-only discounts',
        'Free styling consultation'
      ],
      placeholder: 'Enter your email address',
      button: 'Join VIP Club',
      success: 'Welcome to Shajogouri VIP! Check your email for your welcome gift.',
      privacy: 'We respect your privacy. Unsubscribe anytime.'
    },
    bn: {
      badge: 'শুধুমাত্র ভিআইপি সদস্যদের জন্য',
      title: 'আমাদের ভিআইপি কমিউনিটিতে যোগ দিন',
      subtitle: 'নতুন কালেকশনে প্রাথমিক প্রবেশাধিকার, বিশেষ ছাড় এবং স্টাইলিং টিপস পান',
      benefits: [
        'নতুন কালেকশনে প্রাথমিক প্রবেশাধিকার',
        'প্রথম অর্ডারে ১০% ছাড়',
        'সদস্যদের জন্য বিশেষ ছাড়',
        'ফ্রি স্টাইলিং পরামর্শ'
      ],
      placeholder: 'আপনার ইমেইল ঠিকানা লিখুন',
      button: 'ভিআইপি ক্লাবে যোগ দিন',
      success: 'শাজগৌরী ভিআইপিতে স্বাগতম! আপনার স্বাগত উপহারের জন্য ইমেইল চেক করুন।',
      privacy: 'আমরা আপনার গোপনীয়তাকে সম্মান করি। যেকোনো সময় আনসাবস্ক্রাইব করুন।'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: language === 'en' ? 'Error' : 'ত্রুটি',
        description: language === 'en' ? 'Please enter your email address' : 'আপনার ইমেইল ঠিকানা লিখুন',
        variant: 'destructive'
      });
      return;
    }

    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      toast({
        title: language === 'en' ? 'Success!' : 'সফল!',
        description: content[language].success,
      });
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Gift className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            {language === 'en' ? 'Welcome to VIP!' : 'ভিআইপিতে স্বাগতম!'}
          </h2>
          <p className="text-pink-100 text-lg">
            {content[language].success}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* VIP Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
          <Star className="w-4 h-4 mr-2 fill-current" />
          {content[language].badge}
        </div>

        {/* Main Content */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          {content[language].title}
        </h2>
        
        <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
          {content[language].subtitle}
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
          {content[language].benefits.map((benefit, index) => (
            <div key={index} className="flex items-center text-white/90 text-sm">
              <div className="w-2 h-2 bg-pink-200 rounded-full mr-3 flex-shrink-0"></div>
              {benefit}
            </div>
          ))}
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content[language].placeholder}
                className="pl-10 bg-white/90 backdrop-blur-sm border-white/20 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <Button 
              type="submit"
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-6"
            >
              <Bell className="h-4 w-4 mr-2" />
              {content[language].button}
            </Button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="text-pink-100 text-sm">
          {content[language].privacy}
        </p>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default Newsletter;
