import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";

export default function Pages(props) {
  // console.log(props);
  console.log(props);
  return <BlockRenderer blocks={props.blocks}></BlockRenderer>
}

export const getStaticProps = async (context) => {
  const uri = `/${context.params.slug.join("/")}/`;
  const { data } = await client.query({
    query: gql`
      query NewQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks(postTemplate: false)
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });
  const { blocks, id, title } = data.nodeByUri;
  return {
    props: { blocks, id, title },
  };
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPAgesQuery {
        pages {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: data.pages.nodes
      .filter((page) => page.uri != "/")
      .map((page) => {
        return {
          params: {
            slug: page.uri.substring(1, page.uri.length - 1).split("/"),
          },
        };
      }),
    fallback: "blocking",
  };
};
