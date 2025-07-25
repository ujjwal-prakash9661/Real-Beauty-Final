import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useProductStore } from '@/store/productStore';

interface ProductFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters } = useProductStore();

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'blush', label: 'Blush' },
    { value: 'lips', label: 'Lips' },
    { value: 'face', label: 'Face' },
    { value: 'eyes', label: 'Eyes' },
    { value: 'tools', label: 'Tools' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'newest', label: 'Newest First' },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-semibold">Filters</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Category</Label>
            <RadioGroup
              value={filters.category}
              onValueChange={(value) => setFilters({ category: value })}
              className="space-y-2"
            >
              {categories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.value} id={category.value} />
                  <Label htmlFor={category.value} className="text-sm">
                    {category.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className="my-6" />

          {/* Price Range */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ priceRange: value as [number, number] })}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Sort By */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Sort By</Label>
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(value) => setFilters({ sortBy: value as any })}
              className="space-y-2"
            >
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setFilters({
              category: 'all',
              priceRange: [0, 100],
              sortBy: 'name'
            })}
          >
            Clear All Filters
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Desktop Filter Sidebar
export const DesktopProductFilter: React.FC = () => {
  const { filters, setFilters } = useProductStore();

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'blush', label: 'Blush' },
    { value: 'lips', label: 'Lips' },
    { value: 'face', label: 'Face' },
    { value: 'eyes', label: 'Eyes' },
    { value: 'tools', label: 'Tools' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'newest', label: 'Newest First' },
  ];

  return (
    <Card className="glass-card sticky top-24 h-fit">
      <div className="p-6">
        <h3 className="text-lg font-display font-semibold mb-6 flex items-center">
          <Filter size={20} className="mr-2" />
          Filters
        </h3>

        {/* Category Filter */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <RadioGroup
            value={filters.category}
            onValueChange={(value) => setFilters({ category: value })}
            className="space-y-2"
          >
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={category.value} />
                <Label htmlFor={category.value} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="my-6" />

        {/* Price Range */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ priceRange: value as [number, number] })}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Sort By */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">Sort By</Label>
          <RadioGroup
            value={filters.sortBy}
            onValueChange={(value) => setFilters({ sortBy: value as any })}
            className="space-y-2"
          >
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setFilters({
            category: 'all',
            priceRange: [0, 100],
            sortBy: 'name'
          })}
        >
          Clear All Filters
        </Button>
      </div>
    </Card>
  );
};

export default ProductFilter;