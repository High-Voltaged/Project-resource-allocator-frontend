import React, { ReactNode } from "react";

export interface CenteredBoxProps {
  children: ReactNode;
}

const CenteredBox: React.FC<CenteredBoxProps> = ({ children }) => {
  return <div className="flex justify-center items-center h-screen bg-secondary">{children}</div>;
};

export default CenteredBox;
