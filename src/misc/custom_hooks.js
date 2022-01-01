/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
import { useReducer, useEffect, useState } from 'react';
import { GetApiResults } from './config';

const ShowsReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD':
      return [...prevState, action.showId];
    case 'REMOVE':
      return prevState.filter(showId => showId !== action.showId);

    default:
      return prevState;
  }
};

function usePersistedReducer(reducer, initailstate, key) {
  const [state, dispatch] = useReducer(reducer, initailstate, initial => {
    const Persisted = localStorage.getItem(key);
    return Persisted ? JSON.parse(Persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}
export function useShows(key = 'shows') {
  return usePersistedReducer(ShowsReducer, [], key);
}

export function useLastQuery(key = 'LastQuery') {
  const [input, setInput] = useState(() => {
    const Persisted = sessionStorage.getItem(key);
    return Persisted ? JSON.parse(Persisted) : '';
  });
  function setPersistedInput(newState) {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  }

  return [input, setPersistedInput];
}
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

export function DisplayShow(showId) {
  const [state, dispatch] = useReducer(Reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    async function getApi() {
      const Results = await GetApiResults(
        `shows/${showId}?embed[]=seasons&embed[]=cast`
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
  }, [showId]);
  return state;
}
