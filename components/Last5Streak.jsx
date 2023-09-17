import React from 'react'
import { last5Streak } from '.'

const Last5Streak = ( { last5 } ) => {
  return (
    <div className='border border-gray-400 rounded-full flex'>
      {last5.map((result, index) => {
        let bg_color = (result === "win") ? "bg-green-600" : "bg-red-700";
        return <span className={`${bg_color} p-2 rounded-full border border-gray-300`} key={index}/>;
      })}
    </div>
  )
}

export default Last5Streak
