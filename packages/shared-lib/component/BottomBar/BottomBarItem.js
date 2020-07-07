import styled from 'styled-components';

const BottomBarItem = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.9em;
  color: ${props => props.selected ? props.theme.color.themeOneDark : 'white'};
  cursor: pointer;
`;

export default BottomBarItem;