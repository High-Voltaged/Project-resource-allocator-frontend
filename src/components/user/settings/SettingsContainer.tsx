import { useSelector } from "react-redux";
import { Tabs } from "@radix-ui/themes";

import PageWrapper from "~/containers/PageWrapper";
import { IUser } from "~/shared/types/user";
import { RootState } from "~/state";

import SettingsForm from "./SettingsForm";
import PasswordForm from "./PasswordForm";

const SettingsContainer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as IUser;

  return (
    <PageWrapper>
      <div className="flex w-full border border-primary bg-white rounded-xl">
        {user && (
          <div className="p-1">
            <Tabs.Root defaultValue="account">
              <Tabs.List>
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Settings</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="account">
                <SettingsForm user={user} />
              </Tabs.Content>
              <Tabs.Content value="password">
                <PasswordForm />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default SettingsContainer;
