
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  latitude: number | null;
  longitude: number | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CreateListingData {
  title: string;
  description?: string;
  price: number;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  images?: string[] | null;
}

export const useListings = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch all listings
  const useAllListings = () => {
    return useQuery({
      queryKey: ["listings"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Listing[];
      },
    });
  };

  // Fetch a single listing by ID
  const useListingById = (id: string | undefined) => {
    return useQuery({
      queryKey: ["listings", id],
      queryFn: async () => {
        if (!id) return null;
        
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Listing | null;
      },
      enabled: !!id,
    });
  };

  // Fetch listings by user ID
  const useUserListings = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["listings", "user", userId],
      queryFn: async () => {
        if (!userId) return [];
        
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Listing[];
      },
      enabled: !!userId,
    });
  };

  // Create a new listing
  const useCreateListing = () => {
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

  // Update an existing listing
  const useUpdateListing = () => {
    return useMutation({
      mutationFn: async ({ id, ...listing }: CreateListingData & { id: string }) => {
        // Ensure the user owns this listing
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("You must be logged in to update a listing");
        }
        
        // Get the current listing to verify ownership
        const { data: currentListing, error: fetchError } = await supabase
          .from("listings")
          .select("user_id")
          .eq("id", id)
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
          .eq("id", id)
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

  // Delete a listing
  const useDeleteListing = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        // Ensure the user owns this listing
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("You must be logged in to delete a listing");
        }
        
        // Get the current listing to verify ownership
        const { data: currentListing, error: fetchError } = await supabase
          .from("listings")
          .select("user_id")
          .eq("id", id)
          .single();
        
        if (fetchError) {
          setError(fetchError.message);
          throw new Error(fetchError.message);
        }
        
        if (currentListing.user_id !== user.id) {
          throw new Error("You can only delete your own listings");
        }
        
        const { error } = await supabase
          .from("listings")
          .delete()
          .eq("id", id);
        
        if (error) {
          setError(error.message);
          throw new Error(error.message);
        }
        
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listings"] });
        setError(null);
      },
    });
  };

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
