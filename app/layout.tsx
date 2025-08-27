// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

import { getClientConfig } from 'lib/get-client-config';
import Navbar from 'components/layout/navbar';
import Footer from 'components/layout/footer';

export const metadata: Metadata = {
  title: 'Filament Farm Storefront',
  description: 'Headless Shopify storefront'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Load client config (theme + branding)
  const cfg = await getClientConfig();

  const theme = cfg?.theme ?? {};
  const backgroundColor = theme.backgroundColor ?? '#0B0B0B';
  const textColor = theme.textColor ?? '#FFFFFF';
  const accentColor = theme.accentColor ?? '#8B5CF6';
  const productButtonColor = theme.productButtonColor ?? accentColor;
  const productButtonHoverColor = theme.productButtonHoverColor ?? accentColor;

  // Brand object passed to Navbar/Footer
  const brand = {
    name: cfg?.name ?? 'Store',
    logoUrl: cfg?.branding?.logoLight?.url ?? cfg?.logoUrl ?? '',
    homeHref: '/' // keep home link root; subdomain theming handled in middleware
  };

  return (
    <html lang="en">
      <body
        className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] antialiased"
        style={
          {
            // Theme CSS variables
            ['--bg-color' as any]: backgroundColor,
            ['--text-color' as any]: textColor,
            ['--accent-color' as any]: accentColor,
            ['--product-button' as any]: productButtonColor,
            ['--product-button-hover' as any]: productButtonHoverColor
          } as React.CSSProperties
        }
      >
        <Navbar brand={brand} />
        {children}
        <Footer brand={brand} />
      </body>
    </html>
  );
}
