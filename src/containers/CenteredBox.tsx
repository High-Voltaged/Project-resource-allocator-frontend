import { WrapperProps } from "./types";

const CenteredBox: React.FC<WrapperProps> = ({ children }) => {
  return <div className="flex justify-center items-center h-screen bg-secondary">{children}</div>;
};

export default CenteredBox;
