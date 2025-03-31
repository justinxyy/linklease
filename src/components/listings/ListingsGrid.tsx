
import React from "react";
import ListingCard from "@/components/ListingCard";

interface UIListing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  startDate?: string;
  endDate?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  latitude: number | null;
  longitude: number | null;
  images?: string[] | null;
}

interface ListingsGridProps {
  listings: UIListing[];
  isLoading: boolean;
}

const ListingsGrid = ({ listings, isLoading }: ListingsGridProps) => {
  if (isLoading) {
    return (
      <div className="col-span-full text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Loading listings...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-lg text-muted-foreground">No listings found</p>
        <p className="mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          location={listing.location}
          price={listing.price}
          rating={listing.rating || 0}
          reviewCount={listing.reviewCount || 0}
          imageUrl={listing.imageUrl || "/placeholder.svg"}
          startDate={listing.startDate || ""}
          endDate={listing.endDate || ""}
        />
      ))}
    </div>
  );
};

export default ListingsGrid;
