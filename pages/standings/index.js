import { StandingsTable } from '@/components';
import { fetchAllGamesGQL } from '@/services';
import React, {useState, useEffect} from 'react';
import { getGamesByTeams, addWinLossEntries, addTeamStats, sortTeamsByAStat} from '@/utils/gameFunctions';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetchAllGamesGQL().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  const sortedGames = sortTeamsByAStat(gamesWithTeamStats, "points"); ///Returns the equivalent array, sorted by points, wins or points scored difference 
  return (
    <div className='px-4 flex flex-col'>
      <div className='text-center font-bold text-xl py-4 text-indigo-900'>
        EUBAGO 2022-2023 CLASSEMENT SAISON REGULIERE 
      </div>
      <div className='grid place-items-center overflow-auto mb-4'>
          <StandingsTable standingsArray={sortedGames}/>
      </div>
      <div className='text-xs text-black flex flex-wrap justify-between mb-4 pb-4 border-b border-gray-300'>
        <span className='px-2 whitespace-nowrap'><b>MJ</b>: Matchs Joués</span>
        <span className='px-2 whitespace-nowrap'><b>V</b>: Victoires</span>
        <span className='px-2 whitespace-nowrap'><b>D</b>: Defaites</span>
        <span className='px-2 whitespace-nowrap'><b>F</b>: Forfaits</span>
        <span className='px-2 whitespace-nowrap'><b>PTS</b>: Points</span>
        <span className='px-2 whitespace-nowrap'><b>POUR</b>: Points marqués</span>
        <span className='px-2 whitespace-nowrap'><b>CONTRE</b>: Points Encaissés</span>
        <span className='px-2 whitespace-nowrap'><b>DIFF</b>: difference des points</span>
        <span className='px-2 whitespace-nowrap'><b>LAST5</b>: 5 derniers matchs</span>
      </div>
    </div>
  )
 
}

export default Standings