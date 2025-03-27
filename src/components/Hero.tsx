
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <section className="relative bg-gradient-to-b from-brand-50 to-background pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover opacity-[0.03]"></div>
      
      <div className="relative section-container">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
              Simplifying Student Subleasing
            </span>
            <h1 className="font-semibold tracking-tight text-balance">
              Find Your Perfect <span className="text-gradient">Temporary Home</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with verified students and young professionals for safe, trusted, and flexible housing solutions on and near campuses nationwide.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div 
              className={cn(
                "relative bg-white rounded-xl shadow-sm transition-all duration-300 ease-in-out p-1",
                searchFocused ? "ring-2 ring-brand-500 shadow-lg" : "ring-1 ring-border"
              )}
            >
              <div className="flex items-center">
                <div className="flex-grow p-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      placeholder="Location, university, or address..."
                      className="w-full bg-transparent border-0 focus:outline-none text-sm md:text-base py-1.5"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                  </div>
                </div>
                <div className="pr-1">
                  <Button 
                    className="btn-transition bg-brand-500 hover:bg-brand-600 rounded-lg"
                    size="sm"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              <button className="px-2.5 py-1 bg-white/80 hover:bg-white rounded-full border transition-colors">
                UC Berkeley
              </button>
              <button className="px-2.5 py-1 bg-white/80 hover:bg-white rounded-full border transition-colors">
                NYU
              </button>
              <button className="px-2.5 py-1 bg-white/80 hover:bg-white rounded-full border transition-colors">
                Stanford
              </button>
              <button className="px-2.5 py-1 bg-white/80 hover:bg-white rounded-full border transition-colors">
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
