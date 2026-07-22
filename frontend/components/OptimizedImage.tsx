import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  variant?: 'hero' | 'card' | 'thumbnail' | 'responsive';
}

/**
 * OptimizedImage - Wrapper for Next.js Image with preset sizes and optimizations
 * Reduces boilerplate and ensures consistent image handling across the app
 */
export default function OptimizedImage({
  src,
  alt,
  variant = 'responsive',
  priority = false,
  sizes,
  ...props
}: OptimizedImageProps) {
  // Preset configurations for common image types
  const configs = {
    hero: {
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px',
      priority: true,
      className: 'object-cover',
    },
    card: {
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
      priority: false,
      className: 'object-cover',
    },
    thumbnail: {
      sizes: '(max-width: 640px) 60px, 80px',
      priority: false,
      className: 'object-cover rounded-lg',
    },
    responsive: {
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px',
      priority: false,
      className: 'object-cover',
    },
  };

  const config = configs[variant];

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority || config.priority}
      sizes={sizes || config.sizes}
      className={config.className}
      quality={85} // Balance between quality and performance
      {...props}
    />
  );
}
