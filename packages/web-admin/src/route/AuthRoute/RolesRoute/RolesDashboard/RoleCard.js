import React from 'react';
import { Card } from 'shared-lib/component';
import { PrimaryButton, RedButton } from 'shared-lib/button';
import useDeleteRole from 'firebase-wrapper/firestore/useDeleteRole';
import useGlobalState from '../../../../hook/useGlobalState';
import { setDialogScreen } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import DecisionDialog from 'shared-lib/dialog/DecisionDialog';
import useDismissDialog from '../../../../hook/useDismissDialog';
import RoleButtons from 'shared-lib/layout/RoleButtons';

const RoleCard = ({ role, roleIndex, expandIndex, setExpandIndex }) => {
  const { user } = useGlobalState();
  const dispatch = useDispatch();
  const dismissDialog = useDismissDialog();
  const deleteRole = useDeleteRole(role.id);
  const [height, setHeight] = React.useState();
  const show = React.useMemo(() => {
    return roleIndex == expandIndex;
  }, [roleIndex, expandIndex]);
  const isUserAccount = React.useMemo(() => {
    return role.id === user.uid;
  }, [role.id, user.uid]);
  const ref = React.useRef();
  // React.useEffect(() => {
  //   if (ref.current.scrollHeight) {
  //     setHeight(ref.current.scrollHeight);
  //   }
  // }, []);
  const onClick = React.useCallback(e => {
    if (!height) {
      setHeight(ref.current.scrollHeight);
    }
    if (roleIndex != expandIndex) {
      setExpandIndex(roleIndex);
    }
    else {
      setExpandIndex();
    }
  }, [height, setExpandIndex, roleIndex, expandIndex]);
  const onDeleteClick = React.useCallback(() => {
    const onYes = () => {
      deleteRole();
      dismissDialog();
    };
    dispatch(setDialogScreen(() => {
      return <DecisionDialog message={`Are you sure to delete ${role.data.email}?`} onNo={dismissDialog} onYes={onYes} />;
    }));
  }, [deleteRole, dismissDialog, dispatch, role.data.email]);
  return <Card onClick={onClick}>
    <div>{role.data.email}</div>
    <div>{role.data.role}</div>
    <RoleButtons ref={ref} show={show} height={height}>
      <PrimaryButton>Edit</PrimaryButton>
      {!isUserAccount && <RedButton onClick={onDeleteClick}>Delete</RedButton>}
    </RoleButtons>
  </Card>;
};

export default RoleCard;