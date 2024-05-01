import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

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

  const items: MenuItem[] = [
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => navigate(MyRoutes.SETTINGS),
    },
    { label: "Logout", icon: "pi pi-sign-out", command: logout },
  ];

  const menuRef = useRef<Menu>(null);

  return (
    <div className="card flex justify-content-center">
      <Avatar
        label={getUserNameLabel(user)}
        size="xlarge"
        className="w-12 h-12 text-lg rounded-lg"
        onClick={(e) => menuRef.current?.toggle(e)}
      />
      <Menu ref={menuRef} model={items} popup popupAlignment="right" className="mt-3" />
    </div>
  );
};

export default UserAvatar;
