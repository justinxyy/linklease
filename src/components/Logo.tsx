
import { Link } from "react-router-dom";

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
            width={size === "lg" ? 36 : size === "md" ? 30 : 24} 
            height={size === "lg" ? 36 : size === "md" ? 30 : 24} 
            viewBox="0 0 512 512" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={iconColor}
          >
            <path 
              d="M426.3 396.7V213.3c0-8.3-3.3-16.3-9.2-22.2l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-5.9 5.9-9.2 13.9-9.2 22.2v183.5c0 32.8 26.7 59.5 59.5 59.5h265c32.7 0 59.2-26.8 59.2-59.5z" 
              stroke="currentColor"
              strokeWidth="32"
              strokeLinejoin="round"
            />
            <path 
              d="M225 110 V 212 Q225 227 210 227 H180 Q165 227 165 212 V151 Q165 136 180 136 H200 Q215 136 225 146 Z" 
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
