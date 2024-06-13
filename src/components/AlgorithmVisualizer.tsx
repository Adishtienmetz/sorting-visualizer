import React, {  useState, useRef  } from 'react'
import ArrayVisualizer from './ArrayVisualizer'
import bubbleSort from '../algorithms/bubbleSort'
import mergeSort from '../algorithms/mergeSort'
import quickSort from '../algorithms/quickSort'

interface AlgorithmVisualizerProps {
}

const ARRAYSIZE = 100;
const SPEED = 2

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

  function isNumbersArray(arr: any): arr is number[] {
    return Array.isArray(arr) && arr.every(item => typeof item === 'number');
}
  
  const resetArray = () : void => {
      // Clear any ongoing timeouts to stop the current sorting process
      timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutRefs.current = [];
      setIsSorting(false);
      setNumberOfSteps(0);
  }
  
  const handleBubbleSort = () => {
    setIsSorting(true);
    const animations = bubbleSort(array);
    animations.forEach((animation, i) => {
      const timeoutId = setTimeout(() => {
        setArray(prevArray => {
          const newArray = prevArray.slice();
          if (animation[2] && animation[3]) {
            newArray[animation[0]] = animation[2];
            newArray[animation[0] + 1] = animation[3];
          }
          return newArray;
        });
        if(!animation[2]){
          setNumberOfSteps(prevNumberOfSteps => prevNumberOfSteps+1);
        }
        setNumberOfSteps(prevNumberOfSteps => prevNumberOfSteps+1);
        // Update the numberOfSwaps state after each animation step
      }, i * SPEED); // Adjust the delay as needed for visualization speed
      timeoutRefs.current.push(timeoutId);
    });
  };

  const handleMergeSort = () => {
    setIsSorting(true);
    const animations = mergeSort(array)[1];
    animations.forEach((animation, i) => {
      const timeoutId = setTimeout(() => {
        setArray(prevArray => {
          const newArray = prevArray.slice();
          if ( !animation.comparison ) {
            newArray[animation.merge.index] = animation.merge.value;
          }
          return newArray;
        });
        setNumberOfSteps(prevNumberOfSteps => prevNumberOfSteps+1);
        if(animation.comparison){
          setNumberOfSteps(prevNumberOfSteps => prevNumberOfSteps+1);
        }
        // Update the numberOfSwaps state after each animation step
      }, i * SPEED); // Adjust the delay as needed for visualization speed
      timeoutRefs.current.push(timeoutId);
    });
  };

  const handleQuickSort = () => {
    setIsSorting(true);
    const animations = quickSort(array);
    animations.forEach((animation, i) => {
        const timeoutId = setTimeout(() => {
            setArray(prevArray => {
                const newArray = prevArray.slice();
                if (!animation.comparison && isNumbersArray(animation.indices)) {
                    const [i, j] = animation.indices; // Destructure indices correctly

                    // Swap elements in newArray
                    const temp = newArray[i];
                    newArray[i] = newArray[j];
                    newArray[j] = temp;
                }

                return newArray;
            });
            setNumberOfSteps(prevNumberOfSteps => prevNumberOfSteps+1);
        }, i * SPEED);

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
        <button name='bubble-sort-button' disabled={isSorting} onClick={handleBubbleSort}>
          Bubble Sort
        </button>
        <button name='worse-case' onClick={handleWorseCase}>
          Bubble Sort Worse Case Example
        </button>
        <button name='best-case' onClick={handleBestCase}>
          Bubble Sort Best Case Example
        </button>
        <button name='merge-sort-button' disabled={isSorting} onClick={handleMergeSort}>
          Merge Sort
        </button>
        <button name='quick-sort-button' disabled={isSorting} onClick={handleQuickSort}>
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