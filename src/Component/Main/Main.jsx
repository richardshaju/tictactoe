import React, { useEffect, useState, useSyncExternalStore } from "react";
import "./Main.css";
import Board from "./Board";
import click from "./audio/click.mp3";
import loss from "./audio/loss.mp3";
import draw from "./audio/draw.mp3";
import stop from "./audio/stop.mp3";
function Main() {
  var enableAI = 0;
  const [board, setboard] = useState(Array(9).fill(0));
  const [player, setplayer] = useState(false);
  const [boardFull, setboardFull] = useState(0);
  const [data, setdata] = useState("");
  const [showOption, setshowOption] = useState(false);
  const [showStart, setshowStart] = useState(true);
  const [restart, setrestart] = useState(false);
  const [color, setcolor] = useState("red");

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
      setcolor("red");
      setdata("Start Playing!");
      compTurn(board);
      setshowOption(false);
    } else {
      setshowOption(false);
      setdata("Start Playing!");
    }
    setplayer(true);
  }

  function start() {
    setshowOption(true);
    setshowStart(false);
  }
  function handleClick(boxIdx) {
    new Audio(click).play();

    player ? Main(boxIdx) : new Audio(stop).play();
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
        setcolor("Blue");
        setdata("Draw !!");
        new Audio(draw).play();
        setrestart(true);
        console.log("DRAW");
      }, 500);
    }
    if (result === 1) {
      setplayer(false);
      setTimeout(() => {
        setdata("You are Loser");
        new Audio(loss).play();

        setrestart(true);
      }, 500);
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
      <div className="tools">
        {showStart ? (
          <button id="start" onClick={start}>
            START
          </button>
        ) : (
          console.log()
        )}
        {showOption ? (
          <form onChange={firstOrSecond}>
            <label>Play 1st</label>
            <input type="radio" name="1" id="1" value={1} />{" "}
            <label>or 2nd</label>
            <input type="radio" name="2" id="2" value={2} />
          </form>
        ) : (
          console.log()
        )}
        <p className={color}>{data}</p>
        {restart ? (
          <button id="restart" onClick={DoRestart}>
            RESTART
          </button>
        ) : (
          console.log()
        )}
      </div>
      <div className="about">
        <div className="data">
          <h4>
            <u>ABOUT TIC TAC TOE</u>
          </h4>
          Tic-tac-toe (American English), noughts and crosses (Commonwealth
          English), or Xs and Os (Canadian or Irish English) is a
          paper-and-pencil game for two players who take turns marking the
          spaces in a three-by-three grid with X or O. The player who succeeds
          in placing three of their marks in a horizontal, vertical, or diagonal
          row is the winner. It is a solved game, with a forced draw assuming
          best play from both players.
        </div>
      </div>
      <footer>
        <div className="left">
          <p>
            Designed and Developed by{" "}
            <a href="www.richard.is-a.dev"> Richard Shaju </a> © 2023
          </p>
        </div>
        <div className="right">
          <p>TICTACTOE</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
