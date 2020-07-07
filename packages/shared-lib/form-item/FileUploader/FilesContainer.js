import styled from 'styled-components';

const FilesContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-auto-rows: 1fr;
`;

export default FilesContainer;