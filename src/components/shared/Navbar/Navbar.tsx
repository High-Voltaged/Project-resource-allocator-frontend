import { useSelector } from "react-redux";
import { TabNav } from "@radix-ui/themes";

import { RootState } from "~/state";

import UserAvatar from "./UserAvatar";
import { MENU_ITEMS } from "./const";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between px-20 py-4 bg-primary">
      <TabNav.Root size="2">
        {MENU_ITEMS.map((item) => (
          <TabNav.Link key={item.label} href={item.path} active={pathname === item.path}>
            {item.label}
          </TabNav.Link>
        ))}
      </TabNav.Root>
      {user && <UserAvatar user={user} />}
    </div>
  );
};

export default Navbar;
