import React, { useState } from 'react';
import './Tasbih.css';

function Tasbih() {
  const [count, setCount] = useState(0);
  const maxCount = 33;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;

  const handleClick = () => {
    const newCount = count >= maxCount ? 1 : count + 1;
    setCount(newCount);
  };

  const offset = circumference - (circumference * count) / maxCount;

  return (
    <div className="wrapper">
      <div className="content" onClick={handleClick}>
        <p className="tasbeeh-btn">سبحان الله</p>
        <p className="counter">{count} / {maxCount}</p>
      </div>
      <svg width="240" height="240">
        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="#38a169"
          strokeWidth="20"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
    </div>
  );
}

export default Tasbih;
