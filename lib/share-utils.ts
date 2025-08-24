export interface ShareData {
  title: string;
  url: string;
  description?: string;
  image?: string;
}

export const shareUtils = {
  // Get the current page URL reliably
  getCurrentPageUrl: (): string => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  },

  // Get the base URL of the site
  getBaseUrl: (): string => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  },

  // Ensure URL is properly formatted
  formatUrl: (url: string): string => {
    if (!url) return '';
    
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a relative URL, make it absolute
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
    
    return url;
  },

  // Share on Facebook
  shareOnFacebook: (data: ShareData) => {
    const formattedUrl = shareUtils.formatUrl(data.url);
    console.log('Facebook sharing formatted URL:', formattedUrl);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(formattedUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  // Share on Twitter/X
  shareOnTwitter: (data: ShareData) => {
    const formattedUrl = shareUtils.formatUrl(data.url);
    console.log('Twitter sharing formatted URL:', formattedUrl);
    const text = `${data.title}${data.description ? ` - ${data.description}` : ''}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(formattedUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  // Share on LinkedIn
  shareOnLinkedIn: (data: ShareData) => {
    const formattedUrl = shareUtils.formatUrl(data.url);
    console.log('LinkedIn sharing formatted URL:', formattedUrl);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(formattedUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  // Share on WhatsApp
  shareOnWhatsApp: (data: ShareData) => {
    const formattedUrl = shareUtils.formatUrl(data.url);
    console.log('WhatsApp sharing formatted URL:', formattedUrl);
    const text = `${data.title}${data.description ? ` - ${data.description}` : ''} ${formattedUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  },

  // Share via Email
  shareViaEmail: (data: ShareData) => {
    const formattedUrl = shareUtils.formatUrl(data.url);
    console.log('Email sharing formatted URL:', formattedUrl);
    const subject = encodeURIComponent(data.title);
    const body = encodeURIComponent(`${data.description || ''}\n\nRead more: ${formattedUrl}`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
  },

  // Copy link to clipboard
  copyToClipboard: async (url: string): Promise<boolean> => {
    try {
      const formattedUrl = shareUtils.formatUrl(url);
      console.log('Copying formatted URL to clipboard:', formattedUrl);
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(formattedUrl);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = formattedUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        return true;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  },

  // Native sharing if available (mobile devices)
  nativeShare: async (data: ShareData): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        const formattedUrl = shareUtils.formatUrl(data.url);
        await navigator.share({
          title: data.title,
          text: data.description || '',
          url: formattedUrl,
        });
        return true;
      } catch (error) {
        console.error('Native sharing failed:', error);
        return false;
      }
    }
    return false;
  },

  // Get shareable URL for current page
  getCurrentShareUrl: (): string => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  },

  // Get shareable URL for specific article
  getArticleShareUrl: (articleId: string): string => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      return `${baseUrl}/news/${articleId}`;
    }
    return '';
  }
};
