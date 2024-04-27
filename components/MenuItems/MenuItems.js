import { ButtonLink } from "components/ButtonLink/ButtonLink";
import Link from "next/link";
import { FaHouseUser, FaHeart } from "react-icons/fa";
import { v4 } from "uuid";

export default function MenuItems({ menuItems, callToActionButton }) {
  // console.log(props);
  return (
    <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
      <div className="py-4 pl-5 flex text-pink-600">
        <FaHouseUser size={30}></FaHouseUser>
        <FaHeart size={30}></FaHeart>
      </div>
      <div className="flex flex-1 justify-end">
        {(menuItems || []).map((item) => {
          const id = v4();
          return (
            <div
              key={id}
              className="hover:bg-slate-700 cursor-pointer relative group"
            >
              <Link href={item.menuItem.destination.uri} className="p-5 block">
                {item.menuItem.label}
              </Link>
              {!!item.items?.length && (
                <div className="group-hover:block hidden absolute bg-slate-800 text-right right-0 top-full -mt-3">
                  {(item.items || []).map((subItem) => {
                    return (
                      <div key={v4()}>
                        <Link
                          href={subItem.destination.uri}
                          className="block whitespace-nowrap p-5 hover:bg-slate-700"
                        >
                          {subItem.label}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="ml-3 my-auto">
        <ButtonLink
          destination={callToActionButton.destination}
          label={callToActionButton.label}
        />
      </div>
    </div>
  );
}
