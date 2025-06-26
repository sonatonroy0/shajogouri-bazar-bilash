
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TermsProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Terms: React.FC<TermsProps> = ({ language, toggleLanguage }) => {
  const content = {
    en: {
      title: 'Terms & Conditions',
      lastUpdated: 'Last updated: January 2024',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using the Shajogouri website, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          title: '2. Products and Services',
          content: 'Shajogouri offers handcrafted jewelry, accessories, and clothing. All product descriptions and images are for informational purposes and may vary slightly from actual products.'
        },
        {
          title: '3. Ordering and Payment',
          content: 'All orders are subject to acceptance and availability. We accept various payment methods including cash on delivery, bKash, Nagad, and credit/debit cards. Prices are subject to change without prior notice.'
        },
        {
          title: '4. Shipping and Delivery',
          content: 'We deliver within Bangladesh only. Delivery times may vary based on location and product availability. Shipping costs will be calculated at checkout.'
        },
        {
          title: '5. Returns and Exchanges',
          content: 'We accept returns within 7 days of delivery for items in original condition. Return shipping costs are borne by the customer unless the item is defective or incorrect.'
        },
        {
          title: '6. Privacy Policy',
          content: 'We respect your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for detailed information about how we collect and use your data.'
        },
        {
          title: '7. Intellectual Property',
          content: 'All content on this website, including images, text, and designs, is the property of Shajogouri and is protected by copyright and intellectual property laws.'
        },
        {
          title: '8. Limitation of Liability',
          content: 'Shajogouri shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services.'
        },
        {
          title: '9. Changes to Terms',
          content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.'
        },
        {
          title: '10. Contact Information',
          content: 'For questions about these Terms & Conditions, please contact us at hello@shajogouri.com or call +8801753840087.'
        }
      ]
    },
    bn: {
      title: 'শর্তাবলী',
      lastUpdated: 'সর্বশেষ আপডেট: জানুয়ারি ২০২৪',
      sections: [
        {
          title: '১. শর্তাবলী গ্রহণ',
          content: 'শাজগৌরী ওয়েবসাইট অ্যাক্সেস এবং ব্যবহার করে, আপনি এই চুক্তির শর্তাবলী এবং বিধান দ্বারা আবদ্ধ হতে স্বীকৃতি দেন এবং সম্মত হন।'
        },
        {
          title: '২. পণ্য এবং সেবা',
          content: 'শাজগৌরী হস্তনির্মিত গহনা, অ্যাক্সেসরিজ এবং পোশাক অফার করে। সমস্ত পণ্যের বিবরণ এবং ছবি তথ্যগত উদ্দেশ্যে এবং প্রকৃত পণ্য থেকে সামান্য ভিন্ন হতে পারে।'
        },
        {
          title: '৩. অর্ডার এবং পেমেন্ট',
          content: 'সমস্ত অর্ডার গ্রহণ এবং প্রাপ্যতা সাপেক্ষে। আমরা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং ক্রেডিট/ডেবিট কার্ড সহ বিভিন্ন পেমেন্ট পদ্ধতি গ্রহণ করি। দাম পূর্ব নোটিশ ছাড়াই পরিবর্তন সাপেক্ষে।'
        },
        {
          title: '৪. শিপিং এবং ডেলিভারি',
          content: 'আমরা শুধুমাত্র বাংলাদেশের মধ্যে ডেলিভারি করি। অবস্থান এবং পণ্যের প্রাপ্যতার উপর ভিত্তি করে ডেলিভারির সময় ভিন্ন হতে পারে। চেকআউটে শিপিং খরচ গণনা করা হবে।'
        },
        {
          title: '৫. রিটার্ন এবং এক্সচেঞ্জ',
          content: 'আমরা মূল অবস্থায় পণ্যের জন্য ডেলিভারির ৭ দিনের মধ্যে রিটার্ন গ্রহণ করি। পণ্যটি ত্রুটিপূর্ণ বা ভুল না হলে রিটার্ন শিপিং খরচ গ্রাহক বহন করবেন।'
        },
        {
          title: '৬. গোপনীয়তা নীতি',
          content: 'আমরা আপনার গোপনীয়তাকে সম্মান করি এবং আপনার ব্যক্তিগত তথ্য সুরক্ষার জন্য প্রতিশ্রুতিবদ্ধ। আমরা কীভাবে আপনার ডেটা সংগ্রহ এবং ব্যবহার করি সে সম্পর্কে বিস্তারিত তথ্যের জন্য আমাদের গোপনীয়তা নীতি দেখুন।'
        },
        {
          title: '৭. বৌদ্ধিক সম্পদ',
          content: 'এই ওয়েবসাইটের সমস্ত কন্টেন্ট, ছবি, টেক্সট এবং ডিজাইন সহ, শাজগৌরীর সম্পত্তি এবং কপিরাইট এবং বৌদ্ধিক সম্পত্তি আইন দ্বারা সুরক্ষিত।'
        },
        {
          title: '৮. দায়বদ্ধতার সীমাবদ্ধতা',
          content: 'আমাদের পণ্য বা সেবা ব্যবহারের ফলে কোনো পরোক্ষ, আনুষঙ্গিক, বিশেষ, পরিণামগত বা শাস্তিমূলক ক্ষতির জন্য শাজগৌরী দায়বদ্ধ থাকবে না।'
        },
        {
          title: '৯. শর্তাবলীর পরিবর্তন',
          content: 'আমরা যেকোনো সময় এই শর্তাবলী সংশোধন করার অধিকার সংরক্ষণ করি। পরিবর্তনগুলি আমাদের ওয়েবসাইটে পোস্ট করার সাথে সাথেই কার্যকর হবে।'
        },
        {
          title: '১০. যোগাযোগের তথ্য',
          content: 'এই শর্তাবলী সম্পর্কে প্রশ্নের জন্য, অনুগ্রহ করে hello@shajogouri.com এ যোগাযোগ করুন বা +৮৮০১৭৫৩৮৪০০৮৭ নম্বরে কল করুন।'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h1>
          <p className="text-gray-600">{content[language].lastUpdated}</p>
        </div>

        <div className="prose prose-pink max-w-none">
          {content[language].sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Terms;
