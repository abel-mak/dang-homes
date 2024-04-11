import { Cover } from "components/Cover/Cover";
import { Heading } from "components/Heading/Heading";

export const BlockRenderer = ({ blocks }) => {
  // if (!blocks || !blocks.length) return
  // console.log("============", blocks);

  return blocks.map((block) => {
    switch (block.name) {
      case "core/heading":
        return (
          <Heading
            key={block.id}
            textAlign={block.attributes.textAlign}
            level={block.attributes.level}
            content={block.attributes.content}
          ></Heading>
        );
      case "core/cover":
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      default:
        return null;
    }
  });
};
