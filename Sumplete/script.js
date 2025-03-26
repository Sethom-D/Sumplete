let grid = [];
let rowSums = [];
let rowSumsFull = [];
let colSumsFull = [];
let colSums = [];
let size = 5;

function GenererGrille(newSize = size) {
  size = newSize;

  let victoryMessage = document.getElementById("victoryMessage");
  if (victoryMessage) {
    victoryMessage.remove();
  }

  rowSums = new Array(size).fill(0);
  rowSumsFull = new Array(size).fill(0);
  colSums = new Array(size).fill(0);
  colSumsFull = new Array(size).fill(0);

  for (let i = 0; i < size; i++) {
    grid[i] = [];

    for (let j = 0; j < size; j++) {
      let num = Math.floor(Math.random() * 9) + 1;
      let hiddenValue = Math.round(Math.random());
      grid[i][j] = { value: num, selected: false, hiddenValue: hiddenValue };

      rowSumsFull[i] += num;
      colSumsFull[j] += num;

      rowSums[i] += num;
      colSums[j] += num;

      if (hiddenValue === 1) {
        rowSums[i] -= num;
        colSums[j] -= num;
      }
    }
  }

  afficherGrille();
}

function Selected(i, j, cell) {
  let cellData = grid[i][j];

  if (cellData.selected) {
    rowSumsFull[i] += cellData.value;
    colSumsFull[j] += cellData.value;
  } else {
    rowSumsFull[i] -= cellData.value;
    colSumsFull[j] -= cellData.value;
  }

  cellData.selected = !cellData.selected;
  cell.classList.toggle("selected");

  afficherGrille();
  Victoire();
}

function afficherGrille() {
  const gameContainer = document.getElementById("gameContainer");

  gameContainer.innerHTML = "";
  gameContainer.style.gridTemplateColumns = `repeat(${size + 1}, 80px)`;
  gameContainer.style.gridTemplateRows = `repeat(${size + 1}, 80px)`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = grid[i][j].value;

      if (grid[i][j].selected) {
        cell.classList.add("selected");
      }

      cell.onclick = () => Selected(i, j, cell);

      gameContainer.appendChild(cell);
    }

    let rowSumCell = document.createElement("div");
    rowSumCell.textContent = rowSums[i];
    if (rowSumsFull[i] === rowSums[i]) {
      rowSumCell.classList.add("cell", "rowsum", "correct");
    } else {
      rowSumCell.classList.add("cell", "rowsum");
    }

    gameContainer.appendChild(rowSumCell);
  }

  for (let j = 0; j < size; j++) {
    let colSumCell = document.createElement("div");
    colSumCell.textContent = colSums[j];
    if (colSumsFull[j] === colSums[j]) {
      colSumCell.classList.add("cell", "colsum", "correct");
    } else {
      colSumCell.classList.add("cell", "colsum");
    }
    gameContainer.appendChild(colSumCell);
  }
}

function Victoire() {
  const allCorrect = [...document.querySelectorAll(".rowsum, .colsum")].every(
    (cell) => cell.classList.contains("correct")
  );

  let victoryMessage = document.getElementById("victoryMessage");

  if (!victoryMessage) {
    victoryMessage = document.createElement("div");
    victoryMessage.id = "victoryMessage";
    document.body.appendChild(victoryMessage);
  }

  if (allCorrect) {
    victoryMessage.textContent = "🎲 Vous avez gagné ! 🎲";

    const gameCells = document.querySelectorAll(".cell");
    gameCells.forEach((cell) => {
      cell.classList.add("disabled");
      cell.onclick = null;
    });
  } else {
    victoryMessage.textContent = "";
  }
}

function GenererGrille3x3() {
  GenererGrille(3);
}

function GenererGrille4x4() {
  GenererGrille(4);
}

function GenererGrille5x5() {
  GenererGrille(5);
}

GenererGrille();
