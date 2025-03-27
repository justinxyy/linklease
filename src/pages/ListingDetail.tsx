
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Home, 
  Heart, 
  Share, 
  Star, 
  BedDouble, 
  Bath, 
  Wifi, 
  Tv, 
  UtensilsCrossed,
  Warehouse,
  MessageSquare,
  User,
  Shield,
  CheckCircle2
} from "lucide-react";

// Mock listing data
const mockListing = {
  id: "1",
  title: "Modern Studio Apartment near UC Berkeley",
  location: "Berkeley, CA",
  nearestCampus: "UC Berkeley",
  distanceToCampus: "0.3 miles",
  price: 1200,
  rating: 4.9,
  reviewCount: 42,
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  ],
  startDate: "2023-06-01",
  endDate: "2023-08-15",
  propertyType: "Studio",
  bedrooms: 1,
  bathrooms: 1,
  maxOccupancy: 2,
  squareFeet: 450,
  description: "This modern studio apartment is perfectly located just a 5-minute walk from UC Berkeley campus. Recently renovated with high-end finishes, it features a fully equipped kitchen, comfortable queen bed, and a dedicated workspace. The building includes laundry facilities, a small fitness room, and secure entry. Ideal for summer interns or visiting scholars.",
  amenities: [
    "Fully furnished",
    "High-speed WiFi",
    "TV with streaming services",
    "Full kitchen",
    "In-building laundry",
    "Air conditioning",
    "Heating",
    "Workspace/desk",
    "Parking available",
    "Pet-friendly",
  ],
  host: {
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    joinedDate: "2021-03",
    isVerified: true,
    responseRate: 98,
    responseTime: "within a few hours",
    campus: "UC Berkeley",
    major: "Computer Science",
    bio: "Hi! I'm a graduate student at UC Berkeley studying Computer Science. I'm subletting my apartment while I'm away for a summer internship. I've lived in this apartment for 2 years and love the neighborhood. Feel free to ask me any questions about the place or the area!"
  },
  reviews: [
    {
      id: 1,
      user: {
        name: "Sarah M.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      rating: 5,
      date: "2023-01-15",
      comment: "Alex's place was perfect for my semester at Berkeley. Great location, clean, and exactly as described. Alex was very responsive and helpful throughout my stay."
    },
    {
      id: 2,
      user: {
        name: "James L.",
        image: "https://randomuser.me/api/portraits/men/86.jpg",
      },
      rating: 5,
      date: "2022-08-22",
      comment: "I stayed here during my summer internship and it was exactly what I needed. The apartment is walking distance to campus and downtown Berkeley. Would definitely recommend!"
    },
    {
      id: 3,
      user: {
        name: "Emma R.",
        image: "https://randomuser.me/api/portraits/women/64.jpg",
      },
      rating: 4,
      date: "2022-05-10",
      comment: "Great location and comfortable space. The kitchen was well-equipped and I appreciated having a desk for work. The only small issue was some street noise, but overall a great experience."
    },
  ],
  houseRules: [
    "No smoking",
    "No parties or events",
    "Quiet hours after 10PM",
    "Check-in: After 3PM",
    "Check-out: Before 11AM",
  ],
  cancellationPolicy: "Flexible - Free cancellation up to 7 days before check-in. After that, 50% refund up to 24 hours before check-in."
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
  useEffect(() => {
    // Simulate content loading
    setIsLoaded(true);
    // In a real app, fetch listing data based on ID
    console.log(`Fetching listing with ID: ${id}`);
  }, [id]);
  
  if (!mockListing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Listing not found</p>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="section-container">
          {/* Listing Title and Actions */}
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">{mockListing.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-brand-500 mr-1" />
                    <span>{mockListing.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{mockListing.rating} ({mockListing.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-brand-500 mr-1" />
                    <span>{formatDate(mockListing.startDate)} - {formatDate(mockListing.endDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
                  {isFavorited ? "Saved" : "Save"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl overflow-hidden">
              <AspectRatio ratio={4/3}>
                <img 
                  src={mockListing.images[activeImageIndex]} 
                  alt={mockListing.title} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {mockListing.images.slice(0, 4).map((image, index) => (
                index !== activeImageIndex && (
                  <div 
                    key={index} 
                    className="rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={image} 
                        alt={`${mockListing.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </AspectRatio>
                  </div>
                )
              ))}
            </div>
          </div>
          
          {/* Main Content and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8 pb-8 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium mb-2">
                      {mockListing.propertyType} hosted by {mockListing.host.name}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Up to {mockListing.maxOccupancy} guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4 text-muted-foreground" />
                        <span>{mockListing.bedrooms} bedroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span>{mockListing.bathrooms} bathroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Warehouse className="h-4 w-4 text-muted-foreground" />
                        <span>{mockListing.squareFeet} sq ft</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={mockListing.host.image} 
                      alt={mockListing.host.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tabs for Description, Amenities, Reviews, etc. */}
              <Tabs defaultValue="description" className="mb-12">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="host">Host</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About this space</h3>
                    <p className="text-muted-foreground">{mockListing.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">University Information</h3>
                    <p className="text-muted-foreground">
                      This listing is located {mockListing.distanceToCampus} from {mockListing.nearestCampus}, making it ideal for students and visiting faculty.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">House Rules</h3>
                    <ul className="space-y-2">
                      {mockListing.houseRules.map((rule, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-brand-500" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Cancellation Policy</h3>
                    <p className="text-muted-foreground">{mockListing.cancellationPolicy}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="space-y-6">
                  <h3 className="text-lg font-medium mb-2">Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockListing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-md bg-gray-50">
                        {index === 0 && <Home className="h-5 w-5 text-brand-500" />}
                        {index === 1 && <Wifi className="h-5 w-5 text-brand-500" />}
                        {index === 2 && <Tv className="h-5 w-5 text-brand-500" />}
                        {index === 3 && <UtensilsCrossed className="h-5 w-5 text-brand-500" />}
                        {index > 3 && <CheckCircle2 className="h-5 w-5 text-brand-500" />}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{mockListing.rating} · {mockListing.reviewCount} reviews</span>
                  </div>
                  
                  <div className="space-y-6">
                    {mockListing.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src={review.user.image} 
                              alt={review.user.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{review.user.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3.5 w-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span>·</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="host" className="space-y-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={mockListing.host.image} 
                        alt={mockListing.host.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        {mockListing.host.name}
                        {mockListing.host.isVerified && (
                          <Shield className="h-4 w-4 text-brand-500" />
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm">Joined in {mockListing.host.joinedDate}</p>
                      <p className="text-sm mt-1">
                        {mockListing.host.campus} · {mockListing.host.major}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-brand-500 mr-1" />
                          <span>{mockListing.host.responseRate}% response rate</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-brand-500 mr-1" />
                          <span>Responds {mockListing.host.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{mockListing.host.bio}</p>
                  
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      className="border-brand-500 text-brand-600 hover:bg-brand-50"
                    >
                      Contact Host
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Location */}
              <div className="mb-12">
                <h3 className="text-lg font-medium mb-4">Location</h3>
                <div className="h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Map view of {mockListing.location}</p>
                    <p className="text-sm">(Map integration would go here)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border shadow-sm p-6">
                <div className="mb-4 pb-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-medium">${mockListing.price}</span>
                      <span className="text-muted-foreground"> / month</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{mockListing.rating}</span>
                      <span className="text-muted-foreground">({mockListing.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Dates</label>
                      <div className="flex items-center gap-2 p-2 border rounded-md">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(mockListing.startDate)} - {formatDate(mockListing.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Guests</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="1">1 guest</option>
                        <option value="2">2 guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-brand-500 hover:bg-brand-600 btn-transition">
                    Message Host
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${mockListing.price} x 3 months</span>
                    <span>${mockListing.price * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security deposit</span>
                    <span>${mockListing.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${Math.round(mockListing.price * 0.1)}</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between font-medium">
                    <span>Total</span>
                    <span>${mockListing.price * 3 + mockListing.price + Math.round(mockListing.price * 0.1)}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-brand-50 rounded-lg">
                  <div className="flex gap-2">
                    <Shield className="h-6 w-6 text-brand-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">LinkLease Guarantee</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        All listings and hosts are verified. If anything is not as described, we'll help you find a solution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListingDetail;
