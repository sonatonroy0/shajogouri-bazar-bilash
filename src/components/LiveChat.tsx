
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Facebook } from 'lucide-react';

interface LiveChatProps {
  language: 'en' | 'bn';
}

const LiveChat: React.FC<LiveChatProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    en: {
      title: 'Live Chat Support',
      subtitle: 'Get instant help from our team',
      whatsapp: 'WhatsApp Chat',
      messenger: 'Facebook Messenger',
      phone: 'Call Us: +88 01753840087'
    },
    bn: {
      title: 'লাইভ চ্যাট সাপোর্ট',
      subtitle: 'আমাদের টিম থেকে তাৎক্ষণিক সাহায্য পান',
      whatsapp: 'হোয়াটসঅ্যাপ চ্যাট',
      messenger: 'ফেসবুক মেসেঞ্জার',
      phone: 'কল করুন: +৮৮ ০১৭৫৩৮৪০০৮৭'
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50">
          <Card className="w-80 shadow-2xl">
            <CardHeader className="bg-pink-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{content[language].title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-pink-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-pink-100 text-sm">{content[language].subtitle}</p>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://wa.me/8801753840087', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {content[language].whatsapp}
              </Button>
              
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open('https://m.me/61566558181901', '_blank')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                {content[language].messenger}
              </Button>
              
              <div className="text-center pt-2 border-t">
                <p className="text-sm text-gray-600">{content[language].phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Button */}
      <Button
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-pink-600 hover:bg-pink-700 shadow-lg z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </>
  );
};

export default LiveChat;
