import { Heading } from "@radix-ui/themes";
import { IProject } from "~/shared/types/project";
import MemberInviteForm from "./MemberInviteForm";
import ProjectMembersList from "./ProjectMembersList";

export interface ProjectMembersProps {
  project: IProject;
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({ project }) => {
  return (
    <div className="flex flex-col w-full h-full px-6 py-4 space-y-4">
      <div className="flex flex-col w-full space-y-4">
        <Heading as="h3" size="3">
          Invite new team members to the project
        </Heading>
        <MemberInviteForm project={project} />
      </div>
      <div className="flex flex-col w-full space-y-4">
        <Heading as="h3" size="3">
          Current Project Members
        </Heading>
        <ProjectMembersList project={project} />
      </div>
    </div>
  );
};

export default ProjectMembers;
