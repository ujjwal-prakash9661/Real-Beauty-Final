import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus,
  Check,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProductStore } from '@/store/productStore';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, wishlist } = useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<string>('');
  
  const product = products.find(p => p.id === id);
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (product.shades && product.shades.length > 0 && !selectedShade) {
      toast({
        title: "Please select a shade",
        description: "Choose your preferred shade before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedShade);
    }
    
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} ${selectedShade ? `in ${selectedShade}` : ''} added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/products" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              className="aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground">
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
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-6 right-6 w-12 h-12 rounded-full p-0"
                  onClick={handleToggleWishlist}
                >
                  <Heart 
                    size={20} 
                    className={isWishlisted ? 'fill-primary text-primary' : ''} 
                  />
                </Button>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(product.rating!)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}

              {/* Product Name */}
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Shade Selection */}
              {product.shades && product.shades.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">
                    Choose your shade {selectedShade && `- ${selectedShade}`}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.shades.map((shade, index) => (
                      <Button
                        key={shade}
                        variant={selectedShade === shade ? 'default' : 'outline'}
                        className="h-auto p-3 flex flex-col items-center gap-2"
                        onClick={() => setSelectedShade(shade)}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{
                            background: `hsl(${330 + index * 20}, 60%, ${60 + index * 5}%)`
                          }}
                        />
                        <span className="text-xs">{shade}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Quantity:</label>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={20} className="mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Features */}
              {product.features && (
                <Card className="glass-card">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Check size={16} className="mr-2 text-primary" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="howto">How to Use</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="mt-6">
                <Card className="glass-card">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Info size={16} className="mr-2" />
                      Ingredients
                    </h3>
                    {product.ingredients ? (
                      <ul className="space-y-2">
                        {product.ingredients.map((ingredient) => (
                          <li key={ingredient} className="text-sm text-muted-foreground">
                            • {ingredient}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        Made with carefully selected, high-quality ingredients that are safe and effective.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="howto" className="mt-6">
                <Card className="glass-card">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">How to Use</h3>
                    <p className="text-muted-foreground">
                      {product.howToUse || 'Apply as desired to achieve your perfect look.'}
                    </p>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card className="glass-card">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < Math.floor(product.rating || 0)
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-muted-foreground">
                          Based on {product.reviews} reviews
                        </span>
                      </div>
                      <Separator />
                      <p className="text-muted-foreground">
                        Reviews and ratings help other customers make informed decisions. 
                        This product has received overwhelmingly positive feedback.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;