<<<<<<< HEAD
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const gameDiv = document.getElementById("game");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp"; // default mode

function startGame(selectedMode) {
  mode = selectedMode;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  boardElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    boardElement.appendChild(cell);
  }
  gameDiv.style.display = "block";
  statusElement.innerHTML = `Player 1's Turn <span style="font-size: 1.5rem;">(X)</span>`;
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    highlightWinningCells(winner);
    const winText = currentPlayer === "X"
      ? (mode === "pvc" ? "Player Wins!" : "Player 1 Wins!")
      : (mode === "pvc" ? "Computer Wins!" : "Player 2 Wins!");
    statusElement.innerHTML = `<span style="font-size: 2rem; color: yellow;">${winText}</span>`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusElement.innerHTML = `<span style="font-size: 2rem; color: yellow;">It's a Draw!</span>`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "pvp") {
    statusElement.innerHTML = currentPlayer === "X"
      ? `Player 1's Turn <span style="font-size: 1.5rem;">(X)</span>`
      : `Player 2's Turn <span style="font-size: 1.5rem;">(O)</span>`;
  } else {
    if (currentPlayer === "O") {
      statusElement.textContent = "Computer's Turn...";
      setTimeout(computerMove, 500);
    } else {
      statusElement.textContent = "Player's Turn (X)";
    }
  }
}

function computerMove() {
  let emptyIndices = board.map((val, idx) => (val === "" ? idx : null)).filter(i => i !== null);
  if (emptyIndices.length === 0 || !gameActive) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = "O";
  const cell = boardElement.children[randomIndex];
  cell.textContent = "O";

  const winner = checkWinner();
  if (winner) {
    highlightWinningCells(winner);
    statusElement.innerHTML = `<span style="font-size: 2rem; color: yellow;">Computer Wins!</span>`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusElement.innerHTML = `<span style="font-size: 2rem; color: yellow;">It's a Draw!</span>`;
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusElement.textContent = "Player's Turn (X)";
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => {
    const cell = boardElement.children[index];
    cell.style.background = "#4CAF50";
    cell.style.color = "#fff";
    cell.style.fontSize = "3.5rem";
    cell.style.textDecoration = "line-through";
  });
}

function restartGame() {
  startGame(mode);
=======
let display = document.getElementById("display");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
>>>>>>> c9c09b4 (my first commit)
}
