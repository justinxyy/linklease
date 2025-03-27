
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Shield, Award, UserCheck } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate content loading
    setIsLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Listings moved up - immediately after the hero */}
        <FeaturedListings />
        
        {/* Features Section */}
        <section className="section-container py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border">
              <div className="w-14 h-14 rounded-full bg-coral-100 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-coral-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Verified Profiles</h3>
              <p className="text-muted-foreground">
                Every sublease is from a verified student or young professional with campus email verification.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <UserCheck className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Direct Communication</h3>
              <p className="text-muted-foreground">
                Connect directly with potential subleasers through our secure messaging platform.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Flexible Terms</h3>
              <p className="text-muted-foreground">
                Find subleases for summer internships, semester abroad, or any short-term housing need.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* CTA Section */}
        <section className="relative bg-coral-500 text-white overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621168322085-57c5a7e3a9e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover opacity-10"></div>
          <div className="relative section-container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-medium">Have a space to sublease?</h2>
              <p className="text-white/90 text-lg">
                List your space on Subleasify and connect with trusted students and young professionals looking for short-term housing.
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-coral-500 hover:bg-white/90 border-white btn-transition"
                >
                  List Your Lease
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="section-container py-16 md:py-24">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-medium text-center">What Our Users Say</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto">
              Hear from students and young professionals who have found their perfect temporary home.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">
                "Subleasify made my summer internship housing search so much easier. I found a great place near my internship from a fellow student. The verification process gave me peace of mind."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah J." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium">Sarah J.</h5>
                  <p className="text-sm text-muted-foreground">UC Berkeley</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">
                "When I decided to study abroad, I was worried about what to do with my apartment. Subleasify connected me with the perfect subleaser, and the process was seamless."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Michael T." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium">Michael T.</h5>
                  <p className="text-sm text-muted-foreground">University of Michigan</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">
                "As someone who needed housing for just one semester, finding a place was always difficult. Subleasify provided exactly what I needed, and I felt safe through the entire process."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Jessica M." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium">Jessica M.</h5>
                  <p className="text-sm text-muted-foreground">Stanford University</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
