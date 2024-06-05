import React from 'react';

interface ArrayVisualizerProps {
  array: number[];
}


const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array }) => {
  

  return (
    <div className="array-container">
      {array.map((value, index) =>
        <div
        className={`array-element`}
          key={index}
          style={{ height: `${value * 3}px`}} // Adjust the multiplier to better represent larger values
        >
        </div>
      )}
    </div>
  );
};

export default ArrayVisualizer;