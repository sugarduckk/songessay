import React from 'react';
import Loader from './Loader';
import RatioContainer from './RatioContainer';
import LoaderContainer from './LoaderContainer';
import Text from './Text';
import FullLayout from '../../layout/FullLayout';

const LoadingScreen = props => {
  return <FullLayout>
    <LoaderContainer>
      <RatioContainer>
        <Loader />
        <Text>{props.text}</Text>
      </RatioContainer>
    </LoaderContainer>
  </FullLayout>;
};

export default LoadingScreen;