import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Target, Globe, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import aboutHero from '@/assets/selena-about.jpg';

const About = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Rare Beauty was launched with a mission to break beauty standards and promote self-acceptance.'
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Expanded to international markets, bringing inclusive beauty to customers worldwide.'
    },
    {
      year: '2022',
      title: 'Mental Health Initiative',
      description: 'Launched the Rare Impact Fund to support mental health resources for young people.'
    },
    {
      year: '2023',
      title: '1 Million Customers',
      description: 'Reached the milestone of serving over 1 million satisfied customers globally.'
    },
    {
      year: '2024',
      title: 'Sustainability Focus',
      description: 'Committed to sustainable packaging and cruelty-free practices across all products.'
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Self-Acceptance',
      description: 'We believe beauty comes from embracing who you truly are, not changing to fit standards.',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'Our products are designed for all skin tones, types, and ages - because beauty is diverse.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Every product is crafted with premium ingredients and rigorous testing for exceptional performance.',
    },
    {
      icon: Target,
      title: 'Mental Health',
      description: 'We\'re committed to supporting mental health awareness and resources for our community.',
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Environmental responsibility guides our choices in packaging, sourcing, and operations.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Continuously developing breakthrough formulas that enhance your natural beauty.',
    },
  ];

  const stats = [
    { number: '50M+', label: 'Social Media Followers' },
    { number: '100+', label: 'Countries Served' },
    { number: '$5M+', label: 'Mental Health Donations' },
    { number: '4.8/5', label: 'Customer Satisfaction' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Heart size={14} className="mr-2" />
              Our Story
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              About <span className="text-accent">Rare Beauty</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Founded by Selena Gomez, Rare Beauty is more than a makeup brand. 
              We're a movement dedicated to breaking beauty standards and promoting mental health awareness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              "I want us all to stop comparing ourselves to each other and just start embracing our own uniqueness. 
              You're not meant to look like everyone else, you're meant to look like you." - Selena Gomez
            </p>
          </motion.div>
        </div>
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

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from product development to community building.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card h-full hover-lift group">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6 group-hover:animate-glow-pulse">
                      <value.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a vision to a global movement - here are the key milestones in our story.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative flex items-center mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-16 w-0.5 h-24 bg-border last:hidden" />
                
                {/* Year Badge */}
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 flex-shrink-0 relative z-10">
                  {milestone.year}
                </div>
                
                {/* Content */}
                <Card className="glass-card flex-1 hover-lift">
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="glass-card text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Join the <span className="gradient-text">Movement</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Be part of a community that celebrates authenticity, supports mental health, 
                and believes that you are rare - just as you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.rarebeauty.com/pages/rare-impact-fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Support Mental Health
                </a>
                <a
                  href="#newsletter"
                  className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Join Our Community
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;