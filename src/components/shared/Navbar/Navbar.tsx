import { Menubar } from "primereact/menubar";
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

  const itemRenderer = (item: MenuItem) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
    </a>
  );

  const model = items.map<MenuItem>((i) => ({ ...i, template: itemRenderer }));
  const end = user ? <UserAvatar user={user} /> : null;

  return <Menubar model={model} end={end} />;
};

export default Navbar;
