import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function EnvelopeInvitation({ isOpen, onOpen, onOpenComplete }) {
  const [opened, setOpened] = useState(isOpen);

  useEffect(() => {
    setOpened(isOpen);
  }, [isOpen]);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
    if (onOpen) onOpen();

    setTimeout(() => {
      onOpenComplete && onOpenComplete();
    }, 2000);
  };

  if (isOpen && opened && typeof window !== 'undefined' && localStorage.getItem('wedding_intro_seen') === 'true') {
    // If it was already seen, we might want to hide it, but App handles that with opacity.
    // However, the user's code is a fixed overlay.
  }

  return (
    <motion.div 
      initial={false}
      animate={{ 
        opacity: opened ? 0 : 1,
        pointerEvents: opened ? 'none' : 'auto'
      }}
      transition={{ duration: 1, delay: 1.5 }}
      className="fixed inset-0 flex items-center justify-center bg-[#f8f5f0] z-[100]"
    >
      <div className="relative w-[320px] h-[200px]">
        {/* Envelope body */}
        <div className="absolute bottom-0 w-full h-[120px] bg-[#efe6db] shadow-xl rounded-sm" />

        {/* Envelope left flap */}
        <div className="absolute bottom-0 left-0 w-0 h-0 
        border-t-[120px] border-t-transparent 
        border-r-[160px] border-r-[#e5d9cc]" />

        {/* Envelope right flap */}
        <div className="absolute bottom-0 right-0 w-0 h-0 
        border-t-[120px] border-t-transparent 
        border-l-[160px] border-l-[#e5d9cc]" />

        {/* Top flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: opened ? -180 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute top-0 w-0 h-0
          border-l-[160px] border-l-transparent
          border-r-[160px] border-r-transparent
          border-b-[100px] border-b-[#e5d9cc] z-[20]"
        />

        {/* Letter */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: opened ? -140 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] h-[160px] bg-white shadow-lg rounded-sm flex items-center justify-center z-[10]"
        >
          <p className="text-[#c6a769] tracking-[0.4em] text-xs uppercase text-center px-4">
            Starina & Anthony
          </p>
        </motion.div>

        {/* Wax seal */}
        <motion.img
          src="http://thedominguezjerez.com/wp-content/uploads/2026/03/sello-de-parafina3-scaled.webp"
          className="absolute left-1/2 -translate-x-1/2 top-[70px] w-[38px] cursor-pointer drop-shadow-xl z-[30]"
          onClick={openEnvelope}
          animate={
            opened
              ? { scale: 1.4, opacity: 0, rotate: 25 }
              : { scale: 1 }
          }
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}
