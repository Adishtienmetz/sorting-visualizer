import React from 'react'

interface AlgorithmCodeProps {
  algorithm: string;
  numberOfSteps: number
}

const AlgorithmCode: React.FC<AlgorithmCodeProps> = ({algorithm, numberOfSteps}) => {
  const bubbleSortCode = 
  `  procedure bubbleSort(A : list of sortable items)
      n := length(A)
      repeat
          swapped := false
          for i := 1 to n - 1 inclusive do
              if A[i - 1] > A[i] then
                  swap(A[i - 1], A[i])
                  swapped := true
              end if
          end for
          n := n - 1
      until not swapped
  end procedure`

  const mergeSortCode = `  procedure mergeSort(A : list of sortable items)
    if length(A) <= 1 then
        return A
    end if

    mid := length(A) / 2
    left := mergeSort(A[1:mid])
    right := mergeSort(A[mid+1:end])

    return merge(left, right)
  end procedure

  procedure merge(left, right)
    result := empty list
    while left is not empty and right is not empty do
        if first(left) <= first(right) then
            append first(left) to result
            left := rest(left)
        else
            append first(right) to result
            right := rest(right)
        end if
    end while

    while left is not empty do
        append first(left) to result
        left := rest(left)
    end while

    while right is not empty do
        append first(right) to result
        right := rest(right)
    end while

    return result
  end procedure`;

  const quickSortCode = `procedure quickSort(A : list of sortable items, low, high)
  if low < high then
      pivotIndex := partition(A, low, high)
      quickSort(A, low, pivotIndex - 1)
      quickSort(A, pivotIndex + 1, high)
  end if
end procedure

procedure partition(A, low, high)
  pivot := A[high]
  i := low - 1
  for j := low to high - 1 do
      if A[j] < pivot then
          i := i + 1
          swap(A[i], A[j])
      end if
  end for
  swap(A[i + 1], A[high])
  return i + 1
end procedure`;
  
  
  return (
    <div>
      { algorithm === 'bubble-sort' && (
        <div className='code-container'>
          <div className='code'>
            <h1>Pseudocode: </h1> 
            <pre>{bubbleSortCode}</pre>
          </div>
          <div className='runtime'>
              <h1>Run Time:</h1>
              <h3>Best: O(n)</h3>
              <h3>Average: O(n²)</h3>
              <h3>Worst: O(n²)</h3>
          </div>
          <h1 className='steps-count'>Number of steps: {numberOfSteps}</h1>
        </div> 
        
      )}
      { algorithm === 'merge-sort' && (
        <div className='code-container'>
          <div className='code'>
            <h1>Pseudocode: </h1> 
            <pre>{mergeSortCode}</pre>
          </div>
          <div className='runtime'>
              <h1>Run Time:</h1>
              <h3>Best: O(n log(n))</h3>
              <h3>Average: O(n log(n))</h3>
              <h3>Worst: O(n log(n))</h3>
          </div>
          <h1 className='steps-count'>Number of steps: {numberOfSteps}</h1>
        </div> 
      )}
      { algorithm === 'quick-sort' && (
        <div className='code-container'>
          <div className='code'>
            <h1>Pseudocode: </h1> 
            <pre>{quickSortCode}</pre>
          </div>
          <div className='runtime'>
              <h1>Run Time:</h1>
              <h3>Best: O(n log(n))</h3>
              <h3>Average: O(n log(n))</h3>
              <h3>Worst: O(n^2)</h3>
          </div>
          <h1 className='steps-count'>Number of steps: {numberOfSteps}</h1>
        </div> 
      )}
    </div>
  )
}

export default AlgorithmCode