import CenteredBox from "~/containers/CenteredBox";
import RegisterForm from "~/components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <CenteredBox>
      <div className="w-96 px-10 py-8 rounded-xl shadow-lg bg-indigo-200 flex flex-col items-center justify-center">
        <span className="inline-block text-xl text-center font-semibold text-title">Register</span>
        <RegisterForm />
      </div>
    </CenteredBox>
  );
};

export default Register;
