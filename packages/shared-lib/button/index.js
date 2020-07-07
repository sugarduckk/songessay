import PrimaryButtonTemp from './PrimaryButton';
import HollowButtonTemp from './HollowButton';
import FacebookLoginButtonTemp from './FacebookLoginButton';
import GoogleLoginButtonTemp from './GoogleLoginButton';
import withSyntheticEvents from '../hoc/withSyntheticEvents';
import BlankButtonTemp from './BlankButton';
import LightButtonTemp from './LightButton';
import RedButtonTemp from './RedButton';

const PrimaryButton = withSyntheticEvents(PrimaryButtonTemp);
const HollowButton = withSyntheticEvents(HollowButtonTemp);
const FacebookLoginButton = withSyntheticEvents(FacebookLoginButtonTemp);
const GoogleLoginButton = withSyntheticEvents(GoogleLoginButtonTemp);
const BlankButton = withSyntheticEvents(BlankButtonTemp);
const LightButton = withSyntheticEvents(LightButtonTemp);
const RedButton = withSyntheticEvents(RedButtonTemp);

export {
  PrimaryButton,
  HollowButton,
  FacebookLoginButton,
  GoogleLoginButton,
  BlankButton,
  LightButton,
  RedButton
};