'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Utensils } from 'lucide-react';

const FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="none"><rect width="400" height="300" fill="%23FDFAF7"/><rect x="10" y="10" width="380" height="280" rx="20" fill="%23FFF0E8" stroke="%238B0000" stroke-opacity="0.15" stroke-width="2"/><circle cx="200" cy="130" r="40" fill="%238B0000" fill-opacity="0.08"/><path d="M192 115v30m8-30v30m8-30v30m-16 0c0 8 16 8 16 0m-8 0v18" stroke="%238B0000" stroke-width="2.5" stroke-linecap="round"/><text x="200" y="200" text-anchor="middle" fill="%238B0000" font-family="system-ui, sans-serif" font-weight="800" font-size="15">Giri Royal Restaurant</text></svg>`;

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export default function SafeImage({ src, alt, fallbackSrc, className, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  const imgSrc = error || !src ? (fallbackSrc || FALLBACK_SVG) : src;

  if (error) {
    return (
      <div className={`relative w-full h-full bg-[#FDFAF7] flex flex-col items-center justify-center border border-[#8B0000]/10 p-3 text-center ${className || ''}`}>
        <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center mb-1">
          <Utensils className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-[#8B0000] line-clamp-1">{alt || 'Royal Restaurant'}</span>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || 'Giri Restaurant'}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

export { FALLBACK_SVG };
