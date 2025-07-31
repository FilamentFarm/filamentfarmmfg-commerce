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
      primaryColor: "#820000",
      backgroundColor: "#000000",
      textColor: "#ffffff"
    },
    shopifyCollectionHandle: "client-kongclave"
  },

export const CLIENT_CONFIGS: Record<string, ClientConfig> = {
  monstersinc: {
    name: "Monsters Inc.",
    logoUrl: "/clients/monstersinc/logo.svg",
    theme: {
      primaryColor: "#045B5D",
      backgroundColor: "#ff0033",
      textColor: "#ffffff"
    },
    shopifyCollectionHandle: "client-monstersinc"
  },
  
  // Add more clients here as needed
};
