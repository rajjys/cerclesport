import React from 'react'
import TeamStatsRow from "./TeamStatsRow"

const StandingsTable = ( { standingsArray } ) => {
  return (
    <div className='q   112border border-gray-300'>
        <table>
            <thead>
                <tr className='text-gray-500 text-xs md:text-base  border-b border-gray-300'>
                    <th className='bg-white/90 sticky left-0 z-10'>Equipe</th>
                    <th>MJ</th>
                    <th>V</th>
                    <th>D</th>
                    <th>F</th>
                    <th>PTS</th>
                    <th>POUR</th>
                    <th>CONTRE</th>
                    <th>DIFF</th>
                    <th>LAST5</th>
                </tr>
            </thead>
            <tbody>
                {standingsArray.map((teamData, index) => {
                    return <TeamStatsRow teamData={teamData} rank={index} key={index}/>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default StandingsTable
