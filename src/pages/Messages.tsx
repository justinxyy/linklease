import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Phone, Video, Image, Paperclip, MoreHorizontal, ArrowLeft, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alex Johnson",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      lastActive: "2 min ago"
    },
    lastMessage: {
      text: "That sounds great! When would you like to schedule a viewing?",
      timestamp: "12:45 PM",
      read: true,
      isMe: false
    },
    listing: {
      id: "l1",
      title: "Modern Studio Apartment"
    },
    unreadCount: 0
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Sarah Miller",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      lastActive: "5 min ago"
    },
    lastMessage: {
      text: "I'm interested in your apartment near Stanford. Is it still available for the summer?",
      timestamp: "10:32 AM",
      read: false,
      isMe: false
    },
    listing: {
      id: "l2",
      title: "Quiet Room near Stanford"
    },
    unreadCount: 2
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Michael Thomas",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      lastActive: "1 hour ago"
    },
    lastMessage: {
      text: "Let me know if Tuesday works for you to see the apartment.",
      timestamp: "Yesterday",
      read: true,
      isMe: true
    },
    listing: {
      id: "l3",
      title: "Private Room in Townhouse"
    },
    unreadCount: 0
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Jessica Rodriguez",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      lastActive: "3 hours ago"
    },
    lastMessage: {
      text: "Thanks for the additional photos! It looks perfect for what I need.",
      timestamp: "Yesterday",
      read: true,
      isMe: false
    },
    listing: {
      id: "l4",
      title: "Stylish Studio Apartment"
    },
    unreadCount: 0
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "David Chen",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      lastActive: "2 days ago"
    },
    lastMessage: {
      text: "I've sent you the lease agreement. Let me know if you have any questions!",
      timestamp: "2 days ago",
      read: true,
      isMe: true
    },
    listing: {
      id: "l5",
      title: "Cozy Room in Shared Apartment"
    },
    unreadCount: 0
  }
];

