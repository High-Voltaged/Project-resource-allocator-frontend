import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { Button, Link, TextField } from "@radix-ui/themes";

import { REGISTER_MUTATION } from "~/shared/graphql/auth";
import { BaseRoutes } from "~/shared/const/routes";
import ToastContainer from "~/components/shared/Toast";
import { ERROR_TITLE, SUCCESS_TITLE } from "~/shared/const/misc";

import { IRegisterInput } from "../types";
import { initialRegisterValues, registerSchema } from "../validation";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

const RegisterForm: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false);

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (_data) => setToastOpen(true),
    onError: (error) => {
      setToastOpen(true);
      console.error(error.message);
    },
  });

  const formik = useFormik<IRegisterInput>({
    initialValues: initialRegisterValues,
    enableReinitialize: true,
    validationSchema: registerSchema,
    onSubmit: (variables) => register({ variables }),
  });

  const toastMessage = error?.message || "Your account was created successfully.";

  return (
    <form className="flex flex-col items-center w-full space-y-6 mt-6" onSubmit={formik.handleSubmit}>
      <ToastContainer
        title={error ? ERROR_TITLE : SUCCESS_TITLE}
        message={toastMessage}
        open={toastOpen}
        setOpen={setToastOpen}
      />
      <div className="w-full">
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
            <UserIcon className="w-4 h-4" />
          </TextField.Slot>
        </TextField.Root>
        {formik.touched.firstName && formik.errors.firstName && (
          <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.firstName}</p>
        )}
      </div>
      <div className="w-full">
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
            <UserIcon className="w-4 h-4" />
          </TextField.Slot>
        </TextField.Root>
        {formik.touched.lastName && formik.errors.lastName && (
          <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.lastName}</p>
        )}
      </div>
      <div className="w-full">
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
            <MailIcon className="w-4 h-4" />
          </TextField.Slot>
        </TextField.Root>
        {formik.touched.email && formik.errors.email && (
          <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.email}</p>
        )}
      </div>
      <div className="w-full">
        <TextField.Root
          id="password"
          size="3"
          className="w-full rounded-xl shadow-md placeholder-slate-400"
          placeholder="Your password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <TextField.Slot>
            <LockIcon className="w-4 h-4" />
          </TextField.Slot>
        </TextField.Root>
        {formik.touched.password && formik.errors.password && (
          <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.password}</p>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <Button
          loading={loading}
          size="3"
          className="w-3/4 block rounded-xl border-none text-center cursor-pointer"
          type="submit"
        >
          Submit
        </Button>
        <div className="w-full mt-3 flex justify-center space-x-1 text-title text-sm font-semibold">
          <span>Already have an account?</span>
          <Link href={BaseRoutes.LOGIN} rel="noreferrer">
            Login Here
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
