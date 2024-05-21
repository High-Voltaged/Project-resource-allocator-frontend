import { Spinner, Tabs } from "@radix-ui/themes";
import { useQuery } from "@apollo/client";

import { GET_MY_PROFILE } from "~/shared/graphql/user";
import { QueryOutput } from "~/shared/types";
import { IUser } from "~/shared/types/user";

import SettingsForm from "./SettingsForm";
import PasswordForm from "./PasswordForm";

const SettingsContainer: React.FC = () => {
  const { data, loading } = useQuery<QueryOutput<IUser>>(GET_MY_PROFILE);

  const user = data?.result;

  return (
    <div className="flex w-full bg-white rounded-xl shadow-md">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="3" loading={loading} />
        </div>
      ) : user ? (
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
      ) : null}
    </div>
  );
};

export default SettingsContainer;
