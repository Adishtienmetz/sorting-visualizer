import bubbleSort from "../algorithms/bubbleSort";
import mergeSort from "../algorithms/mergeSort";
import quickSort from "../algorithms/quickSort";


function isNumbersArray(arr: any): arr is number[] {
    return Array.isArray(arr) && arr.every(item => typeof item === 'number');
}

const handleBubbleSort = (array: number[], setArray: React.Dispatch<React.SetStateAction<number[]>>, setIsSorting: React.Dispatch<React.SetStateAction<boolean>>, setNumberOfSteps: React.Dispatch<React.SetStateAction<number>>, timeoutRefs: React.MutableRefObject<NodeJS.Timeout[]>, SPEED : number) => {
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

  const handleMergeSort = (array: number[], setArray: React.Dispatch<React.SetStateAction<number[]>>, setIsSorting: React.Dispatch<React.SetStateAction<boolean>>, setNumberOfSteps: React.Dispatch<React.SetStateAction<number>>, timeoutRefs: React.MutableRefObject<NodeJS.Timeout[]>, SPEED : number) => {
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

  const handleQuickSort = (array: number[], setArray: React.Dispatch<React.SetStateAction<number[]>>, setIsSorting: React.Dispatch<React.SetStateAction<boolean>>, setNumberOfSteps: React.Dispatch<React.SetStateAction<number>>, timeoutRefs: React.MutableRefObject<NodeJS.Timeout[]>, SPEED : number) => {
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
export { handleBubbleSort, handleMergeSort, handleQuickSort };