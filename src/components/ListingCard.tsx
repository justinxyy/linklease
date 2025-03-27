
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
  className?: string;
}

const ListingCard = ({
  id,
  title,
  location,
  price,
  rating,
  reviewCount,
  imageUrl,
  startDate,
  endDate,
  className,
}: ListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className={cn(
        "group overflow-hidden rounded-xl bg-card border transition-all duration-300 hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/listings/${id}`}>
        <div className="relative">
          <AspectRatio ratio={4/3} className="bg-muted">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full rounded-t-xl transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </AspectRatio>
          <button
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
              isFavorited 
                ? "bg-white/90 text-rose-500" 
                : "bg-black/20 text-white hover:bg-white/90 hover:text-rose-500"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="h-5 w-5" fill={isFavorited ? "currentColor" : "none"} />
          </button>
          <div className="absolute bottom-3 left-3 bg-brand-600 text-white text-xs px-2 py-1 rounded-md">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-base">
              <Link to={`/listings/${id}`} className="hover:text-brand-600 transition-colors">
                {title}
              </Link>
            </h3>
            <p className="text-muted-foreground text-sm mt-1">{location}</p>
          </div>
          
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center">
            <p className="font-medium">
              ${price.toLocaleString()}<span className="text-muted-foreground font-normal"> /mo</span>
            </p>
            <Link
              to={`/listings/${id}`}
              className="text-sm text-brand-600 hover:text-brand-700 transition-colors font-medium"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
