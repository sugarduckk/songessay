import React from 'react';
import styled from 'styled-components';

const TextDividerContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${props => props.theme.dim.formItemMargin}px;
  color: black;
  &:before, :after {
    content: '';
    flex: 1;
    height: 1px;
  }
  &:before {
    margin-right: .3em;
    background: linear-gradient(to right, transparent, black);
  }
  &:after {
    margin-left: .3em;
    background: linear-gradient(to right, black,transparent);
  }
`;

const TextDivider = props => {
  return <TextDividerContainer>
    {props.text}
  </TextDividerContainer>;
};

export default TextDivider;