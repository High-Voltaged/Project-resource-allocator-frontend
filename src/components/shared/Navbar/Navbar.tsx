import { useSelector } from "react-redux";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { RootState } from "~/state";

import UserAvatar from "./UserAvatar";
import { MENU_ITEMS } from "./const";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center space-x-4 justify-between mx-10 p-4 border-b-2 border-x-2 border-slate-300 list-none rounded-b-lg bg-white">
        <div className="flex items-center space-x-4">
          {MENU_ITEMS.map((item) => (
            <NavigationMenu.Item key={item.label}>
              <NavigationMenu.Link
                className="text-featured hover:bg-violet-200 block select-none rounded-md px-6 py-3 font-medium leading-none no-underline outline-none"
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
