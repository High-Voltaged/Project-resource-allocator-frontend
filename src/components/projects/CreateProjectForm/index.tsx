import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Dialog, Select, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

import { CREATE_PROJECT, GET_MY_PROJECTS, UPDATE_PROJECT } from "~/shared/graphql/project";
import { IProject, ProjectType } from "~/shared/types/project";
import ToastContainer from "~/components/shared/Toast";
import { ERROR_TITLE, SUCCESS_TITLE } from "~/shared/const/misc";

import { editProjectSchema, initialProjectValues } from "../validation";
import { ICreateProjectInput, IUpdateProjectInput, TCreateProjectOutput } from "../types";

export interface ICreateProjectForm {
  project?: IProject;
}

const CreateProjectForm: React.FC<ICreateProjectForm> = ({ project }) => {
  const [toastOpen, setToastOpen] = useState(false);

  const [createProject, { loading, error }] = useMutation<
    TCreateProjectOutput,
    ICreateProjectInput | IUpdateProjectInput
  >(!project ? CREATE_PROJECT : UPDATE_PROJECT, {
    refetchQueries: [GET_MY_PROJECTS],
    onCompleted: () => setToastOpen(true),
    onError: () => setToastOpen(true),
  });

  const formik = useFormik<ICreateProjectInput | IUpdateProjectInput>({
    initialValues: project || initialProjectValues,
    enableReinitialize: true,
    validationSchema: editProjectSchema,
    onSubmit: async (data) => {
      const id = project?.id || null;
      const variables = id ? { id, ...data } : data;
      await createProject({ variables });
      formik.resetForm();
    },
  });

  const toastMessage = error?.message || "The project was created successfully.";

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col items-start w-full space-y-6">
      <ToastContainer
        title={error ? ERROR_TITLE : SUCCESS_TITLE}
        message={toastMessage}
        open={toastOpen}
        setOpen={setToastOpen}
      />
      <div className="w-full">
        <label>
          <Text as="div" size="2" mb="1">
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
          <Text as="div" size="2" mb="1">
            Type
          </Text>
          <Select.Root
            defaultValue={formik.values.type || ProjectType.Scrum}
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

      <div className="flex justify-center w-full space-x-4">
        <Dialog.Close>
          <Button variant="soft" size="3" color="gray" className="cursor-pointer">
            Cancel
          </Button>
        </Dialog.Close>
        <Button loading={loading} size="3" className="cursor-pointer" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
