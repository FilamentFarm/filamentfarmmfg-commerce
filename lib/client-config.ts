export type ClientConfig = {
  name: string;
  logoUrl: string;
  bannerUrl?: string; // Optional banner URL
  theme: ClientTheme;
  shopifyCollectionHandle: string;
  contact?: ClientContactConfig;
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

export type ClientContactConfig = {
  recipientEmail: string;
  subjectPrefix?: string;
  successMessage?: string;
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
    shopifyCollectionHandle: "client-kongclave",
    contact: {
      recipientEmail: "contact+kongclave@filamentfarmmfg.com",
      subjectPrefix: "[Kongclave Miniatures]",
      successMessage: "Thanks for reaching out to Kongclave Miniatures. We'll reply shortly."
    }
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
    shopifyCollectionHandle: "monsters-inc",
    contact: {
      recipientEmail: "contact+monstersinc@filamentfarmmfg.com",
      subjectPrefix: "[Monsters Inc.]",
      successMessage: "Thanks for contacting Monsters Inc. We'll get back to you soon."
    }
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
    shopifyCollectionHandle: "micos-minis",
    contact: {
      recipientEmail: "contact+micosminis@filamentfarmmfg.com",
      subjectPrefix: "[Mico's Minis]",
      successMessage: "Thanks for contacting Mico's Minis. We'll reply within one business day."
    }
  }

  // Add more clients here as needed
};
