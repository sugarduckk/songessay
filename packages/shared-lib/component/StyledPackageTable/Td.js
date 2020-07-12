import styled from 'styled-components';

const Td = styled.td`
  background: ${props => props.isInteracted ? 'white' : 'transparent'};
  color: ${props => props.isInteracted ? props.theme.color.primary : 'black'};
  transition: 0.2s;
`;

export default Td;