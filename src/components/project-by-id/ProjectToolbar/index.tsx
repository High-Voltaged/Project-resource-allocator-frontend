import { Button, Dialog, IconButton } from "@radix-ui/themes";
import { SettingsIcon } from "lucide-react";

import ProjectConfig from "~/components/projects/ProjectConfig";
import { IProject, UserRole } from "~/shared/types/project";

import CreateTicketForm from "../CreateTicketForm";

interface ProjectToolbarProps {
  project: IProject;
}

const ProjectToolbar: React.FC<ProjectToolbarProps> = ({ project }) => {
  const isAdmin = project.role === UserRole.Admin;

  return (
    <div className="flex items-center justify-between w-full space-x-4">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button size="3" className="px-7 cursor-pointer">
            + New Ticket
          </Button>
        </Dialog.Trigger>
        <Dialog.Content size="4" maxWidth="800px">
          <Dialog.Title>Create a Ticket</Dialog.Title>
          <CreateTicketForm projectId={project.id} />
        </Dialog.Content>
      </Dialog.Root>
      {isAdmin && (
        <ProjectConfig project={project}>
          <IconButton size="3" variant="soft" className="cursor-pointer">
            <SettingsIcon className="w-5 h-5" />
          </IconButton>
        </ProjectConfig>
      )}
    </div>
  );
};

export default ProjectToolbar;
