import { useNavigate } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Avatar, Separator, Text } from "@radix-ui/themes";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import useLogout from "~/hooks/use-logout";
import { MyRoutes } from "~/shared/const/routes";
import { IUser } from "~/shared/types/user";
import { getUserNameLabel } from "~/shared/utils";

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <NavigationMenu.Item className="relative">
      <NavigationMenu.Trigger>
        <Avatar fallback={getUserNameLabel(user)} size="4" />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="min-w-[220px] absolute right-0 mt-2 bg-white border border-slate-300 rounded-lg py-5 px-4 shadow-inner z-[1000]">
        <ul>
          <NavigationMenu.Item
            className="flex items-center space-x-2 h-10 p-3 leading-none rounded-md select-none outline-none hover:bg-violet-200 cursor-pointer"
            onClick={() => navigate(MyRoutes.SETTINGS)}
            color="indigo"
          >
            <SettingsIcon color="var(--indigo-11)" className="w-4 h-4" />
            <Text color="indigo">Settings</Text>
          </NavigationMenu.Item>
          <Separator className="my-2 bg-violet-200" size="4" />
          <NavigationMenu.Item
            className="flex items-center space-x-2 h-10 p-3 leading-none rounded-md select-none outline-none hover:bg-red-100 cursor-pointer"
            onClick={logout}
            color="red"
          >
            <LogOutIcon color="var(--red-11)" className="w-4 h-4" />
            <Text color="red">Logout</Text>
          </NavigationMenu.Item>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

export default UserAvatar;
