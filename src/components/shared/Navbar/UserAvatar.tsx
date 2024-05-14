import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

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
          <Button>
            <Avatar fallback={getUserNameLabel(user)} size="4" />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => navigate(MyRoutes.SETTINGS)}>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={logout}>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserAvatar;
