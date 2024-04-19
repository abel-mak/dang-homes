import { Cover } from "components/Cover/Cover";
import { Heading } from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import { v4 } from "uuid";

export const BlockRenderer = ({ blocks }) => {
  // if (!blocks || !blocks.length) return
  // console.log("============", blocks);
  /** so i can modify blocks values without getting modifying const error */
  const clonedBlocks = JSON.parse(JSON.stringify(blocks));
  return clonedBlocks.map((block) => {
    const id = v4();
    /**replace wordpress url in case there is an href*/
    if (block?.attributes.content)
      block.attributes.content = block.attributes.content.replace(
        process.env.NEXT_PUBLIC_WP_URL,
        ""
      );
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
      case "core/paragraph":
        return (
          <Paragraph
            key={id}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
            textColor={block.attributes.textColor}
          ></Paragraph>
        );
      default:
        return null;
    }
  });
};
