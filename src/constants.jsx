import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
   
  },
  {
    title: 'Inventory',
    path: '/projects',
    icon: <Icon icon="fluent-mdl2:work-item" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Item', path: '/item' },
      { title: 'Stock Item', path: '/stockitem' },
      { title: 'Stock Adjustment', path: '/stockadjustment' },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
