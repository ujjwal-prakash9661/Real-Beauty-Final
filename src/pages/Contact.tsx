import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
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
              Get In Touch
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions about our products? Need beauty advice? We're here to help you on your journey to self-acceptance.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Your Message" rows={5} />
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-display font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="glass w-12 h-12 rounded-full flex items-center justify-center">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">hello@rarebeauty.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="glass w-12 h-12 rounded-full flex items-center justify-center">
                        <Phone className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="glass w-12 h-12 rounded-full flex items-center justify-center">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-muted-foreground">Los Angeles, CA</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="glass w-12 h-12 rounded-full flex items-center justify-center">
                        <Clock className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">Business Hours</p>
                        <p className="text-muted-foreground">Mon - Fri: 9AM - 6PM PST</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h4 className="font-display font-semibold mb-4">Customer Support</h4>
                    <p className="text-muted-foreground mb-4">
                      Need help with your order or have questions about our products? Our customer support team is here to help.
                    </p>
                    <Button variant="outline" className="w-full">
                      Visit Help Center
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;