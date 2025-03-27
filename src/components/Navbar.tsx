
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, Settings, LogOut, MessageSquare, Building, HelpCircle, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const routes = [
  { name: "Home", path: "/", icon: Home },
  { name: "Listings", path: "/listings", icon: Building },
  { name: "List Your Lease", path: "/list-your-lease", icon: Building },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "FAQ", path: "/faq", icon: HelpCircle },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut, isLoading } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-600">LinkLease</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(route.path)
                    ? "text-brand-600 bg-brand-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
          
          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && !user ? (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600">Sign Up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt="Profile" />
                      <AvatarFallback className="bg-brand-100 text-brand-800">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium line-clamp-1">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/account">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      <span>My Account</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/messages">
                    <DropdownMenuItem>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-1 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive(route.path)
                    ? "text-brand-600 bg-brand-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center">
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.name}
                </div>
              </Link>
            ))}
            
            {!isLoading && !user ? (
              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Link to="/auth">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button className="w-full justify-start bg-brand-500 hover:bg-brand-600">
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 border-t pt-4">
                <div className="px-3 py-2 flex items-center">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt="Profile" />
                    <AvatarFallback className="bg-brand-100 text-brand-800">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <Link to="/account">
                  <Button variant="ghost" className="w-full justify-start mt-2">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
