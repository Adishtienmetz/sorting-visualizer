import React, { useState, useRef, useEffect } from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import { handleBubbleSort, handleMergeSort, handleQuickSort } from '../handlers/sortingHandlers';
import AlgorithmCode from './AlgorithmCode';

interface AlgorithmVisualizerProps {}

const generateArray = (size: number) => {
  const newArray = [];
  for (let i = 0; i < size; i++) {
    const randomNum = Math.floor(Math.random() * 120) + 5;
    newArray.push(randomNum);
  }
  return newArray;
};

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = () => {
  const [arraySize, setArraySize] = useState(window.innerWidth / 8);
  const [array, setArray] = useState<number[]>(generateArray(arraySize));
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [numberOfSteps, setNumberOfSteps] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(2);
  const [algorithm, setAlgorithm] = useState<string>('');
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth / 8;
      setArraySize(newSize);
      setArray(generateArray(newSize));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetArray = (): void => {
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current = [];
    setAlgorithm('');
    setIsSorting(false);
    setNumberOfSteps(0);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.currentTarget.value) {
      case 'fast':
        setSpeed(1);
        break;
      case 'normal':
        setSpeed(5);
        break;
      case 'slow':
        setSpeed(10);
        break;
    }
  };

  const handleGenerateArray = () => {
    resetArray();
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      const randomNum = Math.floor(Math.random() * 120) + 5;
      newArray.push(randomNum);
    }
    setArray(newArray);
  };

  return (
    <div>
      <div className='control-panel'>
        <h1 className='title-container'>Sorting Visualizer</h1>
        <div className='sorting-buttons'>
          <button name='bubble-sort-button' disabled={isSorting} onClick={() => handleBubbleSort(array, setArray, setIsSorting, setNumberOfSteps, setAlgorithm, timeoutRefs, speed)}>
            Bubble Sort
          </button>
          <button name='merge-sort-button' disabled={isSorting} onClick={() => handleMergeSort(array, setArray, setIsSorting, setNumberOfSteps, setAlgorithm, timeoutRefs, speed)}>
            Merge Sort
          </button>
          <button name='quick-sort-button' disabled={isSorting} onClick={() => handleQuickSort(array, setArray, setIsSorting, setNumberOfSteps, setAlgorithm, timeoutRefs, speed)}>
            Quick Sort
          </button>
        </div>
        <div className='generate-and-speed'>
          <button name='generate-button' onClick={handleGenerateArray}>
            Generate Array
          </button>
          <label htmlFor="speed"></label>
          <select name="speed" id="speed" disabled={isSorting} onChange={handleSpeedChange}>
            <option value="fast">Fast</option>
            <option value="normal">Normal</option>
            <option value="slow">Slow</option>
          </select>
        </div>
        <div className='links'>
          <a href="https://github.com/Adishtienmetz/algo-visualizer.git" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </div>
      </div>
      <div className='visualizer-container'>
        <ArrayVisualizer array={array} />
      </div>
      <div className='algorithm-code-container'>
        <AlgorithmCode algorithm={algorithm} numberOfSteps={numberOfSteps}/>
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;
