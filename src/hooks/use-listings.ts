
import { useState } from "react";
import { useFetchListings, Listing } from "./use-fetch-listings";
import { useCreateListing, CreateListingData } from "./use-create-listing";
import { useUpdateListing } from "./use-update-listing";
import { useDeleteListing } from "./use-delete-listing";

export type { Listing, CreateListingData };

export const useListings = () => {
  const [error, setError] = useState<string | null>(null);
  
  // Reexport all the hooks
  const { useAllListings, useListingById, useUserListings } = useFetchListings();
  
  // Create a hook to get all of them
  return {
    useAllListings,
    useListingById,
    useUserListings,
    useCreateListing,
    useUpdateListing,
    useDeleteListing,
    error,
  };
};
