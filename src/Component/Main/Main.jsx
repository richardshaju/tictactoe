import React, { useEffect, useState } from "react";
import "./Main.css";
import Board from "./Board";

function Main() {
  var enableAI = 0;
  const [board, setboard] = useState(Array(9).fill(0));
  const [player, setplayer] = useState(false);
  const [boardFull, setboardFull] = useState(0);
  const [data, setdata] = useState("");
  const [showOption, setshowOption] = useState(false);
  const [showStart, setshowStart] = useState(true);
  const [restart, setrestart] = useState(false);

  function DoRestart() {
    setboard(Array(9).fill(0));
    setboardFull(0);
    start();
    setrestart(false);
    setdata("");
  }

  function firstOrSecond(e) {
    e.preventDefault();
    let value = e.target.value;
    console.log(e.target.value);
    if (value == 2) {
      compTurn(board);
      setshowOption(false);
    } else {
      setshowOption(false);
      setdata("Play ONNN");
    }
    //value === 2 ?  : setdata("Play ONN");
    setplayer(true);
  }

  function start() {
    setshowOption(true);
    setshowStart(false);
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
      console.log(update);
      if (enableAI) {
        compTurn(update);
      } else {
        console.log("Ai not enalbled");
      }
    } else {
      console.log();
    }
  };
  function checkResult(board, value) {
    let result = analayseBoard(board);
    if (boardFull == 4) {
      setplayer(false);
      setTimeout(() => {
        setdata("Draw!!");
        setrestart(true);
        console.log("DRAW");
      }, 500);
    }
    if (result === 1) {
      setplayer(false);
      setTimeout(() => {
        setdata("You are Loser");
        setrestart(true);
      }, 500);

      console.log("AI Wins");
    }
    if (result === -1) {
      setplayer(false);
      setdata("You wins");
      setrestart(true);
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
    setTimeout(() => {
      setboard(update);
    }, 500);
    setboardFull(boardFull + 1);
    console.log("BF" + boardFull);
    checkResult(update);
    //console.log(update);
  }
  return (
    <div className="main">
      <header>
        <p>TIC TAC TOE</p>
      </header>

      <Board board={board} onClick={handleClick} />
      {showStart ? <button onClick={start}>START</button> : console.log()}
      {showOption ? (
        <form onChange={firstOrSecond}>
          play 1 <input type="radio" name="1" id="1" value={1} /> or 2
          <input type="radio" name="2" id="2" value={2} />
        </form>
      ) : (
        <br />
      )}
      <h1>{data}</h1>
      <footer>
        {restart ? <button onClick={DoRestart}>RESTART</button> : console.log()}
        <p>Copyright</p>
      </footer>
    </div>
  );
}

export default Main;
