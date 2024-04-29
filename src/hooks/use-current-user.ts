import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";

import { GET_USER_BY_ID } from "~/shared/graphql/user";
import { IUUIDVars, IUser } from "~/shared/types/user";
import { setCurrentUser } from "~/state/user-slice";
import { setLSValue } from "~/shared/utils";
import { LSKey, QueryOutput } from "~/shared/types";

const useCurrentUser = () => {
  const [getUser] = useLazyQuery<QueryOutput<IUser>, IUUIDVars>(GET_USER_BY_ID);

  const dispatch = useDispatch();

  const updateCurrentUser = async (token: string | undefined) => {
    if (!token) {
      throw new Error("No access token returned.");
    }

    const decoded = jwtDecode(token) as { sub: string };

    if (!decoded || !decoded.sub) {
      throw new Error("Error parsing the jwt: " + token);
    }

    setLSValue(LSKey.AccessToken, token);

    const { data, error } = await getUser({ variables: { id: decoded.sub } });
    if (!data || error) {
      throw new Error(error?.message || "The user with this id does not exist.");
    }

    dispatch(setCurrentUser(data.result));
  };

  return { updateCurrentUser };
};

export default useCurrentUser;
