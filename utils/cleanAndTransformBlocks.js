import { v4 } from "uuid";

export const cleanAndTransformBlocks = (blocks) => {
  if (!blocks) return;
  const newBlocks = JSON.parse(JSON.stringify(blocks));

  const assignIds = (b) => {
    b.forEach((block) => {
      block.id = v4();
      if (block.innerBlocks?.length) {
        assignIds(block.innerBlocks);
      }
    });
  };

  assignIds(newBlocks);
  return newBlocks;
};
