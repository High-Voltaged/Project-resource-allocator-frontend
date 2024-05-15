import { Dialog, Tabs } from "@radix-ui/themes";
import { ReactNode } from "react";
import { IProject } from "~/shared/types/project";

export interface ProjectSettingsProps {
  project: IProject;
  children: ReactNode;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ project, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Project Settings</Dialog.Title>
        <Tabs.Root defaultValue="settings">
          <Tabs.List>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            <Tabs.Trigger value="members">Members</Tabs.Trigger>
            <Tabs.Trigger value="danger">Danger Zone</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="settings"></Tabs.Content>
          <Tabs.Content value="members"></Tabs.Content>
          <Tabs.Content value="danger"></Tabs.Content>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectSettings;
