import React from 'react';
import useGlobalState from '../../hook/useGlobalState';
import { setState } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import FetchSubsequentBatch from './FetchSubsequentBatch';
import FetchFirstBatch from './FetchFirstBatch';

const FetchCollection = ({ collectionName, query, limit }) => {
  const collectionNameBatches = React.useMemo(() => collectionName + 'Batches', [collectionName]);
  const dispatch = useDispatch();
  const globalState = useGlobalState();
  const pageArray = React.useMemo(() => globalState[collectionName], [globalState, collectionName]);
  const batches = React.useMemo(() => globalState[collectionNameBatches], [globalState, collectionNameBatches]);
  React.useEffect(() => {
    if (!pageArray) {
      dispatch(setState({
        [collectionName]: [0]
      }));
    }
  }, [pageArray, dispatch, collectionName]);
  React.useEffect(() => {
    if (!batches) {
      dispatch(setState({
        [collectionNameBatches]: [[]]
      }));
    }
  }, [batches, dispatch, collectionNameBatches]);
  React.useEffect(() => {
    return () => {
      dispatch(setState({
        [collectionName]: undefined,
        [collectionNameBatches]: undefined
      }));
    };
  }, [dispatch, collectionName, collectionNameBatches]);
  return <>
    {pageArray && pageArray.length > 0 && pageArray.map(page => {
      if (page === 0) {
        return <FetchFirstBatch key={page} query={query} limit={limit} collectionNameBatches={collectionNameBatches} />;
      }
      return <FetchSubsequentBatch key={page} page={page} query={query} limit={limit} collectionNameBatches={collectionNameBatches} batches={batches} />;
    })}
  </>;
};

export default FetchCollection;