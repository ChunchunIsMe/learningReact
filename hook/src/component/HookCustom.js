import React from 'react';
import useWindowSize from './useWindowSize';

function HookCustom() {
  const { width, height } = useWindowSize();
  return (
    <div>
      <div>
        宽：{width}
      </div>
      <div>
        高：{height}
      </div>
    </div>
  )
}

export default HookCustom;