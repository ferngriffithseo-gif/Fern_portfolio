import type { Media as MediaContent } from '@/content/portfolio';
export function Media({ media, className, eager = false }: { media: MediaContent; className?: string; eager?: boolean }) {
  return media.videoSrc ? <video className={className} controls playsInline preload="none" poster={media.src} aria-label={media.alt}><source src={media.videoSrc} />Your browser does not support this video.</video> : <img className={className} src={media.src} alt={media.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}
