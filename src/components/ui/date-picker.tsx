import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button, Popover } from "@radix-ui/themes";

import { Calendar } from "~/components/ui/calendar";
import { cn } from "~/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft" className={cn("w-[280px] justify-start text-left font-normal")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </Popover.Content>
    </Popover.Root>
  );
};

export default DatePicker;
