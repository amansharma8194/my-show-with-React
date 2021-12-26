import React from 'react';
import ShowCard from './ShowCard';
import NotFound from '../images/not-found.png';

function ShowGrid({ Data }) {
  return (
    <div>
      {Data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : NotFound}
          summary={show.summary}
        />
      ))}
    </div>
  );
}

export default ShowGrid;
