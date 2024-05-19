import { useMutation } from "@apollo/client";
import { Button, TextField } from "@radix-ui/themes";
import { useFormik } from "formik";
import { FileCodeIcon } from "lucide-react";

import { ADD_SKILL, GET_SKILLS } from "~/shared/graphql/ticket";

import addSkillSchema from "./validation";

const SkillForm: React.FC = () => {
  const [addSkill, { loading }] = useMutation(ADD_SKILL, {
    refetchQueries: [GET_SKILLS],
  });

  const formik = useFormik<{ name: string }>({
    initialValues: { name: "" },
    validationSchema: addSkillSchema,
    onSubmit: async ({ name }) => {
      await addSkill({
        variables: { name },
      });
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center space-x-2">
      <TextField.Root
        id="name"
        placeholder="New skill name"
        variant="surface"
        className="w-full rounded-lg bg-slate-100"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      >
        <TextField.Slot>
          <FileCodeIcon className="w-5 h-5" />
        </TextField.Slot>
      </TextField.Root>
      <Button variant="outline" size="2" type="submit" className="cursor-pointer" loading={loading}>
        Add
      </Button>
    </form>
  );
};

export default SkillForm;
