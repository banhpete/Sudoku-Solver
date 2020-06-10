var mainSquare = document.querySelector(".mainsquare");
var testBtn = document.querySelector("button");
var sudokuData = [];
var sudokuMemory = {};

for (i = 0; i < 81; i++) {
  sudokuData[i] = 0;
}

sudokuData.forEach(function (s, index) {
  let square = document.createElement("div");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = 0;
  square.setAttribute("id", index);
  square.classList.add("square");
  square.appendChild(input);
  mainSquare.appendChild(square);
});

testBtn.onclick = takeData;
function takeData() {
  sudokuData.forEach(function (s, index) {
    let square = document.getElementById(index.toString());
    let input = square.firstChild;
    sudokuData[index] = input.value;
    if (input.value > 0) {
      sudokuMemory[index] = "Hardcoded";
    } else {
      sudokuMemory[index] = [];
    }
  });
  solve2();
}

function rerender(n) {
  let square = document.getElementById(n - 1);
  let input = square.firstChild;
  input.value = sudokuData[n - 1];
  return true;
}

function solve(n) {
  if (n == 82) {
    return true;
  }

  if (sudokuData[n - 1] != 0 && sudokuMemory[n - 1].length == 0) {
    console.log("Hardcoded-Value");
    rerender(n);
    solve(n + 1);
  } else {
    let i = 1;
    do {
      while (sudokuMemory[n - 1].includes(i)) {
        i++;
      }
      sudokuData[n - 1] = i;
      sudokuMemory[n - 1].push(i);
    } while (checkAreaForDup(n) || checkColForDup(n) || checkRowForDup(n));
    if (sudokuMemory[n - 1].length > 9) {
      console.log("Reset");
      sudokuMemory[n - 1] = [];
      sudokuData[n - 1] = 0;
      solve(n - 1);
    } else {
      rerender(n);
      solve(n + 1);
    }
  }
}

function solve2() {
  let n = 1;
  while (n < 82) {
    if (sudokuMemory[n - 1] == "Hardcoded") {
      console.log("Hardcoded-Value");
      rerender(n);
      n++;
    } else {
      let i = 1;
      do {
        while (sudokuMemory[n - 1].includes(i)) {
          i++;
        }
        sudokuData[n - 1] = i;
        sudokuMemory[n - 1].push(i);
      } while (checkAreaForDup(n) || checkColForDup(n) || checkRowForDup(n));
      if (sudokuMemory[n - 1].length > 9) {
        console.log("Reset");
        sudokuMemory[n - 1] = [];
        sudokuData[n - 1] = 0;
        let j = 2;
        while (sudokuMemory[n - j] == "Hardcoded") {
          j++;
        }
        n = n - j + 1;
      } else {
        rerender(n);
        n++;
      }
    }
  }
}

function checkAreaForDup(n) {
  let row = Math.floor((n - 1) / 9);
  let col = n % 9 != 0 ? n % 9 : 9;
  let corner = n - 9 * (row % 3) - ((col - 1) % 3);
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (
        sudokuData[corner + j + i * 9 - 1] == sudokuData[n - 1] &&
        corner + j + i * 9 - 1 != n - 1
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkColForDup(n) {
  let row = Math.floor((n - 1) / 9);
  let rowEnd = n - row * 9;
  for (i = 0; i < 9; i++) {
    if (
      sudokuData[rowEnd + i * 9 - 1] == sudokuData[n - 1] &&
      rowEnd + i * 9 - 1 != n - 1
    ) {
      return true;
    }
  }
  return false;
}

function checkRowForDup(n) {
  let col = n % 9 != 0 ? n % 9 : 9;
  let colEnd = n - col + 1;
  for (i = 0; i < 9; i++) {
    if (
      sudokuData[colEnd + i - 1] == sudokuData[n - 1] &&
      colEnd + i - 1 != n - 1
    ) {
      return true;
    }
  }
  return false;
}
