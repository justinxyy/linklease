
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MapPin, Calendar, DollarSign, Filter, Check, ArrowDownUp } from "lucide-react";

// Mock data for listings
const mockListings = [
  {
    id: "1",
    title: "Modern Studio Apartment near UC Berkeley",
    location: "Berkeley, CA",
    price: 1200,
    rating: 4.9,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "2",
    title: "Cozy Room in Shared Apartment",
    location: "Palo Alto, CA",
    price: 950,
    rating: 4.7,
    reviewCount: 36,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-05-15",
    endDate: "2023-08-30",
    propertyType: "Private Room",
    bedrooms: 1,
    bathrooms: 1.5,
  },
  {
    id: "3",
    title: "Luxury 1BR with Campus View",
    location: "Ann Arbor, MI",
    price: 1350,
    rating: 4.8,
    reviewCount: 28,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-06-01",
    endDate: "2023-07-31",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "4",
    title: "Private Room in Townhouse",
    location: "Cambridge, MA",
    price: 1100,
    rating: 4.6,
    reviewCount: 31,
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-06-15",
    endDate: "2023-08-20",
    propertyType: "Private Room",
    bedrooms: 1,
    bathrooms: 2,
  },
  {
    id: "5",
    title: "Stylish Studio Apartment",
    location: "New York, NY",
    price: 1800,
    rating: 4.9,
    reviewCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-05-20",
    endDate: "2023-08-10",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "6",
    title: "Quiet Room near Stanford",
    location: "Stanford, CA",
    price: 1250,
    rating: 4.7,
    reviewCount: 19,
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-06-01",
    endDate: "2023-09-01",
    propertyType: "Private Room",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "7",
    title: "Modern 2BR Apartment",
    location: "Los Angeles, CA",
    price: 1600,
    rating: 4.8,
    reviewCount: 38,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-06-10",
    endDate: "2023-08-25",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: "8",
    title: "Bright Studio with City Views",
    location: "Boston, MA",
    price: 1400,
    rating: 4.6,
    reviewCount: 27,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2023-05-25",
    endDate: "2023-08-15",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
  },
];

const propertyTypes = ["Any", "Apartment", "Studio", "Private Room", "Shared Room", "House"];

const Listings = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("Any");
  const [sortOption, setSortOption] = useState("recommended");
  
  useEffect(() => {
    // Simulate content loading
    setIsLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="section-container py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Available Subleases</h1>
            <p className="text-muted-foreground">
              Find verified short-term housing from students and young professionals.
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="mb-8">
            <SearchBar variant="expanded" className="mb-4" />
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  className="text-sm border rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="date_newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="bg-card rounded-xl border p-6 mb-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Price Range */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                    <DollarSign className="h-5 w-5 text-brand-500" />
                    Price Range
                  </h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={300}
                      max={3000}
                      step={50}
                      onValueChange={(value) => setPriceRange(value)}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">${priceRange[0]}</span>
                      <span className="text-sm text-muted-foreground">to</span>
                      <span className="text-sm font-medium">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Property Type */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                    <MapPin className="h-5 w-5 text-brand-500" />
                    Property Type
                  </h3>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedPropertyType === type
                            ? "bg-brand-50 text-brand-600"
                            : "hover:bg-gray-50 text-foreground"
                        }`}
                        onClick={() => setSelectedPropertyType(type)}
                      >
                        <span>{type}</span>
                        {selectedPropertyType === type && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Availability */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                    <Calendar className="h-5 w-5 text-brand-500" />
                    Availability
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 bg-white border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 bg-white border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-8 pt-6 border-t gap-3">
                <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  className="bg-brand-500 hover:bg-brand-600"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-6">
            <p>Showing {mockListings.length} available subleases</p>
          </div>
          
          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockListings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                location={listing.location}
                price={listing.price}
                rating={listing.rating}
                reviewCount={listing.reviewCount}
                imageUrl={listing.imageUrl}
                startDate={listing.startDate}
                endDate={listing.endDate}
              />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="w-10 h-10 rounded-md flex items-center justify-center bg-brand-50 text-brand-600 border-brand-200 border font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors border">
                2
              </button>
              <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors border">
                3
              </button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors border">
                8
              </button>
              <button className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50 transition-colors">
                Next
              </button>
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Listings;
