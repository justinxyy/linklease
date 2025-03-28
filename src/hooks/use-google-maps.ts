
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GeocodeResult {
  results: {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
    types: string[];
  }[];
  status: string;
}

interface PlacesAutocompleteResult {
  predictions: {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }[];
  status: string;
}

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Geocode an address to get coordinates
  const geocodeAddress = async (address: string): Promise<GeocodeResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("geocoding", {
        body: { address },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as GeocodeResult;
    } catch (err: any) {
      setError(err.message || "Failed to geocode address");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get place predictions for autocomplete
  const getPlacePredictions = async (input: string): Promise<PlacesAutocompleteResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("places-autocomplete", {
        body: { input },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as PlacesAutocompleteResult;
    } catch (err: any) {
      setError(err.message || "Failed to get place predictions");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    geocodeAddress,
    getPlacePredictions,
    isLoading,
    error,
  };
};
