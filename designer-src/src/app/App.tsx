import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Logos } from "@/app/components/Logos";
import { WhyUs } from "@/app/components/WhyUs";
import { CTA } from "@/app/components/CTA";
import { Footer } from "@/app/components/Footer";
import { InfiniteMarquee } from "@/app/components/InfiniteMarquee";
import { Company } from "@/app/components/Company";
import { TeamPage } from "@/app/components/TeamPage";
import { Platform } from "@/app/components/Platform";
import { Solutions } from "@/app/components/Solutions";
import { Blogs } from "@/app/components/Blogs";
import { Press } from "@/app/components/Press";
import { Careers } from "@/app/components/Careers";
import { initializeErrorSuppression } from "@/utils/errorSuppression";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<
    | "home"
    | "about"
    | "team"
    | "platform"
    | "solutions"
    | "blogs"
    | "press"
    | "careers"
  >("home");

  // Initialize global error suppression
  React.useEffect(() => {
    initializeErrorSuppression();
  }, []);

  return (
    <div className="relative min-h-screen bg-background selection:bg-accent/30">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {currentPage === "home" ? (
        <>
          <Hero />
          <main className="relative">
            <Logos />
            <WhyUs />
            <InfiniteMarquee />
            <CTA />
          </main>
          <Footer onNavigate={setCurrentPage} />
        </>
      ) : currentPage === "team" ? (
        <div className="relative">
          <TeamPage onNavigate={setCurrentPage} />
        </div>
      ) : currentPage === "platform" ? (
        <div className="relative">
          <Platform onNavigate={setCurrentPage} />
        </div>
      ) : currentPage === "solutions" ? (
        <div className="relative">
          <Solutions onNavigate={setCurrentPage} />
        </div>
      ) : currentPage === "blogs" ? (
        <div className="relative">
          <Blogs onNavigate={setCurrentPage} />
        </div>
      ) : currentPage === "press" ? (
        <div className="relative">
          <Press onNavigate={setCurrentPage} />
        </div>
      ) : currentPage === "careers" ? (
        <div className="relative">
          <Careers onNavigate={setCurrentPage} />
        </div>
      ) : (
        <div className="relative">
          <Company onNavigate={setCurrentPage} />
        </div>
      )}
    </div>
  );
}