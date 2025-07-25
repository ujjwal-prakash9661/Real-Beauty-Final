import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useProductStore, Product } from '@/store/productStore';
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useProductStore();
  const { isAuthenticated, requireAuth } = useAuth();
  const navigate = useNavigate();
  
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth()) {
      toast({
        title: "Login required",
        description: "Please create an account or log in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth()) {
      toast({
        title: "Login required",
        description: "Please create an account or log in to save items to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    
    toggleWishlist(product.id);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="product-card relative overflow-hidden h-full">
          {/* Product Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">
                <Sparkles size={12} className="mr-1" />
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-gradient-primary text-primary-foreground">
                Bestseller
              </Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive">
                Save ${product.originalPrice - product.price}
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            className="absolute top-4 right-4 z-10 glass w-10 h-10 rounded-full flex items-center justify-center hover-glow"
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <Heart 
              size={16} 
              className={isWishlisted ? 'fill-primary text-primary' : 'text-muted-foreground'}
            />
          </motion.button>

          {/* Product Image */}
          <div className="relative overflow-hidden rounded-xl">
            <motion.img
              src={product.image}
              alt={product.name}
              className="product-image"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-primary opacity-0"
              animate={{ opacity: isHovered ? 0.1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(product.rating!)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviews})
                </span>
              </div>
            )}

            {/* Product Name */}
            <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Shades Preview */}
            {product.shades && product.shades.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">
                  {product.shades.length} shades available
                </p>
                <div className="flex gap-1">
                  {product.shades.slice(0, 4).map((shade, idx) => (
                    <div
                      key={shade}
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{
                        background: `hsl(${330 + idx * 20}, 60%, ${60 + idx * 5}%)`
                      }}
                    />
                  ))}
                  {product.shades.length > 4 && (
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">+</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 20 
              }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} className="mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;