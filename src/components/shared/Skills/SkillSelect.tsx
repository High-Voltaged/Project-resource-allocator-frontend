import { useQuery } from "@apollo/client";
import { Skeleton, Text } from "@radix-ui/themes";
import { useFormik } from "formik";

import MultiSelectFormField from "~/components/ui/multi-select";
import { GET_SKILLS } from "~/shared/graphql/ticket";
import { QueryOutput } from "~/shared/types";
import { ISkill } from "~/shared/types/ticket";

import SkillForm from "./SkillForm";

interface SkillSelectProps {
  formik: ReturnType<typeof useFormik<ISkill>>;
}

const SkillSelect: React.FC = ({}) => {
  const { data, loading } = useQuery<QueryOutput<ISkill[]>>(GET_SKILLS);

  const skills = (data?.result || []).map((s) => ({ value: s.name, label: s.name }));

  const formik = useFormik<{ skills: [] }>({
    initialValues: { skills: [] },
    // enableReinitialize: true,
    // validationSchema: editTicketSchema,
    onSubmit: async (data) => {
      console.log({ data });
    },
  });
  return (
    <Skeleton loading={loading}>
      <label>
        <Text as="div" size="2" mb="1">
          Priority
        </Text>
        <MultiSelectFormField
          options={skills}
          defaultValue={formik.values.skills}
          onValueChange={(v) => formik.setFieldValue("skills", v)}
          placeholder="Select options"
          variant="destructive"
        />
      </label>
      <SkillForm />
    </Skeleton>
  );
};

export default SkillSelect;
