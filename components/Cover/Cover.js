
import Image from "next/image";

export const Cover = ({ children, background }) => {
  return <div className="h-screen bg-slate-800 relative flex justify-center items-center text-white">
    <Image alt="" src={background} fill className="mix-blend-soft-light"/>
    {children}
    </div>;
};
