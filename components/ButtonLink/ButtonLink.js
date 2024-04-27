import Link from "next/link";

//call to action = cta
export const ButtonLink = ({destination, label}) => {
  return (
    <Link
      className="btn"
      href={destination || ''}
    >
      {label || ''}
    </Link>
  );
};
