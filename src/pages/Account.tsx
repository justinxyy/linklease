
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Settings,
  CreditCard,
  BellRing,
  ListChecks,
  Heart,
  Shield,
  Upload,
  Mail,
  Lock,
  LogOut,
  Share2,
  Star,
  Edit,
  Trash
} from "lucide-react";

const Account = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@berkeley.edu",
    phone: "510-555-1234",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    university: "UC Berkeley",
    major: "Computer Science",
    graduationYear: "2025",
    bio: "Graduate student at UC Berkeley studying Computer Science. Looking for temporary housing for my summer internship in San Francisco.",
    joinedDate: "March 2023",
    isVerified: true
  };
  
  // Mock listings data
  const mockListings = [
    {
      id: "l1",
      title: "Modern Studio Apartment near UC Berkeley",
      status: "active",
      startDate: "2023-06-01",
      endDate: "2023-08-15",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      views: 124,
      inquiries: 8
    }
  ];
  
  // Mock bookings data
  const mockBookings = [
    {
      id: "b1",
      title: "Cozy Room in Shared Apartment",
      location: "Palo Alto, CA",
      host: "Sarah M.",
      status: "upcoming",
      startDate: "2023-05-15",
      endDate: "2023-08-30",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    }
  ];
  
  // Mock saved listings
  const mockSaved = [
    {
      id: "s1",
      title: "Luxury 1BR with Campus View",
      location: "Ann Arbor, MI",
      price: 1350,
      startDate: "2023-06-01",
      endDate: "2023-07-31",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: "s2",
      title: "Private Room in Townhouse",
      location: "Cambridge, MA",
      price: 1100,
      startDate: "2023-06-15",
      endDate: "2023-08-20",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    }
  ];
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-medium">My Account</h1>
            <Button variant="outline" className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-muted overflow-x-auto space-x-2 p-1 flex-nowrap w-fit">
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="listings" className="flex items-center gap-1">
                <ListChecks className="h-4 w-4" />
                <span>My Listings</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                <span>My Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-brand-500 text-white p-1.5 rounded-full">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>
                        {user.university} · {user.major}
                      </CardDescription>
                      <div className="flex justify-center mt-2">
                        {user.isVerified && (
                          <div className="flex items-center gap-1 text-sm text-brand-500">
                            <Shield className="h-4 w-4" />
                            <span>Verified Student</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground text-center">
                        <p>Member since {user.joinedDate}</p>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <Button className="w-full bg-brand-500 hover:bg-brand-600">
                          Edit Profile
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Public Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={user.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue={user.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="university">University</Label>
                          <Input id="university" defaultValue={user.university} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="major">Major</Label>
                          <Input id="major" defaultValue={user.major} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graduation">Graduation Year</Label>
                          <Input id="graduation" defaultValue={user.graduationYear} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          defaultValue={user.bio}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button className="bg-brand-500 hover:bg-brand-600">
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification</CardTitle>
                      <CardDescription>
                        Verify your identity to build trust with other users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Email Verification</h4>
                              <p className="text-sm text-muted-foreground">Your university email has been verified</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-green-600 font-medium">
                            <Shield className="h-4 w-4" />
                            <span>Verified</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">ID Verification</h4>
                              <p className="text-sm text-muted-foreground">Verify your identity with a government-issued ID</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Verify</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Listings Tab */}
            <TabsContent value="listings" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">My Listings</h2>
                  <Button className="bg-brand-500 hover:bg-brand-600">
                    Create New Listing
                  </Button>
                </div>
                
                {mockListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockListings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img 
                            src={listing.image} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            {listing.status === "active" ? "Active" : "Inactive"}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Available: {new Date(listing.startDate).toLocaleDateString()} - {new Date(listing.endDate).toLocaleDateString()}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm mb-4">
                            <div>
                              <span className="font-medium">{listing.views}</span> views
                            </div>
                            <div>
                              <span className="font-medium">{listing.inquiries}</span> inquiries
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                            <Button variant="outline" size="sm" className="flex-1">Preview</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <ListChecks className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Listings Yet</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        You haven't created any listings yet. List your property to connect with verified students looking for housing.
                      </p>
                      <Button className="bg-brand-500 hover:bg-brand-600">
                        Create Your First Listing
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">My Bookings</h2>
                  <Button variant="outline">
                    View Booking History
                  </Button>
                </div>
                
                {mockBookings.length > 0 ? (
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <Card key={booking.id}>
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 h-48 md:h-auto">
                            <img 
                              src={booking.image} 
                              alt={booking.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-6 flex-grow">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-medium mb-1">{booking.title}</h3>
                                <p className="text-muted-foreground">{booking.location}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-sm">Host: {booking.host}</span>
                                </div>
                                
                                <div className="mt-4 space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-brand-500" />
                                    <span>
                                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full inline-block">
                                  {booking.status === "upcoming" ? "Upcoming" : "Active"}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                                    Message Host
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Bookings Yet</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        You haven't booked any properties yet. Browse listings to find your perfect temporary home.
                      </p>
                      <Button className="bg-brand-500 hover:bg-brand-600">
                        Browse Listings
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            {/* Saved Tab */}
            <TabsContent value="saved" className="animate-fade-in">
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Saved Listings</h2>
                
                {mockSaved.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockSaved.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img 
                            src={listing.image} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                          <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-rose-500">
                            <Heart className="h-4 w-4" fill="currentColor" />
                          </button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {listing.location}
                          </p>
                          <p className="text-brand-600 font-medium mb-3">
                            ${listing.price}/month
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Available: {new Date(listing.startDate).toLocaleDateString()} - {new Date(listing.endDate).toLocaleDateString()}
                          </p>
                          
                          <Button className="w-full bg-brand-500 hover:bg-brand-600 text-sm">
                            View Listing
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Saved Listings</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        You haven't saved any listings yet. Save listings to keep track of properties you're interested in.
                      </p>
                      <Button className="bg-brand-500 hover:bg-brand-600">
                        Browse Listings
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account settings and preferences
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-brand-500" />
                        <CardTitle>Password & Security</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="bg-brand-500 hover:bg-brand-600 mt-2">
                        Update Password
                      </Button>
                      
                      <div className="pt-4 border-t mt-4">
                        <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p>Increase your account security with 2FA</p>
                            <p className="text-sm text-muted-foreground">
                              Require a verification code when logging in
                            </p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BellRing className="h-5 w-5 text-brand-500" />
                        <CardTitle>Notifications</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when you get new messages
                          </p>
                        </div>
                        <Switch id="messages-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Updates about your bookings and reservations
                          </p>
                        </div>
                        <Switch id="booking-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Listing Inquiries</p>
                          <p className="text-sm text-muted-foreground">
                            Notifications about inquiries on your listings
                          </p>
                        </div>
                        <Switch id="inquiry-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing</p>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features and promotions
                          </p>
                        </div>
                        <Switch id="marketing-notifications" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-brand-500" />
                        <CardTitle>Connected Accounts</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#4267B2] rounded-full flex items-center justify-center text-white">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Facebook</p>
                            <p className="text-sm text-muted-foreground">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white">
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.93 3.93 0 0 1-1.1.17 4.9 4.9 0 0 1-.77-.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a7.93 7.93 0 0 1-1-.06 11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Twitter</p>
                            <p className="text-sm text-muted-foreground">
                              Connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center text-white">
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">LinkedIn</p>
                            <p className="text-sm text-muted-foreground">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-brand-500" />
                        <CardTitle>Payment Methods</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-brand-500" />
                        <CardTitle>Reviews</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="font-medium">No reviews yet</p>
                        <p className="text-sm text-muted-foreground">
                          Reviews will appear here after your stay
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-200">
                    <CardHeader className="text-red-600">
                      <div className="flex items-center gap-2">
                        <Trash className="h-5 w-5" />
                        <CardTitle>Danger Zone</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Deactivate Account</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Temporarily disable your account
                          </p>
                          <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                            Deactivate
                          </Button>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-1">Delete Account</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Permanently delete your account and all data
                          </p>
                          <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
