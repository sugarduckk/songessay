import styled from 'styled-components';

const DropFileArea = styled.div`
  padding: 1em;
  background: lightgrey;
  border-radius: ${props => props.theme.dim.borderRadius}px;
  border: 4px ${props => props.isDragOver ? props.theme.color.primary : 'darkgrey'} dashed;
  margin: ${props => props.theme.dim.formItemMargin}px;
  font-family: Prompt;
  text-align: center;
  box-shadow: 0px 2px ${props => props.isDragOver ? '4' : '2'}px 0px rgba(0,0,0,0.4);
`;

export default DropFileArea;