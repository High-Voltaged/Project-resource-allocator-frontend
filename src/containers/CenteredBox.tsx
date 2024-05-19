import * as Toast from "@radix-ui/react-toast";
import { WrapperProps } from "./types";

const CenteredBox: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <Toast.Provider>
        {children}
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </div>
  );
};

export default CenteredBox;
