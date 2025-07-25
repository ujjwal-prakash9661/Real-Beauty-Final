import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Sparkles } from 'lucide-react';

const FeaturedProduct = () => {
  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles size={16} className="mr-2" />
            Most Loved Product
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Soft Pinch Liquid Blush
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The iconic liquid blush that started it all - weightless, buildable, and designed for effortless beauty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-3xl">
              <img
                src="/src/assets/product-blush.jpg"
                alt="Soft Pinch Liquid Blush"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute top-4 right-4 glass w-12 h-12 rounded-full flex items-center justify-center">
                <Heart className="text-primary" size={20} />
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">(4.8/5 from 2,500+ reviews)</span>
                </div>

                <h3 className="text-2xl font-display font-bold mb-2">Soft Pinch Liquid Blush</h3>
                <p className="text-3xl font-bold text-primary mb-4">$25</p>

                <div className="space-y-4 mb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Inspired by Selena Gomez's vision of effortless beauty, this weightless liquid blush was designed to give you a natural, healthy flush that looks like it comes from within. The buildable formula allows you to go from a subtle hint to a bold pop of color.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Finish:</span>
                      <p className="text-muted-foreground">Natural, dewy</p>
                    </div>
                    <div>
                      <span className="font-semibold">Coverage:</span>
                      <p className="text-muted-foreground">Buildable</p>
                    </div>
                    <div>
                      <span className="font-semibold">Skin Type:</span>
                      <p className="text-muted-foreground">All skin types</p>
                    </div>
                    <div>
                      <span className="font-semibold">Shades:</span>
                      <p className="text-muted-foreground">12 inclusive shades</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-display font-semibold">Key Benefits:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Weightless, buildable formula</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Long-lasting 8-hour wear</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Blends seamlessly with fingertips</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg mb-6">
                  <h4 className="font-display font-semibold mb-2 text-primary">The Story Behind</h4>
                  <p className="text-sm text-muted-foreground">
                    "I wanted to create a blush that made you feel confident and beautiful without trying too hard. This formula was developed after testing over 100 different textures to find the perfect balance of color payoff and natural finish." - Selena Gomez
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                    Add to Bag - $25
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;