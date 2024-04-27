import { BlockRenderer } from "components/BlockRenderer";
import MenuItems from "components/MenuItems/MenuItems";
import { getPageStaticProps } from "utils/getPageStaticProps";

export default function Page(props) {
  console.log("Pages props", props);
  return (
    <div>
      <MenuItems
        menuItems={props.menuItems}
        callToActionButton={props.callToActionButton}
      ></MenuItems>
      <BlockRenderer blocks={props.blocks}></BlockRenderer>;
    </div>
  );
}

export const getStaticProps = getPageStaticProps;