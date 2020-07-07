import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import FacebookIcon from '../res/icons/FacebookIcon';

const FacebookButton = styled(Button)`
  background: ${props => props.isInteracted ? '#4593f4' : '#1778F2'};
  border: 1px solid ${props => props.isInteracted ? '#4593f4' : '#1778F2'};
  > * {
    pointer-events: none;
  }
`;

const FacebookLoginButton = ({ children, ...otherProps }) => {
  return <FacebookButton {...otherProps}>
    <FacebookIcon style={{ verticalAlign: 'middle' }} fill='white' width='1.5em' height='1.5em' />
    <span style={{ verticalAlign: 'middle', marginLeft: '0.5em' }}>{children}</span>
  </FacebookButton>;
};

export default FacebookLoginButton;