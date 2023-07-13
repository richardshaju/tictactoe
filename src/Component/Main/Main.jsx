import React, { useEffect, useState } from "react";
import "./Main.css";
import Board from "./Board";

function Main() {
  const [board, setboard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [player, setplayer] = useState(true);
  var enableAI = 0;

  const [boardFull, setboardFull] = useState(0);
  const [data, setdata] = useState("");

  function firstAI() {
    compTurn(board)
  }
  
  function handleClick(boxIdx) {
    player ? Main(boxIdx) : console.log("Stop");
  }

  const Main = (boxIdx) => {
    var toCountine = true;
    if (boardFull == 4) {
      let value = true;
      checkResult(board, value);
    }
    if (toCountine) {
      let update = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      update = board.map((value, indx) => {
        if (!value) {
          if (indx === boxIdx) {
            enableAI = 1;
            return -1;
          } else {
            return value;
          }
        } else {
          return value;
        }
      });
      checkResult(update);
      setboard(update);
      setboardFull(boardFull + 1);
      console.log(update);
      if (enableAI) {
        compTurn(update);
      } else {
        console.log("Ai not enalbled");
      }
    } else {
      console.log("Draw??");
    }
  };
  function checkResult(board, value) {
    let result = analayseBoard(board);
    if (value) {
      setplayer(false);
      setdata("Draw!!");
      console.log("DRAW");
    }
    if (result === 1) {
      setplayer(false);
      setdata("You are Loser");
      console.log("AI Wins");
    }
    if (result === -1) {
      setplayer(false);
      setdata("You wins");
      console.log("You wins");
    }
  }
  function analayseBoard(board) {
    let winningIndx = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningIndx.length; i++) {
      const [x, y, z] = winningIndx[i];
      if (board[x] !== 0 && board[x] === board[y] && board[x] === board[z]) {
        return board[x];
      }
    }

    return 0;
  }
  function minmax(board, player) {
    let x = analayseBoard(board);
    if (x !== 0) {
      return x * player;
    }
    let pos = -1;
    let value = -2;
    for (let i = 0; i < 9; i++) {
      if (board[i] === 0) {
        board[i] = player;
        let score = -minmax(board, player * -1);
        board[i] = 0;
        if (score > value) {
          value = score;
          pos = i;
        }
      }
    }
    if (pos === -1) {
      return 0;
    }
    return value;
  }
  function compTurn(board) {
    enableAI = 0;
    let pos = -1;
    let value = -2;
    for (let i = 0; i < 9; i++) {
      if (board[i] == 0) {
        board[i] = 1;
        let score = -minmax(board, -1);
        board[i] = 0;
        if (score > value) {
          value = score;
          pos = i;
        }
      }
    }
    let update = board.map((value, indx) => {
      if (indx === pos) {
        return 1;
      } else {
        return value;
      }
    });
    setboard(update);
    setboardFull(boardFull + 1);
    //console.log("BF"+boardFull);
    checkResult(update);
    //console.log(update);
  }
  return (
    <div className="main">
      <header>
        <p>Tic Tac Toe</p>
      </header>
      <button onClick={firstAI}>HIII</button>
      <h1>{data}</h1>
      <Board board={board} onClick={handleClick} />
      <footer>
        <p>Copyright</p>
      </footer>
    </div>
  );
}

export default Main;
