
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContactProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Contact: React.FC<ContactProps> = ({ language, toggleLanguage }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us for any questions or support',
      getInTouch: 'Get in Touch',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      contactInfo: 'Contact Information',
      address: 'Address',
      addressText: 'Dhanmondi, Dhaka-1205, Bangladesh',
      phoneText: '+8801753840087',
      emailText: 'hello@shajogouri.com',
      hours: 'Business Hours',
      hoursText: 'Sat - Thu: 9:00 AM - 8:00 PM\nFriday: 2:00 PM - 8:00 PM',
      whatsapp: 'WhatsApp',
      whatsappText: 'Chat with us on WhatsApp',
      messageSent: 'Message sent successfully!',
      messageDesc: 'We will get back to you soon.'
    },
    bn: {
      title: 'যোগাযোগ করুন',
      subtitle: 'যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন',
      getInTouch: 'যোগাযোগ করুন',
      name: 'পূর্ণ নাম',
      email: 'ইমেইল ঠিকানা',
      phone: 'ফোন নম্বর',
      subject: 'বিষয়',
      message: 'বার্তা',
      send: 'বার্তা পাঠান',
      contactInfo: 'যোগাযোগের তথ্য',
      address: 'ঠিকানা',
      addressText: 'ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ',
      phoneText: '+৮৮০১৭৫৩৮৪০০৮৭',
      emailText: 'hello@shajogouri.com',
      hours: 'ব্যবসার সময়',
      hoursText: 'শনি - বৃহস্পতি: সকাল ৯:০০ - রাত ৮:০০\nশুক্রবার: দুপুর ২:০০ - রাত ৮:০০',
      whatsapp: 'হোয়াটসঅ্যাপ',
      whatsappText: 'হোয়াটসঅ্যাপে চ্যাট করুন',
      messageSent: 'বার্তা সফলভাবে পাঠানো হয়েছে!',
      messageDesc: 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      toast({
        title: content[language].messageSent,
        description: content[language].messageDesc,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  {content[language].getInTouch}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{content[language].name}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{content[language].phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{content[language].email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">{content[language].subject}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{content[language].message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    {loading ? '...' : content[language].send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {content[language].contactInfo}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-pink-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{content[language].address}</p>
                        <p className="text-gray-600">{content[language].addressText}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-pink-600" />
                      <div>
                        <p className="font-medium text-gray-900">{content[language].phone}</p>
                        <p className="text-gray-600">{content[language].phoneText}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-pink-600" />
                      <div>
                        <p className="font-medium text-gray-900">{content[language].email}</p>
                        <p className="text-gray-600">{content[language].emailText}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-pink-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{content[language].hours}</p>
                        <p className="text-gray-600 whitespace-pre-line">{content[language].hoursText}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{content[language].whatsapp}</p>
                      <p className="text-gray-600">{content[language].whatsappText}</p>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://wa.me/8801753840087', '_blank')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {content[language].whatsapp}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Contact;
