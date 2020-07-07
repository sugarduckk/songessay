import React from 'react';

const Countdown = ({ count, callback }) => {
  const [counter, setCounter] = React.useState();
  React.useEffect(() => {
    if (counter > 0) {
      var timeout = setTimeout(() => {
        setCounter(c => c - 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
    else if (callback) {
      callback();
    }
  }, [counter, callback]);
  React.useEffect(() => {
    setCounter(count);
  }, [count]);
  if (counter) {
    return <div>{counter}</div>;
  }
  return <div>non</div>;
};

export default Countdown;