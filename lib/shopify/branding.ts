// lib/shopify/branding.ts
import { BRANDING_QUERY } from './queries/branding';
import { shopifyFetch } from './index';

export type BrandImage = {
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type Branding = {
  brandName?: string | null;
  logoLight?: BrandImage | null;
  logoDark?: BrandImage | null;
  banner?: BrandImage | null;
  colors?: {
    background?: string | null;
    text?: string | null;
    accent?: string | null;
    productButton?: string | null;
    productButtonHover?: string | null;
  };
};

function mapFields(meta: any): Record<string, any> {
  const m: Record<string, any> = {};
  for (const f of meta?.fields ?? []) m[f.key] = f;
  return m;
}
function asImage(ref: any): BrandImage | null {
  const img = ref?.image;
  return img?.url ? { url: img.url, alt: img.altText, width: img.width, height: img.height } : null;
}

export async function getBrandingByHandle(handle: string): Promise<Branding | null> {
  const { data } = await shopifyFetch({
    query: BRANDING_QUERY,
    variables: { type: 'branding', handle }
  });
  const meta = data?.metaobject;
  if (!meta) return null;

  const f = mapFields(meta);
  return {
    brandName: f.brand_name?.value ?? null,
    logoLight: asImage(f.logo_light?.reference) ?? null,
    logoDark: asImage(f.logo_dark?.reference) ?? null,
    banner: asImage(f.banner?.reference) ?? null,
    colors: {
      background: f.background_color?.value ?? null,
      text: f.text_color?.value ?? null,
      accent: f.accent_color?.value ?? null,
      productButton: f.product_button_color?.value ?? null,
      productButtonHover: f.product_button_hover_color?.value ?? null
    }
  };
}
