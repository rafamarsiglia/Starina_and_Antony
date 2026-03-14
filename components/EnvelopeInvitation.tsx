import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeInvitationProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenComplete: () => void;
}

const EnvelopeInvitation: React.FC<EnvelopeInvitationProps> = ({ isOpen, onOpen, onOpenComplete }) => {
  const [status, setStatus] = useState<'closed' | 'pressing' | 'opening' | 'open'>(isOpen ? 'open' : 'closed');

  // Audio refs
  const crackSound = useMemo(() => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
    audio.onerror = () => {}; // Silently handle load errors
    return audio;
  }, []);

  useEffect(() => {
    crackSound.volume = 0.2;
  }, [crackSound]);

  useEffect(() => {
    if (isOpen && status === 'closed') {
      handleOpenSequence();
    } else if (!isOpen && status === 'open') {
      handleCloseSequence();
    }
  }, [isOpen]);

  const handleOpenSequence = () => {
    setStatus('pressing');
    try {
      const playPromise = crackSound.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {}); // Ignore interaction errors
      }
    } catch (e) {}

    setTimeout(() => {
      setStatus('opening');
      
      setTimeout(() => {
        setStatus('open');
        onOpenComplete();
      }, 800);
    }, 200);
  };

  const handleCloseSequence = () => {
    setStatus('opening');
    setTimeout(() => {
      setStatus('closed');
    }, 1200);
  };

  const handleSealClick = () => {
    if (status === 'closed') {
      onOpen();
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: status === 'open' ? 0 : 1,
        pointerEvents: status === 'open' ? 'none' : 'auto'
      }}
      transition={{ duration: 1, delay: status === 'open' ? 0.3 : 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f8f5f0] overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      
      {/* Centered Container for Wax Seal */}
      <motion.div 
        className="relative flex flex-col items-center justify-center gap-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Wax Seal */}
        <motion.div
          className="relative z-40 cursor-pointer"
          onClick={handleSealClick}
          initial={false}
          whileHover={status === 'closed' ? { scale: 1.05 } : {}}
          whileTap={status === 'closed' ? { scale: 0.95 } : {}}
          animate={
            status === 'pressing' ? { scale: 0.98 } :
            status === 'opening' || status === 'open' ? { 
              y: -60,
              opacity: 0,
              scale: 1.1,
              rotate: 5,
            } : { 
              scale: 1,
              y: 0,
              opacity: 1,
              rotate: 0,
            }
          }
          transition={{ 
            duration: status === 'pressing' ? 0.2 : 0.8,
            ease: "easeInOut"
          }}
        >
          <img 
            src="http://thedominguezjerez.com/wp-content/uploads/2026/03/sello-de-parafina3-scaled.webp"
            alt="Wax Seal"
            className="w-[24px] scale-50 h-auto object-contain drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Instruction Text */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ 
            opacity: status === 'closed' ? 0.6 : 0,
            y: status === 'closed' ? 0 : 5
          }}
          transition={{ duration: 1, delay: 0.8 }}
          className="serif text-wedding-gold text-[9px] uppercase tracking-[0.5em] font-medium"
        >
          Click on the seal
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default EnvelopeInvitation;
