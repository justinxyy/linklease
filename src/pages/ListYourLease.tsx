
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Check, 
  Calendar, 
  DollarSign, 
  Image as ImageIcon, 
  Upload,
  MapPin,
  Info,
  ArrowRight
} from "lucide-react";

const ListYourLease = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);
  const [amenities, setAmenities] = useState<string[]>([
    "Wifi",
    "TV",
    "Kitchen",
    "Washer/Dryer"
  ]);
  
  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Details & Amenities" },
    { id: 3, name: "Photos & Description" },
    { id: 4, name: "Pricing & Availability" },
    { id: 5, name: "Review & Submit" },
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-medium mb-3">List Your Lease</h1>
              <p className="text-muted-foreground">
                Connect with verified students and young professionals looking for short-term housing.
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        step.id === currentStep
                          ? "bg-brand-500 text-white"
                          : step.id < currentStep
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <span className={`text-xs mt-2 ${
                      step.id === currentStep
                        ? "text-brand-500 font-medium"
                        : step.id < currentStep
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-3">
                <div className="absolute top-0 h-1 bg-gray-200 w-full rounded-full" />
                <div
                  className="absolute top-0 h-1 bg-brand-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-medium mb-4">Basic Information</h2>
                      <p className="text-muted-foreground mb-6">
                        Let's start with some basic information about your property.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="property-type">Property Type</Label>
                        <select 
                          id="property-type" 
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">Select property type</option>
                          <option value="studio">Studio</option>
                          <option value="apartment">Apartment</option>
                          <option value="private-room">Private Room</option>
                          <option value="shared-room">Shared Room</option>
                          <option value="house">House</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <select 
                          id="bedrooms" 
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">Select number of bedrooms</option>
                          <option value="studio">Studio</option>
                          <option value="1">1 Bedroom</option>
                          <option value="2">2 Bedrooms</option>
                          <option value="3">3 Bedrooms</option>
                          <option value="4+">4+ Bedrooms</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <select 
                          id="bathrooms" 
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">Select number of bathrooms</option>
                          <option value="1">1 Bathroom</option>
                          <option value="1.5">1.5 Bathrooms</option>
                          <option value="2">2 Bathrooms</option>
                          <option value="2.5">2.5 Bathrooms</option>
                          <option value="3+">3+ Bathrooms</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="max-occupancy">Max Occupancy</Label>
                        <select 
                          id="max-occupancy" 
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">Select maximum occupancy</option>
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5+">5+ People</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Listing Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Cozy Studio Near UC Berkeley Campus"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Street Address"
                        className="mb-2"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="City" />
                        <Input placeholder="State" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Input placeholder="Zip Code" />
                        <select 
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">Select Country</option>
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nearest-campus">Nearest Campus</Label>
                      <div className="flex gap-2">
                        <Input
                          id="nearest-campus"
                          placeholder="e.g., UC Berkeley, Stanford, etc."
                          className="flex-grow"
                        />
                        <Input
                          placeholder="Distance (miles)"
                          className="w-28"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Step 2: Details & Amenities */}
            {currentStep === 2 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-medium mb-4">Details & Amenities</h2>
                      <p className="text-muted-foreground mb-6">
                        Help potential renters understand what your space offers.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Square Footage</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 750"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Furnished</Label>
                      <div className="flex items-center gap-3">
                        <Switch
                          id="furnished"
                        />
                        <Label htmlFor="furnished" className="!m-0">
                          This property is furnished
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Amenities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {["Wifi", "TV", "Kitchen", "Washer/Dryer", "Air Conditioning", "Heating", "Desk/Workspace", "Parking", "Gym", "Pool", "Pets Allowed", "Smoking Allowed"].map((amenity) => (
                          <div 
                            key={amenity}
                            className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                              amenities.includes(amenity) 
                                ? "border-brand-500 bg-brand-50 text-brand-700" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => toggleAmenity(amenity)}
                          >
                            <div className={`w-5 h-5 rounded-md mr-2 flex items-center justify-center ${
                              amenities.includes(amenity) 
                                ? "bg-brand-500 text-white" 
                                : "border border-gray-300"
                            }`}>
                              {amenities.includes(amenity) && (
                                <Check className="h-3.5 w-3.5" />
                              )}
                            </div>
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>House Rules</Label>
                      <Textarea
                        placeholder="List any house rules or restrictions..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Step 3: Photos & Description */}
            {currentStep === 3 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-medium mb-4">Photos & Description</h2>
                      <p className="text-muted-foreground mb-6">
                        Add photos and a detailed description of your property.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Property Photos</Label>
                      <p className="text-sm text-muted-foreground">
                        Add at least 5 high-quality photos of your property. Include images of all rooms, common areas, and the exterior.
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {/* Image Upload Card */}
                        <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium">Upload Photos</span>
                          <span className="text-xs text-muted-foreground text-center mt-1">
                            Drag and drop or click to browse
                          </span>
                        </div>
                        
                        {/* Mock placeholder for uploaded images */}
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <Label>Property Description</Label>
                      <Textarea
                        placeholder="Describe your property in detail. Mention unique features, the neighborhood, proximity to campus, public transportation, etc."
                        className="min-h-[150px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Neighborhood Information</Label>
                      <Textarea
                        placeholder="Describe the neighborhood, nearby amenities, public transportation, safety, etc."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Step 4: Pricing & Availability */}
            {currentStep === 4 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-medium mb-4">Pricing & Availability</h2>
                      <p className="text-muted-foreground mb-6">
                        Set your monthly rent and when your property is available for subleasing.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Monthly Rent</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="number"
                          placeholder="1200"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Security Deposit</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="number"
                          placeholder="1200"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Utilities</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Switch id="utilities-included" />
                          <Label htmlFor="utilities-included" className="!m-0">
                            Utilities included in rent
                          </Label>
                        </div>
                        
                        <div className="pl-8 space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="water" className="rounded text-brand-500" />
                            <label htmlFor="water">Water</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="electricity" className="rounded text-brand-500" />
                            <label htmlFor="electricity">Electricity</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="gas" className="rounded text-brand-500" />
                            <label htmlFor="gas">Gas</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="internet" className="rounded text-brand-500" />
                            <label htmlFor="internet">Internet</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Available Dates</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date" className="text-sm">Start Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="start-date"
                              type="date"
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="end-date" className="text-sm">End Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="end-date"
                              type="date"
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <Switch id="flexible-dates" />
                        <Label htmlFor="flexible-dates" className="!m-0">
                          Dates are flexible
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Minimum Stay</Label>
                      <select 
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="">Select minimum stay</option>
                        <option value="1">1 month</option>
                        <option value="2">2 months</option>
                        <option value="3">3 months</option>
                        <option value="summer">Summer term</option>
                        <option value="semester">Full semester</option>
                        <option value="academic">Academic year</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-medium mb-4">Review & Submit</h2>
                      <p className="text-muted-foreground mb-6">
                        Review your listing details before submitting. You can edit your listing anytime after publishing.
                      </p>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4 text-brand-500" />
                          Verification Required
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          To maintain a trusted community, we'll need to verify your academic affiliation. Please have your .edu email or student ID ready for verification.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Title:</span>
                            <p>Modern Studio Apartment near UC Berkeley</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Property Type:</span>
                            <p>Studio</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p>Berkeley, CA</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Nearest Campus:</span>
                            <p>UC Berkeley (0.3 miles)</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Pricing & Availability</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Monthly Rent:</span>
                            <p>$1,200</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Security Deposit:</span>
                            <p>$1,200</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Available From:</span>
                            <p>June 1, 2023</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Available Until:</span>
                            <p>August 15, 2023</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                          {amenities.map((amenity) => (
                            <span key={amenity} className="px-2 py-1 bg-brand-50 text-brand-700 rounded-full text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Switch id="terms" />
                          <Label htmlFor="terms" className="!m-0 text-sm">
                            I agree to LinkLease's <a href="#" className="text-brand-600 hover:underline">Terms of Service</a> and <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.
                          </Label>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          className="w-full bg-brand-500 hover:bg-brand-600 btn-transition"
                          size="lg"
                        >
                          Publish Listing
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-3">
                          Your listing will be reviewed and published within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  className="border-brand-500 text-brand-600 hover:bg-brand-50"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < steps.length ? (
                <Button 
                  onClick={handleNextStep}
                  className="bg-brand-500 hover:bg-brand-600 btn-transition flex items-center gap-1"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListYourLease;
