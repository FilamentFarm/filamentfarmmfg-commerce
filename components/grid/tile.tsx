// components/grid/tile.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils'; // if you already have a cn utility

type GridTileImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  // NEW: pass these to enable intrinsic layout
  width?: number;
  height?: number;
};

export function GridTileImage({
  src,
  alt,
  className = '',
  priority,
  width,
  height
}: GridTileImageProps) {
  const hasIntrinsic = Boolean(width && height);

  return (
    <div
      className={cn(
        // remove any fixed height here; let content define height
        'relative overflow-hidden rounded-2xl bg-[var(--bg-color)]',
        // keep square fallback if we don’t have dimensions
        hasIntrinsic ? '' : 'aspect-square',
        className
      )}
      // optional: if you’d like, you can set explicit aspect-ratio too
      style={hasIntrinsic ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        // With width/height provided, Next auto uses an intrinsic, responsive layout
        width={width ?? 1200}
        height={height ?? 1200}
        priority={priority}
        className="block h-auto w-full object-contain"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
