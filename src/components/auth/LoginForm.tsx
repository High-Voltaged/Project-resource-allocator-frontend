import { useFormik } from "formik";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { ILoginInput } from "./types";
import { initialLoginValues, loginSchema } from "./const";

const LoginForm: React.FC = () => {
  const formik = useFormik<ILoginInput>({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <form className="flex flex-col items-center w-full space-y-6 mt-6" onSubmit={formik.handleSubmit}>
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
        <Button raised className="w-3/4 block rounded-xl bg-featured border-none text-center" type="submit">
          Submit
        </Button>
        <div className="w-full mt-4 flex justify-center space-x-1 text-title text-sm font-semibold">
          <span>Don't have an account?</span>
          <a href="/register" rel="noreferrer" className="text-featured hover:underline">
            Register Here
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
