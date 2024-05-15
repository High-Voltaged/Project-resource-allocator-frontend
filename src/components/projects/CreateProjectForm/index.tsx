import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Dialog, Select, Text, TextField } from "@radix-ui/themes";

import { CREATE_PROJECT, GET_PROJECTS } from "~/shared/graphql/project";
import { ProjectType } from "~/shared/types/project";

import { editProjectSchema, initialProjectValues } from "../validation";
import { ICreateProjectInput, TCreateProjectOutput } from "../types";

const CreateProjectForm: React.FC = () => {
  const [createProject, { loading }] = useMutation<TCreateProjectOutput, ICreateProjectInput>(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
    // onError: () => {}
  });

  const formik = useFormik<ICreateProjectInput>({
    initialValues: initialProjectValues,
    enableReinitialize: true,
    validationSchema: editProjectSchema,
    onSubmit: async (variables) => {
      await createProject({ variables });
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col items-start w-full space-y-6">
      <div className="w-full">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Name
          </Text>
          <TextField.Root
            id="name"
            placeholder="Project name"
            className="w-full rounded-lg border border-slate-100 placeholder-slate-400"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.name}</p>
          )}
        </label>
      </div>
      <div className="w-full">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Type
          </Text>
          <Select.Root
            defaultValue={ProjectType.Scrum}
            value={formik.values.type}
            onValueChange={(value) => formik.setFieldValue("type", value)}
          >
            <Select.Trigger className="w-full" />
            <Select.Content id="type" className="w-full rounded-lg border border-slate-100 placeholder-slate-400">
              {Object.values(ProjectType).map((key) => (
                <Select.Item key={key} value={key}>
                  {key}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
      </div>

      <div className="flex justify-end w-full space-x-4">
        <Dialog.Close>
          <Button variant="soft" color="gray" className="cursor-pointer">
            Cancel
          </Button>
        </Dialog.Close>
        <Button loading={loading} className="cursor-pointer" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
