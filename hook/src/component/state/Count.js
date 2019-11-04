import React, { useState } from 'react';

function Count() {
  const [count, useCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => useCount(count + 1)}>add count</button>
    </div>
  )
}

export default Count;