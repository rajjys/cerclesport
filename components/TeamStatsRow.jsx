import React from 'react'
import Last5Streak from './Last5Streak';
import Image from 'next/image';
import Link from 'next/link';

const TeamStatsRow = ( { teamData, rank } ) => {
  const stats = teamData[1][1];
  return (
    <tr className='p-2 text-lg border-b border-gray-300  hover:bg-green-300 transition duration-300 ease-in-out'>
      <td className='text-gray-500'>{rank + 1}</td>
      <td className='font-bold text-indigo-900 pl-2 pr-9 py-2 border-r border-gray-300'>
        <Link href={`team/${stats.teamSlug}`}>
          <div className='flex'>
          <Image
                    alt=""
                    unoptimized
                    width="30"
                    height="30"
                    className='align-middle rounded-full'
                    src={stats.teamLogo}
                  />
            <span className='pl-2'>{teamData[0]}</span>
          </div>
        </Link>
        </td>
      <td className='px-6 text-center text-black'>{stats.wins + stats.losses + stats.forfeits}</td>
      <td className='px-6 text-center text-black'>{stats.wins}</td>
      <td className='px-6 text-center text-black'>{stats.losses}</td>
      <td className='px-6 text-center text-black'>{stats.forfeits}</td>
      <td className='px-6 text-center font-bold text-black'>{stats.points}</td>
      <td className='px-6 text-center text-black'>{stats.pointsScored}</td>
      <td className='px-6 text-center text-black'>{stats.pointsConceided}</td>
      <td className='px-6 text-center text-black'>{stats.pointsScored -  stats.pointsConceided}</td>
      <td className='px-6 text-center text-black'><Last5Streak last5={stats.last5Streak} /></td>
    </tr>
  )
}

export default TeamStatsRow;
