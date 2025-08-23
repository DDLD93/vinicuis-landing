'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check, MessageCircle } from 'lucide-react';
import { shareUtils, ShareData } from '@/lib/share-utils';

interface ShareButtonProps {
  data: ShareData;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export default function ShareButton({ 
  data, 
  className = '', 
  size = 'md',
  variant = 'default'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Size classes
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border border-red-600 text-red-600 hover:bg-red-50',
    ghost: 'text-red-600 hover:bg-red-50'
  };

  const handleCopy = async () => {
    const success = await shareUtils.copyToClipboard(data.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Show toast notification
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast({
          type: 'success',
          title: 'Link copied!',
          message: 'Article link has been copied to your clipboard.',
          duration: 3000
        });
      }
    }
  };

  const handleNativeShare = async () => {
    const success = await shareUtils.nativeShare(data);
    if (success) {
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      label: 'Facebook',
      icon: Facebook,
      action: () => shareUtils.shareOnFacebook(data),
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      label: 'Twitter/X',
      icon: Twitter,
      action: () => shareUtils.shareOnTwitter(data),
      color: 'hover:bg-sky-50 hover:text-sky-600'
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      action: () => shareUtils.shareOnLinkedIn(data),
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      action: () => shareUtils.shareOnWhatsApp(data),
      color: 'hover:bg-green-50 hover:text-green-600'
    },
    {
      label: 'Email',
      icon: Mail,
      action: () => shareUtils.shareViaEmail(data),
      color: 'hover:bg-gray-50 hover:text-gray-600'
    },
    {
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopy,
      color: copied ? 'text-green-600' : 'hover:bg-gray-50 hover:text-gray-600'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-lg font-medium transition-all duration-200 
          flex items-center gap-2 shadow-sm hover:shadow-md
          ${className}
        `}
        title="Share this article"
        aria-label="Share this article"
      >
        <Share2 className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}`} />
        {size !== 'sm' && <span>Share</span>}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-slide-up">
          {/* Native Share Option (mobile) */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 text-gray-700"
            >
              <Share2 className="h-5 w-5 text-gray-500" />
              <span>Share via...</span>
            </button>
          )}

          {/* Social Media Options */}
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.action();
                if (option.label !== 'Copy Link' && option.label !== 'Copied!') {
                  setIsOpen(false);
                }
              }}
              className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center gap-3 text-gray-700 ${option.color}`}
            >
              <option.icon className="h-5 w-5" />
              <span>{option.label}</span>
            </button>
          ))}

          {/* Article Info */}
          <div className="px-4 py-3 border-t border-gray-100 mt-2">
            <p className="text-xs text-gray-500">
              Share this article with your network
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
