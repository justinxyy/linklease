
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Define interface for listings
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  latitude: number | null;
  longitude: number | null;
  images?: string[] | null;
}

interface MapViewProps {
  listings: Listing[];
  onMarkerClick?: (id: string) => void;
  className?: string;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
}

// Using environment variable for the API key
const GOOGLE_MAPS_API_KEY = "AIzaSyAZCMcaFcwGFJn2CzJ6Bj6qZcph3NaDnqQ";

const MapView = ({ 
  listings, 
  onMarkerClick, 
  className = "",
  centerLat = 37.7749,
  centerLng = -122.4194,
  zoom = 12
}: MapViewProps) => {
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
          center: { lat: centerLat, lng: centerLng },
          zoom: zoom,
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
  }, [map, centerLat, centerLng, zoom]);

  // Add markers when the map and listings are available
  useEffect(() => {
    if (map && listings.length > 0 && typeof google !== 'undefined') {
      // Remove existing markers
      markers.forEach((marker) => marker.setMap(null));
      
      // Create new markers for listings with valid coordinates
      const newMarkers = listings
        .filter(listing => listing.latitude && listing.longitude) // Only use listings with coordinates
        .map((listing) => {
          const position = { 
            lat: listing.latitude as number, 
            lng: listing.longitude as number 
          };
          
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
              fillColor: "#ee6c4d", // Coral color from our theme
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

      // Fit bounds to show all markers if we have any
      if (newMarkers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        newMarkers.forEach((marker) => {
          bounds.extend(marker.getPosition()!);
        });
        map.fitBounds(bounds);
        
        // Don't zoom in too far
        const listener = google.maps.event.addListener(map, "idle", () => {
          if (map.getZoom()! > 16) {
            map.setZoom(16);
          }
          google.maps.event.removeListener(listener);
        });
      }
    }
  }, [map, listings, infoWindow, markers, onMarkerClick]);

  return (
    <div ref={mapRef} className={`w-full h-full min-h-[400px] rounded-xl overflow-hidden ${className}`}></div>
  );
};

export default MapView;
