/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { GetApiResults } from '../misc/config';

const Reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

function Show() {
  const { id } = useParams();
  const [{ isLoading, error, show }, dispatch] = useReducer(
    Reducer,
    initialState
  );
  // const [show, SetShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getApi() {
      const Results = await GetApiResults(
        `shows/${id}?embed[]=seasons&embed[]=cast`
      ).catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });
      if (isMounted) {
        dispatch({ type: 'FETCH_SUCCESS', show: Results });
      }
    }

    getApi();
    return () => {
      isMounted = false;
    };
  }, [id]);
  if (isLoading) {
    return <div>Data is being Loaded</div>;
  }
  if (error) {
    return <div>Error Occurred:{error}</div>;
  }
  // eslint-disable-next-line
  console.log(show);

  return <div>{show.id}</div>;
}

export default Show;
