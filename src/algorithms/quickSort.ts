type QuickAnimation = {
    comparison: boolean;
    indices: [number, number];
};

const quickSort = (array: number[]): QuickAnimation[] => {
    const animations: QuickAnimation[] = [];
    const newArray = array.slice()
    quickSortHelper(newArray, 0, newArray.length - 1, animations);
    return animations;
};

function quickSortHelper(newArray: number[], low: number, high: number, animations: QuickAnimation[]): void {
    animations.push({ comparison: true, indices: [low, high] });
    if (low < high) {
        const pi = partition(newArray, low, high, animations);
        quickSortHelper(newArray, low, pi - 1, animations);
        quickSortHelper(newArray, pi + 1, high, animations);
    }
}

function partition(newArray: number[], low: number, high: number, animations: QuickAnimation[]): number {
    const pivot = newArray[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        // Record the comparison
        animations.push({ comparison: true, indices: [j, high] });
        if (newArray[j] <= pivot) {
            i++;
            if(i !== j){
                animations.push({ comparison: false, indices: [i, j] });
            }
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
    }
    if(i+1 !== high){
        animations.push({ comparison: false, indices: [i+1, high] });
    }
    [newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]];
    return i + 1;
}


export default quickSort
