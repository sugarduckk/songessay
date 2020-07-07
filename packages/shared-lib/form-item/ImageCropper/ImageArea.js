import styled from 'styled-components';

const ImageArea = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  touch-action: ${props => props.hasTouchAction ? 'auto' : 'none'};
`;

export default ImageArea;