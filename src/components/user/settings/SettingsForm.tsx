import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Button, Flex, Heading, Switch, Text, TextField } from "@radix-ui/themes";
import { MailIcon, UserIcon } from "lucide-react";

import { IUser } from "~/shared/types/user";
import { UPDATE_MY_PROFILE } from "~/shared/graphql/user";
import { setCurrentUser } from "~/state/user-slice";
import { QueryOutput } from "~/shared/types";
import ToastContainer from "~/components/shared/Toast";
import { ERROR_TITLE, SUCCESS_TITLE } from "~/shared/const/misc";
import UserSkillSelect from "~/components/shared/Skills/UserSkillSelect";

import { IUpdateProfileInput } from "./types";
import { updateProfileSchema } from "./validation";

export interface SettingsFormProps {
  user: IUser;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ user }) => {
  const [toastOpen, setToastOpen] = useState(false);

  const dispatch = useDispatch();
  const [updateProfile, { loading, error }] = useMutation<QueryOutput<IUser>, IUpdateProfileInput>(UPDATE_MY_PROFILE, {
    onCompleted: (data) => {
      dispatch(setCurrentUser(data.result));
      setToastOpen(true);
    },
    onError: (error) => {
      setToastOpen(true);
      console.error(error.message);
    },
  });

  const formik = useFormik<IUpdateProfileInput>({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      const { email, ...rest } = values;
      const variables = { ...rest, ...(email !== user.email && { email }) };
      updateProfile({ variables });
    },
  });

  const toastMessage = error?.message || "Your profile was updated.";

  return (
    <>
      <ToastContainer
        title={error ? ERROR_TITLE : SUCCESS_TITLE}
        message={toastMessage}
        open={toastOpen}
        setOpen={setToastOpen}
      />
      <div className="flex flex-col w-full p-10 space-y-10">
        <div className="flex flex-col items-start space-y-10 w-full">
          <form onSubmit={formik.handleSubmit} className="flex flex-col items-start w-full space-y-6">
            <Heading as="h3" size="5">
              Update Your Profile
            </Heading>
            <div className="w-full flex items-center justify-between space-x-4">
              <div>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
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
                      <MailIcon className="w-5 h-5" />
                    </TextField.Slot>
                  </TextField.Root>
                  {formik.touched.email && formik.errors.email && (
                    <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.email}</p>
                  )}
                </label>
              </div>
              <div>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    First Name
                  </Text>

                  <TextField.Root
                    id="firstName"
                    size="3"
                    className="w-full rounded-xl border border-slate-100 placeholder-slate-400"
                    placeholder="Your first name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <TextField.Slot>
                      <UserIcon className="w-5 h-5" />
                    </TextField.Slot>
                  </TextField.Root>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.firstName}</p>
                  )}
                </label>
              </div>
              <div>
                <label className="text-slate-700" htmlFor="lastName">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Last Name
                  </Text>
                  <TextField.Root
                    id="lastName"
                    size="3"
                    className="w-full rounded-xl border border-slate-100 placeholder-slate-400"
                    placeholder="Your last name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <TextField.Slot>
                      <UserIcon className="w-5 h-5" />
                    </TextField.Slot>
                  </TextField.Root>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.lastName}</p>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <Text as="label" size="3">
                <Flex gap="2">
                  <span className="text-title">
                    {formik.values.isAvailable ? "I'm available" : "I'm not available"}
                  </span>
                  <Switch
                    id="isAvailable"
                    name="isAvailable"
                    size="3"
                    checked={formik.values.isAvailable}
                    onCheckedChange={(v) => formik.setFieldValue("isAvailable", v)}
                  />
                </Flex>
              </Text>
            </div>
            <div className="flex justify-center w-full">
              <Button
                size="3"
                variant="outline"
                loading={loading}
                className="px-10 rounded-xl border-none text-center cursor-pointer"
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
          <div className="flex flex-col items-start space-y-2 w-full">
            <Heading as="h3" size="5">
              Your Skills
            </Heading>

            <UserSkillSelect user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsForm;
