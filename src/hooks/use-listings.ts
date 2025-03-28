
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface Listing {
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

interface CreateListingData {
  title: string;
  description?: string;
  price: number;
  location: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
}

export const useListings = () => {
  const [error, setError] = useState<string | null>(null);

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
        
        return data as Listing[];
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
        
        return data as Listing | null;
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
        
        return data as Listing[];
      },
      enabled: !!userId,
    });
  };

  // Create a new listing
  const useCreateListing = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (listing: CreateListingData) => {
        const { data, error } = await supabase
          .from("listings")
          .insert(listing)
          .select()
          .single();
        
        if (error) {
          setError(error.message);
          throw new Error(error.message);
        }
        
        return data as Listing;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listings"] });
        setError(null);
      },
    });
  };

  // Update an existing listing
  const useUpdateListing = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async ({ id, ...listing }: CreateListingData & { id: string }) => {
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
        
        return data as Listing;
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
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (id: string) => {
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
