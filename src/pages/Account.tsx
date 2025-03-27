
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, LogOut, Mail, Settings, User, Bell, CreditCard, Home, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Account = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // If user is not logged in, redirect to auth page
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md px-4">
            <h1 className="text-3xl font-medium">Account Access</h1>
            <p className="text-muted-foreground">
              You need to be logged in to access your account settings and manage your listings.
            </p>
            <Button asChild className="bg-brand-500 hover:bg-brand-600">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-card rounded-xl border p-6 sticky top-24">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{user.email?.split('@')[0] || 'User'}</h3>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>
                
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  orientation="vertical" 
                  className="space-y-1"
                >
                  <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                    <TabsTrigger 
                      value="profile" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="listings" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      My Listings
                    </TabsTrigger>
                    <TabsTrigger 
                      value="saved" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Saved
                    </TabsTrigger>
                    <TabsTrigger 
                      value="messages" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Messages
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="billing" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="mt-6 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full justify-start text-muted-foreground"
                    onClick={signOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-grow">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="profile" className="mt-0">
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-2xl font-medium mb-6">Profile Information</h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" type="email" defaultValue={user.email || ''} />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="university" className="text-sm font-medium">
                          University / College
                        </label>
                        <Input id="university" defaultValue="Stanford University" />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="bio" className="text-sm font-medium">
                          Bio
                        </label>
                        <Textarea 
                          id="bio" 
                          rows={4}
                          defaultValue="Computer Science student at Stanford University. Looking for short-term housing for my summer internship in NYC."
                        />
                        <p className="text-sm text-muted-foreground">
                          Brief description for your profile.
                        </p>
                      </div>
                      
                      <div className="pt-4">
                        <Button className="bg-brand-500 hover:bg-brand-600">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="listings" className="mt-0">
                  <div className="bg-card rounded-xl border p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <h2 className="text-2xl font-medium">My Listings</h2>
                      <Button className="bg-brand-500 hover:bg-brand-600">
                        <Home className="h-4 w-4 mr-2" />
                        Add New Listing
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Empty state */}
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Home className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No listings yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                          You haven't created any listings yet. Start by adding your first property.
                        </p>
                        <Button className="bg-brand-500 hover:bg-brand-600">
                          Create Your First Listing
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="saved" className="mt-0">
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-2xl font-medium mb-6">Saved Listings</h2>
                    
                    <div className="space-y-6">
                      {/* Sample saved listing */}
                      <div className="border rounded-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-48 bg-muted relative shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                            alt="Apartment" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-lg">Modern Studio near UC Berkeley</h3>
                            <p className="font-medium">$1,200/mo</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Berkeley, CA</p>
                          <p className="text-sm mb-4">Available May 15 - Aug 30, 2023</p>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* End of saved listings */}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-2xl font-medium mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive email updates about your account activity
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">SMS Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive text message updates about your account activity
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Marketing Emails</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new features and special offers
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="pt-4 border-t mt-6">
                        <h3 className="font-medium mb-4">Danger Zone</h3>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
