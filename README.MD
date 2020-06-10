# Sudoku Solver
This project is to develop a solution to solve sodoku puzzles.

# Technology Used
This solution will be JavaScript with simple HTML and CSS accompanying it to provide some sort of graphical interface to better understand what's going on.
# Pseudo Code
The JavaScript with have the following code:
## Initialize State
- Define an array with 81 elements \- This is where the puzzle data will go
- Define empty object
## Recursive Function
- Accepts n as parameter
- Base Case is n==81
- Check element with n index in the array. If element is not 0 proceed, if n is 0, skip this element.
- Check if object contains all the values from 1-9 for this element, if no proceed, if it does, then we reset this object and move backwards
  - To move backwards call the recursive function but n-1
- Iterate through number 1-9 and input value then check row, columns and square
- If conflict, then add value to object and then try another number
- If no conflict leave value and add value to object for the key with the same number of the array element we're looking at
  - To move forward call the recursive function but n+1
- 