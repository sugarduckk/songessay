import styled from 'styled-components';

const TextTag = styled.div`
  padding: 0.6em;
  border-radius: 1.1em;
  background: ${props => props.bgColor};
  width: fit-content;
  margin: auto;
  color: white;
  line-height: 1em;
`;

export default TextTag;