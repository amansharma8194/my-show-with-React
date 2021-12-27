import React from 'react';
import ActorCard from './ActorCard';
import NotFound from '../images/not-found.png';
import { FlexGrid } from '../styled';

function ActorGrid({ Data }) {
  return (
    <FlexGrid>
      {Data.map(({ person }) => (
        <ActorCard
          key={person.id}
          image={person.image ? person.image.medium : NotFound}
          name={person.name}
          gender={person.gender}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
        />
      ))}
    </FlexGrid>
  );
}

export default ActorGrid;
