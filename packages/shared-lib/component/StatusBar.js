import styled from 'styled-components';

const StatusBar = styled.div`
  background: ${props => props.theme.color.card};
  border-radius: ${props => props.theme.dim.borderRadius}px;
  padding: 20px;
  margin: 20px;
  text-align: center;
`;

export default StatusBar;