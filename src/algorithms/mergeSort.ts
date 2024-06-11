type Animation = {
    comparison: boolean; // Indices being compared
    merge: { index: number; value: number }; // Index and value being merged
  };
  
// Merge two sorted subarrays into one sorted array and record the steps
const merge = (left: number[], right: number[], leftStartIdx: number, animations: Animation[]): number[] => {
    let result = [];
    let i = 0;
    let j = 0;
    let k = leftStartIdx;
  
    // Compare elements from left and right arrays and merge them into result
    while (i < left.length && j < right.length) {
      animations.push({ comparison: true, merge: { index: -1, value: -1 } });
  
      if (left[i] < right[j]) {
        result.push(left[i]);
        animations.push({ comparison: false, merge: { index: k, value: left[i] } });
        i++;
      } else {
        result.push(right[j]);
        animations.push({ comparison: false, merge: { index: k, value: right[j] } });
        j++;
      }
      k++;
    }
  
    // Append any remaining elements from the left array
    while (i < left.length) {
      result.push(left[i]);
      animations.push({ comparison: false, merge: { index: k, value: left[i] } });
      i++;
      k++;
    }
  
    // Append any remaining elements from the right array
    while (j < right.length) {
      result.push(right[j]);
      animations.push({ comparison: false, merge: { index: k, value: right[j] } });
      j++;
      k++;
    }
  
    return result;
};
  
  // Merge sort function with steps recording
  const mergeSort = (array: number[], animations: Animation[] = [], startIdx = 0): [number[], Animation[]] => {
    // Base case: if the array has 1 or 0 elements, it is already sorted
    if (array.length <= 1) {
      return [array, animations];
    }
  
    // Split the array into two halves
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);
  
    // Recursively sort the left and right halves
    const [sortedLeft] = mergeSort(left, animations, startIdx);
    const [sortedRight] = mergeSort(right, animations, startIdx + mid);
  
    // Merge the sorted halves
    const sortedArray = merge(sortedLeft, sortedRight, startIdx, animations);
  
    return [sortedArray, animations];
};
  
export default mergeSort;