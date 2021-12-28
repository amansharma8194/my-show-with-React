import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetApiResults } from '../misc/config';

function Show() {
  const { id } = useParams();
  const [show, SetShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getApi() {
      const Results = await GetApiResults(
        `shows/${id}?embed[]=seasons&embed[]=cast`
      ).catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });
      if (isMounted) {
        SetShow(Results);
        setIsLoading(false);
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

  return <div>{show.id}</div>;
}

export default Show;
