import CenteredBox from "~/containers/CenteredBox";
import LoginForm from "~/components/auth/LoginForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/state";
import { useNavigate } from "react-router-dom";
import { BaseRoutes } from "~/shared/const/routes";

const Login: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      navigate(BaseRoutes.PROJECTS);
    }
  }, [user]);

  return (
    <CenteredBox>
      <div className="w-96 px-10 py-8 rounded-xl shadow-lg bg-indigo-200 flex flex-col items-center justify-center">
        <span className="inline-block text-xl text-center font-semibold text-title">Login</span>
        <LoginForm />
      </div>
    </CenteredBox>
  );
};

export default Login;
