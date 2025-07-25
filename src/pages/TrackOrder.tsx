import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');

  const trackingSteps = [
    {
      icon: Package,
      title: "Order Placed",
      description: "Your order has been confirmed",
      completed: true
    },
    {
      icon: Package,
      title: "Processing",
      description: "Your order is being prepared",
      completed: true
    },
    {
      icon: Truck,
      title: "Shipped",
      description: "Your order is on its way",
      completed: true
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: "Your order has arrived",
      completed: false
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
              Track Your Order
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Enter your order details to track your Rare Beauty package in real-time.
            </motion.p>
          </div>
        </motion.section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Track Order Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-display flex items-center">
                    <Search className="mr-3 text-primary" size={24} />
                    Track Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Order Number</Label>
                      <Input
                        id="orderNumber"
                        placeholder="e.g., RB123456789"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Track Order
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sample Tracking Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Order Status</CardTitle>
                  <p className="text-muted-foreground">Order #RB123456789</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {trackingSteps.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-4"
                      >
                        <div className={`glass w-12 h-12 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-primary/20' : 'bg-muted/20'
                        }`}>
                          <step.icon 
                            className={step.completed ? 'text-primary' : 'text-muted-foreground'} 
                            size={20} 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-display font-semibold ${
                            step.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                        {step.completed && (
                          <CheckCircle className="text-primary" size={20} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-display font-semibold mb-4 flex items-center">
                        <MapPin className="mr-2 text-primary" size={20} />
                        Delivery Address
                      </h4>
                      <div className="text-muted-foreground">
                        <p>Jane Doe</p>
                        <p>123 Beauty Street</p>
                        <p>Los Angeles, CA 90210</p>
                        <p>United States</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-display font-semibold mb-4">Expected Delivery</h4>
                      <p className="text-2xl font-bold text-primary mb-2">Tomorrow</p>
                      <p className="text-muted-foreground">December 15, 2024</p>
                      <p className="text-muted-foreground text-sm mt-2">
                        Estimated between 9:00 AM - 6:00 PM
                      </p>
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

export default TrackOrder;