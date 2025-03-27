
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
          <svg 
            width={size === "lg" ? 30 : 24} 
            height={size === "lg" ? 30 : 24} 
            viewBox="0 0 256 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={iconColor}
          >
            <path 
              d="M208 88.23V192a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16V88.23a16 16 0 0 1 5-11.66l64-60a16 16 0 0 1 22 0l64 60a16 16 0 0 1 5 11.66Z" 
              fill="currentColor"
              fillOpacity="0.2"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path 
              d="M138.47 152.58L116.3 168.93C107.34 175.28 95 169.86 95 158.52V124.65C95 123.21 95.38 121.81 96.08 120.57C98.3 116.72 103.83 115.27 107.7 117.41L129.87 130.07C138.83 135.35 141.3 147.3 134.93 155.65C136.24 154.68 137.41 153.69 138.47 152.58Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      <span className={`font-bold ${textColor} ${sizeClasses[size]}`}>Subleasify</span>
    </Link>
  );
};

export default Logo;
