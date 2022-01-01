/* eslint-disable react/function-component-definition */
import React from 'react';
import ShowCard from './ShowCard';
import NotFound from '../images/not-found.png';
import { FlexGrid } from '../styled';
import { useShows } from '../../misc/custom_hooks';

const ShowGrid = ({ Data }) => {
  const [starredShows, starredDispatch] = useShows();

  return (
    <FlexGrid>
      {Data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);

        const onStarClick = () => {
          if (isStarred) {
            starredDispatch({ type: 'REMOVE', showId: show.id });
          } else {
            starredDispatch({ type: 'ADD', showId: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : NotFound}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
