import { useMutation, useQuery } from "@apollo/client";
import { Text } from "@radix-ui/themes";
import { UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { IMembersListVars, TProjectUsersPaginatedOutput } from "~/components/projects/types";
import MultiSelectFormField from "~/components/ui/multi-select";
import { PROJECT_USERS } from "~/shared/graphql/project";
import { ASSIGN_TICKET_TO_UESR, GET_TICKET_BY_ID, UNASSIGN_TICKET_FROM_USER } from "~/shared/graphql/ticket";
import { UserRole } from "~/shared/types/project";
import { ITicket, ITicketUser } from "~/shared/types/ticket";

interface AssigneesProps {
  ticket: ITicket;
}

const Assignees: React.FC<AssigneesProps> = ({ ticket }) => {
  const projectId = ticket.projectId;
  const [assignees, setAssignees] = useState<string[]>([]);

  const { data } = useQuery<TProjectUsersPaginatedOutput, IMembersListVars>(PROJECT_USERS, {
    variables: { projectId, role: UserRole.Employee, limit: 0, offset: 0 },
  });
  const [assignUserToTicket] = useMutation<boolean, ITicketUser>(ASSIGN_TICKET_TO_UESR, {
    refetchQueries: [GET_TICKET_BY_ID],
  });
  const [unassignUserToTicket] = useMutation<boolean, ITicketUser>(UNASSIGN_TICKET_FROM_USER, {
    refetchQueries: [GET_TICKET_BY_ID],
  });

  const employees = (data?.result.items || []).map((s) => ({
    value: s.id,
    label: s.email,
    icon: UserIcon,
  }));

  useEffect(() => {
    setAssignees((ticket.assignees || []).map((a) => a.id));
  }, [ticket.assignees]);

  const assignEmployee = async (userIds: string[]) => {
    await Promise.all(
      assignees.map((id) => {
        if (userIds.includes(id)) return true;

        return unassignUserToTicket({
          variables: { userId: id, ticketId: ticket.id },
        });
      })
    );

    await Promise.all(
      userIds.map((userId) => {
        if (assignees.includes(userId)) return true;

        return assignUserToTicket({
          variables: { userId, ticketId: ticket.id },
        });
      })
    );
  };

  return (
    <div className="w-full">
      <label>
        <Text as="div" size="2" weight="medium" mb="1">
          Assignees
        </Text>
        <MultiSelectFormField
          options={employees}
          defaultValue={assignees}
          onValueChange={(v) => assignEmployee(v)}
          placeholder="Select options"
          variant="destructive"
          color="indigo"
        />
      </label>
    </div>
  );
};

export default Assignees;
