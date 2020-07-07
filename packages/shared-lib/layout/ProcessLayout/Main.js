import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = ({ children, onSubmit }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [values, setValues] = React.useState({});
  const onSubmitSubForm = React.useCallback((key, value) => {
    return new Promise((resolve, reject) => {
      setValues(v => ({
        ...v,
        [key]: value
      }));
      resolve();
    });
  }, []);
  const onSubmitForm = React.useCallback((key, value) => {
    return onSubmit({
      ...values,
      [key]: value
    });
  }, [onSubmit, values]);
  const goNextPage = React.useCallback(() => {
    setCurrentPage(p => p + 1);
  }, []);
  const goPrevPage = React.useCallback(() => {
    setCurrentPage(p => p - 1);
  }, []);

  const childrenWithProps = React.useMemo(() => {
    return React.Children.map(children, (child, index) => {
      // Checking isValidElement is the safe way and avoids a TS error too.
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onSubmitSubForm,
          onSubmitForm,
          goNextPage,
          goPrevPage,
          globalValues: values,
          show: currentPage == index
        });
      }
      return child;
    });
  }, [children, onSubmitSubForm, onSubmitForm, goNextPage, goPrevPage, currentPage, values]);
  return <MainContainer>
    {childrenWithProps}
  </MainContainer>;
};

export default Main;