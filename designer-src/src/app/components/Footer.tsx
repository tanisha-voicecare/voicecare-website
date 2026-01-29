import React from "react";
import { Linkedin, ArrowRight } from "lucide-react";
import logoImage from "figma:asset/7777640f2ec56ab6c56e228f0ad9cc9c159f022e.png";
import complianceBadges from "figma:asset/a36ee370307f31a82faca8dd90dd34580f180fe2.png";

export const Footer = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="bg-white border-t border-[#06003F]/10">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Main Footer Content */}
        <div className="pt-16 md:pt-20 pb-8 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Logo & Tagline */}
            <div className="md:col-span-4">
              <img src={logoImage} alt="VoiceCare AI" className="h-20 mb-8" />
              
              {/* Social Section */}
              <div>
                <p className="text-[13px] font-medium text-[#06003F]/40 uppercase tracking-wider mb-4">
                  Connect with us
                </p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[#06003F]/10 hover:border-[#FF4E3A] bg-white hover:bg-[#FF4E3A] text-[#06003F] hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Left Column - Navigation */}
            <div className="md:col-span-2">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6">
                Company
              </h5>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Our Platform
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Who We Serve
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Schedule a Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Middle Column - Navigation */}
            <div className="md:col-span-2">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6">
                Resources
              </h5>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column - Newsletter */}
            <div className="md:col-span-4">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6">
                Stay Updated
              </h5>
              <p className="text-[15px] text-[#06003F]/60 mb-6 leading-relaxed">
                Get the latest news and updates delivered to your inbox.
              </p>
              
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-3.5 text-[15px] bg-[#06003F]/[0.02] border border-[#06003F]/10 rounded-[8px] focus:outline-none focus:border-[#FF4E3A] focus:bg-white transition-all placeholder:text-[#06003F]/30"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF4E3A] text-white px-5 rounded-[6px] font-semibold hover:bg-[#FF4E3A]/90 transition-all flex items-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitted ? (
                      "Subscribed!"
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {isSubmitted && (
                <p className="text-[13px] text-[#FF4E3A] mt-3 font-medium">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-[#06003F]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[14px] text-[#06003F]/40">
              © 2025 VoiceCare AI. All rights reserved.
            </p>
            
            <img src={complianceBadges} alt="SOC and HIPAA Compliant" className="h-20" />
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-[14px] text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[14px] text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-[14px] text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};