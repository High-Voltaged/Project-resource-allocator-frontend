import { useQuery } from "@apollo/client";
import { Skeleton, Table } from "@radix-ui/themes";
import { useState } from "react";

import Pagination from "~/components/shared/Pagination";
import { PROJECT_USERS } from "~/shared/graphql/project";
import { IProject } from "~/shared/types/project";

import { IMembersListVars, TProjectUsersPaginatedOutput } from "../types";

const PAGE_ITEMS_COUNT = 4;

export interface ProjectMembersListProps {
  project: IProject;
}

const ProjectMembersList: React.FC<ProjectMembersListProps> = ({ project }) => {
  const [page, setPage] = useState(0);
  const offset = page * PAGE_ITEMS_COUNT;
  const limit = offset + PAGE_ITEMS_COUNT;

  const { data, loading } = useQuery<TProjectUsersPaginatedOutput, IMembersListVars>(PROJECT_USERS, {
    variables: { projectId: project.id, limit, offset },
  });

  const users = data?.result.items || [];
  const itemCount = data?.result.count !== undefined ? data?.result.count : PAGE_ITEMS_COUNT;

  return users.length ? (
    <div className="flex flex-col items-start space-y-4 w-full">
      <Skeleton loading={loading}>
        <Table.Root className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  {user.firstName} {user.lastName}
                </Table.RowHeaderCell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Skeleton>
      <Pagination page={page} count={Math.ceil(itemCount / PAGE_ITEMS_COUNT)} onChange={(v) => setPage(v)} />
    </div>
  ) : null;
};

export default ProjectMembersList;
