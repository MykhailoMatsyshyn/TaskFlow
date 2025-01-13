declare module "react-ellipsis-text" {
  import React from "react";

  export interface EllipsisTextProps {
    text: string;
    length: number;
    className?: string;
  }

  const EllipsisText: React.FC<EllipsisTextProps>;
  export default EllipsisText;
}
