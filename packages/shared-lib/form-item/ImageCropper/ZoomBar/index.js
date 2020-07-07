import React from 'react';
import ZoomBarContainer from "./ZoomBarContainer";

const ZoomBar = props => {
  return <ZoomBarContainer>
    zoom out
    <input style={{ flex: 1 }} type="range" {...props} />
    zoom in
  </ZoomBarContainer>;
};

export default ZoomBar;