
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="section-container pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-semibold">
                <span className="text-gradient">Subleasify</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The premier platform for college students and young professionals to find and list short-term housing and subleases.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-coral-500 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-coral-500 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-coral-500 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-coral-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-5">Company</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-5">Support</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-5">Legal</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/trust" className="text-muted-foreground hover:text-coral-500 transition-colors text-sm">
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Subleasify. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select
              className="form-select bg-background border border-input rounded-md text-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-coral-500"
              defaultValue="english"
            >
              <option value="english">English (US)</option>
              <option value="spanish">Español</option>
              <option value="french">Français</option>
              <option value="german">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
