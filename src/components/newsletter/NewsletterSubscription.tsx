import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Mail } from 'lucide-react';

interface NewsletterSubscriptionProps {
  variant?: 'hero' | 'footer' | 'modal';
  onClose?: () => void;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ 
  variant = 'hero', 
  onClose 
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      
      toast({
        title: "Successfully Subscribed!",
        description: `Welcome to Rare Beauty! We've sent a confirmation to ${email}`,
        duration: 5000,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        if (onClose) {
          onClose();
        }
      }, 3000);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle size={32} className="text-white" />
        </motion.div>
        <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
          You're All Set!
        </h3>
        <p className="text-muted-foreground">
          Thank you for subscribing to our newsletter. Get ready for exclusive beauty tips and offers!
        </p>
      </motion.div>
    );
  }

  const getContainerClasses = () => {
    switch (variant) {
      case 'modal':
        return "p-8 bg-background rounded-lg border border-border shadow-lg max-w-md w-full mx-auto";
      case 'footer':
        return "glass-card mb-12 text-center";
      default:
        return "glass-card text-center max-w-2xl mx-auto";
    }
  };

  const getInputClasses = () => {
    switch (variant) {
      case 'modal':
        return "flex-1 mr-2";
      default:
        return "flex-1";
    }
  };

  return (
    <motion.div
      className={getContainerClasses()}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={variant === 'modal' ? '' : 'p-12'}>
        {variant === 'modal' && (
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Mail size={24} className="text-white" />
            </div>
          </div>
        )}
        
        <h2 className={`font-display font-bold mb-4 ${
          variant === 'modal' ? 'text-2xl' : 'text-3xl md:text-4xl'
        }`}>
          Stay <span className="gradient-text">Beautiful</span>
        </h2>
        
        <p className={`text-muted-foreground mb-8 ${
          variant === 'modal' ? 'text-base' : 'text-lg'
        } ${variant === 'modal' ? 'mb-6' : ''}`}>
          {variant === 'modal' 
            ? 'Subscribe to our newsletter for exclusive offers, beauty tips, and new product launches.'
            : 'Get the latest beauty tips, exclusive offers, and new product launches delivered to your inbox.'
          }
        </p>
        
        <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={getInputClasses()}
            disabled={isLoading}
          />
          <Button 
            type="submit"
            className="bg-gradient-primary hover:opacity-90 px-8"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default NewsletterSubscription;