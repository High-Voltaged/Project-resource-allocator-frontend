import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";

import { IUser } from "~/shared/types/user";
import { getUserNameLabel, showToastMessage } from "~/shared/utils";
import { UPDATE_MY_PROFILE } from "~/shared/graphql/user";

import { IUpdateProfileInput } from "./types";
import { updateProfileSchema } from "./validation";
import { Button } from "primereact/button";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "~/state/user-slice";
import { QueryOutput } from "~/shared/types";

export interface SettingsFormProps {
  user: IUser;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [updateProfile, { loading }] = useMutation<QueryOutput<IUser>, IUpdateProfileInput>(UPDATE_MY_PROFILE, {
    onCompleted: (data) => {
      dispatch(setCurrentUser(data.result));
      showToastMessage("You've successfully updated your profile!", toast, "info");
    },
    onError: (error) => {
      showToastMessage(error.message, toast, "error");
      console.error(error.message);
    },
  });

  const toast = useRef<Toast>(null);

  const formik = useFormik<IUpdateProfileInput>({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: (variables) => updateProfile({ variables }),
  });

  return (
    <div className="flex flex-col w-full p-10 space-y-10">
      <Toast ref={toast} position="bottom-center" />
      <div className="flex items-center space-x-8">
        <Avatar label={getUserNameLabel(user)} size="xlarge" className="w-20 h-20 text-lg rounded-lg" />

        <span className="text-lg font-semibold text-featured">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-start space-y-10 md:space-y-0 md:space-x-10 w-full">
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-start w-[30rem] space-y-6">
          <span className="text-xl font-bold text-title">Update Your Profile</span>
          <div className="w-full">
            <InputText
              id="email"
              className="w-full rounded-xl shadow-md placeholder-slate-400"
              placeholder="Your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="pl-2 text-red-500 !mt-1">{formik.errors.email}</small>
            )}
          </div>
          <div className="w-full">
            <InputText
              id="firstName"
              className="w-full rounded-xl shadow-md placeholder-slate-400"
              placeholder="Your first name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <small className="pl-2 text-red-500 !mt-1">{formik.errors.firstName}</small>
            )}
          </div>
          <div className="w-full">
            <InputText
              id="lastName"
              className="w-full rounded-xl shadow-md placeholder-slate-400"
              placeholder="Your last name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <small className="pl-2 text-red-500 !mt-1">{formik.errors.lastName}</small>
            )}
          </div>
          <div className="flex justify-center w-full">
            <ToggleButton
              id="isAvailable"
              className="bg-primary"
              name="isAvailable"
              onLabel="I'm available for tasks"
              offLabel="I'm not available ATM"
              onIcon="pi pi-check"
              offIcon="pi pi-times"
              checked={formik.values.isAvailable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              tooltip="Click to change your availability"
              tooltipOptions={{ position: "top" }}
            />
          </div>
          <div className="flex justify-center w-full">
            <Button loading={loading} className="px-10 rounded-xl bg-featured border-none text-center" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsForm;
