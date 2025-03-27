
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen background with no opacity filter */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=85')] bg-cover bg-center motion-safe:transition-transform motion-safe:duration-[25s] motion-safe:parallax-bg"></div>
      
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
            Find Your Perfect Temporary Home
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <div 
              className={cn(
                "relative bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out p-1.5",
                searchFocused ? "ring-2 ring-coral-500 shadow-lg" : ""
              )}
            >
              <div className="flex items-center">
                <div className="flex-grow p-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      placeholder="Location, university, or address..."
                      className="w-full bg-transparent border-0 focus:outline-none text-base md:text-lg py-2"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                  </div>
                </div>
                <div className="pr-1">
                  <Button 
                    className="btn-transition bg-coral-500 hover:bg-coral-600 rounded-lg"
                    size="lg"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white">
              <span>Popular:</span>
              <button className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-full border border-white/30 transition-colors">
                UC Berkeley
              </button>
              <button className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-full border border-white/30 transition-colors">
                NYU
              </button>
              <button className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-full border border-white/30 transition-colors">
                Stanford
              </button>
              <button className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-full border border-white/30 transition-colors">
                University of Michigan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
