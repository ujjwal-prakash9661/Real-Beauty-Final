import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter, { DesktopProductFilter } from '@/components/products/ProductFilter';
import { useProductStore } from '@/store/productStore';
import Layout from '@/components/layout/Layout';

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { getFilteredProducts, searchQuery } = useProductStore();
  
  // getFilteredProducts already handles search filtering when searchQuery exists
  const products = getFilteredProducts();

  return (
    <Layout>
      <div className="min-h-screen pt-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover makeup that enhances your natural beauty and celebrates your uniqueness.
            </p>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Showing results for: "<span className="font-medium">{searchQuery}</span>"
              </p>
            )}
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <DesktopProductFilter />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter & View Controls */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden"
                  >
                    <Filter size={16} className="mr-2" />
                    Filters
                  </Button>
                  
                  <Badge variant="secondary" className="text-sm">
                    {products.length} products found
                  </Badge>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              {products.length > 0 ? (
                <motion.div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
                      : 'space-y-6'
                  }
                  layout
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard 
                        product={product} 
                        index={index}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery 
                      ? `No products match "${searchQuery}". Try a different search term.`
                      : "Try adjusting your filters to see more products."
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden"
                  >
                    <Filter size={16} className="mr-2" />
                    Adjust Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <ProductFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </Layout>
  );
};

export default Products;