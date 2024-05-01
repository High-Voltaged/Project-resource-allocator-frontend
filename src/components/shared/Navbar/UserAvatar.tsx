import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRef } from "react";
import useLogout from "~/hooks/use-logout";
import { IUser } from "~/shared/types/user";

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const logout = useLogout();

  const items: MenuItem[] = [
    {
      label: "Settings",
      icon: "pi pi-cog",
      // command: // navigate to user settings
    },
    { label: "Logout", icon: "pi pi-sign-out", command: logout },
  ];

  const menuRef = useRef<Menu>(null);

  const label = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

  return (
    <div className="card flex justify-content-center">
      <Avatar
        label={label}
        size="xlarge"
        className="w-12 h-12 text-lg rounded-lg"
        onClick={(e) => menuRef.current?.toggle(e)}
      />
      <Menu ref={menuRef} model={items} popup popupAlignment="right" className="mt-3" />
    </div>
  );
};

export default UserAvatar;
