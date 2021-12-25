import React, { useState } from 'react';
import Mainpage from '../components/Mainpage';
import { GetApiResults } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [Results, setResults] = useState(null);

  const OninputChange = ev => {
    // eslint-disable-next-line
    setInput(ev.target.value);
  };
  const OnSearch = async () => {
    const data = await GetApiResults(`search/shows?q=${input}`);
    setResults(data);
    // eslint-disable-next-line
    console.log(data);
  };
  const onkeydown = ev => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
  };
  const renderResults = () => {
    if (Results && Results.length === 0) {
      return <div>No results found</div>;
    }
    if (Results && Results.length > 0) {
      return (
        <div>
          {Results.map(item => {
            return <div key={item.show.id}>{item.show.name}</div>;
          })}
        </div>
      );
    }
    return null;
  };
  return (
    <Mainpage>
      <input
        type="text"
        onChange={OninputChange}
        value={input}
        onKeyDown={onkeydown}
      />
      <button type="button" onMouseEnter={OnSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpage>
  );
}

export default Home;
