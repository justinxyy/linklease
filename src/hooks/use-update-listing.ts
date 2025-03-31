
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Listing } from "./use-fetch-listings";
import { CreateListingData } from "./use-create-listing";

export const useUpdateListing = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...listing }: CreateListingData & { id: number | string }) => {
      // Ensure the user owns this listing
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to update a listing");
      }
      
      // Convert id to number if it's a string
      const listingId = typeof id === 'string' ? parseInt(id, 10) : id;
      
      // Get the current listing to verify ownership
      const { data: currentListing, error: fetchError } = await supabase
        .from("listings")
        .select("user_id")
        .eq("id", listingId)
        .single();
      
      if (fetchError) {
        setError(fetchError.message);
        throw new Error(fetchError.message);
      }
      
      if (currentListing.user_id !== user.id) {
        throw new Error("You can only update your own listings");
      }
      
      const { data, error } = await supabase
        .from("listings")
        .update(listing)
        .eq("id", listingId)
        .select()
        .single();
      
      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }
      
      return data as unknown as Listing;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["listings", data.id] });
      setError(null);
    },
  });
};
