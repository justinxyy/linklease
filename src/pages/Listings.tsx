import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import { useListings } from "@/hooks/use-listings";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Component imports
import ListingsHeader from "@/components/listings/ListingsHeader";
import ListingsSearchBar from "@/components/listings/ListingsSearchBar";
import ListingsFilterControls from "@/components/listings/ListingsFilterControls";
import ListingsSort from "@/components/listings/ListingsSort";
import ListingsGrid from "@/components/listings/ListingsGrid";
import ListingsPagination from "@/components/listings/ListingsPagination";
import ListingsResultCount from "@/components/listings/ListingsResultCount";

// Define extended listing type for the display with additional UI properties
interface UIListing {
  id: number;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;  // Maps to the first image in images array
  rating?: number;    // Not in DB schema, but used for UI
  reviewCount?: number; // Not in DB schema, but used for UI
  startDate?: string; // Not in DB schema, but used for UI
  endDate?: string;   // Not in DB schema, but used for UI
  propertyType?: string; // Not in DB schema, but used for UI
  bedrooms?: number;  // Not in DB schema, but used for UI
  bathrooms?: number; // Not in DB schema, but used for UI
  latitude: number | null;
  longitude: number | null;
  images?: string[] | null;
}

const propertyTypes = ["Any", "Apartment", "Studio", "Private Room", "Shared Room", "House"];

const Listings = () => {
  // Use the new hook from useListings
  const { useAllListings } = useListings();
  const { data: listings, isLoading, error } = useAllListings();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("Any");
  const [sortOption, setSortOption] = useState("recommended");
  const [showMap, setShowMap] = useState(false);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  
  const searchBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate content loading
    setIsLoaded(true);
    
    // Set up scroll listener for sticky search bar
    const handleScroll = () => {
      if (searchBarRef.current && headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        setIsSearchSticky(headerBottom <= 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading listings",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Transform DB listings to UI listings
  const displayListings: UIListing[] = listings ? listings.map(listing => ({
    id: listing.id,
    title: listing.title,
    location: listing.location,
    price: listing.price,
    latitude: listing.latitude,
    longitude: listing.longitude,
    imageUrl: listing.images && listing.images.length > 0 ? listing.images[0] : undefined,
    images: listing.images,
    // Add mock data for UI fields not in the DB schema
    rating: 4.7,
    reviewCount: 25,
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    propertyType: listing.property_type || "Apartment",
    bedrooms: listing.bedrooms || 1,
    bathrooms: listing.bathrooms || 1,
  })) : [];
  
  console.log("Database listings:", listings);
  console.log("Display listings:", displayListings);
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="section-container py-8">
          <div ref={headerRef}>
            <ListingsHeader />
          </div>
          
          {/* Search and Filter Controls - Sticky on scroll */}
          <div ref={searchBarRef}>
            <ListingsSearchBar isSearchSticky={isSearchSticky}>
              <ListingsFilterControls 
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}
                propertyTypes={propertyTypes}
                showMap={showMap}
                setShowMap={setShowMap}
              />
              <ListingsSort sortOption={sortOption} setSortOption={setSortOption} />
            </ListingsSearchBar>
          </div>
          
          {/* Results Count */}
          <ListingsResultCount count={displayListings.length} isLoading={isLoading} />
          
          {/* Conditionally show map or grid view */}
          {showMap ? (
            <div className="h-[calc(100vh-24rem)]">
              <MapView 
                listings={displayListings} 
                onMarkerClick={(id) => console.log(`Clicked listing ${id}`)}
              />
            </div>
          ) : (
            <>
              <ListingsGrid listings={displayListings} isLoading={isLoading} />
              {/* Pagination - Only show in list view */}
              {displayListings.length > 0 && <ListingsPagination />}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Listings;
