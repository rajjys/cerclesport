import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react'
import { getGamesByTeams, addWinLossEntries, addTeamStats} from '@/utils/gameFunctions';
const Statistics = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  console.log(gamesWithTeamStats);
  return (
    <div></div>
  )
}

export default Statistics