import React from 'react';
import BottomBarCenterLayout from 'shared-lib/layout/BottomBarCenterLayout';
import BottomBar from 'shared-lib/component/BottomBar';
import bottomBarScreens from './bottomBarScreens';
import useSetRolesScreen from './useSetRolesScreen';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import BottomBarScreen from 'shared-lib/component/BottomBarScreen';
import AddRole from './AddRole';
import useFirestoreCollection from 'firebase-wrapper/firestore/useFirestoreCollection';
import useRolesQuery from 'firebase-wrapper/firestore/query/useRolesQuery';
import RolesDashboard from './RolesDashboard';

const RolesRoute = props => {
  const history = useHistory();
  const location = useLocation();
  const [screenIndex, setScreenIndex] = React.useState();
  const setRolesScreen = useSetRolesScreen();
  React.useEffect(() => {
    const { screen } = qs.parse(location.search);
    if (screen) {
      setScreenIndex(parseInt(screen));
    }
    else {
      setRolesScreen(0);
    }
  }, [history, location.search, setRolesScreen]);
  const rolesQuery = useRolesQuery();
  const roles = useFirestoreCollection(rolesQuery);
  return <>
    <BottomBarCenterLayout>
      <BottomBarScreen show={screenIndex == 0}>
        <RolesDashboard roles={roles} />
      </BottomBarScreen>
      <BottomBarScreen show={screenIndex == 1}>
        <AddRole />
      </BottomBarScreen>
    </BottomBarCenterLayout>
    <BottomBar screens={bottomBarScreens} screenIndex={screenIndex} setScreenIndex={setRolesScreen} />
  </>;
};

export default RolesRoute;