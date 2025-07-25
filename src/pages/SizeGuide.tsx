import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler, Palette, Eye, ChevronRight } from 'lucide-react';

const SizeGuide = () => {
  const shadeRanges = [
    { range: "Fair", description: "Light skin tones with pink, neutral, or golden undertones" },
    { range: "Light", description: "Light to light-medium skin tones" },
    { range: "Medium", description: "Medium skin tones with warm or cool undertones" },
    { range: "Tan", description: "Medium-tan to tan skin tones" },
    { range: "Deep", description: "Deep skin tones with rich undertones" }
  ];

  const applicationGuides = [
    {
      icon: Palette,
      title: "Foundation & Concealer",
      tips: [
        "Test shades on your jawline in natural light",
        "Match your undertone, not just your surface color",
        "Consider seasonal changes in your skin tone"
      ]
    },
    {
      icon: Eye,
      title: "Eyeshadow & Liner",
      tips: [
        "Build colors gradually for better blendability",
        "Use primer to enhance color payoff",
        "Choose shades that complement your eye color"
      ]
    },
    {
      icon: ChevronRight,
      title: "Lip Products",
      tips: [
        "Exfoliate lips before application",
        "Use lip liner for longer-lasting color",
        "Blot and reapply for intensity"
      ]
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
              Size & Shade Guide
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Find your perfect shade match and learn application tips for flawless results.
            </motion.p>
          </div>
        </motion.section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Shade Range Guide */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-display flex items-center">
                    <Ruler className="mr-3 text-primary" size={24} />
                    Shade Range Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {shadeRanges.map((range, index) => (
                      <motion.div
                        key={range.range}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-4 p-4 glass rounded-lg"
                      >
                        <div className="font-display font-semibold text-primary min-w-[80px]">
                          {range.range}
                        </div>
                        <div className="text-muted-foreground">
                          {range.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Application Guide */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">
                Application Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {applicationGuides.map((guide, index) => (
                  <motion.div
                    key={guide.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="glass-card h-full">
                      <CardHeader className="text-center">
                        <div className="glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <guide.icon className="text-primary" size={24} />
                        </div>
                        <CardTitle className="font-display">{guide.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {guide.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shade Finder CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="glass-card max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-display font-bold mb-4">
                    Still Not Sure?
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Use our virtual shade finder tool or visit one of our retail partners 
                    for personalized color matching assistance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-primary">
                      Try Shade Finder
                    </button>
                    <button className="btn-secondary">
                      Find Stores
                    </button>
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

export default SizeGuide;