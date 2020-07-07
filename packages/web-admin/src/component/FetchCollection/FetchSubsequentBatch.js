import React from 'react';
import { useDispatch } from 'react-redux';
import { setState } from '../../redux/actions';
import useSubsequentBatchQuery from 'firebase-wrapper/firestore/useSubsequentBatchQuery';

const FetchSubsequentBatch = ({ page, batches, query, limit, collectionNameBatches }) => {
  const dispatch = useDispatch();
  const handleSubsequentBatch = React.useCallback(docs => {
    dispatch(setState(preState => {
      const newBatch = [...preState[collectionNameBatches]];
      newBatch[page] = docs;
      return {
        [collectionNameBatches]: newBatch
      };
    }));
  }, [page, collectionNameBatches, dispatch]);
  const lastRef = React.useMemo(() => {
    const prePage = page - 1;
    const length = batches[prePage].length;
    return batches[prePage][length - 1].ref;
  }, [batches, page]);
  useSubsequentBatchQuery(query, limit, lastRef, handleSubsequentBatch);
  return null;
};

export default FetchSubsequentBatch;