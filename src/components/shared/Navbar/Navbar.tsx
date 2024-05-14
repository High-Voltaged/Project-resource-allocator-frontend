import { useSelector } from "react-redux";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useLocation } from "react-router-dom";

import { RootState } from "~/state";

import UserAvatar from "./UserAvatar";
import { MENU_ITEMS } from "./const";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { pathname } = useLocation();

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center space-x-4 justify-between px-14 py-4 shadow-sm list-none bg-white">
        <div className="flex items-center space-x-4">
          {MENU_ITEMS.map((item) => (
            <NavigationMenu.Item key={item.label}>
              <NavigationMenu.Link
                active={pathname === item.path}
                className="text-featured hover:bg-violet-200 data-[active]:bg-violet-200 block select-none rounded-md px-6 py-3 font-medium leading-none no-underline outline-none"
                href={item.path}
              >
                {item.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </div>
        {user && <UserAvatar user={user} />}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navbar;
