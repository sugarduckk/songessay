import styled from 'styled-components';

const ZoomBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${props => props.theme.dim.formItemMargin}px;
`;

export default ZoomBarContainer;