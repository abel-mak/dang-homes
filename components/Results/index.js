import { v4 } from "uuid";
import { PropertyCard } from "./PropertyCard.js";

export const Results = ({ properties }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {properties?.map((p) => (
        <PropertyCard key={v4()} property={p} />
      ))}
    </div>
  );
};
