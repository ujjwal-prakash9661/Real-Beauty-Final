import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { products, wishlist } = useProductStore();
  
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  if (wishlistProducts.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen pt-8">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Save your favorite products to your wishlist to shop them later.
              </p>
              <Link to="/products">
                <Button className="hover-glow">
                  <ShoppingBag size={16} className="mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Your <span className="gradient-text">Wishlist</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'product' : 'products'} saved for later
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;