import { gql } from "@apollo/client";
import client from "client";
const PAGE_SIZE = 4;

export default async function properties(req, res) {
  const {
    bathrooms,
    bedrooms,
    hasParking,
    petFriendly,
    page = 1,
    minPrice,
    maxPrice,
  } = req.query;
  const offset = ((page < 1 ? 1 : page) - 1) * PAGE_SIZE;
  // console.log(req.query);
  let filter = "[";
  if (hasParking)
    filter += `{ key: "has_parking" value: "${Number(
      hasParking == "true"
    )}" },`;
  if (petFriendly)
    filter += `{ key: "pet_friendly" value: "${Number(
      petFriendly == "true"
    )}" },`;
  if (bathrooms) filter += `{ key: "bathrooms", value: "${bathrooms}" },`;
  if (bedrooms) filter += `{ key: "bedrooms", value: "${bedrooms}" },`;
  if (minPrice)
    filter += `{key: "price", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC value: "${minPrice}"},`;
  if (maxPrice)
    filter += `{key: "price", value: ${maxPrice}, type: NUMERIC, compare: LESS_THAN_OR_EQUAL_TO},`;
  filter += "]";

  const { data } = await client.query({
    query: gql`
    query NewQuery {
      properties(where: { 
        metaQuery:{ metaArray: ${filter}}, 
        offsetPagination: {offset: ${offset}, size: ${PAGE_SIZE}}}) {
          nodes {
          propertyCustomFields {
            bathrooms
            bedrooms
            fieldGroupName
            hasParking
            petFriendly
            price
          }
          title
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }
    `,
  });
  // console.log(filter);
  return res.send({
    nodes: data.properties.nodes,
    pageInfo: data.properties.pageInfo,
  });
}
