// lib/shopify/queries/branding.ts
export const BRANDING_QUERY = `#graphql
  query Branding($type: String!, $handle: String!) {
    metaobject(handle: { type: $type, handle: $handle }) {
      id
      type
      handle
      fields {
        key
        type
        value
        reference {
          __typename
          ... on MediaImage { image { url altText width height } }
        }
      }
    }
  }
`;