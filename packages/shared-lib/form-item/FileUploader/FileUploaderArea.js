import styled from 'styled-components';

const FileUploaderArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.dim.formItemMargin}px;
  border: 1px solid lightgrey;
  border-radius: ${props => props.theme.dim.borderRadius}px;
  padding: 0.75em;
`;

export default FileUploaderArea;