import React, { useEffect, useState } from 'react'
import ArrayVisualizer from './ArrayVisualizer'
import bubbleSort from '../algorithms/bubbleSort'

interface AlgorithmVisualizerProps {
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = () => {
  
  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<((array: number[]) => [number, number, number | null, number | null][])>(() => bubbleSort);
 
  const sort = () => {
    const animations = algorithm(array);
    animations.forEach((animation, i) => {
      setTimeout(() => {
        setArray(prevArray => {
          const newArray = prevArray.slice();
          if (animation[2] !== null && animation[3] !== null) {
            newArray[animation[0]] = animation[2];
            newArray[animation[0] + 1] = animation[3];
          }
          return newArray;
        });
      }, i * 4); // Adjust the delay (4 ms here) as needed for visualization speed
    });
  };

  const generateArray = () => {
    const newArray: number[] = [];
    for (let i = 0; i < 100; i++) {
      const randomNum = Math.floor(Math.random() * (150 - 5 + 1)) + 5;
      newArray.push(randomNum);
    }
    setArray(newArray);
  }

  useEffect(() => {
    generateArray();
  }, []); // Empty dependency array ensures this runs only once on mount

  

  return (
    <div>
      <div className='control-panel'>
        <button 
        name='sort-button'
          onClick={sort}
        >
          bubble sort
        </button>
        <button
        name='generate-button' 
          onClick={generateArray}
        >
          generate array
        </button>
      </div>
      <div>
        <ArrayVisualizer array={array} />
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;