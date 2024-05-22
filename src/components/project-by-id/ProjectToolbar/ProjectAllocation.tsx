import { useMutation } from "@apollo/client";
import { Button, Dialog, Spinner, Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { CONFIRM_OR_CANCEL_ALLOCATION, PROJECT_TASK_ALLOCATION } from "~/shared/graphql/project";
import { QueryOutput } from "~/shared/types";
import { IAllocationOutput, IAllocationResult, IConfirmOrCancelAllocationInput } from "~/shared/types/ticket";

export interface ProjectAllocationProps {
  projectId: string;
}

const ProjectAllocation: React.FC<ProjectAllocationProps> = ({ projectId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allocations, setAllocations] = useState<IAllocationResult[]>([]);
  const [allocationIds, setAllocationIds] = useState<string[]>([]);

  const [sentConfirmation, setSentConfirmation] = useState(false);

  const [allocate, { loading }] = useMutation<QueryOutput<IAllocationOutput>, { id: string }>(PROJECT_TASK_ALLOCATION, {
    variables: { id: projectId },
    onCompleted: (data) => {
      setAllocations(data.result.allocations || []);
      setAllocationIds(data.result.allocationIds || []);
      setDialogOpen(true);
    },
  });

  const [confirmOrCancel] = useMutation<boolean, IConfirmOrCancelAllocationInput>(CONFIRM_OR_CANCEL_ALLOCATION, {
    refetchQueries: [],
  });

  useEffect(() => {
    if (allocations.length && !dialogOpen && !sentConfirmation) {
      confirmOrCancel({ variables: { allocationIds, confirmed: false } });
    }
  }, [dialogOpen]);

  const confirmAllocation = () => {
    setSentConfirmation(true);
    return confirmOrCancel({
      variables: {
        allocationIds,
        confirmed: true,
      },
    });
  };

  const cancelAllocation = () => {
    setSentConfirmation(true);
    confirmOrCancel({
      variables: {
        allocationIds,
        confirmed: false,
      },
    });
  };

  return (
    <div>
      <Button size="3" loading={loading} onClick={() => allocate()} className="cursor-pointer">
        Auto Allocation
      </Button>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Content size="4" maxWidth="800px">
          <Dialog.Title>Results of the Allocation</Dialog.Title>
          {loading && <Spinner loading={loading} />}
          {allocations.length && !loading && (
            <div className="flex flex-col items-start w-full space-y-4">
              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Developer Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Task Title</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {allocations.map(({ ticket, user }) => (
                    <Table.Row key={`${ticket.title}/${user.email}`}>
                      <Table.RowHeaderCell>{user.email}</Table.RowHeaderCell>
                      <Table.Cell>{ticket.title}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
              <div className="flex justify-center w-full space-x-4">
                <Dialog.Close>
                  <Button
                    variant="soft"
                    size="3"
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => cancelAllocation()}
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    loading={loading}
                    size="3"
                    className="cursor-pointer"
                    type="submit"
                    onClick={() => confirmAllocation()}
                  >
                    Confirm
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ProjectAllocation;
