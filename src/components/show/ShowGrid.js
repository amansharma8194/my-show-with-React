import React from 'react';
import ShowCard from './ShowCard';
import NotFound from '../images/not-found.png';
import { FlexGrid } from '../styled';

function ShowGrid({ Data }) {
  return (
    <FlexGrid>
      {Data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : NotFound}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
}

export default ShowGrid;
