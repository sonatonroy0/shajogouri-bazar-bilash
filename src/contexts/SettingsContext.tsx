
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  siteName: string;
  siteNameBn: string;
  heroTitle: string;
  heroTitleBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  heroImage: string;
  phone: string;
  email: string;
  address: string;
  addressBn: string;
  whatsappNumber: string;
  facebookPageId: string;
  liveChatEnabled: boolean;
  couponSystemEnabled: boolean;
  newsletterEnabled: boolean;
  paymentMethods: {
    bkash: boolean;
    nagad: boolean;
    rocket: boolean;
    cashOnDelivery: boolean;
  };
}

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => Promise<void>;
  loading: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'Shajogouri',
  siteNameBn: 'শাজগুড়ি',
  heroTitle: 'Discover Beautiful Fashion & Jewelry',
  heroTitleBn: 'সুন্দর ফ্যাশন এবং গহনা আবিষ্কার করুন',
  heroSubtitle: 'Handpicked collection of elegant jewelry and fashion accessories for the modern woman',
  heroSubtitleBn: 'আধুনিক নারীর জন্য মার্জিত গহনা এবং ফ্যাশন অ্যাক্সেসরিজের হস্তনির্বাচিত সংগ্রহ',
  heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
  phone: '+8801712345678',
  email: 'info@shajogouri.com',
  address: 'Dhaka, Bangladesh',
  addressBn: 'ঢাকা, বাংলাদেশ',
  whatsappNumber: '8801712345678',
  facebookPageId: 'shajogouri',
  liveChatEnabled: true,
  couponSystemEnabled: false,
  newsletterEnabled: true,
  paymentMethods: {
    bkash: true,
    nagad: true,
    rocket: true,
    cashOnDelivery: true
  }
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('key, value');

      if (data) {
        const settingsMap = data.reduce((acc: any, item) => ({
          ...acc,
          [item.key]: item.value
        }), {});

        const paymentMethods = settingsMap.paymentMethods 
          ? JSON.parse(settingsMap.paymentMethods) 
          : defaultSettings.paymentMethods;

        setSettings(prev => ({
          ...prev,
          ...settingsMap,
          paymentMethods
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<SiteSettings>) => {
    try {
      const settingsEntries = Object.entries(updates).map(([key, value]) => ({
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value)
      }));

      for (const entry of settingsEntries) {
        await supabase
          .from('settings')
          .upsert(entry, { onConflict: 'key' });
      }

      setSettings(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
