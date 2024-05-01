import { useSelector } from "react-redux";

import PageWrapper from "~/containers/PageWrapper";
import { IUser } from "~/shared/types/user";
import { RootState } from "~/state";
import SettingsForm from "./SettingsForm";

const SettingsContainer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as IUser;

  return (
    <PageWrapper>
      <div className="flex w-full border-2 border-primary bg-gray-100 rounded-xl">
        {user && <SettingsForm user={user} />}
      </div>
    </PageWrapper>
  );
};

export default SettingsContainer;
