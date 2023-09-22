import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

const GameCard = ({ game }) => {
  
  const winner = game.scoreTeam1 < game.scoreTeam2;
  return (
    <div className='rounded-md col-span-2 md:col-span-1 mx-2 bg-white text-gray-700 border border-gray-300 hover:border-red-500 hover:bg-gray-100 transition duration-300 ease-in-out '>
      <Link href={`/game/${game.slug}`}>
        <div className='flex p-6'>
          <div className='flex flex-col md:w-3/4 text-lg text-indigo-900 font-semibold border-r border-gray-300 pr-6'>
            <div className='flex justify-between pb-2'>
              <div className='flex justify-around'>
                <Image
                  alt={game.team1.shortName}
                  unoptimized
                  width="30"
                  height="30"
                  className='align-middle rounded-full'
                  src={game.team1.photo.url}
                />
                <span className='px-2 overflow-hidden whitespace-nowrap'>{game.team1.name}</span>
                <span className='text-gray-400 font-medium'>{`(${game.team1.shortName})`}</span>
              </div> 
              <span style={{whiteSpace: 'nowrap'}}>{winner || "> " }{game.scoreTeam1}</span>
            </div>
            <div className='flex justify-between pt-2'>
              <div className='flex justify-around'>
              <Image
                  alt={game.team2.shortName}
                  unoptimized
                  width="30"
                  height="30"
                  className='align-middle rounded-full'
                  src={game.team2.photo.url}
                />
                <span className='px-2 overflow-hidden whitespace-nowrap'>{game.team2.name}</span>
                <span className='text-gray-400 font-medium'>{`(${game.team2.shortName})`}</span>
              </div>
              <span style={{whiteSpace: 'nowrap'}}>{!winner || "> "}{game.scoreTeam2}</span>
            </div>
          </div>  
          <div className='hidden md:block md:w-1/4 md:my-auto md:text-sm '>
              <span className='text-center text-gray-500 block'>{game.gameState}</span>
          </div>
        </div>
      </Link>
    </div>
  
  )
}

export default GameCard