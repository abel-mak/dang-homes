import { ButtonLink } from "components/ButtonLink/ButtonLink";

export const CallToActionButton = ({ destination, label, align }) => {
  return (
    <div className={`text-${align} w-full relative`}>
      <ButtonLink destination={destination} label={label} />
    </div>
  );
};
