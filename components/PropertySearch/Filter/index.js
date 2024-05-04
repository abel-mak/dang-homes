import { Input } from "components/Input";

export const Filter = () => {
  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="curstor-pointer">
            <input type="checkbox"></input>
            <span>has parking</span>
          </label>
        </div>
        <div>
          <label className="curstor-pointer">
            <input type="checkbox"></input>
            <span>pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input type="number"/>
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input type="number"/>
      </div>
      <div>
        <div className="btn">search</div>
      </div>
    </div>
  );
};
