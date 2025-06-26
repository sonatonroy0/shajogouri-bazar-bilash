
import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  language: 'en' | 'bn';
}

const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const testimonials = {
    en: [
      {
        id: 1,
        name: 'Fatima Rahman',
        location: 'Dhaka',
        rating: 5,
        text: 'Absolutely love my jewelry from Shajogouri! The craftsmanship is incredible and the delivery was so fast. Highly recommend!',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b68e25c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 2,
        name: 'Rashida Begum',
        location: 'Chittagong',
        rating: 5,
        text: 'The pearl earrings I bought are stunning! Perfect for my daughter\'s wedding. Thank you Shajogouri for the beautiful work.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 3,
        name: 'Nusrat Jahan',
        location: 'Sylhet',
        rating: 5,
        text: 'Amazing quality and such reasonable prices! I\'ve ordered multiple times and never been disappointed. Love supporting local artisans.',
        image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      }
    ],
    bn: [
      {
        id: 1,
        name: 'ফাতিমা রহমান',
        location: 'ঢাকা',
        rating: 5,
        text: 'শাজগৌরী থেকে কেনা আমার গহনাগুলো একদম পছন্দ হয়েছে! কারুকাজ অসাধারণ এবং ডেলিভারি খুবই দ্রুত। অবশ্যই সুপারিশ করি!',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b68e25c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 2,
        name: 'রাশিদা বেগম',
        location: 'চট্টগ্রাম',
        rating: 5,
        text: 'আমি যে মুক্তার কানের দুল কিনেছি সেটা একদম চমৎকার! আমার মেয়ের বিয়ের জন্য পারফেক্ট। সুন্দর কাজের জন্য ধন্যবাদ শাজগৌরী।',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 3,
        name: 'নুসরাত জাহান',
        location: 'সিলেট',
        rating: 5,
        text: 'দারুণ মানের পণ্য আর খুবই সাশ্রয়ী দাম! কয়েকবার অর্ডার করেছি, কখনো হতাশ হইনি। স্থানীয় শিল্পীদের সাপোর্ট করতে ভালো লাগে।',
        image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      }
    ]
  };

  const content = {
    en: {
      title: 'What Our Customers Say',
      subtitle: 'Real reviews from women who love our handcrafted pieces'
    },
    bn: {
      title: 'আমাদের ক্রেতারা কী বলেন',
      subtitle: 'আমাদের হাতে তৈরি পণ্যের প্রকৃত রিভিউ'
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials[language].map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-100"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="h-8 w-8 text-pink-300" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-pink-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">1000+</div>
            <div className="text-gray-600">
              {language === 'en' ? 'Happy Customers' : 'সন্তুষ্ট ক্রেতা'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">4.9</div>
            <div className="text-gray-600">
              {language === 'en' ? 'Average Rating' : 'গড় রেটিং'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
            <div className="text-gray-600">
              {language === 'en' ? 'Products Sold' : 'বিক্রীত পণ্য'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">2 {language === 'en' ? 'Days' : 'দিন'}</div>
            <div className="text-gray-600">
              {language === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
