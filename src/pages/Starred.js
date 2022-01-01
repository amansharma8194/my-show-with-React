/* eslint-disable no-inner-declarations */
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Mainpage from '../components/Mainpage';
import { useShows } from '../misc/custom_hooks';
import { GetApiResults } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

function Starred() {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(async showId => {
        const ApiIdsResults = await GetApiResults(`shows/${showId}`);
        return ApiIdsResults;
      });

      Promise.all(promises)
        .then(apiData => {
          return apiData.map(show => ({ show }));
        })
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <Mainpage>
      {isLoading && <div>Shows are still LoadinG</div>}
      {error && <div>Error Occured : {error}</div>}
      {!isLoading && !shows && <div>No shows were Added</div>}
      {!isLoading && !error && shows && <ShowGrid Data={shows} />}
    </Mainpage>
  );
}

export default Starred;
