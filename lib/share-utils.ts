export interface ShareData {
  title: string;
  url: string;
  description?: string;
  image?: string;
}

export const shareUtils = {
  // Share on Facebook
  shareOnFacebook: (data: ShareData) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  // Share on Twitter/X
  shareOnTwitter: (data: ShareData) => {
    const text = `${data.title}${data.description ? ` - ${data.description}` : ''}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  // Share on LinkedIn
  shareOnLinkedIn: (data: ShareData) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
  },

  // Share on WhatsApp
  shareOnWhatsApp: (data: ShareData) => {
    const text = `${data.title}${data.description ? ` - ${data.description}` : ''} ${data.url}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  },

  // Share via Email
  shareViaEmail: (data: ShareData) => {
    const subject = encodeURIComponent(data.title);
    const body = encodeURIComponent(`${data.description || ''}\n\nRead more: ${data.url}`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
  },

  // Copy link to clipboard
  copyToClipboard: async (url: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.description || '',
          url: data.url,
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
