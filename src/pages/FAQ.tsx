import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Rare Beauty different from other makeup brands?",
      answer: "Rare Beauty is founded on the principles of self-acceptance and mental health awareness. Our products are designed to enhance your natural beauty, not mask it. We're committed to breaking down unrealistic standards of perfection and promoting mental health through our Rare Impact Fund."
    },
    {
      question: "Are Rare Beauty products cruelty-free?",
      answer: "Yes, all Rare Beauty products are 100% cruelty-free. We never test on animals and are committed to ethical beauty practices."
    },
    {
      question: "What is the Rare Impact Fund?",
      answer: "The Rare Impact Fund is our initiative to improve access to mental health services for young people. A portion of every purchase goes toward supporting mental health education and resources."
    },
    {
      question: "How do I find my perfect shade match?",
      answer: "We offer a comprehensive shade range to match diverse skin tones. You can use our online shade finder tool or visit one of our retail partners for personalized shade matching assistance."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused products in their original packaging. If you're not completely satisfied with your purchase, please contact our customer service team for assistance."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship to the United States and Canada. We're working to expand our international shipping options to bring Rare Beauty to more communities worldwide."
    },
    {
      question: "How should I store my Rare Beauty products?",
      answer: "Store your products in a cool, dry place away from direct sunlight. Our liquid formulas should be kept at room temperature and properly sealed to maintain their quality and performance."
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Many of our products are formulated with sensitive skin in mind. However, we recommend checking the ingredient list and doing a patch test before full application if you have known sensitivities."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <motion.section 
          className="py-20 bg-gradient-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold mb-6 gradient-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Find answers to common questions about our products, mission, and policies.
            </motion.p>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-border/20">
                        <AccordionTrigger className="text-left font-display font-semibold hover:no-underline hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            {/* Still have questions section */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-4">Still have questions?</h3>
                  <p className="text-muted-foreground mb-6">
                    Can't find what you're looking for? Our customer support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact" className="btn-primary">
                      Contact Support
                    </a>
                    <a href="mailto:hello@rarebeauty.com" className="btn-secondary">
                      Send Email
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;