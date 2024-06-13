const bubbleSort = (array: number[]): [number, number, number | null, number | null][] => {
    const animations: [number, number, number | null, number | null][] = [];
    var newArray = array.slice()
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        animations.push([j, j + 1, null, null]);
        if (newArray[j] > newArray[j + 1]) {
          const temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          animations.push([j, j + 1, newArray[j], newArray[j+1]]);
        }
      }
    }
    return animations;
  };

  
export default bubbleSort;