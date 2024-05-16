import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Card, Text } from "@radix-ui/themes";
import { IProject, ProjectRole } from "~/shared/types/project";
import { getProjectLabel } from "~/shared/utils";
import ProjectConfig from "../ProjectConfig";

interface ProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const isAdmin = project.role === ProjectRole.Admin;

  return (
    <Card size="2">
      <div className="w-full flex flex-col space-y-2">
        <div className="w-full flex items-center justify-between">
          <Avatar size="3" fallback={getProjectLabel(project.name)} color="indigo" />
          {isAdmin && (
            <ProjectConfig project={project}>
              <Button variant="soft" className="p-2 cursor-pointer">
                <GearIcon />
              </Button>
            </ProjectConfig>
          )}
        </div>
        <div className="w-full flex flex-col items-start">
          <Text as="div" size="3" weight="bold">
            {project.name}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ProjectItem;
