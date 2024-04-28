import { useRef } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { showToastMessage } from "~/shared/utils";

import { IRegisterInput } from "../types";
import { initialRegisterValues, registerSchema } from "../validation";
import { REGISTER_MUTATION } from "../graphql";

const RegisterForm: React.FC = () => {
  const [register, { loading }] = useMutation(REGISTER_MUTATION);
  const toast = useRef(null);

  const formik = useFormik<IRegisterInput>({
    initialValues: initialRegisterValues,
    enableReinitialize: true,
    validationSchema: registerSchema,
    onSubmit: (variables) => {
      console.log({ variables });

      register({ variables })
        .then(() => showToastMessage("You registered successfully!", toast, "info"))
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
        <div className="w-full mt-3 flex justify-center space-x-1 text-title text-sm font-semibold">
          <span>Already have an account?</span>
          <a href="/login" rel="noreferrer" className="text-featured hover:underline">
            Login Here
          </a>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
