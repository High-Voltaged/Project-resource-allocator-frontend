import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Avatar } from "@radix-ui/themes";

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
    <div className="card flex justify-content-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar fallback={getUserNameLabel(user)} size="4" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="min-w-[220px] bg-slate-100 rounded-lg py-5 px-4 shadow-lg" sideOffset={8}>
            <DropdownMenu.Item
              className="flex items-center space-x-2 h-10 p-3 leading-none text-featured rounded-md select-none outline-none hover:bg-featured hover:text-slate-100 cursor-pointer"
              onClick={() => navigate(MyRoutes.SETTINGS)}
            >
              <GearIcon className="w-4 h-4" />
              <span className="inline-block">Settings</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="group flex items-center space-x-2 h-10 p-3 leading-none text-featured rounded-md select-none outline-none hover:bg-featured hover:text-slate-100 cursor-pointer"
              onClick={logout}
            >
              <ExitIcon className="w-4 h-4" />
              <span className="inline-block">Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserAvatar;
