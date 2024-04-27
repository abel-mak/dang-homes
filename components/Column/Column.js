export const Column = ({ children, width }) => {
  const widthStyle = (width) ? {minWidth: width, flexGrow: 1} : {flexBasis: 0, flexGrow: 1}
  return <div className="px-2 py-5" style={widthStyle}>{children}</div>;
};
