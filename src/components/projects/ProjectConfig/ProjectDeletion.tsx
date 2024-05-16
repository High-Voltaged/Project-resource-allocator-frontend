import { useMutation } from "@apollo/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

import { DELETE_PROJECT, GET_MY_PROJECTS } from "~/shared/graphql/project";
import { IProject } from "~/shared/types/project";

export interface ProjectDeletionProps {
  project: IProject;
}

const ProjectDeletion: React.FC<ProjectDeletionProps> = ({ project }) => {
  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    refetchQueries: [GET_MY_PROJECTS],
  });

  return (
    <Button
      onClick={() => deleteProject()}
      size="3"
      mt="4"
      color="red"
      variant="soft"
      loading={loading}
      className="max-w-56 cursor-pointer"
    >
      <TrashIcon /> Delete the project
    </Button>
  );
};

export default ProjectDeletion;
