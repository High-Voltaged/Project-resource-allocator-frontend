import { ITicket } from "~/shared/types/ticket";
import Assignees from "./Assignees";

interface TicketDetailsProps {
  ticket: ITicket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <div className="flex flex-col items-start space-y-4 w-[34rem] px-6">
      <Assignees ticket={ticket} />
    </div>
  );
};

export default TicketDetails;
