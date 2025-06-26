
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'Shajogouri',
  siteNameBn: 'সাজগৌরী',
  heroTitle: 'Handcrafted Elegance',
  heroTitleBn: 'হাতে তৈরি কারুকাজ',
  heroSubtitle: 'Discover our exclusive collection of jewelry and accessories',
  heroSubtitleBn: 'আমাদের বিশেষ গহনা ও অ্যাক্সেসরিজের কালেকশন দেখুন',
  heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200',
  phone: '+8801712345678',
  email: 'contact@shajogouri.com',
  address: 'House 15, Road 7, Dhanmondi, Dhaka-1205',
  addressBn: 'বাড়ি ১৫, রোড ৭, ধানমন্ডি, ঢাকা-১২০৫',
  whatsappNumber: '8801712345678',
  facebookPageId: 'shajogouri',
  liveChatEnabled: true,
  couponSystemEnabled: true,
  newsletterEnabled: true,
  paymentMethods: {
    bkash: true,
    nagad: true,
    rocket: false,
    cashOnDelivery: true
  }
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('shajogouri-settings');
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('shajogouri-settings', JSON.stringify(updatedSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
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
