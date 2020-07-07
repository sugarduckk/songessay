import styled from 'styled-components';
import withSyntheticEvents from '../../hoc/withSyntheticEvents';


const FileDivContainer = withSyntheticEvents(styled.div`
  background: ${props => props.error ? '#fcdfe5' : 'white'};
  border-radius: ${props => props.theme.dim.borderRadius}px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  box-shadow: 0px ${props => props.isInteracted ? '2' : '0'}px ${props => props.isInteracted ? '2' : '0'}px 0px rgba(0,0,0,0.4);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: 0.15s ease-in;
  position: relative;
  overflow: hidden; // This is for clipping corner
  z-index: 1;
`);

export default FileDivContainer;