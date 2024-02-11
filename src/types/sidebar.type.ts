import { ReactNode } from "react";

export type TSidebar =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebar[];
    }
  | undefined;

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
