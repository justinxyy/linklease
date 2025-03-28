
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  profile_image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface UpdateProfileData {
  full_name?: string;
  profile_image_url?: string;
}

export const useProfiles = () => {
  const [error, setError] = useState<string | null>(null);

  // Fetch the current user's profile
  const useCurrentProfile = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["profile", userId],
      queryFn: async () => {
        if (!userId) return null;
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as Profile | null;
      },
      enabled: !!userId,
    });
  };

  // Fetch a profile by ID
  const useProfileById = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["profile", userId],
      queryFn: async () => {
        if (!userId) return null;
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as Profile | null;
      },
      enabled: !!userId,
    });
  };

  // Update the current user's profile
  const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (profileData: UpdateProfileData) => {
        const userId = (await supabase.auth.getUser()).data.user?.id;
        
        if (!userId) {
          throw new Error("User is not authenticated");
        }
        
        const { data, error } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", userId)
          .select()
          .single();
        
        if (error) {
          setError(error.message);
          throw new Error(error.message);
        }
        
        return data as Profile;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["profile", data.id] });
        setError(null);
      },
    });
  };

  return {
    useCurrentProfile,
    useProfileById,
    useUpdateProfile,
    error,
  };
};
