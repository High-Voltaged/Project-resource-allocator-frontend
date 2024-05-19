import { useMutation, useQuery } from "@apollo/client";
import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import MultiSelectFormField from "~/components/ui/multi-select";
import { GET_SKILLS, GET_TICKET_BY_ID, REMOVE_TICKET_SKILLS, UPDATE_TICKET_SKILLS } from "~/shared/graphql/ticket";
import { QueryOutput } from "~/shared/types";
import {
  ISkill,
  ITicket,
  RemoveTicketSkillsInput,
  SkillLevel,
  UpdateTicketSkillsInput,
  UserSkill,
} from "~/shared/types/ticket";
import { SKILL_LEVELS, SKILL_LEVELS_MAP } from "~/shared/const/ticket";
import SkillForm from "./SkillForm";

interface SkillSelectProps {
  ticket: ITicket;
}

const SkillSelect: React.FC<SkillSelectProps> = ({ ticket }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [ticketSkills, setTicketSkills] = useState<string[]>([]);
  const [currentSkills, setCurrentSkills] = useState<{ name: string; level: string }[]>([]);

  const { data } = useQuery<QueryOutput<ISkill[]>>(GET_SKILLS);
  const [updateTicketSkills, { loading }] = useMutation<boolean, UpdateTicketSkillsInput>(UPDATE_TICKET_SKILLS, {
    refetchQueries: [GET_TICKET_BY_ID],
  });
  const [removeTicketSkills] = useMutation<boolean, RemoveTicketSkillsInput>(REMOVE_TICKET_SKILLS, {
    refetchQueries: [GET_TICKET_BY_ID],
  });

  const skills = (data?.result || []).map((s) => ({ value: s.name, label: s.name }));

  useEffect(() => {
    setTicketSkills((ticket.skills || []).map((s) => s.name));
  }, [ticket.skills]);

  useEffect(() => {
    if (!currentSkills.length) return;

    setDialogOpen(true);
  }, [currentSkills.length]);

  useEffect(() => {
    if (dialogOpen || !currentSkills.length) return;

    setCurrentSkills([]);
    setTicketSkills([...ticketSkills]);
  }, [dialogOpen]);

  const handleTempSkills = (skillIds: string[]) => {
    const skillsToSave = skillIds.filter((id) => !ticketSkills.includes(id));
    const skillsToRemove = ticketSkills.filter((id) => !skillIds.includes(id));

    setCurrentSkills(
      skillsToSave.map((name) => ({
        name,
        level: SKILL_LEVELS[SkillLevel.Beginner],
      }))
    );

    removeTicketSkills({
      variables: {
        ticketId: ticket.id,
        skillNames: skillsToRemove,
      },
    });
  };

  const submitTicketSkills = () => {
    const skillsToSubmit: UserSkill[] = currentSkills.map((s) => ({
      ...s,
      level: SKILL_LEVELS_MAP[s.level],
    }));

    if (!skillsToSubmit.length) return;

    return updateTicketSkills({
      variables: {
        skills: skillsToSubmit,
        ticketId: ticket.id,
      },
    });
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <SkillForm />

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title size="2" mb="4">
            Select the required skill level
          </Dialog.Title>

          <Flex direction="column" gap="3" mt="4" align="start">
            {currentSkills.map((s) => (
              <div key={s.name} className="flex items-center space-x-4">
                <Text as="span" size="2">
                  {s.name}
                </Text>
                <Select.Root
                  defaultValue={SKILL_LEVELS[SkillLevel.Beginner]}
                  value={s.level}
                  onValueChange={(level) => {
                    const updated = currentSkills.map((cs) => {
                      return cs.name === s.name ? { ...cs, level } : cs;
                    });
                    setCurrentSkills(updated);
                  }}
                >
                  <Select.Trigger variant="soft" className="w-60" />
                  <Select.Content variant="soft" id="type" className="w-full rounded-lg border border-slate-100">
                    {Object.values(SKILL_LEVELS).map((key: string) => (
                      <Select.Item key={key} value={key}>
                        {key}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>
            ))}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => submitTicketSkills()} loading={loading}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <MultiSelectFormField
        options={skills}
        defaultValue={ticketSkills}
        onValueChange={(skills) => handleTempSkills(skills)}
        placeholder="Select options"
        variant="destructive"
      />
    </div>
  );
};

export default SkillSelect;
