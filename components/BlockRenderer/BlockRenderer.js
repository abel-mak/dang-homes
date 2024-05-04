import { Cover } from "components/Cover/Cover";
import { CallToActionButton } from "components/CallToActionButton/CallToActionButton";
import { Heading } from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import { v4 } from "uuid";
import { Columns } from "components/Columns/Columns";
import { Column } from "components/Column/Column";
import Image from "next/image";
import { PropertySearch } from "components/PropertySearch";

export const BlockRenderer = ({ blocks }) => {
  // if (!blocks || !blocks.length) return
  // console.log("============", blocks);
  /** so i can modify blocks values without getting modifying const error */
  if (!blocks) return;
  const clonedBlocks = JSON.parse(JSON.stringify(blocks));
  return clonedBlocks.map((block) => {
    const id = v4();
    /**replace wordpress url in case there is an href*/
    if (block?.attributes?.content)
      block.attributes.content = block.attributes.content.replace(
        process.env.NEXT_PUBLIC_WP_URL,
        ""
      );
    switch (block.name) {
      case "core/post-title":
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
      case "acf/ctabutton":
        return (
          <CallToActionButton
            key={v4()}
            destination={block.attributes.data.destination}
            label={block.attributes.data.label}
            align={block.attributes.data.align}
          ></CallToActionButton>
        );
      case "core/columns":
        // console.log("unknown block", block);

        return (
          <Columns
            key={v4()}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
          </Columns>
        );
      case "core/column":
        return (
          <Column key={v4()} width={block.attributes?.width}>
            <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
          </Column>
        );
      case "core/block":
      case "core/group":
        return <BlockRenderer key={v4()} blocks={block.innerBlocks}></BlockRenderer>
      case "core/image":
        return (
          <Image key={v4()}
            src={block.attributes.url}
            alt={block.attributes.alt || ''}
            width={block.attributes.width}
            height={block.attributes.height}
          />
        );
      case "acf/property-search":
        return <PropertySearch key={v4()}/>
      default:
        console.log("unknown block", block);
        return null;
    }
  });
};
