import { GearIcon } from "@radix-ui/react-icons";
import { Button, IconButton } from "@radix-ui/themes";
import ProjectConfig from "~/components/projects/ProjectConfig";
import { IProject, UserRole } from "~/shared/types/project";

interface ProjectToolbarProps {
  project: IProject;
}

const ProjectToolbar: React.FC<ProjectToolbarProps> = ({ project }) => {
  const isAdmin = project.role === UserRole.Admin;

  return (
    <div className="flex items-center justify-between w-full space-x-4">
      <Button size="3" className="px-7 cursor-pointer">
        + New Ticket
      </Button>
      {isAdmin && (
        <ProjectConfig project={project}>
          <IconButton variant="outline" className="cursor-pointer">
            <GearIcon />
          </IconButton>
        </ProjectConfig>
      )}
    </div>
  );
};

export default ProjectToolbar;
