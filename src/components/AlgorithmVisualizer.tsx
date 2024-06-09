import React, {  useState, useRef  } from 'react'
import ArrayVisualizer from './ArrayVisualizer'
import bubbleSort from '../algorithms/bubbleSort'

interface AlgorithmVisualizerProps {
}

const ARRAYSIZE = 100;

const originalArray : number[] = [];
for (let i = 0; i < ARRAYSIZE; i++) {
  const randomNum = Math.floor(Math.random() * (150 - 5 + 1)) + 5;
  originalArray.push(randomNum);
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = () => {
  
  const [array, setArray] = useState<number[]>(originalArray);
  const [algorithm, setAlgorithm] = useState<((array: number[]) => [number, number, number | null, number | null][])>(() => bubbleSort);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [numberOfSteps, setNumberOfSteps] = useState<number>(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

 
  const resetArray = () : void => {
      // Clear any ongoing timeouts to stop the current sorting process
      timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutRefs.current = [];
      setIsSorting(false);
      setNumberOfSteps(0);
  }
  
  const handleSort = () => {
    setIsSorting(true);
    const animations = algorithm(array);
    setNumberOfSteps(animations.length + animations.filter(animation => animation[2] !== null).length);
  
    animations.forEach((animation, i) => {
      const timeoutId = setTimeout(() => {
        setArray(prevArray => {
          const newArray = prevArray.slice();
          if (animation[2] !== null && animation[3] !== null) {
            newArray[animation[0]] = animation[2];
            newArray[animation[0] + 1] = animation[3];
          }
          return newArray;
        });
        // Update the numberOfSwaps state after each animation step
      }, i * 3); // Adjust the delay as needed for visualization speed
      timeoutRefs.current.push(timeoutId);
    });
  };
  

  const handleGenerateArray = () => {
    resetArray()
    const newArray: number[] = [];
    for (let i = 0; i < ARRAYSIZE; i++) {
      const randomNum = Math.floor(Math.random() * (150 - 5 + 1)) + 5;
      newArray.push(randomNum);
    }
    setArray(newArray);
  };
  
  const handleWorseCase = (): void => {
    resetArray();
    const newArray: number[] = [];
    for (let i = ARRAYSIZE; i > 0; i--) {
      newArray.push(i);
    }
    setArray(newArray);
    setNumberOfSteps(0);
  };

  return (
    <div>
      <div className='control-panel'>
        <button name='sort-button' disabled={isSorting} onClick={handleSort}>
          Bubble Sort
        </button>
        <button name='worse-case' onClick={handleWorseCase}>
          Bubble Sort Worse Case Example
        </button>
        <button name='generate-button' onClick={handleGenerateArray}>
          Generate Array
        </button>
        <h1>Number of steps: {numberOfSteps}</h1>
      </div>
      <div>
        <ArrayVisualizer array={array} />
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;