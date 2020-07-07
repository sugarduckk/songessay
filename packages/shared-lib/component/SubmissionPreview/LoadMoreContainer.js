import styled from 'styled-components';
import withSyntheticEvents from '../../hoc/withSyntheticEvents';

const LoadMoreContainer = withSyntheticEvents(styled.div`
  background: ${props => props.theme.color.card};
  border-radius: ${props => props.theme.dim.borderRadius}px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px ${props => props.isInteracted ? '2px 4px' : '0px 0px'} 0px rgba(0,0,0,0.4);
  cursor: pointer;
  text-align: center;
`);

export default LoadMoreContainer;