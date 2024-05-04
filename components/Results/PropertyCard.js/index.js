import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";

export const PropertyCard = ({ property }) => {
  const { uri, featuredImage, title, propertyCustomFields } = property;
  const { price, bathroom, bedroom, hasParking, petFriendly } = propertyCustomFields;
  
  return (
    <Link
      href={uri}
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full">
        <Image
          src={featuredImage?.node.sourceUrl}
          alt=""
          height={200}
          width={300}
          className="object-cover"
        ></Image>
      </div>
      <div className="mt-3 text-lg font-bold">{title}</div>
      <div className="text-lg">
        {numeral(price).format("0,0")}
      </div>
      <div className="flex justify-between text-sm mt-3">
        <div>
            <FontAwesomeIcon icon={faBathtub}></FontAwesomeIcon>
            <span className="pl-2">{bathroom} bathroom</span>
        </div>
        <div>
            <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
            <span className="pl-2">{bedroom} bedroom</span>
        </div>
      </div>
        {(!!hasParking || !!petFriendly) && (
          <div className="flex justify-between text-sm mt-3">
            <div>
              {!!hasParking && (
                <>
                  <FontAwesomeIcon icon={faCar}></FontAwesomeIcon> 
                  <span className="pl-2">parking available</span>

                </>
              )}
            </div>
            <div>
              {!!petFriendly && (
                <>
                  <FontAwesomeIcon icon={faDog}></FontAwesomeIcon> pet friendly
                </>
              )}
            </div>

          </div>
        )}
    </Link>
  );
  // <div>{property.title}</div>;
};
