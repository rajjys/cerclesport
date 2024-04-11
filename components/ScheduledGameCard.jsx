import { getHumanReadableTime, getNumericDate, resizeImage } from '@/utils/formatting'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

const ScheduledGameCard = ({game , league, division, index}) => {
  return (
    <Link href={`/game/24/${league}/${division}/${game.slug}`} 
    className='rounded-lg bg-blue-100/20 text-indigo-900 text-xs lg:text-sm shadow-md border border-gray-300'
    key={index}>
        <div className='flex justify-around mx-4 py-1'>
          <span className={`whitespace-nowrap text-center font-bold pr-4 border-r border-gray-300`}>{getNumericDate(game.dateAndTime)}</span>
          <span className={`whitespace-nowrap text-center text-red-800 font-bold pl-4`}>{getHumanReadableTime(game.dateAndTime)}</span>
        </div>
        <div className='flex items-center justify-around mx-2 py-2 text-gray-700 border-y border-gray-300 font-bold'>
          <Image
              alt={game.team1.shortName}
              unoptimized
              width="40"
              height="40"
              className='inline rounded-full'
              src={resizeImage(70, 70,game.team1.photo.url)}
            />
            <span className=''>{game.team1.shortName}</span>
            <span>-</span>
            <span>{game.team2.shortName}</span>
          <Image
              alt={game.team2.shortName}
              unoptimized
              width="40"
              height="40"
                className='inline rounded-full'
                src={resizeImage(70, 70, game.team2.photo.url)}
              />
        </div>
        <div className='flex justify-center md:justify-between font-bold p-2 mx-4'>
        <span className='font-bold text-green-800 text-sm'>{game.stadium.name}</span>
        {league && <span className='hidden md:inline text-indigo-900'>-</span>}
        {league && <span className='hidden md:inline text-indigo-900  text-xs content-center'>{league} - {division}</span>}
        </div>
        
  </Link>
  )
}

export default ScheduledGameCard
