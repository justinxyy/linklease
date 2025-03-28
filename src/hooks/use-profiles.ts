
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  // Fetch profile by ID
  const useProfileById = (id: string | undefined) => {
    return useQuery({
      queryKey: ["profiles", id],
      queryFn: async () => {
        if (!id) return null;
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Profile | null;
      },
      enabled: !!id,
    });
  };

  // Fetch current user profile
  const useCurrentProfile = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["profiles", "current", userId],
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
        
        return data as unknown as Profile | null;
      },
      enabled: !!userId,
    });
  };

  // Update profile
  const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async ({ id, ...profile }: UpdateProfileData & { id: string }) => {
        const { data, error } = await supabase
          .from("profiles")
          .update(profile)
          .eq("id", id)
          .select()
          .single();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Profile;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["profiles"] });
        queryClient.invalidateQueries({ queryKey: ["profiles", data.id] });
      },
    });
  };

  return {
    useProfileById,
    useCurrentProfile,
    useUpdateProfile,
  };
};
