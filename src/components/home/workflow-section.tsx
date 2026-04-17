"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { WorkflowVisualization } from './workflow-visualization';
import { AIReceptionistVisualization } from './ai-receptionist-visualization';
import { BenefitVerificationVisualization } from './benefit-verification-visualization';
import { PriorAuthVisualization } from './prior-auth-visualization';
import { ClaimsAndDenialsVisualization } from './claims-and-denials-visualization';

const workflows = [
  {
    id: 'ai-receptionist',
    title: 'AI Receptionist',
    description: '24/7 multi-modal intake and patient coordination via voice and text.',
  },
  {
    id: 'benefit-verification',
    title: 'Benefit Verification',
    description: 'Real-time eligibility discovery and discovery of secondary coverage.',
  },
  {
    id: 'prior-auth',
    title: 'Prior Authorisation',
    description: 'End-to-end clinical submission, portal navigation, and status tracking',
  },
  {
    id: 'claims-denials',
    title: 'Claims & Denials',
    description: 'Autonomous status checks, error identification, and intelligent appeals.',
  },
];

export function WorkflowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  // Map scroll progress to active workflow index
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * workflows.length),
        workflows.length - 1
      );
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[200vh] bg-[#02007F] px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40"
    >
      <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
        <div className="w-full h-full flex flex-col lg:flex-row">
          {/* Left Half - Workflow List */}
          <div className="w-full lg:w-1/2 bg-[#02007F] flex items-center px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 lg:py-0">
            <div className="max-w-2xl w-full">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 md:mb-20"
              >
                <h2
                  className="text-white text-[32px] md:text-[40px] lg:text-[48px] leading-tight"
                  style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
                >One Agent.<br />Every RCM Workflow.</h2>
              </motion.div>

              {/* Workflow Items */}
              <div className="space-y-6 md:space-y-8">
                {workflows.map((workflow, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.div
                      key={workflow.id}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="cursor-pointer"
                      onClick={() => setActiveIndex(index)}
                    >
                      <motion.h3
                        className="text-white mb-3 text-[24px]"
                        style={{ fontWeight: isActive ? 400 : 300 }}
                        animate={{
                          fontWeight: isActive ? 400 : 300,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {workflow.title}
                      </motion.h3>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-white/70 leading-relaxed max-w-md text-[18px]"
                          style={{ fontWeight: 300 }}
                        >
                          {workflow.description}
                        </p>
                      </motion.div>

                      {/* Separator Line */}
                      {index < workflows.length - 1 && (
                        <motion.div
                          className="mt-6 md:mt-8 h-[1px] bg-white/20"
                          animate={{
                            opacity: isActive ? 0.4 : 0.2,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Half - Workflow Visualization */}
          <div className="w-full lg:w-1/2 bg-[#02007F] flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full relative z-10 h-full flex items-center justify-center"
            >
              {workflows[activeIndex]?.id === 'ai-receptionist' ? (
                <AIReceptionistVisualization />
              ) : workflows[activeIndex]?.id === 'benefit-verification' ? (
                <BenefitVerificationVisualization />
              ) : workflows[activeIndex]?.id === 'prior-auth' ? (
                <PriorAuthVisualization />
              ) : workflows[activeIndex]?.id === 'claims-denials' ? (
                <ClaimsAndDenialsVisualization />
              ) : (
                <WorkflowVisualization activeTitle={workflows[activeIndex]?.title ?? ''} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}