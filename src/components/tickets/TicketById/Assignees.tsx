import { useMutation, useQuery } from "@apollo/client";
import { Heading } from "@radix-ui/themes";
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

  const assignEmployees = async (userIds: string[]) => {
    const assigneesToSave = userIds.filter((id) => !assignees.includes(id));
    const assigneesToRemove = assignees.filter((id) => !userIds.includes(id));

    await Promise.all(
      assigneesToRemove.map((id) =>
        unassignUserToTicket({
          variables: { userId: id, ticketId: ticket.id },
        })
      )
    );

    await Promise.all(
      assigneesToSave.map((userId) =>
        assignUserToTicket({
          variables: { userId, ticketId: ticket.id },
        })
      )
    );
  };

  return (
    <div className="flex flex-col items-start space-y-2 w-full">
      <Heading as="h4" size="3">
        Assignees
      </Heading>
      <MultiSelectFormField
        options={employees}
        defaultValue={assignees}
        onValueChange={(v) => assignEmployees(v)}
        placeholder="Select options"
        style={{ backgroundColor: "var(--slate-1)", color: "var(--slate-12)" }}
      />
    </div>
  );
};

export default Assignees;
