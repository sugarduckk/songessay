import { useSelector } from 'react-redux';

const useGlobalState = () => {
  return useSelector(state => state.global);
};

export default useGlobalState;