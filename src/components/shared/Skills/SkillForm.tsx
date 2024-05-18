import { Button, TextField } from "@radix-ui/themes";
import { useFormik } from "formik";
import { ISkill } from "~/shared/types/ticket";

interface SkillFormProps {}

const SkillForm: React.FC<SkillFormProps> = ({}) => {
  const formik = useFormik<ISkill>({
    initialValues: { name: "" },
    onSubmit: async (data) => {
      console.log({ data });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center space-x-2">
      <TextField.Root
        id="name"
        placeholder="New skill name"
        variant="soft"
        className="w-full rounded-lg border border-slate-100"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <Button variant="outline" size="1" type="submit">
        Add
      </Button>
    </form>
  );
};

export default SkillForm;
