import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/ProductCard';
import { useProductStore } from '@/store/productStore';
import Layout from '@/components/layout/Layout';
import NewsletterSubscription from '@/components/newsletter/NewsletterSubscription';
import FeaturedProduct from '@/components/sections/FeaturedProduct';
import heroImage from '@/assets/selena-hero.jpg';

const Home = () => {
  const { products } = useProductStore();
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: Heart,
      title: 'Self-Acceptance',
      description: 'Celebrating uniqueness and promoting mental health awareness.',
    },
    {
      icon: Users,
      title: 'Inclusive Beauty',
      description: 'Products designed for all skin tones and types.',
    },
    {
      icon: Award,
      title: 'Cruelty-Free',
      description: 'Never tested on animals, always ethically sourced.',
    },
  ];

  const stats = [
    { number: '1M+', label: 'Happy Customers' },
    { number: '50+', label: 'Products' },
    { number: '100%', label: 'Cruelty-Free' },
    { number: '4.8★', label: 'Average Rating' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Sparkles size={14} className="mr-2" />
              New Collection Available
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Rare Beauty
              <span className="block text-4xl md:text-6xl mt-2 opacity-90">
                By Selena Gomez
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Makeup that celebrates your uniqueness and promotes self-acceptance. 
              Because you are rare.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-white text-foreground hover:bg-white/90 text-lg px-8 py-6 hover-glow"
                >
                  Shop Now
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Best<span className="gradient-text">sellers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most-loved products that have transformed beauty routines worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/products">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                View All Products
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Product Section */}
      <FeaturedProduct />
      
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why Choose <span className="gradient-text">Rare Beauty</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              More than makeup - we're a movement dedicated to breaking beauty standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center h-full hover-lift group">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
                      <feature.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* <motion.div
            className="glass-card text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Stay <span className="gradient-text">Beautiful</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest beauty tips, exclusive offers, and new product launches delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
                />
                <Button className="bg-gradient-primary hover:opacity-90 px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div> */}

          <NewsletterSubscription variant="hero" />
        </div>
      </section>
    </Layout>
  );
};

export default Home;