import React from "react";
import { motion } from "motion/react";
import { Linkedin, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";

interface TeamPageProps {
  onNavigate: (page: 'home' | 'about' | 'team' | 'platform' | 'solutions' | 'blogs' | 'press' | 'careers') => void;
}

export const TeamPage = ({ onNavigate }: TeamPageProps) => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "VP of Engineering",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY3ODk1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI Research",
      image: "https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc4NjU4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Priya Patel",
      role: "Chief Product Officer",
      image: "https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRlY2glMjBsZWFkZXJ8ZW58MXx8fHwxNzY3OTQ2MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "James Wilson",
      role: "Senior ML Engineer",
      image: "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBlbmdpbmVlciUyMGhlYWRzaG90fGVufDF8fHx8MTc2Nzk0NTkzMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emily Zhang",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3Njc5NDYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Alex Kumar",
      role: "Compliance Lead",
      image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzY3OTIxOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Lisa Thompson",
      role: "Data Science Lead",
      image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFuJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzY3ODkxNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "David Johnson",
      role: "Director of Operations",
      image: "https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhZnJpY2FuJTIwYW1lcmljYW4lMjBtYW58ZW58MXx8fHwxNzY3OTEyNTc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Maria Garcia",
      role: "Senior Product Manager",
      image: "https://images.unsplash.com/photo-1727299781147-c7ab897883a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXRpbmElMjB3b21hbiUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3Njc5NDYzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Raj Sharma",
      role: "Solutions Architect",
      image: "https://images.unsplash.com/photo-1749711258555-b6d9adb5e3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjBtYW4lMjB0ZWNofGVufDF8fHx8MTc2Nzk0NjMxOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Jennifer Lee",
      role: "Frontend Engineer",
      image: "https://images.unsplash.com/photo-1659353220597-71b8c6a56259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRldmVsb3BlciUyMGhlYWRzaG90fGVufDF8fHx8MTc2Nzk0NjMxOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Michael Brown",
      role: "Backend Engineer",
      image: "https://images.unsplash.com/photo-1570215170761-f056128eda48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzb2Z0d2FyZSUyMGVuZ2luZWVyfGVufDF8fHx8MTc2Nzk0NjMxOXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Rachel Kim",
      role: "UX Research Manager",
      image: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG1hbmFnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5MzA3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Steven Taylor",
      role: "Business Consultant",
      image: "https://images.unsplash.com/photo-1621533463370-837f20c6c889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBjb25zdWx0YW50JTIwaGVhZHNob3R8ZW58MXx8fHwxNzY3OTQ2MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Nina Patel",
      role: "Data Analyst",
      image: "https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGFuYWx5c3R8ZW58MXx8fHwxNzY3OTQ2MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Thomas Anderson",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1761522001672-5f1d45ce1b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBkZXNpZ25lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk0MDAwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Sophia Martinez",
      role: "QA Specialist",
      image: "https://images.unsplash.com/photo-1764885449345-d0d6629bf7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNwZWNpYWxpc3R8ZW58MXx8fHwxNzY3OTQ2MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Daniel White",
      role: "Engineering Director",
      image: "https://images.unsplash.com/photo-1631387019069-2ff599943f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBkaXJlY3RvciUyMGhlYWRzaG90fGVufDF8fHx8MTc2Nzk0NjMyMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Victoria Chen",
      role: "Research Scientist",
      image: "https://images.unsplash.com/photo-1576670158706-8d5b044b61da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNjaWVudGlzdHxlbnwxfHx8fDE3Njc5NDYzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Christopher Lee",
      role: "AI Researcher",
      image: "https://images.unsplash.com/photo-1758685734503-58a8accc24e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjByZXNlYXJjaGVyfGVufDF8fHx8MTc2Nzk0NjMyMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Amanda Foster",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY3ODk1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Brian Mitchell",
      role: "Security Engineer",
      image: "https://images.unsplash.com/photo-1570215170761-f056128eda48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzb2Z0d2FyZSUyMGVuZ2luZWVyfGVufDF8fHx8MTc2Nzk0NjMxOXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Olivia Robinson",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG1hbmFnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5MzA3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Kevin O'Brien",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHN1aXR8ZW58MXx8fHwxNzY3OTIxOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Hannah Scott",
      role: "Customer Success Lead",
      image: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3Njc5NDYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 bg-[#F8F9FA] overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 mb-12 text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[14px] font-medium">Back to Company</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#06003F]" />
              <span className="text-[13px] text-[#06003F]/60 uppercase tracking-wider">Our Team</span>
            </div>
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-6">
              Meet the Agentic AI team
            </h1>
            <p className="text-[18px] text-[#06003F]/60 max-w-3xl leading-relaxed">
              Our diverse team of engineers, designers, researchers, and healthcare specialists is dedicated to building the future of autonomous AI. Together, we're transforming healthcare administration through cutting-edge technology and unwavering commitment to excellence.
            </p>
          </motion.div>

          {/* Team Grid - 25 Members */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * index }}
                className="group relative"
              >
                <div className="relative rounded-[16px] overflow-hidden bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB]">
                  <ImageWithFallback 
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  {/* White card overlay at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[6px] p-4 shadow-lg flex items-center justify-between group-hover:shadow-xl transition-shadow">
                    <div>
                      <h3 className="text-[17px] font-bold text-[#06003F] mb-0.5">{member.name}</h3>
                      <p className="text-[13px] text-[#06003F]/60">{member.role}</p>
                    </div>
                    <div className="w-8 h-8 rounded-[6px] bg-[#06003F] flex items-center justify-center group-hover:bg-[#FF4E3A] transition-colors cursor-pointer">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </>
  );
};