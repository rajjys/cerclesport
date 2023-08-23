import Link from 'next/link';
import React from 'react'

const GameWidget = ({ game }) => {
  console.log(game);
  if(game.length == 0) return <p>Loading</p>;
  return (
    <div className='rounded-md my-4 col-span-2 md:col-span-1 mx-2 bg-white text-gray-700'>
      <Link href="">
        {game.team1.name + " - " + game.team2.name}
      </Link>
      

    </div>
  
  )
}

export default GameWidget