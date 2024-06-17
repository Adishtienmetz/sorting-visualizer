type Animation = {
    comparison: boolean; // true if its comparison animation, and false if its a placement one.
    merge: { index: number; value: number }; // for placement animation, hold the index and value to place.
  };
  
const merge = (left: number[], right: number[], leftStartIdx: number, animations: Animation[]): number[] => {
    let result = [];
    let i = 0;
    let j = 0;
    let k = leftStartIdx;
  
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
  
    while (i < left.length) {
      result.push(left[i]);
      animations.push({ comparison: false, merge: { index: k, value: left[i] } });
      i++;
      k++;
    }
  
    while (j < right.length) {
      result.push(right[j]);
      animations.push({ comparison: false, merge: { index: k, value: right[j] } });
      j++;
      k++;
    }
  
    return result;
};
  
const mergeSort = (array: number[], animations: Animation[] = [], startIdx = 0): [number[], Animation[]] => {
  // Base case: if the array has 1 or 0 elements, it is already sorted
  if (array.length <= 1) {
    return [array, animations];
  }

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  const [sortedLeft] = mergeSort(left, animations, startIdx);
  const [sortedRight] = mergeSort(right, animations, startIdx + mid);

  const sortedArray = merge(sortedLeft, sortedRight, startIdx, animations);

  return [sortedArray, animations];
};
  
export default mergeSort;