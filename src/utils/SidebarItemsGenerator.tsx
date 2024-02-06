import { TSidebar, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

export const SidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const routeItems = items.reduce((acc: TSidebar[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      const childElem = item.children.map((child) => {
        return {
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        };
      });
      acc.push({ key: item.name, label: item.name, children: childElem });
    }
    return acc;
  }, []);

  return routeItems;
};
