import React from 'react';
import useSameVal from './useSameVal';

function ShowSearch() {
  const { value, setValue } = useSameVal();
  return (
    <div>
      <input onChange={(e) => setValue({ ...value, title1: e.target.value })} />
      <input onChange={(e) => setValue({ ...value, title2: e.target.value })} />
    </div>
  )
}

export default ShowSearch;