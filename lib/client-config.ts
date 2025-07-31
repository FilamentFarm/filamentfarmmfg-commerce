// lib/client-config.ts

export type ClientConfig = {
  name: string;
  logoUrl: string;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  shopifyCollectionHandle: string;
};

export const CLIENT_CONFIGS: Record<string, ClientConfig> = {
  kongclave: {
    name: "Kongclave Miniatures",
    logoUrl: "/clients/kongclave/logo.svg",
    theme: {
      primaryColor: "#121212",
      backgroundColor: "#202020",
      textColor: "#ffffff"
    },
    shopifyCollectionHandle: "client-kongclave"
  },

  monstersinc: {
    name: "Monsters Inc.",
    logoUrl: "/clients/monstersinc/logo.svg",
    theme: {
      primaryColor: "#045B5D",
      backgroundColor: "#575757",
      textColor: "#ffffff"
    },
    shopifyCollectionHandle: "client-monstersinc"
  },
  
  // Add more clients here as needed
};
