import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Select, TextField } from "@radix-ui/themes";
import { MailIcon } from "lucide-react";

import { ADD_PROJECT_MEMBER, PROJECT_USERS } from "~/shared/graphql/project";
import { IProject, UserRole } from "~/shared/types/project";
import ToastContainer from "~/components/shared/Toast";
import { ERROR_TITLE, SUCCESS_TITLE } from "~/shared/const/misc";

import { inviteMemberSchema } from "../validation";
import { IAddProjectUserInput } from "../types";

export interface MemberInviteFormProps {
  project: IProject;
}

const MemberInviteForm: React.FC<MemberInviteFormProps> = ({ project }) => {
  const [toastOpen, setToastOpen] = useState(false);

  const [addMember, { loading, error }] = useMutation<void, IAddProjectUserInput>(ADD_PROJECT_MEMBER, {
    refetchQueries: [PROJECT_USERS],
    onError: () => setToastOpen(true),
  });

  const formik = useFormik({
    initialValues: { email: "", role: UserRole.Employee },
    enableReinitialize: true,
    validationSchema: inviteMemberSchema,
    onSubmit: async (data) => {
      const projectId = project.id;
      const variables = { projectId, ...data };
      await addMember({ variables });
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center space-x-4">
      <ToastContainer
        title={error ? ERROR_TITLE : SUCCESS_TITLE}
        message={error?.message || ""}
        open={toastOpen}
        setOpen={setToastOpen}
      />

      <div className="flex items-center space-x-4">
        <div>
          <TextField.Root
            id="email"
            size="2"
            className="w-full rounded-lg border border-slate-100 placeholder-slate-400"
            placeholder="Your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <TextField.Slot>
              <MailIcon className="w-4 h-4" />
            </TextField.Slot>
          </TextField.Root>
          {formik.touched.email && formik.errors.email && (
            <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <Select.Root
            defaultValue={UserRole.Employee}
            value={formik.values.role}
            onValueChange={(value) => formik.setFieldValue("type", value)}
          >
            <Select.Trigger className="w-full" />
            <Select.Content id="type" className="w-full rounded-lg border border-slate-100 placeholder-slate-400">
              {Object.values(UserRole).map((key) => (
                <Select.Item key={key} value={key}>
                  {key}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <Button
        size="2"
        loading={loading}
        className="px-10 rounded-lg border-none text-center cursor-pointer"
        type="submit"
      >
        Invite
      </Button>
    </form>
  );
};

export default MemberInviteForm;
