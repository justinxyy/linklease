
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

interface LogoProps {
  textColor?: string;
  iconColor?: string;
  withIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ 
  textColor = "text-coral-500", 
  iconColor = "text-coral-500", 
  withIcon = true,
  size = "md"
}: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl md:text-3xl"
  };
  
  return (
    <Link to="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
      {withIcon && (
        <div className="relative">
          <Home className={`w-5 h-5 ${size === "lg" ? "w-6 h-6 md:w-7 md:h-7" : ""} ${iconColor}`} />
        </div>
      )}
      <span className={`font-bold ${textColor} ${sizeClasses[size]}`}>Subleasify</span>
    </Link>
  );
};

export default Logo;
