import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, Globe, Package } from 'lucide-react';

const Shipping = () => {
  const shippingOptions = [
    {
      icon: Truck,
      title: "Standard Shipping",
      description: "Free on orders $50+",
      timeframe: "5-7 business days",
      cost: "$5.95"
    },
    {
      icon: Clock,
      title: "Express Shipping",
      description: "Get your order fast",
      timeframe: "2-3 business days", 
      cost: "$12.95"
    },
    {
      icon: Package,
      title: "Overnight Shipping",
      description: "Next day delivery",
      timeframe: "1 business day",
      cost: "$24.95"
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
              Shipping Information
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fast, reliable shipping to get your beauty essentials delivered safely to your door.
            </motion.p>
          </div>
        </motion.section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {shippingOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card h-full">
                    <CardHeader className="text-center">
                      <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <option.icon className="text-primary" size={24} />
                      </div>
                      <CardTitle className="font-display">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-2">{option.description}</p>
                      <p className="font-semibold text-primary text-lg">{option.timeframe}</p>
                      <p className="text-2xl font-bold mt-2">{option.cost}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6">Shipping Details</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-display font-semibold mb-4">Processing Time</h4>
                      <p className="text-muted-foreground mb-4">
                        Orders placed before 12 PM PST Monday-Friday are processed the same day. 
                        Weekend orders are processed on the next business day.
                      </p>
                      
                      <h4 className="font-display font-semibold mb-4">Available Locations</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe size={16} className="text-primary" />
                        <span>United States (all 50 states)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe size={16} className="text-primary" />
                        <span>Canada</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-display font-semibold mb-4">Important Notes</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Free standard shipping on orders $50 and above</li>
                        <li>• Expedited shipping available for urgent orders</li>
                        <li>• All packages are trackable with confirmation numbers</li>
                        <li>• Signature required for orders over $200</li>
                        <li>• We ship Monday through Friday, excluding holidays</li>
                      </ul>
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

export default Shipping;