import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Award, Users, Sparkles, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Journey = () => {
  const timelineEvents = [
    {
      year: '2020',
      date: 'September 3, 2020',
      title: 'The Beginning',
      description: 'Selena Gomez launched Rare Beauty with a mission to break down unrealistic standards of perfection and promote self-acceptance.',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      achievements: ['48 products launched', '51 inclusive shades', 'Mental health focus']
    },
    {
      year: '2020',
      date: 'October 2020',
      title: 'Rare Impact Fund',
      description: 'Established the Rare Impact Fund to provide mental health services and resources to underserved communities.',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      achievements: ['$100M goal by 2030', 'Mental health advocacy', 'Community support']
    },
    {
      year: '2021',
      date: 'March 2021',
      title: 'Global Expansion',
      description: 'Rare Beauty expanded internationally, bringing inclusive beauty to markets worldwide.',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-500',
      achievements: ['International launch', 'Global accessibility', 'Cultural inclusion']
    },
    {
      year: '2022',
      date: 'May 2022',
      title: 'Award Recognition',
      description: 'Rare Beauty won multiple beauty awards and recognition for innovation and inclusivity.',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      achievements: ['Industry awards', 'Innovation recognition', 'Inclusivity leadership']
    },
    {
      year: '2023',
      date: 'January 2023',
      title: 'Community Growth',
      description: 'Built a community of millions who embrace self-acceptance and mental health awareness.',
      icon: Star,
      color: 'from-emerald-500 to-teal-500',
      achievements: ['10M+ community', 'Mental health impact', 'Self-acceptance movement']
    },
    {
      year: '2024',
      date: 'Present',
      title: 'Continued Innovation',
      description: 'Continuing to innovate with new products while maintaining the core mission of promoting mental health and self-acceptance.',
      icon: Sparkles,
      color: 'from-rose-500 to-pink-500',
      achievements: ['New innovations', 'Sustained impact', 'Future vision']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Heart size={40} className="text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              The <span className="gradient-text">Journey</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how Selena Gomez created Rare Beauty to break beauty standards 
              and promote mental health awareness through inclusive, authentic beauty.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Badge className="bg-gradient-primary text-white px-4 py-2 text-sm">
                Mental Health Advocacy
              </Badge>
              <Badge className="bg-gradient-primary text-white px-4 py-2 text-sm">
                Inclusive Beauty
              </Badge>
              <Badge className="bg-gradient-primary text-white px-4 py-2 text-sm">
                Self-Acceptance
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-4 h-4 rounded-full bg-gradient-to-r ${event.color}`}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  
                  {/* Year Badge */}
                  <motion.div
                    className={`absolute left-20 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-8 z-10`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge 
                      className={`bg-gradient-to-r ${event.color} text-white font-bold px-3 py-1`}
                    >
                      {event.year}
                    </Badge>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`ml-24 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="glass-card overflow-hidden group cursor-pointer">
                      <div className="p-6">
                        {/* Icon */}
                        <motion.div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center mb-4 group-hover:animate-glow-pulse`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <event.icon size={24} className="text-white" />
                        </motion.div>

                        {/* Date */}
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar size={14} className="mr-2" />
                          {event.date}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-display font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Achievements */}
                        <div className="space-y-2">
                          {event.achievements.map((achievement, achIndex) => (
                            <motion.div
                              key={achIndex}
                              className="flex items-center text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: achIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${event.color} mr-3`} />
                              <span className="text-muted-foreground">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              The <span className="gradient-text">Impact</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              More than just beauty products, Rare Beauty has created a movement that 
              celebrates authenticity, promotes mental health, and empowers individuals worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '$100M', label: 'Mental Health Fund Goal', icon: Heart },
                { number: '10M+', label: 'Community Members', icon: Users },
                { number: '51', label: 'Inclusive Shades', icon: Sparkles }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-card p-8 h-full">
                    <motion.div
                      className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon size={32} className="text-white" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Journey;