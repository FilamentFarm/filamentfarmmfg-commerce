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

// Build a key->field map from metaobject.fields
function fieldMap(meta: any): Record<string, any> {
  const map: Record<string, any> = {};
  for (const f of meta?.fields ?? []) {
    map[f.key] = f;
  }
  return map;
}

function asImage(ref: any): BrandImage | null {
  const img = ref?.image;
  return img?.url ? { url: img.url, alt: img.altText, width: img.width, height: img.height } : null;
}

export async function getBrandingByHandle(handle: string): Promise<Branding | null> {
  const resp = await shopifyFetch({
    query: BRANDING_QUERY,
    variables: { type: 'branding', handle }
  });

  const meta = (resp as any)?.body?.data?.metaobject;
  if (!meta) return null;

  const m = fieldMap(meta);

  return {
    brandName: m.brand_name?.value ?? null,
    logoLight: asImage(m.logo_light?.reference) ?? null,
    logoDark: asImage(m.logo_dark?.reference) ?? null,
    banner: asImage(m.banner?.reference) ?? null,
    colors: {
      background: m.background_color?.value ?? null,
      text: m.text_color?.value ?? null,
      accent: m.accent_color?.value ?? null,
      productButton: m.product_button_color?.value ?? null,
      productButtonHover: m.product_button_hover_color?.value ?? null
    }
  };
}
