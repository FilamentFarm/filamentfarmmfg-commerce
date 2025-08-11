// lib/client-config.ts

export type ClientConfig = {
  name: string;
  logoUrl: string;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    productPageBackground?: string;
    productButtonColor?: string;
    productButtonHoverColor?: string;
  };
  shopifyCollectionHandle: string;
};

export const CLIENT_CONFIGS: Record<string, ClientConfig> = {
  kongclave: {
    name: "Kongclave Miniatures",
    logoUrl: "/logos/kongclave.png",
    theme: {
      primaryColor: "#121212",
      backgroundColor: "#202020",
      textColor: "#ffffff",
      productPageBackground: "#121212",        
      productButtonColor: "#004cd9",           
      productButtonHoverColor: "#0068db"      
    },
    shopifyCollectionHandle: "client-kongclave"
  },

  monstersinc: {
    name: "Monsters Inc.",
    logoUrl: "/logos/monsters inc logo.png',", // served from /public
    theme: {
      primaryColor: "#045B5D",
      backgroundColor: "#575757",
      textColor: "#ffffff",
      productPageBackground: "#f3f3f3",        
      productButtonColor: "#2a5298",           
      productButtonHoverColor: "#1e3a8a"  
    },
    shopifyCollectionHandle: "client-monstersinc"
  },
  
  // Add more clients here as needed
};
