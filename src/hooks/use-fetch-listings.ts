
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Listing {
  id: number;
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
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  max_occupancy: number | null;
  square_feet: number | null;
  furnished: boolean | null;
  amenities: string[] | null;
  house_rules: string | null;
  start_date: string | null;
  end_date: string | null;
  nearest_campus: string | null;
  campus_distance: number | null;
}

export const useFetchListings = () => {
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
          .eq("id", parseInt(id, 10))
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

  return {
    useAllListings,
    useListingById,
    useUserListings
  };
};
