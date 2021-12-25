import React, { useState } from 'react';
import Mainpage from '../components/Mainpage';

function Home() {
  const [input, setInput] = useState('');

  const OninputChange = ev => {
    // eslint-disable-next-line
    setInput(ev.target.value);
  };
  const OnSearch = async () => {
    const r = await fetch(` https://api.tvmaze.com/search/shows?q=${input}`);
    const resp = await r.json();
    // eslint-disable-next-line
    console.log(resp);
  };
  const onkeydown = ev => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
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
    </Mainpage>
  );
}

export default Home;
