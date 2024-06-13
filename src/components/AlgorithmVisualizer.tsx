import React, {  useState, useRef  } from 'react'
import ArrayVisualizer from './ArrayVisualizer'
import { handleBubbleSort, handleMergeSort, handleQuickSort } from '../handlers/sortingHandlers';

interface AlgorithmVisualizerProps {
}

const ARRAYSIZE = 250;
const SPEED = 1

const originalArray : number[] = [];
for (let i = 0; i < ARRAYSIZE; i++) {
  const randomNum = Math.floor(Math.random() * (150 - 5 + 1)) + 5;
  originalArray.push(randomNum);
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = () => {
  
  const [array, setArray] = useState<number[]>([40, 10, 100, 70]);
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

  const handleBestCase = (): void => {
    resetArray();
    const newArray: number[] = [];
    for (let i = 0; i < ARRAYSIZE; i++) {
      newArray.push(i);
    }
    setArray(newArray);
    setNumberOfSteps(0);
  };

  return (
    <div>
      <div className='control-panel'>
        <button name='bubble-sort-button' disabled={isSorting} onClick={() => handleBubbleSort(array, setArray, setIsSorting, setNumberOfSteps, timeoutRefs, SPEED)}>
            Bubble Sort
        </button>
        <button name='worse-case' onClick={handleWorseCase}>
            Bubble Sort Worse Case Example
        </button>
        <button name='best-case' onClick={handleBestCase}>
            Bubble Sort Best Case Example
        </button>
        <button name='merge-sort-button' disabled={isSorting} onClick={() => handleMergeSort(array, setArray, setIsSorting, setNumberOfSteps, timeoutRefs, SPEED)}>
            Merge Sort
        </button>
        <button name='quick-sort-button' disabled={isSorting} onClick={() => handleQuickSort(array, setArray, setIsSorting, setNumberOfSteps, timeoutRefs, SPEED)}>
            Quick Sort
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