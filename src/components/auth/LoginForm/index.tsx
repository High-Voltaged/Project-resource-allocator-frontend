import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Link, TextField } from "@radix-ui/themes";
import { LockIcon, MailIcon } from "lucide-react";

import useCurrentUser from "~/hooks/use-current-user";
import { BaseRoutes } from "~/shared/const/routes";
import { LOGIN_MUTATION } from "~/shared/graphql/auth";
import ToastContainer from "~/components/shared/Toast";
import { ERROR_TITLE, SUCCESS_TITLE } from "~/shared/const/misc";

import { ILoginInput, TLoginOutput } from "../types";
import { initialLoginValues, loginSchema } from "../validation";

const LoginForm: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false);

  const [login, { loading, error }] = useMutation<TLoginOutput, ILoginInput>(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      await updateCurrentUser(data.result.accessToken);
      navigate(BaseRoutes.PROJECTS);
    },
    onError: (error) => {
      setToastOpen(true);
      console.error(error.message);
    },
  });

  const { updateCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const formik = useFormik<ILoginInput>({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (variables) => login({ variables }),
  });

  return (
    <form className="flex flex-col items-center w-full space-y-6 mt-6" onSubmit={formik.handleSubmit}>
      <ToastContainer
        title={error ? ERROR_TITLE : SUCCESS_TITLE}
        message={error?.message || ""}
        open={toastOpen}
        setOpen={setToastOpen}
      />

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
            <MailIcon className="w-5 h-5" />
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
            <LockIcon className="w-5 h-5" />
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
        <div className="w-full mt-4 flex justify-center space-x-1 text-title text-sm font-semibold">
          <span>Don't have an account?</span>
          <Link href={BaseRoutes.REGISTER} rel="noreferrer">
            Register Here
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
