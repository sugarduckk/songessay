import styled from 'styled-components';

const Form = styled.form`
  padding: ${props => props.theme.dim.formPadding}px;
  flex-direction: column;
  display: ${props => {
    if (props.show === undefined || props.show) {
      return 'flex';
    }
    else {
      return 'none';
    }
  }};
`;

export default Form;