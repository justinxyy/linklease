
import { Search, Home, MessageSquare, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Search for Leases",
    description: "Browse verified listings from students and young professionals on or near your campus or desired location.",
    color: "bg-brand-100 text-brand-700",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Connect Directly",
    description: "Message verified listers, ask questions, and schedule virtual or in-person tours.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    icon: Shield,
    title: "Secure Your Stay",
    description: "Use our secure platform for agreements and payments with verified identity protection.",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    icon: Home,
    title: "Move In & Enjoy",
    description: "Arrive at your temporary home with confidence, knowing all details are arranged in advance.",
    color: "bg-amber-100 text-amber-700",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-container">
      <div className="space-y-2 mb-14">
        <h2 className="text-3xl font-medium text-center">How LinkLease Works</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto">
          Our simple process connects you with trusted, verified housing options specifically designed for student needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="relative flex flex-col items-center text-center"
          >
            {/* Connection line between steps (except the last one) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-[2px] bg-gray-200 z-0"></div>
            )}
            
            <div className={cn(
              "relative z-10 flex items-center justify-center w-20 h-20 rounded-full mb-5",
              step.color
            )}>
              <step.icon className="w-8 h-8" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-background flex items-center justify-center font-medium text-sm">
                {step.id}
              </div>
            </div>
            
            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
