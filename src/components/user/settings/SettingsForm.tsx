import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Button, Flex, Switch, Text, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons";

import { IUser } from "~/shared/types/user";
import { showToastMessage } from "~/shared/utils";
import { UPDATE_MY_PROFILE } from "~/shared/graphql/user";
import { setCurrentUser } from "~/state/user-slice";
import { QueryOutput } from "~/shared/types";

import { IUpdateProfileInput } from "./types";
import { updateProfileSchema } from "./validation";

export interface SettingsFormProps {
  user: IUser;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [updateProfile, { loading }] = useMutation<QueryOutput<IUser>, IUpdateProfileInput>(UPDATE_MY_PROFILE, {
    onCompleted: (data) => {
      dispatch(setCurrentUser(data.result));
      // showToastMessage("You've successfully updated your profile!", toast, "info");
    },
    onError: (error) => {
      // showToastMessage(error.message, toast, "error");
      console.error(error.message);
    },
  });

  // const toast = useRef<Toast>(null);

  const formik = useFormik<IUpdateProfileInput>({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: (variables) => updateProfile({ variables }),
  });

  return (
    <>
      {/* <Toast ref={toast} position="bottom-center" /> */}
      <div className="flex flex-col w-full p-10 space-y-10">
        <div className="flex flex-col md:flex-row items-start space-y-10 md:space-y-0 md:space-x-10 w-full">
          <form onSubmit={formik.handleSubmit} className="flex flex-col items-start w-full space-y-6">
            <span className="text-xl font-bold text-title">Update Your Profile</span>
            <div className="w-full flex items-center justify-between space-x-4">
              <div>
                <label className="text-slate-700" htmlFor="email">
                  Email
                </label>
                <TextField.Root
                  id="email"
                  size="3"
                  className="w-full rounded-xl shadow-md placeholder-slate-400"
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
                <label className="text-slate-700" htmlFor="firstName">
                  First Name
                </label>
                <TextField.Root
                  id="firstName"
                  size="3"
                  className="w-full rounded-xl shadow-md placeholder-slate-400"
                  placeholder="Your first name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <TextField.Slot>
                    <PersonIcon />
                  </TextField.Slot>
                </TextField.Root>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="text-slate-700" htmlFor="lastName">
                  Last Name
                </label>
                <TextField.Root
                  id="lastName"
                  size="3"
                  className="w-full rounded-xl shadow-md placeholder-slate-400"
                  placeholder="Your last name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <TextField.Slot>
                    <PersonIcon />
                  </TextField.Slot>
                </TextField.Root>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.lastName}</p>
                )}
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
        </div>
      </div>
    </>
  );
};

export default SettingsForm;
