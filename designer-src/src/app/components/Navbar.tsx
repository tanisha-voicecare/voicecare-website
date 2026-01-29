import React from "react";
import { motion } from "motion/react";
import logoImage from "figma:asset/7777640f2ec56ab6c56e228f0ad9cc9c159f022e.png";

interface NavbarProps {
  currentPage: 'home' | 'about' | 'team' | 'platform' | 'solutions' | 'blogs' | 'press';
  onNavigate: (page: 'home' | 'about' | 'team' | 'platform' | 'solutions' | 'blogs' | 'press') => void;
}

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        paddingLeft: isScrolled ? '48px' : '96px',
        paddingRight: isScrolled ? '48px' : '96px',
      }}
      transition={{ 
        y: { duration: 0.5 },
        opacity: { duration: 0.5 },
        paddingLeft: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
        paddingRight: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
      }}
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <img src={logoImage} alt="VoiceCare AI" className="h-12" />
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-muted-foreground">
        <button 
          onClick={() => onNavigate('platform')}
          className={`text-[14px] hover:text-foreground transition-colors ${currentPage === 'platform' ? 'text-[#FF4E3A]' : ''}`}
        >
          Platform
        </button>
        <button 
          onClick={() => onNavigate('solutions')}
          className={`text-[14px] hover:text-foreground transition-colors ${currentPage === 'solutions' ? 'text-[#FF4E3A]' : ''}`}
        >
          Security
        </button>
        <button 
          onClick={() => onNavigate('about')}
          className={`text-[14px] hover:text-foreground transition-colors ${currentPage === 'about' ? 'text-[#FF4E3A]' : ''}`}
        >
          Company
        </button>
        <button 
          onClick={() => onNavigate('blogs')}
          className={`text-[14px] hover:text-foreground transition-colors ${currentPage === 'blogs' ? 'text-[#FF4E3A]' : ''}`}
        >
          Blogs
        </button>
        <button 
          onClick={() => onNavigate('press')}
          className={`text-[14px] hover:text-foreground transition-colors ${currentPage === 'press' ? 'text-[#FF4E3A]' : ''}`}
        >
          Press
        </button>
        <a href="#" className="hover:text-foreground transition-colors">Docs</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-medium hover:text-[#FF4E3A] transition-colors text-[#06003F]">Log in</button>
        <button className="bg-[#FF4E3A] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium hover:brightness-110 transition-all shadow-sm">
          Book a Demo
        </button>
      </div>
    </motion.nav>
  );
};