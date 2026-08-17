export type NavLink = {
  label: string;
  href: string;
  icon: string;
};

export const STATIC_NAV_LINKS: NavLink[] = [
  { label: 'Workbench', href: '/', icon: 'LayoutDashboard' },
  { label: 'About', href: '/about', icon: 'User' },
];
