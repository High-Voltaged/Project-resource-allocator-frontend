import { useMutation, useQuery } from "@apollo/client";
import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import MultiSelectFormField from "~/components/ui/multi-select";
import { GET_MY_PROFILE, REMOVE_MY_SKILLS, UPDATE_MY_SKILLS } from "~/shared/graphql/user";
import { GET_SKILLS } from "~/shared/graphql/ticket";
import { QueryOutput } from "~/shared/types";
import { SKILL_LEVELS, SKILL_LEVELS_MAP } from "~/shared/const/ticket";
import { IUser, RemoveMySkillsInput, UpdateMySkillsInput } from "~/shared/types/user";
import { ISkill, SkillLevel, UserSkill } from "~/shared/types/ticket";

import SkillForm from "./SkillForm";

interface UserSkillSelectProps {
  user: IUser;
}

const UserSkillSelect: React.FC<UserSkillSelectProps> = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [currentSkills, setCurrentSkills] = useState<{ name: string; level: string }[]>([]);

  const { data } = useQuery<QueryOutput<ISkill[]>>(GET_SKILLS);
  const [updateUserSkills, { loading }] = useMutation<boolean, UpdateMySkillsInput>(UPDATE_MY_SKILLS, {
    refetchQueries: [GET_MY_PROFILE],
  });
  const [removeUserSkills] = useMutation<boolean, RemoveMySkillsInput>(REMOVE_MY_SKILLS, {
    refetchQueries: [GET_MY_PROFILE],
  });

  const skills = (data?.result || []).map((s) => ({ value: s.name, label: s.name }));

  useEffect(() => {
    setUserSkills((user.skills || []).map((s) => s.name));
  }, [user.skills]);

  useEffect(() => {
    if (!currentSkills.length) return;

    setDialogOpen(true);
  }, [currentSkills.length]);

  useEffect(() => {
    if (dialogOpen || !currentSkills.length) return;

    setCurrentSkills([]);
    setUserSkills([...userSkills]);
  }, [dialogOpen]);

  const handleTempSkills = (skillIds: string[]) => {
    const skillsToSave = skillIds.filter((id) => !userSkills.includes(id));
    const skillsToRemove = userSkills.filter((id) => !skillIds.includes(id));

    setCurrentSkills(
      skillsToSave.map((name) => ({
        name,
        level: SKILL_LEVELS[SkillLevel.Beginner],
      }))
    );

    removeUserSkills({
      variables: {
        skillNames: skillsToRemove,
      },
    });
  };

  const submitUserSkills = () => {
    const skillsToSubmit: UserSkill[] = currentSkills.map((s) => ({
      ...s,
      level: SKILL_LEVELS_MAP[s.level],
    }));

    if (!skillsToSubmit.length) return;

    return updateUserSkills({
      variables: {
        skills: skillsToSubmit,
      },
    });
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <SkillForm />

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title size="2" mb="4">
            Select the your skill level
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
              <Button onClick={() => submitUserSkills()} loading={loading}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <MultiSelectFormField
        options={skills}
        defaultValue={userSkills}
        onValueChange={(skills) => handleTempSkills(skills)}
        placeholder="Select options"
        style={{ backgroundColor: "var(--slate-1)", color: "var(--slate-12)" }}
      />
    </div>
  );
};

export default UserSkillSelect;
