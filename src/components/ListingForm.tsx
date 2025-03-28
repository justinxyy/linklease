
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListings } from "@/hooks/use-listings";
import { useGoogleMaps } from "@/hooks/use-google-maps";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { debounce } from "lodash";

interface ListingFormProps {
  initialData?: {
    id?: string;
    title?: string;
    description?: string;
    price?: number;
    location?: string;
    latitude?: number;
    longitude?: number;
    images?: string[];
  };
  isEditing?: boolean;
}

const ListingForm = ({ initialData, isEditing = false }: ListingFormProps) => {
  const { user } = useAuth();
  const { useCreateListing, useUpdateListing } = useListings();
  const createListing = useCreateListing();
  const updateListing = useUpdateListing();
  const { geocodeAddress, getPlacePredictions, isLoading: isMapLoading } = useGoogleMaps();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [location, setLocation] = useState(initialData?.location || "");
  const [latitude, setLatitude] = useState<number | undefined>(initialData?.latitude);
  const [longitude, setLongitude] = useState<number | undefined>(initialData?.longitude);
  const [addressPredictions, setAddressPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);

  // Debounced function for address suggestions
  const debouncedGetPredictions = debounce(async (input: string) => {
    if (input.length < 3) {
      setAddressPredictions([]);
      setIsLoadingPredictions(false);
      return;
    }

    setIsLoadingPredictions(true);
    const predictions = await getPlacePredictions(input);
    setIsLoadingPredictions(false);
    
    if (predictions && predictions.predictions) {
      setAddressPredictions(predictions.predictions);
      setShowPredictions(true);
    } else {
      setAddressPredictions([]);
    }
  }, 300);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setShowPredictions(true);
    debouncedGetPredictions(value);
  };

  const handlePredictionSelect = async (prediction: any) => {
    setLocation(prediction.description);
    setShowPredictions(false);
    
    // Get coordinates for the selected location
    const geocodeResult = await geocodeAddress(prediction.description);
    
    if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
      const { lat, lng } = geocodeResult.results[0].geometry.location;
      setLatitude(lat);
      setLongitude(lng);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be signed in to create a listing",
        variant: "destructive",
      });
      return;
    }
    
    const listingData = {
      title,
      description,
      price: Number(price),
      location,
      latitude,
      longitude,
    };
    
    try {
      if (isEditing && initialData?.id) {
        await updateListing.mutateAsync({
          id: initialData.id,
          ...listingData,
        });
        
        toast({
          title: "Listing updated",
          description: "Your listing has been successfully updated",
        });
      } else {
        await createListing.mutateAsync(listingData);
        
        toast({
          title: "Listing created",
          description: "Your listing has been successfully created",
        });
      }
      
      navigate("/listings");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save listing",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="e.g., Cozy Studio near UC Berkeley"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your listing in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Monthly Price ($)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="1200"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="location"
            placeholder="Enter address"
            value={location}
            onChange={handleLocationChange}
            className="pl-10"
            required
            onFocus={() => location && setShowPredictions(true)}
            onBlur={() => setTimeout(() => setShowPredictions(false), 200)}
          />
          {isLoadingPredictions && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>
        
        {showPredictions && addressPredictions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
            {addressPredictions.map((prediction) => (
              <div
                key={prediction.place_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handlePredictionSelect(prediction)}
              >
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">
                      {prediction.structured_formatting?.main_text || prediction.description.split(',')[0]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {prediction.structured_formatting?.secondary_text || 
                        prediction.description.split(',').slice(1).join(',')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-coral-600 hover:bg-coral-700"
        disabled={createListing.isPending || updateListing.isPending || isMapLoading}
      >
        {(createListing.isPending || updateListing.isPending) ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEditing ? "Updating..." : "Creating..."}
          </>
        ) : (
          isEditing ? "Update Listing" : "Create Listing"
        )}
      </Button>
    </form>
  );
};

export default ListingForm;
