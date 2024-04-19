import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import MenuItems from "components/MenuItems/MenuItems";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export default function Home(props) {
  console.log("props", props);

  return (
    <div>
      <MenuItems
        menuItems={props.menuItems}
        callToActionButton={props.callToActionButton}
      ></MenuItems>
      <BlockRenderer blocks={props.blocks}></BlockRenderer>;
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks(postTemplate: false)
            title
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
          }
        }
        acfOptionsMainMenu {
          mainMenu {
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
  });
  console.log(data.nodeByUri.blocks);
  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      menuItems: data?.acfOptionsMainMenu?.mainMenu?.menuItems,
      callToActionButton:
        data?.acfOptionsMainMenu?.mainMenu?.callToActionButton,
    },
  };
};
