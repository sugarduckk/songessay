import React from 'react';
import { Drawer, DrawerItem } from 'shared-lib/drawer';
import useSetDrawer from '../hook/useSetDrawer';
import useGlobalState from '../hook/useGlobalState';
import { useHistory, useLocation } from 'react-router-dom';
import { useLogout } from 'firebase-wrapper/auth';
import HomeIcon from 'shared-lib/res/icons/HomeIcon';
import SettingIcon from 'shared-lib/res/icons/SettingIcon';
import LogoutIcon from 'shared-lib/res/icons/LogoutIcon';

const AppDrawer = props => {
  const history = useHistory();
  const location = useLocation();
  const { drawerOpen } = useGlobalState();
  const closeDrawer = useSetDrawer(false);
  const logout = useLogout();
  const drawerItems = React.useMemo(() => {
    return [
      {
        key: 'dashboard',
        label: 'Dashboard',
        pathname: '/',
        Icon: HomeIcon,
        onClick: e => {
          history.push('/');
        }
      },
      {
        key: 'roles',
        label: 'Roles',
        pathname: '/roles',
        Icon: SettingIcon,
        onClick: e => {
          history.push('/roles');
        }
      },
      {
        key: 'pricing',
        label: 'Pricing',
        pathname: '/pricing',
        Icon: SettingIcon,
        onClick: e => {
          history.push('/pricing');
        }
      },
      {
        key: 'setting',
        label: 'Setting',
        pathname: '/setting',
        Icon: SettingIcon,
        onClick: e => {
          history.push('/setting');
        }
      },
      {
        key: 'logout',
        label: 'Logout',
        Icon: LogoutIcon,
        onClick: logout
      }
    ];
  }, [history, logout]);
  return <Drawer show={drawerOpen} closeDrawer={closeDrawer}>
    {drawerItems.map(item => {
      return <DrawerItem item={item} key={item.key} currentRoute={location.pathname === item.pathname} />;
    })}
  </Drawer>;
};

export default AppDrawer;