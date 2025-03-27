
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="LinkLease"
          >
            <span className="text-2xl font-semibold text-brand-600">
              <span className="text-gradient">Link</span>
              <span>Lease</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium link-hover",
                isActive("/") ? "text-brand-600" : "text-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className={cn(
                "text-sm font-medium link-hover",
                isActive("/listings") ? "text-brand-600" : "text-foreground"
              )}
            >
              Listings
            </Link>
            <Link
              to="/list-your-lease"
              className={cn(
                "text-sm font-medium link-hover",
                isActive("/list-your-lease") ? "text-brand-600" : "text-foreground"
              )}
            >
              List Your Lease
            </Link>
            <Link
              to="/faq"
              className={cn(
                "text-sm font-medium link-hover",
                isActive("/faq") ? "text-brand-600" : "text-foreground"
              )}
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/messages"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Messages"
            >
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </Link>
            <Link
              to="/account"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Link>
            <Button
              variant="default"
              size="sm"
              className="btn-transition bg-brand-500 hover:bg-brand-600"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 space-y-6">
          <Link
            to="/"
            className={cn(
              "block w-full p-3 rounded-md text-base font-medium",
              isActive("/") ? "bg-brand-50 text-brand-600" : "text-foreground hover:bg-gray-50"
            )}
          >
            Home
          </Link>
          <Link
            to="/listings"
            className={cn(
              "block w-full p-3 rounded-md text-base font-medium",
              isActive("/listings") ? "bg-brand-50 text-brand-600" : "text-foreground hover:bg-gray-50"
            )}
          >
            Listings
          </Link>
          <Link
            to="/list-your-lease"
            className={cn(
              "block w-full p-3 rounded-md text-base font-medium",
              isActive("/list-your-lease") ? "bg-brand-50 text-brand-600" : "text-foreground hover:bg-gray-50"
            )}
          >
            List Your Lease
          </Link>
          <Link
            to="/faq"
            className={cn(
              "block w-full p-3 rounded-md text-base font-medium",
              isActive("/faq") ? "bg-brand-50 text-brand-600" : "text-foreground hover:bg-gray-50"
            )}
          >
            FAQ
          </Link>
          <Link
            to="/messages"
            className={cn(
              "block w-full p-3 rounded-md text-base font-medium",
              isActive("/messages") ? "bg-brand-50 text-brand-600" : "text-foreground hover:bg-gray-50"
            )}
          >
            Messages
          </Link>
          <Link
            to="/account"
            className={cn(
              "block w-full p-3 rounded-md text-base font-medium",
              isActive("/account") ? "bg-brand-50 text-brand-600" : "text-foreground hover:bg-gray-50"
            )}
          >
            Account
          </Link>
          <div className="pt-4">
            <Button
              variant="default"
              className="w-full btn-transition bg-brand-500 hover:bg-brand-600"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
