import * as Toast from "@radix-ui/react-toast";
import { Text } from "@radix-ui/themes";
import { Dispatch, SetStateAction } from "react";

interface ToastContainerProps {
  title: string;
  message: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ title, message, open, setOpen }) => {
  return (
    <Toast.Root
      className="bg-white rounded-md p-[15px] shadow-md flex flex-col items-start data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      open={open}
      onOpenChange={setOpen}
    >
      <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate-800">{title}</Toast.Title>
      <Toast.Description asChild>
        <Text className="[grid-area:_description] m-0 font-semibold text-slate-500 leading-[1.3]">{message}</Text>
      </Toast.Description>
    </Toast.Root>
  );
};

export default ToastContainer;
