import { Heading, Separator } from "@radix-ui/themes";
import { IProject } from "~/shared/types/project";
import CreateProjectForm from "../CreateProjectForm";
import ProjectDeletion from "./ProjectDeletion";

export interface ProjectSettingsProps {
  project: IProject;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ project }) => {
  return (
    <div className="flex flex-col w-full h-full px-6 py-4">
      <div className="flex flex-col w-full space-y-4">
        <Heading as="h3" size="3">
          Update your project information
        </Heading>
        <CreateProjectForm project={project} />
      </div>
      <Separator my="6" size="4" />
      <div className="flex flex-col w-full space-y-4">
        <Heading as="h3" size="3" color="red">
          Danger Zone
        </Heading>
        <ProjectDeletion project={project} />
      </div>
    </div>
  );
};

export default ProjectSettings;
