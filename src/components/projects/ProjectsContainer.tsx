import { useQuery } from "@apollo/client";
import { Button, Dialog, Spinner } from "@radix-ui/themes";
import { useSelector } from "react-redux";

import PageWrapper from "~/containers/PageWrapper";
import { GET_MY_PROJECTS } from "~/shared/graphql/project";
import { QueryOutput } from "~/shared/types";
import { IProject } from "~/shared/types/project";
import { RootState } from "~/state";

import ProjectItem from "./ProjectItem";
import CreateProjectForm from "./CreateProjectForm";

const ProjectsContainer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data, loading } = useQuery<QueryOutput<IProject[]>>(GET_MY_PROJECTS);

  if (!user) {
    return <div>No user</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  const projects = data?.result || [];

  return (
    <PageWrapper>
      <div className="w-full grid grid-cols-4 auto-rows-max gap-4">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button className="h-full py-8 px-10 text-[16px] cursor-pointer">+ Create a new project</Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Create a Project</Dialog.Title>
            <CreateProjectForm />
          </Dialog.Content>
        </Dialog.Root>
        {projects.length ? projects.map((project) => <ProjectItem key={project.id} project={project} />) : null}
      </div>
    </PageWrapper>
  );
};

export default ProjectsContainer;
