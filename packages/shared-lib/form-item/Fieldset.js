import styled from 'styled-components';

const Fieldset = styled.fieldset`
  padding: 0;
  margin: 0;
  border: 0;
  &:disabled {
    opacity: 0.4;
  }
`;

export default Fieldset;