import { useQuery } from "@apollo/client";
import { Spinner } from "@radix-ui/themes";
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
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="3" loading={loading} />
        </div>
      )}
      {ticket ? (
        <TicketById ticket={ticket} />
      ) : !ticket && !loading ? (
        <Alert text={error?.message || "An error occurred."} icon={TriangleAlertIcon} color="red" />
      ) : null}
    </div>
  );
};

export default TicketByIdContainer;
