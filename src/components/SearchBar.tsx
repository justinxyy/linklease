
import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  variant?: "simple" | "expanded";
}

const SearchBar = ({ className, variant = "simple" }: SearchBarProps) => {
  const [activeTab, setActiveTab] = useState<string>("location");
  
  return (
    <div 
      className={cn(
        "bg-white rounded-xl shadow-md border overflow-hidden",
        variant === "expanded" ? "p-4" : "p-2",
        className
      )}
    >
      {variant === "expanded" && (
        <div className="flex border-b mb-4 pb-2">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === "location" 
                ? "bg-brand-50 text-brand-600" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
            )}
            onClick={() => setActiveTab("location")}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </div>
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === "dates" 
                ? "bg-brand-50 text-brand-600" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
            )}
            onClick={() => setActiveTab("dates")}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Dates</span>
            </div>
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === "guests" 
                ? "bg-brand-50 text-brand-600" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
            )}
            onClick={() => setActiveTab("guests")}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Roommates</span>
            </div>
          </button>
        </div>
      )}
      
      <div className="flex items-center">
        <div className="flex-grow flex items-center gap-2 px-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={variant === "simple" ? "Search for location, university, or address..." : "Where are you looking?"}
            className="w-full text-sm md:text-base py-2 focus:outline-none"
          />
        </div>
        <Button 
          className="btn-transition bg-brand-500 hover:bg-brand-600"
          size={variant === "expanded" ? "default" : "sm"}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
