import { Pagination } from "components/Pagination";
import { Results } from "components/Results";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Filter } from "./Filter";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const query = {};
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageClick = (pageNumber) => {
    router.push(`${router.query.slug.join("/")}?page=${pageNumber}`);
  };

  for (const key of searchParams.keys()) {
    query[key] = searchParams.get(key);
  }
  useEffect(() => {
    const search = async () => {
      const response = await fetch(
        "/api/properties?" + new URLSearchParams(query)
      );
      const json = await response.json();
      const totalResults = json?.pageInfo?.offsetPagination.total;

      setProperties(json.nodes);
      setTotalPages(Math.ceil(totalResults / 4));
      // console.log("pages", json?.pageInfo?.offsetPagination.total)
    };
    search();
  }, []);

  return (
    <div>
      <Filter/>
      <Results properties={properties}></Results>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick}></Pagination>
    </div>
  );
};
