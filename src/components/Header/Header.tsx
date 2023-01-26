import { useEffect, useState } from 'react';
import { SearchPropsType } from '../../App';

export const Search = (props: SearchPropsType) => {
  const [tempSearch, setTempSearch] = useState('');

  useEffect(() => {
    setTempSearch(props.value);
  }, [props.value]);

  return (
    <header className='App-header'>
      <input
        placeholder='search'
        type='text'
        value={tempSearch}
        onChange={(e) => {
          setTempSearch(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          props.onSubmit(tempSearch);
        }}
      >
        find
      </button>
    </header>
  );
};

export default Search;
