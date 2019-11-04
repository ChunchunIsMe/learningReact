import { useState } from 'react';

function useSameVal() {
  const [value, setValue] = useState({
    title1: '',
    title2: ''
  })

  return {
    value,
    setValue
  }
}

export default useSameVal;