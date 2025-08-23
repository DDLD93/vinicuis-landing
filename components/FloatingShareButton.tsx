'use client';

import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import ShareButton from './ShareButton';
import { ShareData } from '@/lib/share-utils';

interface FloatingShareButtonProps {
  data: ShareData;
  className?: string;
}

export default function FloatingShareButton({ data, className = '' }: FloatingShareButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show floating button after scrolling
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className={`fixed bottom-20 right-6 z-40 ${className}`}>
      <ShareButton
        data={data}
        size="lg"
        variant="default"
        className="shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
      />
    </div>
  );
}
