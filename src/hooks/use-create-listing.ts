
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Listing } from "./use-fetch-listings";

export interface CreateListingData {
  title: string;
  description?: string;
  price: number;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  images?: string[] | null;
  property_type?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  max_occupancy?: number | null;
  square_feet?: number | null;
  furnished?: boolean | null;
  amenities?: string[] | null;
  house_rules?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  nearest_campus?: string | null;
  campus_distance?: number | null;
}

export const useCreateListing = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: CreateListingData) => {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to create a listing");
      }
      
      const newListing = {
        ...listing,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from("listings")
        .insert(newListing)
        .select()
        .single();
      
      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }
      
      return data as unknown as Listing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      setError(null);
    },
  });
};
