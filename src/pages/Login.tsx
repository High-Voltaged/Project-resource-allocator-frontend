import CenteredBox from "~/containers/CenteredBox";
import LoginForm from "~/components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <CenteredBox>
      <div className="w-96 px-10 py-8 rounded-xl shadow-lg bg-primary flex flex-col items-center justify-center">
        <div>
          <span className="text-xl text-center font-semibold text-title">Login</span>
        </div>
        <LoginForm />
      </div>
    </CenteredBox>
  );
};

export default Login;
