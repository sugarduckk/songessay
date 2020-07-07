import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import GoogleIcon from '../res/icons/GoogleIcon';

const GoogleButton = styled(Button)`
  background: ${props => props.isInteracted ? 'gainsboro' : 'white'};
  border: 1px solid ${props => props.isInteracted ? 'gainsboro' : 'white'};
  color: grey;
  //font-family: Roboto;
  > * {
    pointer-events: none;
  }
`;

const GoogleLoginButton = ({ children, ...otherProps }) => {
  return <GoogleButton {...otherProps}>
    <GoogleIcon style={{ verticalAlign: 'middle' }} fill='white' width='1.5em' height='1.5em' />
    <span style={{ verticalAlign: 'middle', marginLeft: '0.5em' }}>{children}</span>
  </GoogleButton>;
};

export default GoogleLoginButton;