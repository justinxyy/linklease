
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageSquare } from "lucide-react";

// FAQ data
const faqSections = [
  {
    id: "general",
    title: "General Questions",
    questions: [
      {
        id: "what-is",
        question: "What is LinkLease?",
        answer: "LinkLease is a platform specifically designed for college students and young professionals looking for short-term housing solutions. We connect verified students who need to sublease their apartments with those looking for temporary accommodation near campus areas."
      },
      {
        id: "how-works",
        question: "How does LinkLease work?",
        answer: "LinkLease works by connecting students who need to sublease their apartments (due to internships, study abroad, etc.) with other students or young professionals who need temporary housing. All users are verified with their academic email addresses, creating a trusted community. You can browse listings, message potential subleasers, and arrange your housing directly through our platform."
      },
      {
        id: "different",
        question: "How is LinkLease different from other housing platforms?",
        answer: "LinkLease is specifically built for the college subleasing market, with verification processes to ensure all users are legitimate students or young professionals. We focus on short-term leases that align with academic schedules, and our platform is designed to address the unique needs and concerns of the student housing market."
      },
      {
        id: "who-can",
        question: "Who can use LinkLease?",
        answer: "LinkLease is primarily for college students and young professionals who either need to sublease their apartment or are looking for short-term housing. We verify all users through their academic email addresses or other verification methods to maintain a trusted community."
      }
    ]
  },
  {
    id: "finding",
    title: "Finding Housing",
    questions: [
      {
        id: "how-search",
        question: "How do I search for available subleases?",
        answer: "You can search for subleases by location, university, dates, price range, and amenities. Our search filters help you find the perfect temporary housing that meets your specific needs and timeframe."
      },
      {
        id: "housing-verified",
        question: "How are listings verified?",
        answer: "All listings on LinkLease are from verified students or young professionals. We verify users through their academic email addresses and may request additional documentation for certain listings. We also encourage users to report any suspicious listings."
      },
      {
        id: "contact-host",
        question: "How do I contact a potential subleaser?",
        answer: "Once you find a listing you're interested in, you can message the host directly through our secure messaging platform. You can ask questions, request more photos, or arrange virtual or in-person tours."
      },
      {
        id: "payment",
        question: "How do payments work?",
        answer: "LinkLease facilitates secure payments between subleasers and renters. We hold the security deposit and first month's rent in escrow until move-in is confirmed, protecting both parties. After that, recurring payments can be set up through our platform."
      }
    ]
  },
  {
    id: "listing",
    title: "Listing Your Lease",
    questions: [
      {
        id: "how-list",
        question: "How do I list my apartment for sublease?",
        answer: "Click on the 'List Your Lease' button and follow the step-by-step process. You'll need to provide details about your property, upload photos, set pricing and availability dates, and complete a verification process."
      },
      {
        id: "what-info",
        question: "What information do I need to provide for my listing?",
        answer: "You'll need to provide basic information about your property (type, size, location), amenities, high-quality photos, pricing details, availability dates, and a detailed description. The more information you provide, the more likely you are to find a good match quickly."
      },
      {
        id: "pricing",
        question: "How should I price my sublease?",
        answer: "Your sublease price should generally be competitive with similar properties in your area. Consider factors like proximity to campus, amenities, and the condition of your property. We provide pricing guidance based on comparable listings in your area."
      },
      {
        id: "service-fee",
        question: "Is there a fee for listing my property?",
        answer: "Listing your property on LinkLease is free. We charge a small service fee (typically 5-8% of the total lease value) only when you successfully find a subleaser through our platform. This fee helps us maintain a secure, verified community and provide customer support."
      }
    ]
  },
  {
    id: "safety",
    title: "Safety & Trust",
    questions: [
      {
        id: "user-verification",
        question: "How does LinkLease verify users?",
        answer: "We verify all users through their academic email addresses (.edu emails). For additional security, we may also require profile photos, phone verification, and social media account links. This creates a trusted community of verified students and young professionals."
      },
      {
        id: "safety-tips",
        question: "What safety tips do you recommend?",
        answer: "Always communicate through our platform, verify the identity of anyone you're dealing with, arrange video calls before committing, visit the property in person if possible, and never send money outside our secure payment system. We also recommend having a detailed sublease agreement."
      },
      {
        id: "disputes",
        question: "What if there's a dispute with my subleaser/renter?",
        answer: "LinkLease provides a dispute resolution process for issues that may arise. Our customer support team will help mediate and find a fair solution. We also hold security deposits in escrow to help resolve potential damages disputes."
      },
      {
        id: "report",
        question: "How do I report suspicious activity?",
        answer: "If you encounter any suspicious activity or listings, please report it immediately through the 'Report' button on the listing or user profile, or contact our customer support team. We take all reports seriously and investigate promptly."
      }
    ]
  },
  {
    id: "account",
    title: "Account & Settings",
    questions: [
      {
        id: "create-account",
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button and follow the instructions. You'll need to provide your name, email (preferably your academic email for verification), and create a password. You'll then need to verify your email and complete your profile."
      },
      {
        id: "delete-account",
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account at any time through your account settings. Please note that active listings or rentals will need to be resolved before account deletion can be completed."
      },
      {
        id: "change-password",
        question: "How do I change my password?",
        answer: "You can change your password through your account settings. If you've forgotten your password, use the 'Forgot Password' link on the sign-in page to reset it."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("general");
  const [isLoaded, setIsLoaded] = useState(true);
  
  const filteredFaqs = searchQuery
    ? faqSections.map(section => ({
        ...section,
        questions: section.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.questions.length > 0)
    : faqSections;
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Frequently Asked Questions</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about using LinkLease for your subleasing needs.
              </p>
            </div>
            
            {/* Search */}
            <div className="mb-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* FAQ Navigation */}
            {!searchQuery && (
              <div className="flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar">
                {faqSections.map((section) => (
                  <button
                    key={section.id}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? "bg-brand-500 text-white"
                        : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            )}
            
            {/* FAQ Content */}
            <div>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((section) => (
                  <div 
                    key={section.id} 
                    className={(!searchQuery && activeSection !== section.id) ? "hidden" : "mb-10"}
                  >
                    {searchQuery && <h2 className="text-xl font-medium mb-4">{section.title}</h2>}
                    
                    <Accordion type="single" collapsible className="border rounded-xl overflow-hidden">
                      {section.questions.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 transition-colors">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 pt-0">
                            <div className="text-muted-foreground">{faq.answer}</div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any answers matching "{searchQuery}"
                  </p>
                  <Button 
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="border-brand-500 text-brand-600 hover:bg-brand-50"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
            
            {/* Contact Support */}
            <div className="mt-16 bg-brand-50 rounded-xl p-6 border border-brand-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-8 w-8 text-brand-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-medium mb-2">Still have questions?</h3>
                  <p className="text-muted-foreground mb-4">
                    Can't find the answer you're looking for? Please contact our support team.
                  </p>
                  <Button className="bg-brand-500 hover:bg-brand-600 btn-transition">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
