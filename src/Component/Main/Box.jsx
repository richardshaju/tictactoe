import React from 'react'

function Box({value,onClick}) {
  const style = value === 1 ? "box o" : "box x"
  return (
    <div className={style} onClick={onClick}> {(() => {
        if (value == 0) {
          return (
            ""
          )
        } 
         if (value == 1) {
          return (
            "O"
          )
        } 
         if (value == -1) {
          return (
            "X"
          )
        }
      })()}</div>
  )
}

export default Box