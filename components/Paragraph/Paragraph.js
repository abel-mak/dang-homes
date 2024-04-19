import { getStaticProps } from "pages";
import { gql } from "@apollo/client";
import client from "client";
import React from "react";
import { getTextAlign } from "utils/fonts";
import { theme } from "utils/theme";

export default function Paragraph(props) {
  const { content, textAlign, textColor } = props;
  const p = React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: content,
    },
    className: `${getTextAlign(textAlign)}`,
    style: {
      color: theme[textColor],
    }
      
  });
  return p;
}
