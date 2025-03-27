
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ListingCard";

// Mock data for featured listings
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
  },
];

const FeaturedListings = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  
  const loadMore = () => {
    setVisibleCount(Math.min(visibleCount + 2, mockListings.length));
  };
  
  return (
    <section className="section-container">
      <div className="space-y-2 mb-10">
        <h2 className="text-3xl font-medium text-center">Featured Listings</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto">
          Discover top-rated temporary housing options from verified students and young professionals across top university campuses.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {mockListings.slice(0, visibleCount).map((listing) => (
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
            className="animate-fade-up"
          />
        ))}
      </div>
      
      {visibleCount < mockListings.length && (
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={loadMore}
            className="border-brand-500 text-brand-600 hover:bg-brand-50"
          >
            Load More Listings
          </Button>
        </div>
      )}
    </section>
  );
};

export default FeaturedListings;
