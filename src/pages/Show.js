import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetApiResults } from '../misc/config';

function Show() {
  const { id } = useParams();
  const [show, SetShow] = useState(null);

  useEffect(() => {
    async function getApi() {
      const Results = await GetApiResults(
        `shows/${id}?embed[]=seasons&embed[]=cast`
      );
      SetShow(Results);
    }

    getApi();
  }, [id]);
  // eslint-disable-next-line
  console.log(show);
  return <div>This is show page</div>;
}

export default Show;
