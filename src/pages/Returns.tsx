import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shield, Clock, CheckCircle } from 'lucide-react';

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact our customer service or use our online return portal"
    },
    {
      step: 2,
      title: "Package Items",
      description: "Pack items in original packaging with return label"
    },
    {
      step: 3,
      title: "Ship Back",
      description: "Drop off at any authorized shipping location"
    },
    {
      step: 4,
      title: "Receive Refund",
      description: "Get your refund within 5-7 business days"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-20">
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
              Returns & Exchanges
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your satisfaction is our priority. Easy returns and exchanges within 30 days.
            </motion.p>
          </div>
        </motion.section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Return Policy Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center">
                  <CardHeader>
                    <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-display">30-Day Window</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Return or exchange items within 30 days of purchase for a full refund
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center">
                  <CardHeader>
                    <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-display">Original Condition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Items must be unused and in original packaging for hygiene reasons
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center">
                  <CardHeader>
                    <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RotateCcw className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-display">Free Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Complimentary return shipping for all orders within the US
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Return Process */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-display text-center">How to Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {returnSteps.map((step, index) => (
                      <div key={step.step} className="text-center">
                        <div className="glass w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold">
                          {step.step}
                        </div>
                        <h4 className="font-display font-semibold mb-2">{step.title}</h4>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Detailed Policy */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6">Return Policy Details</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-display font-semibold mb-4 flex items-center">
                        <CheckCircle size={20} className="text-primary mr-2" />
                        What Can Be Returned
                      </h4>
                      <ul className="space-y-2 text-muted-foreground mb-6">
                        <li>• Unused makeup products in original packaging</li>
                        <li>• Tools and accessories in like-new condition</li>
                        <li>• Gift sets with all items included</li>
                        <li>• Items purchased within the last 30 days</li>
                      </ul>

                      <h4 className="font-display font-semibold mb-4">Refund Timeline</h4>
                      <p className="text-muted-foreground">
                        Once we receive your return, refunds are processed within 5-7 business days. 
                        The refund will appear on your original payment method.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-display font-semibold mb-4">Exchange Policy</h4>
                      <p className="text-muted-foreground mb-4">
                        We're happy to exchange items for a different shade or product of equal value. 
                        Exchanges follow the same 30-day policy as returns.
                      </p>

                      <h4 className="font-display font-semibold mb-4">International Returns</h4>
                      <p className="text-muted-foreground mb-6">
                        International customers are responsible for return shipping costs. 
                        Customs duties are non-refundable.
                      </p>

                      <div className="space-y-3">
                        <Button className="w-full bg-gradient-primary hover:opacity-90">
                          Start a Return
                        </Button>
                        <Button variant="outline" className="w-full">
                          Track Return Status
                        </Button>
                      </div>
                    </div>
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

export default Returns;