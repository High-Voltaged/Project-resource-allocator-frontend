import { useQuery } from "@apollo/client";
import { Heading, Skeleton } from "@radix-ui/themes";
import { useParams } from "react-router-dom";

import { GET_PROJECT_BY_ID } from "~/shared/graphql/project";
import { QueryOutput } from "~/shared/types";
import { IProject } from "~/shared/types/project";
import ProjectToolbar from "./ProjectToolbar";
import TicketContainer from "./TicketContainer";

const ProjectByIdContainer: React.FC = () => {
  const { id } = useParams();

  const { data, loading } = useQuery<QueryOutput<IProject>>(GET_PROJECT_BY_ID, { variables: { id } });

  const project = data?.result;

  return (
    <div className="flex flex-col items-start w-full">
      <Skeleton loading={loading} className="h-[100px] w-1/2" />
      {project && (
        <div className="flex flex-col items-start space-y-6 w-full h-full">
          <Heading as="h3" size="5">
            {project.name}
          </Heading>
          <ProjectToolbar project={project} />
          <TicketContainer projectId={project.id} />
        </div>
      )}
    </div>
  );
};

export default ProjectByIdContainer;
