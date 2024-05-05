import { Pagination } from "components/Pagination";
import { Results } from "components/Results";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Filter } from "./Filter";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  /** set query initial state*/
  const tmpQuery = {};
  for (const key of searchParams.keys()) {
    const value = searchParams.get(key);
    if (
      (key.toLowerCase() != "hasParking" &&
        key.toLowerCase() != "petFriendly") ||
      value == "true"
    )
      tmpQuery[key.toLowerCase()] = searchParams.get(key);
  }
  const [query, setQuery] = useState(tmpQuery);

  const search = async () => {
    const response = await fetch(
      "/api/properties?" + new URLSearchParams(query)
    );
    const json = await response.json();
    const totalResults = json?.pageInfo?.offsetPagination.total;

    setProperties(json.nodes);
    setTotalPages(Math.ceil(totalResults / 4));
    console.log("search", query);
    // console.log("pages", json?.pageInfo?.offsetPagination.total)
  };

  const handlePageClick = (pageNumber) => {
    router.push(`${router.query.slug.join("/")}?page=${pageNumber}`);
  };

  const updateQuery = (key, value) => {
    query[key] = value;
  };

  const submit = () => {
    const tmpQuery = query;
    delete tmpQuery.page;
    delete tmpQuery.slug;
    router.push(`${router.query.slug.join("/")}?${new URLSearchParams(query)}`);
  };

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <Filter updateQuery={updateQuery} submit={submit} query={query} />
      <Results properties={properties}></Results>
      <Pagination
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      ></Pagination>
    </div>
  );
};
