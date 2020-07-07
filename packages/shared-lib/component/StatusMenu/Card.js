import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.selected ? props.theme.color.primary : props.theme.color.card};
  color: ${props => props.selected ? 'white' : 'black'};
  border-radius: ${props => props.theme.dim.borderRadius}px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0px ${props => props.isInteracted ? '2px 4px' : '0px 0px'} 0px rgba(0,0,0,0.4);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Card;