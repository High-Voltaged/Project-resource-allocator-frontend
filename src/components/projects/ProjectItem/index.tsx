import { useNavigate } from "react-router-dom";
import { Avatar, Card, Text } from "@radix-ui/themes";

import { IProject } from "~/shared/types/project";
import { getProjectLabel } from "~/shared/utils";
import { BaseRoutes } from "~/shared/const/routes";

interface ProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const navigate = useNavigate();

  const projectPath = `${BaseRoutes.PROJECTS}/${project.id}`;

  return (
    <Card size="2" className="cursor-pointer" onClick={() => navigate(projectPath)}>
      <div className="w-full flex flex-col space-y-2">
        <div className="w-full flex items-center justify-between">
          <Avatar size="3" fallback={getProjectLabel(project.name)} color="indigo" />
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
