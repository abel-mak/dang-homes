export const getTextAlign = (textAlign = "left") => {
  return (
    {
      left: "text-left",
      right: "text-right",
      center: "text-center",
    }[textAlign] || ""
  );
};

export const getFontSizeFromLevel = (level) => {
  return (
    {
      1: "text-6xl",
      2: "text-5xl",
      3: "text-4xl",
      4: "text-3xl",
      5: "text-2xl",
      6: "text-xl",
    }[level] || ""
  );
};
