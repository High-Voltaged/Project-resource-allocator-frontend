import { ChevronDownIcon, ChevronUpIcon, ChevronsDownIcon, ChevronsUpIcon, CircleDotIcon } from "lucide-react";
import { TicketPriority, TicketStatus } from "~/shared/types/ticket";

export const TicketStatusItems = {
  [TicketStatus.backlog]: { label: "Backlog", color: "orange" },
  [TicketStatus.todo]: { label: "To do", color: "indigo" },
  [TicketStatus.inprogress]: { label: "In Progress", color: "yellow" },
  [TicketStatus.testing]: { label: "Testing", color: "blue" },
  [TicketStatus.complete]: { label: "Complete", color: "green" },
};

export const TicketPriorityIcons = {
  [TicketPriority.lowest]: { icon: ChevronsDownIcon, color: "blue" },
  [TicketPriority.low]: { icon: ChevronDownIcon, color: "blue" },
  [TicketPriority.medium]: { icon: CircleDotIcon, color: "yellow" },
  [TicketPriority.high]: { icon: ChevronUpIcon, color: "orange" },
  [TicketPriority.highest]: { icon: ChevronsUpIcon, color: "red" },
};

export const TicketDateFormatter = Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
