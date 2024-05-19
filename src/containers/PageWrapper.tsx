import * as Toast from "@radix-ui/react-toast";
import Navbar from "~/components/shared/Navbar/Navbar";
import { WrapperProps } from "./types";

const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Toast.Provider swipeDirection="down">
        <div className="h-full flex flex-col">
          <Navbar />
          <div className="flex flex-auto h-[calc(100vh_-_80px)] px-40 py-10 bg-slate-100">{children}</div>
        </div>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </div>
  );
};

export default PageWrapper;
