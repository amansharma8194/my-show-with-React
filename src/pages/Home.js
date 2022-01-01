import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import Mainpage from '../components/Mainpage';
import ShowGrid from '../components/show/ShowGrid';
import { GetApiResults } from '../misc/config';
import { useLastQuery } from '../misc/custom_hooks';
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from './Home.styled';

function Home() {
  const [input, setInput] = useLastQuery();
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
      <SearchInput
        placeholder="Search for something"
        type="text"
        onChange={OninputChange}
        value={input}
        onKeyDown={onkeydown}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="shows"
            id="shows"
            value="shows"
            checked={issearchOption}
            onChange={onradioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="person"
            id="person"
            value="people"
            checked={!issearchOption}
            onChange={onradioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={OnSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </Mainpage>
  );
}

export default Home;
