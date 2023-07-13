import React from 'react'

function Box({value,onClick}) {
  return (
    <div className='box' onClick={onClick}> {(() => {
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