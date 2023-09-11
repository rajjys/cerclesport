import React from 'react'
import TeamStatsRow from "./TeamStatsRow"

const StandingsTable = ( { standingsArray } ) => {
  return (
    <div className='my-4'>
        <table>
            <thead>
                <tr className='text-gray-500 text-sm'>
                    <th></th>
                    <th></th>
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
                    return <TeamStatsRow teamData={teamData} rank={index} />
                })}
            </tbody>
        </table>
    </div>
  )
}

export default StandingsTable
