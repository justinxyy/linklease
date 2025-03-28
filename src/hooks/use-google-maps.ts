
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GeocodingResult {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  }>;
  status: string;
}

interface PlacePredictionsResult {
  predictions: Array<{
    description: string;
    place_id: string;
    structured_formatting?: {
      main_text: string;
      secondary_text: string;
    };
  }>;
  status: string;
}

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Geocode an address to get coordinates
  const geocodeAddress = async (address: string): Promise<GeocodingResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("geocoding", {
        body: { address }
      });
      
      if (error) {
        setError(error.message);
        return null;
      }
      
      return data as GeocodingResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to geocode address";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get place predictions for autocomplete
  const getPlacePredictions = async (input: string): Promise<PlacePredictionsResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("places-autocomplete", {
        body: { input }
      });
      
      if (error) {
        setError(error.message);
        return null;
      }
      
      return data as PlacePredictionsResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get place predictions";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    geocodeAddress,
    getPlacePredictions,
    isLoading,
    error
  };
};
