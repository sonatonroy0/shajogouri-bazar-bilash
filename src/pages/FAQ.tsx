
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const FAQ: React.FC<FAQProps> = ({ language, toggleLanguage }) => {
  const content = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about Shajogouri',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy for all items in original condition. Items must be unworn and in original packaging. Return shipping costs will be borne by the customer unless the item is defective.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'We deliver within 1-3 business days inside Dhaka and 3-7 business days outside Dhaka. Express delivery is available for urgent orders at additional cost.'
        },
        {
          question: 'Do you offer cash on delivery?',
          answer: 'Yes, we offer cash on delivery (COD) service across Bangladesh. You can also pay through bKash, Nagad, or credit/debit cards.'
        },
        {
          question: 'Are your products handmade?',
          answer: 'Yes, most of our jewelry and accessories are handcrafted by skilled artisans. Each piece is carefully made with attention to detail and quality.'
        },
        {
          question: 'Do you provide gift wrapping?',
          answer: 'Yes, we offer complimentary gift wrapping for all orders. You can also add a personalized message card at no extra cost.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order is shipped, you will receive a tracking number via SMS and email. You can use this to track your order status on our website.'
        },
        {
          question: 'What materials do you use?',
          answer: 'We use high-quality materials including sterling silver, gold plating, natural stones, pearls, and premium fabrics. All materials are carefully selected for durability and beauty.'
        },
        {
          question: 'Do you offer wholesale prices?',
          answer: 'Yes, we offer wholesale pricing for bulk orders. Please contact us at hello@shajogouri.com or call +8801753840087 for wholesale inquiries.'
        }
      ]
    },
    bn: {
      title: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
      subtitle: 'শাজগৌরী সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন',
      faqs: [
        {
          question: 'আপনাদের রিটার্ন নীতি কী?',
          answer: 'আমরা মূল অবস্থায় থাকা সকল পণ্যের জন্য ৭ দিনের রিটার্ন নীতি অফার করি। পণ্যগুলি অব্যবহৃত এবং মূল প্যাকেজিংয়ে থাকতে হবে। পণ্যটি ত্রুটিপূর্ণ না হলে রিটার্ন শিপিং খরচ গ্রাহক বহন করবেন।'
        },
        {
          question: 'ডেলিভারি হতে কতক্ষণ সময় লাগে?',
          answer: 'আমরা ঢাকার ভিতরে ১-৩ কার্যদিবসে এবং ঢাকার বাইরে ৩-৭ কার্যদিবসে ডেলিভারি করি। জরুরি অর্ডারের জন্য অতিরিক্ত খরচে এক্সপ্রেস ডেলিভারি উপলব্ধ।'
        },
        {
          question: 'আপনারা কি ক্যাশ অন ডেলিভারি অফার করেন?',
          answer: 'হ্যাঁ, আমরা সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (COD) সেবা অফার করি। আপনি বিকাশ, নগদ বা ক্রেডিট/ডেবিট কার্ডের মাধ্যমেও পেমেন্ট করতে পারেন।'
        },
        {
          question: 'আপনাদের পণ্যগুলি কি হাতে তৈরি?',
          answer: 'হ্যাঁ, আমাদের বেশিরভাগ গহনা এবং অ্যাক্সেসরিজ দক্ষ কারিগরদের দ্বারা হস্তনির্মিত। প্রতিটি পণ্য যত্ন সহকারে বিস্তারিত এবং মানের দিকে মনোযোগ দিয়ে তৈরি।'
        },
        {
          question: 'আপনারা কি গিফট র্যাপিং প্রদান করেন?',
          answer: 'হ্যাঁ, আমরা সকল অর্ডারের জন্য বিনামূল্যে গিফট র্যাপিং অফার করি। আপনি কোনো অতিরিক্ত খরচ ছাড়াই ব্যক্তিগতকৃত বার্তা কার্ড যোগ করতে পারেন।'
        },
        {
          question: 'আমি কীভাবে আমার অর্ডার ট্র্যাক করতে পারি?',
          answer: 'আপনার অর্ডার শিপ হওয়ার পর আপনি এসএমএস এবং ইমেইলের মাধ্যমে একটি ট্র্যাকিং নম্বর পাবেন। আমাদের ওয়েবসাইটে আপনার অর্ডারের স্থিতি ট্র্যাক করতে এটি ব্যবহার করতে পারেন।'
        },
        {
          question: 'আপনারা কোন উপকরণ ব্যবহার করেন?',
          answer: 'আমরা উচ্চমানের উপকরণ ব্যবহার করি যার মধ্যে রয়েছে স্টার্লিং সিলভার, সোনার প্রলেপ, প্রাকৃতিক পাথর, মুক্তা এবং প্রিমিয়াম কাপড়। সব উপকরণ টেকসই এবং সৌন্দর্যের জন্য যত্ন সহকারে নির্বাচিত।'
        },
        {
          question: 'আপনারা কি পাইকারি দাম অফার করেন?',
          answer: 'হ্যাঁ, আমরা বাল্ক অর্ডারের জন্য পাইকারি মূল্য অফার করি। পাইকারি অনুসন্ধানের জন্য দয়া করে hello@shajogouri.com এ যোগাযোগ করুন বা +৮৮০১৭৫৩৮৪০০৮৭ নম্বরে কল করুন।'
        }
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {content[language].faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border border-pink-100 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-pink-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default FAQ;
