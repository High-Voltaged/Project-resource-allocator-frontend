import { Dialog, Tabs } from "@radix-ui/themes";
import { ReactNode } from "react";
import { IProject } from "~/shared/types/project";
import ProjectSettings from "./ProjectSettings";
import ProjectMembers from "./ProjectMembers";

export interface ProjectConfigProps {
  project: IProject;
  children: ReactNode;
}

const ProjectConfig: React.FC<ProjectConfigProps> = ({ project, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content size="4" maxWidth="800px" className="h-[600px]">
        <Dialog.Title>Project Settings</Dialog.Title>
        <Tabs.Root defaultValue="settings">
          <Tabs.List>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            <Tabs.Trigger value="members">Members</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="settings">
            <ProjectSettings project={project} />
          </Tabs.Content>
          <Tabs.Content value="members">
            <ProjectMembers project={project} />
          </Tabs.Content>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectConfig;
