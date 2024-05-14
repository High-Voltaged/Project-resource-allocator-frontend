import Navbar from "~/components/shared/Navbar/Navbar";
import { WrapperProps } from "./types";

const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col">
        <Navbar />
        <div className="flex flex-auto px-40 py-10 bg-slate-100">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
