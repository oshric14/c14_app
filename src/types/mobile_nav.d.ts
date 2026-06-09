import { navItem } from "./nav";

export type MobileNavContextType = {
  toggleMobileNav: () => void;
  mobileNavIsOpen: boolean;
  navItems: navItem[];
  megaMenuItems: navItem[];
  toggleMegaMenu: () => void;
  megaMenuIsOpen: boolean;
};
