export type ClientConfig = {
  name: string;
  logoUrl: string;
  bannerUrl?: string; // Optional banner URL
  theme: ClientTheme;
  shopifyCollectionHandle: string;
};

export type ClientTheme = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  productPageBackground?: string;
  productButtonColor?: string;
  productButtonHoverColor?: string;
  productCardBorderWidth?: string;
};

export const CLIENT_CONFIGS: Record<string, ClientConfig> = {
  kongclave: {
    name: "Kongclave Miniatures",
    logoUrl: "/logos/kongclave.png",
    //bannerUrl: "/logos/kongclave-banner.png", // EXAMPLE: Add a banner URL for Kongclave
    theme: {
      primaryColor: "#121212",
      backgroundColor: "#202020",
      textColor: "#ffffff",
      productPageBackground: "#121212",
      productButtonColor: "#004cd9",
      productButtonHoverColor: "#0068db",
      productCardBorderWidth: "1px"
    },
    shopifyCollectionHandle: "client-kongclave"
  },

  monstersinc: {
    name: "Monsters Inc.",
    logoUrl: "/logos/monstersinc.png",
    theme: {
      primaryColor: "#343434ff",
      backgroundColor: "#575757",
      textColor: "#ffffff",
      productPageBackground: "#575757",
      productButtonColor: "#2a5298",
      productButtonHoverColor: "#1e3a8a",
      productCardBorderWidth: "1px"
    },
    shopifyCollectionHandle: "monsters-inc"
  },

  micosminis: {
    name: "Mico's Minis",
    logoUrl: "/logos/micosminis.png",
    bannerUrl: "/logos/micosminisbanner.png",
    theme: {
      primaryColor: "#110805",
      backgroundColor: "#110805",
      textColor: "#ffffff",
      productPageBackground: "#110805",
      productButtonColor: "#be4e00",
      productButtonHoverColor: "#712e00",
      productCardBorderWidth: "1px"
    },
    shopifyCollectionHandle: "micos-minis"
  }

  // Add more clients here as needed
};
