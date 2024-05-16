import { useMutation } from "@apollo/client";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { Button, Select, TextField } from "@radix-ui/themes";

import { ADD_PROJECT_MEMBER, PROJECT_USERS } from "~/shared/graphql/project";
import { IProject, UserRole } from "~/shared/types/project";
import { inviteMemberSchema } from "../validation";
import { IAddProjectUserInput } from "../types";

export interface MemberInviteFormProps {
  project: IProject;
}

const MemberInviteForm: React.FC<MemberInviteFormProps> = ({ project }) => {
  const [addMember, { loading }] = useMutation<void, IAddProjectUserInput>(ADD_PROJECT_MEMBER, {
    refetchQueries: [PROJECT_USERS],
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
      <div className="flex items-center space-x-4">
        <div>
          <TextField.Root
            id="email"
            size="3"
            className="w-full rounded-xl border border-slate-100 placeholder-slate-400"
            placeholder="Your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <TextField.Slot>
              <EnvelopeClosedIcon />
            </TextField.Slot>
          </TextField.Root>
          {formik.touched.email && formik.errors.email && (
            <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <Select.Root
            size="3"
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
        size="3"
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
