import React from "react"
import { getFontSizeFromLevel, getTextAlign } from "utils/fonts"

export const Heading = ({textAlign = 'left', content, level = 2}) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: {__html: content},
    className: `${getTextAlign(textAlign)} ${getFontSizeFromLevel(level)}`
  })
  return <div className="">{tag}</div>
}