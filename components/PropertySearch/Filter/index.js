import { Input } from "components/Input";
import { useEffect, useState } from "react";

export const Filter = ({ updateQuery, submit, query }) => {
  const [hasParking, setHasParking] = useState(query?.hasParking == "true");
  const [petFriendly, setPetFriendly] = useState(query?.petFriendly == "true");
  const [minPrice, setMinPrice] = useState(query?.minPrice);
  const [maxPrice, setMaxPrice] = useState(query?.maxPrice);
  // useEffect(() => console.log(hasParking), [hasParking]);
  console.log("filter query", query);
  // useEffect(() => {

  // }, [])
  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="curstor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={(e) => {
                updateQuery("hasParking", !hasParking);
                setHasParking(!hasParking);
              }}
            ></input>
            <span>has parking</span>
          </label>
        </div>
        <div>
          <label className="curstor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={(e) => {
                updateQuery("petFriendly", !petFriendly);
                setPetFriendly(!petFriendly);
              }}
            ></input>
            <span>pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input
          type="number"
          value={minPrice}
          onChange={(e) => {
            updateQuery("minprice", e.target.value);
            setMinPrice(e.target.value);
          }}
        />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            updateQuery("maxprice", e.target.value);
            setMaxPrice(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="btn" onClick={() => submit()}>
          search
        </div>
      </div>
    </div>
  );
};
