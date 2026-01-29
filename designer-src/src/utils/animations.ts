// Centralized animation configurations for smooth, consistent animations across all pages

export const ANIMATION_DURATION = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.0
};

export const EASING = {
  // Premium smooth easing - preferred for most animations
  premium: [0.23, 1, 0.32, 1], // cubic-bezier(0.23, 1, 0.32, 1)
  // Smooth easing for most animations
  smooth: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
  // Smooth entrance
  easeOut: [0, 0, 0.2, 1], // cubic-bezier(0, 0, 0.2, 1)
  // Smooth exit
  easeIn: [0.4, 0, 1, 1], // cubic-bezier(0.4, 0, 1, 1)
  // Bouncy for special effects
  bounce: [0.68, -0.55, 0.265, 1.55]
};

// Viewport settings for scroll animations
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "0px 0px -100px 0px", // Trigger animations 100px before entering viewport
  amount: 0.2 // Trigger when 20% of element is visible
};

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: ANIMATION_DURATION.normal, 
    ease: EASING.smooth 
  }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: ANIMATION_DURATION.normal, 
    ease: EASING.smooth 
  }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: ANIMATION_DURATION.normal, 
    ease: EASING.smooth 
  }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: ANIMATION_DURATION.normal, 
    ease: EASING.smooth 
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: ANIMATION_DURATION.normal, 
    ease: EASING.smooth 
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: ANIMATION_DURATION.normal, 
    ease: EASING.smooth 
  }
};

// Stagger children animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Helper function to create scroll-triggered animations
export const createScrollAnimation = (
  variant: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn' = 'fadeInUp',
  delay: number = 0
) => {
  const variants = {
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    fadeIn,
    scaleIn
  };

  const selected = variants[variant];
  
  return {
    initial: selected.initial,
    whileInView: selected.animate,
    viewport: VIEWPORT_CONFIG,
    transition: {
      ...selected.transition,
      delay
    }
  };
};

// Helper for staggered list animations
export const createStaggeredAnimation = (index: number, baseDelay: number = 0) => {
  return {
    ...fadeInUp,
    transition: {
      ...fadeInUp.transition,
      delay: baseDelay + (index * 0.08)
    }
  };
};