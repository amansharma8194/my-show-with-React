import React from 'react';
import ActorCard from './ActorCard';
import NotFound from '../images/not-found.png';

function ActorGrid({ Data }) {
  return (
    <div>
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
    </div>
  );
}

export default ActorGrid;
