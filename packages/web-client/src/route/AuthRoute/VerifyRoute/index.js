import React from 'react';
import { FullLayout, CenterLayout, NavBarContentLayour } from 'shared-lib/layout';
import { NavBar, NavSpace } from 'shared-lib/nav';
import { BlankButton, PrimaryButton } from 'shared-lib/button';
import { useLogout } from 'firebase-wrapper/auth';
import { useDispatch } from 'react-redux';
import { setDialogScreen } from '../../../redux/actions';
import SendEmailVerificationDialog from './SendEmailVerificationDialog';
import useEmailVerifiedEffect from '../../../hook/useEmailVerifiedEffect';
import useGlobalState from '../../../hook/useGlobalState';
import { Countdown } from 'shared-lib/component';
import { useVisibilityChange } from 'shared-lib/hook';

const timeLimit = 3000;

const VerifyRoute = props => {
  const { userDoc } = useGlobalState();
  const { verifyEmailSent } = userDoc;
  const dispatch = useDispatch();
  const logout = useLogout();
  useEmailVerifiedEffect();
  const [timeElapsed, setTimeElapsed] = React.useState();
  const sendVerificationEmail = React.useCallback(e => {
    dispatch(setDialogScreen(() => {
      return <SendEmailVerificationDialog />;
    }));
  }, [dispatch]);
  const onVisibilityChange = React.useCallback(() => {
    if (!document.hidden && verifyEmailSent) {
      setTimeElapsed(Math.round((Date.now() - verifyEmailSent.toDate()) / 1000));
    }
  }, [verifyEmailSent]);
  useVisibilityChange(onVisibilityChange);
  React.useEffect(() => {
    if (verifyEmailSent) {
      setTimeElapsed(Math.round((Date.now() - verifyEmailSent.toDate()) / 1000));
    }
  }, [verifyEmailSent]);
  const disabled = React.useMemo(() => {
    if (!verifyEmailSent) {
      return false;
    }
    return timeElapsed < timeLimit || !timeElapsed;
  }, [timeElapsed, verifyEmailSent]);
  return <FullLayout>
    <NavBar>
      <NavSpace>

      </NavSpace>
      <BlankButton onClick={logout}>logout</BlankButton>
    </NavBar>
    <NavBarContentLayour>
      <CenterLayout>
        <PrimaryButton disabled={disabled} onClick={sendVerificationEmail}>
          {
            disabled ? <Countdown count={timeLimit - timeElapsed} /> : <div>send verification email</div>
          }
        </PrimaryButton>
      </CenterLayout>
    </NavBarContentLayour>
  </FullLayout>;
};

export default VerifyRoute;