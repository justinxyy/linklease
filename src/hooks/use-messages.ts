
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string | null;
  content: string;
  read: boolean;
  created_at: string;
}

interface SendMessageData {
  receiver_id: string;
  listing_id?: string;
  content: string;
}

export const useMessages = () => {
  // Fetch all messages for current user
  const useAllMessages = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["messages", userId],
      queryFn: async () => {
        if (!userId) return [];
        
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order("created_at", { ascending: false });
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Message[];
      },
      enabled: !!userId,
    });
  };

  // Fetch conversation between two users
  const useConversation = (userId: string | undefined, otherUserId: string | undefined) => {
    return useQuery({
      queryKey: ["messages", "conversation", userId, otherUserId],
      queryFn: async () => {
        if (!userId || !otherUserId) return [];
        
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(
            `and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),` +
            `and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`
          )
          .order("created_at");
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Message[];
      },
      enabled: !!userId && !!otherUserId,
    });
  };

  // Send a new message
  const useSendMessage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async ({ receiver_id, listing_id, content }: SendMessageData) => {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session?.user.id) {
          throw new Error("You must be signed in to send messages");
        }
        
        const newMessage = {
          sender_id: session.session.user.id,
          receiver_id,
          listing_id,
          content,
          read: false
        };
        
        const { data, error } = await supabase
          .from("messages")
          .insert(newMessage)
          .select()
          .single();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Message;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      },
    });
  };

  // Mark message as read
  const useMarkAsRead = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (messageId: string) => {
        const { data, error } = await supabase
          .from("messages")
          .update({ read: true })
          .eq("id", messageId)
          .select()
          .single();
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as unknown as Message;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      },
    });
  };

  return {
    useAllMessages,
    useConversation,
    useSendMessage,
    useMarkAsRead,
  };
};
