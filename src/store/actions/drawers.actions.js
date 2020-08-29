export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_ALL_DRAWERS = 'CLOSE_ALL_DRAWERS';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export const openDrawer = (drawer, drawerType = "") => ({
  type: OPEN_DRAWER,
  drawer,
  drawerType,
});

export const closeDrawer = drawer => ({
  type: CLOSE_DRAWER,
  drawer
});

export const closeAllDrawers = drawer => ({
  type: CLOSE_ALL_DRAWERS,
});
