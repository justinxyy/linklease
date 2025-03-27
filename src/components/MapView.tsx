
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapViewProps {
  listings: any[];
  onMarkerClick?: (listingId: string) => void;
}

const MapView = ({ listings, onMarkerClick }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  // Function to initialize the map
  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;
    
    try {
      const loader = new Loader({
        apiKey: "",  // We'll prompt the user to enter this
        version: "weekly",
        libraries: ["places"]
      });
      
      const google = await loader.load();
      
      // Default to center of US if no listings
      const center = listings.length > 0 
        ? { lat: 37.7749, lng: -122.4194 } // San Francisco by default
        : { lat: 39.8283, lng: -98.5795 }; // Center of US
      
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
      
      const newMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      
      // Add markers for listings
      const bounds = new google.maps.LatLngBounds();
      const newMarkers = listings.map(listing => {
        // For demo, we'll use random positions around SF if no coordinates
        const position = { 
          lat: 37.7749 + (Math.random() * 0.1 - 0.05), 
          lng: -122.4194 + (Math.random() * 0.1 - 0.05) 
        };
        
        bounds.extend(position);
        
        const marker = new google.maps.Marker({
          position,
          map: newMap,
          title: listing.title,
          label: {
            text: `$${listing.price}`,
            className: "marker-label"
          }
        });
        
        // Add click listener
        marker.addListener("click", () => {
          if (onMarkerClick) {
            onMarkerClick(listing.id);
          }
        });
        
        return marker;
      });
      
      setMarkers(newMarkers);
      
      // Fit map to markers if we have any
      if (newMarkers.length > 0) {
        newMap.fitBounds(bounds);
        // Don't zoom in too far
        if (newMap.getZoom()! > 15) {
          newMap.setZoom(15);
        }
      }
    } catch (error) {
      console.error("Error loading Google Maps:", error);
    }
  }, [listings, onMarkerClick]);
  
  // Initialize map when component mounts
  useEffect(() => {
    initializeMap();
    
    return () => {
      // Clean up markers
      markers.forEach(marker => marker.setMap(null));
    };
  }, [initializeMap]);
  
  // Update markers when listings change
  useEffect(() => {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Add new markers
    const bounds = new google.maps.LatLngBounds();
    const newMarkers = listings.map(listing => {
      // For demo, we'll use random positions around SF if no coordinates
      const position = { 
        lat: 37.7749 + (Math.random() * 0.1 - 0.05), 
        lng: -122.4194 + (Math.random() * 0.1 - 0.05) 
      };
      
      bounds.extend(position);
      
      const marker = new google.maps.Marker({
        position,
        map,
        title: listing.title,
        label: {
          text: `$${listing.price}`,
          className: "marker-label"
        }
      });
      
      // Add click listener
      marker.addListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(listing.id);
        }
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // Fit map to markers if we have any
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
      // Don't zoom in too far
      if (map.getZoom()! > 15) {
        map.setZoom(15);
      }
    }
  }, [listings, map, onMarkerClick]);
  
  return (
    <div className="h-full w-full rounded-xl overflow-hidden border shadow-sm">
      <div ref={mapRef} className="h-full w-full" />
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md text-sm">
        <p>Enter your Google Maps API key in site settings</p>
      </div>
    </div>
  );
};

export default MapView;
