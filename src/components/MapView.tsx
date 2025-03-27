
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Define interface for listings
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  // Add other properties as needed
}

interface MapViewProps {
  listings: Listing[];
  onMarkerClick?: (id: string) => void;
  className?: string;
}

// This is a mock API key for demonstration
// In production, you should use environment variables
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

const MapView = ({ listings, onMarkerClick, className = "" }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  
  useEffect(() => {
    // Load the Google Maps API
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current && !map) {
        // Create a new map instance
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          zoom: 12,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });
        
        setMap(newMap);
        setInfoWindow(new google.maps.InfoWindow());
      }
    });
  }, [map]);

  // Add markers when the map and listings are available
  useEffect(() => {
    if (map && listings.length > 0 && typeof google !== 'undefined') {
      // Remove existing markers
      markers.forEach((marker) => marker.setMap(null));
      
      // Mock geocoding (in a real app, you would use geocoding service or store coordinates)
      const mockLocations = [
        { lat: 37.7749, lng: -122.4194 }, // San Francisco
        { lat: 37.8715, lng: -122.2730 }, // Berkeley
        { lat: 37.4419, lng: -122.1430 }, // Palo Alto
        { lat: 42.2808, lng: -83.7430 }, // Ann Arbor
        { lat: 42.3736, lng: -71.1097 }, // Cambridge
        { lat: 40.7128, lng: -74.0060 }, // New York
        { lat: 37.4275, lng: -122.1697 }, // Stanford
        { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        { lat: 42.3601, lng: -71.0589 }, // Boston
      ];
      
      // Create new markers
      const newMarkers = listings.map((listing, index) => {
        // Use mock location (replace with real coordinates in production)
        const position = mockLocations[index % mockLocations.length];
        
        const marker = new google.maps.Marker({
          position,
          map,
          title: listing.title,
          label: {
            text: `$${listing.price}`,
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: "#0ea5e9",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          },
        });

        marker.addListener("click", () => {
          if (infoWindow) {
            infoWindow.setContent(`
              <div style="width: 240px; padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 8px;">${listing.title}</h3>
                <p>${listing.location}</p>
                <p style="font-weight: bold;">$${listing.price}/mo</p>
              </div>
            `);
            infoWindow.open(map, marker);
          }
          
          if (onMarkerClick) {
            onMarkerClick(listing.id);
          }
        });

        return marker;
      });

      setMarkers(newMarkers);

      // Fit bounds to show all markers
      if (newMarkers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        newMarkers.forEach((marker) => {
          bounds.extend(marker.getPosition()!);
        });
        map.fitBounds(bounds);
      }
    }
  }, [map, listings, infoWindow, markers, onMarkerClick]);

  return (
    <div ref={mapRef} className={`w-full h-full min-h-[400px] rounded-xl overflow-hidden ${className}`}></div>
  );
};

export default MapView;