// Mock data for selected conversation messages
const mockMessages = [
  {
    id: "m1",
    senderId: "u1",
    text: "Hi there! I'm interested in your listing for the Modern Studio Apartment. Is it still available for the summer?",
    timestamp: "10:30 AM",
    read: true
  },
  {
    id: "m2",
    senderId: "me",
    text: "Hello! Yes, it's still available from June 1st to August 15th. Were those the dates you're looking for?",
    timestamp: "10:35 AM",
    read: true
  },
  {
    id: "m3",
    senderId: "u1",
    text: "Perfect! That's exactly when I need it. I'll be interning in the area and need a place close to downtown.",
    timestamp: "10:40 AM",
    read: true
  },
  {
    id: "m4",
    senderId: "me",
    text: "Great! This apartment is just a 10-minute walk from downtown and has easy access to public transportation. Would you like to know more about the amenities?",
    timestamp: "10:42 AM",
    read: true
  },
  {
    id: "m5",
    senderId: "u1",
    text: "Yes, please! I'm particularly interested in knowing if there's high-speed internet and laundry facilities.",
    timestamp: "10:45 AM",
    read: true
  },
  {
    id: "m6",
    senderId: "me",
    text: "Absolutely! The apartment has fiber internet (300Mbps) and there are laundry facilities in the building. The unit is also fully furnished with a queen bed, desk, and kitchenette.",
    timestamp: "10:50 AM",
    read: true
  },
  {
    id: "m7",
    senderId: "u1",
    text: "That sounds great! When would you be available for a virtual tour? I'd love to see the place before making a decision.",
    timestamp: "12:45 PM",
    read: true
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileViewingConversation, setIsMobileViewingConversation] = useState(false);
  
  // Handle mobile view for messages
  useEffect(() => {
    if (selectedConversation && window.innerWidth < 768) {
      setIsMobileViewingConversation(true);
    } else {
      setIsMobileViewingConversation(false);
    }
    
    const handleResize = () => {
      if (selectedConversation && window.innerWidth < 768) {
        setIsMobileViewingConversation(true);
      } else {
        setIsMobileViewingConversation(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedConversation]);
  
  const filteredConversations = searchQuery
    ? mockConversations.filter(
        conv => 
          conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.listing.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockConversations;
  
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    // Mark messages as read in a real app
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message logic would go here
      console.log("Sending message:", message);
      setMessage("");
    }
  };
  
  const getActiveConversation = () => {
    return mockConversations.find(conv => conv.id === selectedConversation);
  };
  
  const formatTimestamp = (timestamp: string) => {
    // Simple formatting - in a real app, this would be more sophisticated
    return timestamp;
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="section-container h-[calc(100vh-12rem)] flex flex-col">
          <h1 className="text-3xl font-medium mb-6">Messages</h1>
          
          <div className="flex flex-col flex-grow border rounded-xl overflow-hidden">
            <div className="flex h-full">
              {/* Conversations sidebar - hide on mobile when viewing a conversation */}
              <div className={cn(
                "w-full md:w-1/3 border-r bg-card flex flex-col",
                isMobileViewingConversation ? "hidden" : "flex"
              )}>
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-grow overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    <ul className="divide-y">
                      {filteredConversations.map((conversation) => (
                        <li 
                          key={conversation.id}
                          className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedConversation === conversation.id ? "bg-brand-50" : ""
                          }`}
                          onClick={() => handleSelectConversation(conversation.id)}
                        >
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className="relative mr-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                  <img 
                                    src={conversation.user.image} 
                                    alt={conversation.user.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {conversation.unreadCount > 0 && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white rounded-full text-xs flex items-center justify-center">
                                    {conversation.unreadCount}
                                  </div>
                                )}
                              </div>
                              <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium truncate">{conversation.user.name}</h3>
                                  <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                                    {conversation.lastMessage.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1 truncate">
                                  {conversation.lastMessage.isMe && "You: "}
                                  {conversation.lastMessage.text}
                                </p>
                                <p className="text-xs text-brand-500 truncate">
                                  {conversation.listing.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <p className="text-muted-foreground mb-2">No conversations found</p>
                      {searchQuery && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Message content */}
              <div className={cn(
                "w-full md:w-2/3 flex flex-col bg-background",
                isMobileViewingConversation || selectedConversation ? "flex" : "hidden md:flex"
              )}>
                {selectedConversation ? (
                  <>
                    {/* Chat header */}
                    <div className="p-4 border-b flex items-center">
                      {isMobileViewingConversation && (
                        <button 
                          className="mr-2 p-1 rounded-full hover:bg-gray-100"
                          onClick={() => setSelectedConversation(null)}
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </button>
                      )}
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={getActiveConversation()?.user.image} 
                          alt={getActiveConversation()?.user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{getActiveConversation()?.user.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {getActiveConversation()?.user.lastActive}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <Video className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Chat messages */}
                    <div className="flex-grow overflow-y-auto p-4">
                      <div className="space-y-4">
                        {mockMessages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                          >
                            <div className="flex items-end max-w-[80%]">
                              {msg.senderId !== "me" && (
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                                  <img 
                                    src={getActiveConversation()?.user.image} 
                                    alt={getActiveConversation()?.user.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <div 
                                  className={`rounded-2xl px-4 py-2 ${
                                    msg.senderId === "me" 
                                      ? "bg-brand-500 text-white" 
                                      : "bg-gray-100"
                                  }`}
                                >
                                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(msg.timestamp)}
                                  </span>
                                  {msg.senderId === "me" && msg.read && (
                                    <span className="text-xs text-brand-500 ml-2">Read</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Chat input */}
                    <div className="p-4 border-t">
                      <div className="flex items-center">
                        <div className="flex space-x-1 mr-2">
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <Image className="h-5 w-5 text-muted-foreground" />
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                          </button>
                        </div>
                        <Input
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          className="flex-grow"
                        />
                        <Button 
                          size="icon"
                          className="ml-2 bg-brand-500 hover:bg-brand-600"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                    <p className="text-muted-foreground max-w-md">
                      Select a conversation to view messages or browse listings to connect with subleasers.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
