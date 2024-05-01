import { MenuItem } from "primereact/menuitem";
import { useSelector } from "react-redux";
import { RootState } from "~/state";
import UserAvatar from "./UserAvatar";

const items: MenuItem[] = [
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Projects",
    icon: "pi pi-list",
  },
];

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div className="flex items-center justify-between px-20 py-4 bg-primary">
      <div className="flex items-center space-x-4">
        {items.map((item) => (
          <a key={item.label} className="flex items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
          </a>
        ))}
      </div>
      {user && <UserAvatar user={user} />}
    </div>
  );
};

export default Navbar;
