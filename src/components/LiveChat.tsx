
import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';

interface LiveChatProps {
  language: 'en' | 'bn';
}

const LiveChat: React.FC<LiveChatProps> = ({ language }) => {
  const { settings } = useSettings();

  const content = {
    en: {
      whatsapp: 'Chat on WhatsApp',
      messenger: 'Message us on Facebook'
    },
    bn: {
      whatsapp: 'WhatsApp এ চ্যাট করুন',
      messenger: 'Facebook এ মেসেজ করুন'
    }
  };

  if (!settings.liveChatEnabled) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = language === 'en' 
      ? 'Hello! I\'m interested in your products.' 
      : 'হ্যালো! আমি আপনাদের পণ্য সম্পর্কে জানতে চাই।';
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleMessengerClick = () => {
    const url = `https://m.me/${settings.facebookPageId}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
        title={content[language].whatsapp}
      >
        <Phone className="h-6 w-6" />
      </Button>

      {/* Facebook Messenger Button */}
      <Button
        onClick={handleMessengerClick}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
        title={content[language].messenger}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Labels on Hover */}
      <div className="absolute right-16 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap mb-2">
          {content[language].messenger}
        </div>
        <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
          {content[language].whatsapp}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
