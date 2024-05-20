import { useMutation } from "@apollo/client";
import { Button, Dialog, Heading, IconButton } from "@radix-ui/themes";
import { SettingsIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreateTicketForm from "~/components/project-by-id/CreateTicketForm";
import { BaseRoutes } from "~/shared/const/routes";
import { DELETE_TICKET, GET_TICKETS_BY_PROJECT_ID } from "~/shared/graphql/ticket";
import { ITicket } from "~/shared/types/ticket";

interface TicketBarProps {
  ticket: ITicket;
}

const TicketBar: React.FC<TicketBarProps> = ({ ticket }) => {
  const navigate = useNavigate();
  const [deleteTicket, { loading }] = useMutation<boolean, { id: string }>(DELETE_TICKET, {
    variables: { id: ticket.id },
    refetchQueries: [GET_TICKETS_BY_PROJECT_ID],
  });

  const deleteTicketHandler = async () => {
    await deleteTicket();
    navigate(BaseRoutes.PROJECTS);
  };

  return (
    <div className="flex items-center justify-between space-x-4 w-full">
      <Heading as="h3" size="6">
        {ticket.title}
      </Heading>
      <Dialog.Root>
        <Dialog.Trigger>
          <IconButton size="3" variant="soft" className="cursor-pointer">
            <SettingsIcon className="w-5 h-5" />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Content size="4" maxWidth="800px" className="h-[600px]">
          <Dialog.Title>Ticket Settings</Dialog.Title>
          <div className="w-full flex items-center justify-end space-x-2">
            <Button
              variant="soft"
              color="red"
              className="cursor-pointer"
              loading={loading}
              onClick={deleteTicketHandler}
            >
              Delete the ticket <Trash2Icon className="w-4 h-4" />
            </Button>
          </div>
          <CreateTicketForm ticket={ticket} projectId={ticket.projectId} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default TicketBar;
