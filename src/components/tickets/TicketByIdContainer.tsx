import { useQuery } from "@apollo/client";
import { Skeleton } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import { TriangleAlertIcon } from "lucide-react";

import { GET_TICKET_BY_ID } from "~/shared/graphql/ticket";
import { QueryOutput } from "~/shared/types";
import { ITicket } from "~/shared/types/ticket";
import Alert from "~/components/shared/Alert/Alert";
import TicketById from "./TicketById";

const TicketByIdContainer: React.FC = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<QueryOutput<ITicket>>(GET_TICKET_BY_ID, { variables: { id } });

  const ticket = data?.result;

  return (
    <div className="flex flex-col items-start w-full max-h-full">
      <Skeleton loading={loading} className="h-[100px] w-1/2" />
      {ticket ? (
        <TicketById ticket={ticket} />
      ) : (
        <Alert text={error?.message || "An error occurred."} icon={TriangleAlertIcon} color="red" />
      )}
    </div>
  );
};

export default TicketByIdContainer;
