
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, MessageCircle } from 'lucide-react';

interface OrderConfirmationProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      title: 'Order Confirmed!',
      subtitle: 'Thank you for your purchase',
      message: 'Your order has been successfully placed and confirmed. We will contact you shortly to confirm delivery details.',
      orderNumber: 'Order Number',
      orderNumberValue: 'SHJ-2024-001',
      whatNext: 'What happens next?',
      steps: [
        'We will call you within 2 hours to confirm your order',
        'Your order will be prepared and packed carefully',
        'We will deliver your order within 1-3 business days',
        'You can track your order status anytime'
      ],
      continueShopping: 'Continue Shopping',
      trackOrder: 'Track Your Order',
      contactUs: 'Contact Us',
      whatsapp: 'WhatsApp: +8801753840087'
    },
    bn: {
      title: 'অর্ডার নিশ্চিত!',
      subtitle: 'আপনার কেনাকাটার জন্য ধন্যবাদ',
      message: 'আপনার অর্ডার সফলভাবে দেওয়া এবং নিশ্চিত করা হয়েছে। ডেলিভারির বিবরণ নিশ্চিত করতে আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
      orderNumber: 'অর্ডার নম্বর',
      orderNumberValue: 'SHJ-2024-001',
      whatNext: 'এখন কী হবে?',
      steps: [
        'আপনার অর্ডার নিশ্চিত করতে আমরা ২ ঘন্টার মধ্যে কল করব',
        'আপনার অর্ডার প্রস্তুত এবং যত্ন সহকারে প্যাক করা হবে',
        'আমরা ১-৩ কার্যদিবসের মধ্যে আপনার অর্ডার ডেলিভার করব',
        'আপনি যেকোনো সময় আপনার অর্ডারের স্থিতি ট্র্যাক করতে পারেন'
      ],
      continueShopping: 'কেনাকাটা চালিয়ে যান',
      trackOrder: 'আপনার অর্ডার ট্র্যাক করুন',
      contactUs: 'আমাদের সাথে যোগাযোগ করুন',
      whatsapp: 'হোয়াটসঅ্যাপ: +৮৮০১৭৫৩৮৪০০৮৭'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {content[language].subtitle}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {content[language].message}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-pink-600" />
                <h2 className="text-lg font-semibold">{content[language].orderNumber}</h2>
              </div>
              <p className="text-2xl font-bold text-pink-600 mb-6">
                {content[language].orderNumberValue}
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/track-order')}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  {content[language].trackOrder}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/shop')}
                  className="w-full"
                >
                  {content[language].continueShopping}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">{content[language].whatNext}</h2>
              <div className="space-y-3">
                {content[language].steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{content[language].contactUs}</h3>
            <p className="text-gray-600 mb-4">{content[language].whatsapp}</p>
            <Button
              onClick={() => window.open('https://wa.me/8801753840087', '_blank')}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default OrderConfirmation;
