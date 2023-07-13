import React from "react";
import Box from "./Box";

function Board({ board , onClick}) {
  return (
    <main>
      <div className="parent-box">
        {board.map((value,key) => {
          return <Box value={value} key={key} onClick={()=>onClick(key)}/>;
        })}
      </div>
    </main>
  );
}

export default Board;
