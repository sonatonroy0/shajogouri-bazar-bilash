
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Users, Award } from 'lucide-react';

interface AboutProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const About: React.FC<AboutProps> = ({ language, toggleLanguage }) => {
  const content = {
    en: {
      title: 'About Shajogouri',
      subtitle: 'Celebrating the Beauty of Bangladeshi Women',
      story: 'Our Story',
      storyText: 'Shajogouri was born from a passion to celebrate the elegance and beauty of Bangladeshi women. Founded in 2020, we specialize in handcrafted jewelry, accessories, and clothing that blend traditional Bengali artistry with contemporary fashion.',
      mission: 'Our Mission',
      missionText: 'To empower women by providing them with beautiful, high-quality products that enhance their confidence and celebrate their unique style. We believe every woman deserves to feel special and beautiful.',
      vision: 'Our Vision',
      visionText: 'To become the leading brand for women\'s fashion accessories in Bangladesh, known for our quality, creativity, and commitment to celebrating feminine beauty.',
      values: 'Our Values',
      stats: [
        { icon: Heart, number: '10,000+', label: 'Happy Customers' },
        { icon: Star, number: '4.9/5', label: 'Customer Rating' },
        { icon: Users, number: '50+', label: 'Artisans' },
        { icon: Award, number: '3+', label: 'Years of Excellence' }
      ],
      valuesList: [
        'Quality craftsmanship in every piece',
        'Affordable luxury for every woman',
        'Supporting local artisans and communities',
        'Sustainable and ethical practices',
        'Customer satisfaction above all'
      ]
    },
    bn: {
      title: 'শাজগৌরী সম্পর্কে',
      subtitle: 'বাংলাদেশী নারীদের সৌন্দর্য উদযাপন',
      story: 'আমাদের গল্প',
      storyText: 'শাজগৌরী জন্মেছে বাংলাদেশী নারীদের কমনীয়তা ও সৌন্দর্য উদযাপনের আবেগ থেকে। ২০২০ সালে প্রতিষ্ঠিত, আমরা হস্তনির্মিত গহনা, অ্যাক্সেসরিজ এবং পোশাকে বিশেষজ্ঞ যা ঐতিহ্যবাহী বাঙালি শিল্পকলা এবং সমসাময়িক ফ্যাশনের মিশ্রণ।',
      mission: 'আমাদের লক্ষ্য',
      missionText: 'নারীদের সুন্দর, উচ্চমানের পণ্য প্রদান করে তাদের আত্মবিশ্বাস বৃদ্ধি এবং তাদের অনন্য স্টাইল উদযাপনের মাধ্যমে ক্ষমতায়ন করা। আমরা বিশ্বাস করি প্রতিটি নারী বিশেষ এবং সুন্দর অনুভব করার যোগ্য।',
      vision: 'আমাদের দৃষ্টিভঙ্গি',
      visionText: 'বাংলাদেশে নারীদের ফ্যাশন অ্যাক্সেসরিজের শীর্ষস্থানীয় ব্র্যান্ড হয়ে ওঠা, আমাদের মান, সৃজনশীলতা এবং নারী সৌন্দর্য উদযাপনের অঙ্গীকারের জন্য পরিচিত।',
      values: 'আমাদের মূল্যবোধ',
      stats: [
        { icon: Heart, number: '১০,০০০+', label: 'সন্তুষ্ট ক্রেতা' },
        { icon: Star, number: '৪.৯/৫', label: 'গ্রাহক রেটিং' },
        { icon: Users, number: '৫০+', label: 'কারিগর' },
        { icon: Award, number: '৩+', label: 'বছরের উৎকর্ষতা' }
      ],
      valuesList: [
        'প্রতিটি পণ্যে মানসম্পন্ন কারুকাজ',
        'প্রতিটি নারীর জন্য সাশ্রয়ী বিলাসিতা',
        'স্থানীয় কারিগর ও সম্প্রদায়কে সহায়তা',
        'টেকসই ও নৈতিক অনুশীলন',
        'সর্বোপরি গ্রাহক সন্তুষ্টি'
      ]
    }
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

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                {content[language].story}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {content[language].storyText}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
                alt="Jewelry crafting"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content[language].stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-pink-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  {content[language].mission}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {content[language].missionText}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  {content[language].vision}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {content[language].visionText}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
            {content[language].values}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content[language].valuesList.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <p className="text-gray-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default About;
