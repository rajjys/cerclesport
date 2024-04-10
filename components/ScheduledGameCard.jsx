import { getHumanReadableTime, getNumericDate, resizeImage } from '@/utils/formatting'
import { Link } from '@mui/icons-material'
import React from 'react'

const ScheduledGameCard = ({game , league, division}) => {
  return (
    <Link href={`/game/24/${league}/${division}/${game.slug}`} className='rounded-lg bg-white p-2 my-1 text-indigo-900 text-xs lg:text-sm shadow-md'>
        <div className='flex justify-center'>
          <span className={`whitespace-nowrap text-center font-bold pr-4 border-r border-gray-300`}>{getNumericDate(game.dateAndTime)}</span>
          <span className={`whitespace-nowrap text-center text-red-800 font-bold pl-4`}>{getHumanReadableTime(game.dateAndTime)}</span>
        </div>
        <div className='flex items-center justify-around p-2 my-2 border-y border-gray-300 font-bold'>
          <span>{game.team1.shortName}</span>
          <Image
              alt={game.team1.shortName}
              unoptimized
              width="40"
              height="40"
              className='inline rounded-full'
              src={resizeImage(70, 70,game.team1.photo.url)}
            />
          <span className='px-2 mx-1 border-x border-gray-300 font-bold text-indigo-950'>{game.stadium.name}</span>
          <Image
              alt={game.team2.shortName}
              unoptimized
              width="40"
              height="40"
                className='inline rounded-full'
                src={resizeImage(70, 70, game.team2.photo.url)}
              />
            <span>{game.team2.shortName}</span>
        </div>
        {league && <span className='text-center block text-xs font-bold'>{league} - {division}</span>}
  </Link>
  )
}

export default ScheduledGameCard
