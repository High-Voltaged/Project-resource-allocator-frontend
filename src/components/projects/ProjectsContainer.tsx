import { useQuery } from "@apollo/client";
import { Button, Dialog, Skeleton } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { useState } from "react";

import PageWrapper from "~/containers/PageWrapper";
import { GET_MY_PROJECTS } from "~/shared/graphql/project";
import { PAGE_ITEMS_COUNT } from "~/shared/const/pagination";
import Pagination from "~/components/shared/Pagination";
import { RootState } from "~/state";
import { PaginationArgs } from "~/shared/types";

import ProjectItem from "./ProjectItem";
import CreateProjectForm from "./CreateProjectForm";
import { TMyProjectsPaginatedOutput } from "./types";

const ProjectsContainer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [page, setPage] = useState(0);
  const offset = page * PAGE_ITEMS_COUNT;
  const limit = offset + PAGE_ITEMS_COUNT;

  const { data, loading } = useQuery<TMyProjectsPaginatedOutput, PaginationArgs>(GET_MY_PROJECTS, {
    variables: { limit, offset },
  });

  if (!user) {
    return <div>No user</div>;
  }

  const projects = data?.result.items || [];
  const itemCount = data?.result.count !== undefined ? data?.result.count : PAGE_ITEMS_COUNT;

  return (
    <PageWrapper>
      <div className="flex flex-col items-start space-y-4">
        <div className="w-full grid grid-cols-4 auto-rows-max gap-4">
          <Dialog.Root>
            <Dialog.Trigger>
              <Button className="h-full py-8 px-10 rounded-xl text-[16px] cursor-pointer">
                + Create a new project
              </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Create a Project</Dialog.Title>
              <CreateProjectForm />
            </Dialog.Content>
          </Dialog.Root>

          <Skeleton loading={loading}>
            {projects.length ? projects.map((project) => <ProjectItem key={project.id} project={project} />) : null}
          </Skeleton>
        </div>
        <Pagination page={page} count={Math.ceil(itemCount / PAGE_ITEMS_COUNT)} onChange={(v) => setPage(v)} />
      </div>
    </PageWrapper>
  );
};

export default ProjectsContainer;
