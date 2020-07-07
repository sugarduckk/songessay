import React from 'react';
import { ListItem, ClickableListItem, LargeProfileImg } from 'shared-lib/component';
import useGlobalState from '../../../hook/useGlobalState';
import { PrimaryButton } from 'shared-lib/button';
import useUpdateProfileDialog from '../../../hook/useUpdateProfileDialog';
import useUpdateDisplayDialog from '../../../hook/useUpdateDisplayDialog';
import CenterLayout from 'shared-lib/layout/CenterLayout';

const SettingRoute = props => {
  const { userDoc } = useGlobalState();
  const { profile } = userDoc;
  const updateDiaply = useUpdateDisplayDialog();
  const updateFirstname = useUpdateProfileDialog('firstname', profile.firstname);
  const updateLastname = useUpdateProfileDialog('lastname', profile.lastname);
  const updateNickname = useUpdateProfileDialog('nickname', profile.nickname);
  return <CenterLayout>
    <ListItem>
      <LargeProfileImg src={profile.display} alt='profile' />
      <PrimaryButton onClick={updateDiaply}>Edit</PrimaryButton>
    </ListItem>

    <ClickableListItem onClick={updateFirstname}>
      {`firstname: ${profile.firstname}`}
    </ClickableListItem>
    <ClickableListItem onClick={updateLastname}>
      {`lastname: ${profile.lastname}`}
    </ClickableListItem>
    <ClickableListItem onClick={updateNickname}>
      {`nickname: ${profile.nickname}`}
    </ClickableListItem>
  </CenterLayout>;
};

export default SettingRoute;