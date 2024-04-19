import React from "react"
import { getFontSizeFromLevel, getTextAlign } from "utils/fonts"

export const Heading = ({textAlign = 'left', content, level = 2}) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: {__html: content},
    className: `font-heading max-w-5xl mx-auto my-5 ${getTextAlign(textAlign)} ${getFontSizeFromLevel(level)}`
  })
  return tag
}