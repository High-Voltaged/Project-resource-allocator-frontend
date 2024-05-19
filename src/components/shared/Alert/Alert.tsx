import { Callout } from "@radix-ui/themes";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface AlertProps extends Callout.RootProps {
  text: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const Alert: React.FC<AlertProps> = ({ text, icon, ...props }) => {
  const Icon = icon;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Callout.Root className="py-16 px-10" size="3" {...props}>
        <Callout.Icon>
          <Icon className="w-5 h-5" />
        </Callout.Icon>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default Alert;
