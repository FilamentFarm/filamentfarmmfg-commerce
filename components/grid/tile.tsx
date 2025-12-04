// components/grid/tile.tsx
import Image from 'next/image';
import Label from 'components/label';

type LabelData = {
  position?: 'bottom' | 'center';
  title: string;
  amount: string;
  currencyCode: string;
};

type GridTileImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  // legacy/fallback mode
  fill?: boolean;
  // intrinsic mode
  width?: number;
  height?: number;
  label?: LabelData;
  // NEW: used by gallery thumbnails to indicate selection
  active?: boolean;
  borderColor?: string;
  borderWidth?: string; // NEW: Added borderWidth prop
};

export function GridTileImage({
  src,
  alt,
  className = '',
  priority,
  sizes,
  fill,
  width,
  height,
  label,
  active,
  borderColor,
  borderWidth // Destructure new prop
}: GridTileImageProps) {
  const hasIntrinsic = Boolean(width && height) && !fill;

  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl bg-[var(--bg-color)]',
        // Add border classes
        borderColor ? 'border border-solid' : '',
        // highlight when active (used in product gallery)
        active ? 'ring-2 ring-offset-2 ring-[var(--accent-color)] ring-offset-[var(--bg-color)]' : '',
        // Only force a square when we don't know the image ratio
        hasIntrinsic ? '' : 'aspect-square',
        className
      ].join(' ')}
      style={{
        ...(hasIntrinsic ? { aspectRatio: `${width}/${height}` } : {}),
        ...(borderColor ? { borderColor: borderColor } : {}),
        ...(borderWidth ? { borderWidth: borderWidth } : {}) // Apply dynamic border width
      }}
      aria-current={active ? 'true' : undefined}
    >
      {hasIntrinsic ? (
        <Image
          src={src}
          alt={alt}
          width={width!}
          height={height!}
          priority={priority}
          sizes={sizes}
          className="block h-auto w-full object-contain"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain"
        />
      )}

      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}