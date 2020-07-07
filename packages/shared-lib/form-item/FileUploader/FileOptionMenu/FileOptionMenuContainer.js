import styled from 'styled-components';

const FileOptionMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,.8);
  backdrop-filter: blur(16px);
  visibility: ${props => props.showMenu ? 'visible' : 'hidden'};
  opacity: ${props => props.showMenu ? '1' : '0'};
  transition: 0.15s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: default;
`;

export default FileOptionMenuContainer;