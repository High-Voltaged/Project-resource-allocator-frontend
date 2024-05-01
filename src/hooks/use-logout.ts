import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BaseRoutes } from "~/shared/const/routes";
import { LSKey } from "~/shared/types";
import { setLSValue } from "~/shared/utils";
import { setCurrentUser } from "~/state/user-slice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setCurrentUser(null));

    setLSValue(LSKey.AccessToken, "");

    navigate(BaseRoutes.LOGIN);
  };

  return logout;
};

export default useLogout;
