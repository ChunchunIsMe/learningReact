import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerHeight,
    height: window.innerHeight
  })

  useEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerHeight,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, [])
  return size;
}

export default useWindowSize;