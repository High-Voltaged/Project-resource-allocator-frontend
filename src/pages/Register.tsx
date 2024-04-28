import CenteredBox from "~/containers/CenteredBox";
import RegisterForm from "~/components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <CenteredBox>
      <div className="w-96 px-10 py-8 rounded-xl shadow-lg bg-primary flex flex-col items-center justify-center">
        <div>
          <span className="text-xl text-center font-semibold text-title">Register</span>
        </div>
        <RegisterForm />
      </div>
    </CenteredBox>
  );
};

export default Register;
