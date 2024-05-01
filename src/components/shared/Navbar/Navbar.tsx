import { useSelector } from "react-redux";

import { RootState } from "~/state";

import UserAvatar from "./UserAvatar";
import { MENU_ITEMS } from "./const";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div className="flex items-center justify-between px-20 py-4 bg-primary">
      <div className="flex items-center space-x-4">
        {MENU_ITEMS.map((item) => (
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
