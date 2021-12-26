import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import Mainpage from '../components/Mainpage';
import ShowGrid from '../components/show/ShowGrid';
import { GetApiResults } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [Results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const issearchOption = searchOption === 'shows';

  const OninputChange = ev => {
    // eslint-disable-next-line
    setInput(ev.target.value);
  };
  const OnSearch = async () => {
    const data = await GetApiResults(`search/${searchOption}?q=${input}`);
    setResults(data);
    // eslint-disable-next-line
    console.log(data);
  };
  const onkeydown = ev => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
  };
  const onradioChange = ev => {
    setSearchOption(ev.target.value);
  };
  const renderResults = () => {
    if (Results && Results.length === 0) {
      return <div>No results found</div>;
    }
    if (Results && Results.length > 0) {
      return Results[0].show ? (
        <ShowGrid Data={Results} />
      ) : (
        <ActorGrid Data={Results} />
      );
    }
    return null;
  };
  return (
    <Mainpage>
      <input
        placeholder="Search for something"
        type="text"
        onChange={OninputChange}
        value={input}
        onKeyDown={onkeydown}
      />
      <div>
        <label htmlFor="shows">
          shows
          <input
            id="shows"
            type="radio"
            value="shows"
            checked={issearchOption}
            onChange={onradioChange}
          />
        </label>
        <label htmlFor="person">
          person
          <input
            id="person"
            type="radio"
            value="people"
            checked={!issearchOption}
            onChange={onradioChange}
          />
        </label>
      </div>
      <button type="button" onMouseEnter={OnSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpage>
  );
}

export default Home;
