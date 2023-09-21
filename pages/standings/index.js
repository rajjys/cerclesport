import { StandingsTable } from '@/components';
import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react';
import { getGamesByTeams, addWinLossEntries, addTeamStats, sortTeamsByStats} from '@/utils/gameFunctions';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  const sortedGames = sortTeamsByStats(gamesWithTeamStats); ///Returns the equivalent array, sorted by points, wins or points scored difference 
  return (
    <div className='px-4 flex flex-col'>
      <div className='text-center font-bold text-xl py-4 text-indigo-900'>
        EUBAGO 2022-2023 CLASSEMENT SAISON REGULIERE 
      </div>
      <div className='grid content-center overflow-auto'>
          <StandingsTable standingsArray={sortedGames}/>
      </div>
    </div>
  )
 
}

export default Standings