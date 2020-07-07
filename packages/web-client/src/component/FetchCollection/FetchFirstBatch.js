import React from 'react';
import { useDispatch } from 'react-redux';
import { setState } from '../../redux/actions';
import useFirstBatchQuery from 'firebase-wrapper/firestore/useFirstBatchQuery';

const FetchFirstBatch = ({ query, limit, collectionNameBatches }) => {
  const dispatch = useDispatch();
  const handleFirstBatch = React.useCallback(docs => {
    dispatch(setState(preState => {
      const newBatch = [...preState[collectionNameBatches]];
      newBatch[0] = docs;
      return {
        [collectionNameBatches]: newBatch
      };
    }));
  }, [collectionNameBatches, dispatch]);
  useFirstBatchQuery(query, limit, handleFirstBatch);
  return null;
};

export default FetchFirstBatch;