import styled from "styled-components";

const withStyled = (Component) => (css) => {
  return styled(Component)`
    ${css}
  `;
};

export default withStyled;