import React from 'react';

const useFirestoreCollection = (query) => {
  const [collection, setCollection] = React.useState();
  React.useEffect(() => {
    if (query) {
      return query.onSnapshot(snapshot => {
        if (snapshot.empty) {
          setCollection([]);
        }
        else {
          const temp = [];
          snapshot.forEach(doc => {
            temp.push({
              ref: doc,
              id: doc.id,
              data: doc.data()
            });
          });
          setCollection(temp);
        }
      });
    }
  }, [query]);
  return collection;
};

export default useFirestoreCollection;