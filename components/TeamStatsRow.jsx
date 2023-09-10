import React from 'react'
import Last5Streak from './Last5Streak';

const TeamStatsRow = ( { teamData, rank } ) => {
  const stats = teamData[1][1];
  return (
    <tr className='p-2 text-lg border-b border-gray-300'>
      <td className='font-bold text-black'>{rank + 1}</td>
      <td className='font-bold text-indigo-900 pl-2 pr-9 py-2'>{teamData[0]}</td>
      <td className='px-6 text-center'>{stats.wins + stats.losses + stats.forfeits}</td>
      <td className='px-6 text-center'>{stats.wins}</td>
      <td className='px-6 text-center'>{stats.losses}</td>
      <td className='px-6 text-center'>{stats.forfeits}</td>
      <td className='px-6 text-center font-bold'>{stats.points}</td>
      <td className='px-6 text-center'>{stats.pointsScored}</td>
      <td className='px-6 text-center'>{stats.pointsConceided}</td>
      <td className='px-6 text-center'>{stats.pointsScored -  stats.pointsConceided}</td>
      <td className='px-6 text-center'><Last5Streak last5={stats.last5Streak} /></td>
    </tr>
  )
}

export default TeamStatsRow;
