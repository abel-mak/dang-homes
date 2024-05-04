import { gql } from "@apollo/client";
import client from "client";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
      query NewQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks(postTemplate: false)
            title
          }
          ... on Property {
            id
            title
            blocks(postTemplate: false)
            propertyCustomFields {
              bathrooms
              bedrooms
              hasParking
              petFriendly
              price
            }
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on Page {
                  id
                  uri
                }
              }
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
              items {
                label
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });
  console.log("===================");

  return {
    props: {
      blocks: data.nodeByUri.blocks
        ? data.nodeByUri.blocks
        : null,
      menuItems: data?.acfOptionsMainMenu?.mainMenu?.menuItems,
      callToActionButton:
        data?.acfOptionsMainMenu?.mainMenu?.callToActionButton,
    },
  };
};
