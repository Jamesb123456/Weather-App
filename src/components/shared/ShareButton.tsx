import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Location } from '@/lib/api/types';

interface ShareButtonProps {
  location: Location;
}

export function ShareButton({ location }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('lat', location.latitude.toString());
    url.searchParams.set('lon', location.longitude.toString());
    url.searchParams.set('name', location.name);

    const shareUrl = url.toString();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Weather in ${location.name}`,
          text: `Check out the weather in ${location.name}`,
          url: shareUrl,
        });
      } catch {
        await copyToClipboard(shareUrl);
      }
    } else {
      await copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="glass"
            size="icon"
            onClick={handleShare}
            aria-label="Share weather"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Link copied!' : 'Share weather'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
