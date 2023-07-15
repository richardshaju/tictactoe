import React from 'react'

function Box({value,onClick}) {
  const style = value === 1 ? "box o" : "box x"
  return (
    <div className={style} onClick={onClick}> {(() => {
        if (value == 0) {
          return (
            <p></p> 
          )
        } 
         if (value == 1) {
          return (
             <p>O</p>
          )
        } 
         if (value == -1) {
          return (
            <p>X</p>

          )
        }
      })()}</div>
  )
}

export default Box