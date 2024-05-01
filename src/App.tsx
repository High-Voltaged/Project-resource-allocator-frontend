import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";

import Register from "~/pages/Register";
import Login from "~/pages/Login";
import ProjectsPage from "~/pages/Projects";
import SettingsPage from "~/pages/user/Settings";

import { BaseRoutes, MyRoutes } from "~/shared/const/routes";
import { getLSValue } from "~/shared/utils";
import { LSKey } from "~/shared/types";
import useCurrentUser from "~/hooks/use-current-user";

const App = () => {
  const { updateCurrentUser } = useCurrentUser();

  useEffect(() => {
    const token = getLSValue(LSKey.AccessToken);
    if (token) {
      updateCurrentUser(token as string);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={BaseRoutes.HOME} element={<div>welcome</div>} />
        <Route path={BaseRoutes.LOGIN} element={<Login />} />
        <Route path={BaseRoutes.REGISTER} element={<Register />} />
        <Route path={BaseRoutes.PROJECTS} element={<ProjectsPage />} />

        <Route path={MyRoutes.SETTINGS} element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
