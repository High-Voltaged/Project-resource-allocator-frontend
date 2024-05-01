import { useRef } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { showToastMessage } from "~/shared/utils";
import useCurrentUser from "~/hooks/use-current-user";
import { BaseRoutes } from "~/shared/const/routes";

import { ILoginInput, TLoginOutput } from "../types";
import { initialLoginValues, loginSchema } from "../validation";
import { LOGIN_MUTATION } from "../../../shared/graphql/auth";

const LoginForm: React.FC = () => {
  const [login, { loading }] = useMutation<TLoginOutput, ILoginInput>(LOGIN_MUTATION);
  const toast = useRef(null);
  const { updateCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const formik = useFormik<ILoginInput>({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (variables) => {
      login({ variables })
        .then(({ data }) => updateCurrentUser(data?.result.accessToken))
        .then(() => {
          showToastMessage("You logged in successfully!", toast, "info");
          navigate(BaseRoutes.PROJECTS);
        })
        .catch((err) => {
          showToastMessage(err.message, toast, "error");
          console.error({ err });
        });
    },
  });

  return (
    <form className="flex flex-col items-center w-full space-y-6 mt-6" onSubmit={formik.handleSubmit}>
      <Toast ref={toast} position="bottom-center" />

      <div className="w-full">
        <InputText
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
          className="w-full rounded-xl shadow-md placeholder-slate-400"
          placeholder="Your password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <small className="pl-2 text-red-500 !mt-1">{formik.errors.password}</small>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <Button
          raised
          loading={loading}
          className="w-3/4 block rounded-xl bg-featured border-none text-center"
          type="submit"
        >
          Submit
        </Button>
        <div className="w-full mt-4 flex justify-center space-x-1 text-title text-sm font-semibold">
          <span>Don't have an account?</span>
          <a href={BaseRoutes.REGISTER} rel="noreferrer" className="text-featured hover:underline">
            Register Here
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
