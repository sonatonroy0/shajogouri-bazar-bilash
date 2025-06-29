
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'bn';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const content = {
    en: {
      aboutUs: 'About Shajogouri',
      aboutText: 'Handcrafted jewelry and accessories made with love and care for every special occasion.',
      quickLinks: 'Quick Links',
      home: 'Home',
      shop: 'Shop',
      contact: 'Contact Us',
      contactInfo: 'Contact Information',
      phone: 'Phone: +88 01753840087',
      email: 'Email: sonaton.fl@gmail.com',
      address: 'Address: Dhaka, Bangladesh',
      followUs: 'Follow Us',
      rights: '© 2024 Shajogouri. All rights reserved.'
    },
    bn: {
      aboutUs: 'শাজগৌরী সম্পর্কে',
      aboutText: 'প্রতিটি বিশেষ উপলক্ষের জন্য ভালোবাসা এবং যত্ন সহকারে তৈরি হস্তনির্মিত গহনা এবং অ্যাক্সেসরিজ।',
      quickLinks: 'দ্রুত লিংক',
      home: 'হোম',
      shop: 'শপ',
      contact: 'যোগাযোগ',
      contactInfo: 'যোগাযোগের তথ্য',
      phone: 'ফোন: +৮৮ ০১৭৫৩৮৪০০৮ে',
      email: 'ইমেইল: sonaton.fl@gmail.com',
      address: 'ঠিকানা: ঢাকা, বাংলাদেশ',
      followUs: 'আমাদের ফলো করুন',
      rights: '© ২০২৪ শাজগৌরী। সকল অধিকার সংরক্ষিত।'
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-serif font-bold">Shajogouri</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {content[language].aboutText}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100063558181901"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/8801753840087"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{content[language].quickLinks}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                {content[language].home}
              </Link>
              <Link to="/shop" className="block text-gray-300 hover:text-white transition-colors">
                {content[language].shop}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{content[language].contactInfo}</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{content[language].phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{content[language].email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{content[language].address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{content[language].rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
