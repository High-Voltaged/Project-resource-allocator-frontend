import { BaseRoutes } from "~/shared/const/routes";

interface MenuItem {
  label: string;
  path: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    path: BaseRoutes.HOME,
  },
  {
    label: "Projects",
    path: BaseRoutes.PROJECTS,
  },
];
