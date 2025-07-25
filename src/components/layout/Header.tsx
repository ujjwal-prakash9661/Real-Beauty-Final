import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User,
  LogOut,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProductStore } from '@/store/productStore';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount, wishlist, setSearchQuery: setStoreSearchQuery } = useProductStore();
  // const { user, isAuthenticated, logout, deleteAccount } = useAuthStore();

  const { currentUser, isAuthenticated, logout, deleteAccount } = useAuth();

  const handleDeleteAccount = () => {
    deleteAccount();
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    });

    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };


  const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Journey', href: '/journey' }, // <-- Add this line
];

  const isActivePage = (href: string) => {
    return location.pathname === href;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) { // Check if searchQuery is not just whitespace
      setStoreSearchQuery(searchQuery);
      navigate('/products');
      setIsSearchOpen(false);
      setSearchQuery(''); // Clear search query after successful search
    } else {
      // Optionally, you can show a toast or message if the search query is empty
      toast({
        title: "Search cannot be empty",
        description: "Please enter a product name or keyword.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // const handleDeleteAccount = () => {
  //   deleteAccount();
  //   toast({
  //     title: "Account deleted",
  //     description: "Your account has been permanently deleted.",
  //     variant: "destructive",
  //   });
  //   navigate('/login');
  // };

  return (
    <motion.header 
      className="glass border-b border-border/30 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          
          {/* <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="text-2xl font-display font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Rare Beauty
            </motion.div>
          </Link> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative font-medium transition-colors duration-300 ${
                  isActivePage(item.href)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
                {isActivePage(item.href) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        className="pr-8"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="absolute right-2"
                      >
                        <X size={16} />
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    className="hover-glow"
                  >
                    <Search size={20} />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative hover-glow">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative hover-glow">
                <ShoppingBag size={20} />
                {getCartCount() > 0 && (
                  <Badge 
                    variant="default" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-primary"
                  >
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hover-glow">
                    <User size={16} className="mr-2" />
                    {currentUser?.firstName}
                    <ChevronDown size={14} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    {currentUser?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleDeleteAccount}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete Account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="hover-glow">
                  <User size={16} className="mr-2" />
                  Account
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 border-t border-border/30 pt-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium transition-colors ${
                      isActivePage(item.href)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center space-x-4 pt-4">
                  <Link to="/wishlist">
                    <Button variant="ghost" size="sm" className="relative">
                      <Heart size={20} />
                      {wishlist.length > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                        >
                          {wishlist.length}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  <Link to="/cart">
                    <Button variant="ghost" size="sm" className="relative">
                      <ShoppingBag size={20} />
                      {getCartCount() > 0 && (
                        <Badge 
                          variant="default" 
                          className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-primary"
                        >
                          {getCartCount()}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {isAuthenticated ? (
                    <Button variant="outline" size="sm" onClick={logout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Link to="/login">
                      <Button variant="outline" size="sm">
                        <User size={16} className="mr-2" />
                        Account
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
