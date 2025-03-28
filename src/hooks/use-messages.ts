
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations (grouped by other user)
  const useConversations = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["conversations", userId],
      queryFn: async () => {
        if (!userId) return [];
        
        // Get all messages where the user is either sender or receiver
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order("created_at", { ascending: false });
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Group messages by conversation partner
        const conversations = (data as Message[]).reduce((acc, message) => {
          // Determine the other user in the conversation
          const otherUserId = message.sender_id === userId 
            ? message.receiver_id 
            : message.sender_id;
          
          // Create a key for this conversation
          const conversationKey = otherUserId;
          
          if (!acc[conversationKey]) {
            acc[conversationKey] = {
              otherUserId,
              lastMessage: message,
              unreadCount: message.receiver_id === userId && !message.read ? 1 : 0,
            };
          } else {
            // If this message is newer than the current last message, update it
            if (new Date(message.created_at) > new Date(acc[conversationKey].lastMessage.created_at)) {
              acc[conversationKey].lastMessage = message;
            }
            
            // Count unread messages
            if (message.receiver_id === userId && !message.read) {
              acc[conversationKey].unreadCount += 1;
            }
          }
          
          return acc;
        }, {} as Record<string, any>);
        
        return Object.values(conversations);
      },
      enabled: !!userId,
    });
  };

  // Fetch messages between two users
  const useConversation = (userId: string | undefined, otherUserId: string | undefined) => {
    return useQuery({
      queryKey: ["messages", userId, otherUserId],
      queryFn: async () => {
        if (!userId || !otherUserId) return [];
        
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(
            `and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`
          )
          .order("created_at", { ascending: true });
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data as Message[];
      },
      enabled: !!userId && !!otherUserId,
    });
  };

  // Send a message
  const useSendMessage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (messageData: SendMessageData) => {
        const { data, error } = await supabase
          .from("messages")
          .insert({
            ...messageData,
            sender_id: (await supabase.auth.getUser()).data.user?.id,
          })
          .select()
          .single();
        
        if (error) {
          setError(error.message);
          throw new Error(error.message);
        }
        
        return data as Message;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({ 
          queryKey: ["messages", data.sender_id, data.receiver_id] 
        });
        setError(null);
      },
    });
  };

  // Mark messages as read
  const useMarkAsRead = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async ({ senderId, receiverId }: { senderId: string, receiverId: string }) => {
        const { error } = await supabase
          .from("messages")
          .update({ read: true })
          .eq("sender_id", senderId)
          .eq("receiver_id", receiverId)
          .eq("read", false);
        
        if (error) {
          setError(error.message);
          throw new Error(error.message);
        }
        
        return { senderId, receiverId };
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({ 
          queryKey: ["messages", data.receiverId, data.senderId] 
        });
        setError(null);
      },
    });
  };

  return {
    useConversations,
    useConversation,
    useSendMessage,
    useMarkAsRead,
    error,
  };
};
