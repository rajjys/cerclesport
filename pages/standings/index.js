import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesbyTeams = getGamesByTeams(games);
  console.log(gamesbyTeams);
  addWinLossEntries(gamesbyTeams);
  

  return (
    <div>Standings</div>
  )
}
function getGamesByTeams( games ){
  ///create object to hold games by team
  return games.reduce((acc, curr) => {
    const {team1, team2} = curr;
    const team1Name = team1.name;
    const team2Name = team2.name;
    acc[team1Name] = acc[team1Name] || [];
    acc[team2Name] = acc[team2Name] || [];
    acc[team1Name].push(curr);
    acc[team2Name].push(curr);
    return acc;
  }, {});
}
function addWinLossEntries( gamesByTeams ){
    const teams = Object.entries(gamesByTeams);
    const result = gamesByTeams.reduce((acc, curr) => {
        const {team1, team2} = curr;
        const team1Name = team1.name;
        const team2Name = team2.name;
        
        let winOrLoss;
        
        if (curr.scoreTeam1 > curr.scoreTeam2) {
          winOrLoss = acc === team1Name ? 'win' : 'loss';
        } else if (curr.scoreTeam1 < curr.scoreTeam2) {
          winOrLoss = acc === team2Name ? 'win' : 'loss';
        }
        
        acc[team1Name] = acc[team1Name] || [];
        acc[team2Name] = acc[team2Name] || [];
        
        if (winOrLoss === undefined) {
          acc[team1Name].push({...curr});
          acc[team2Name].push({...curr});
        } else {
          acc[team1Name].push({...curr, winOrLoss});
          acc[team2Name].push({...curr, winOrLoss});
        }
        
        return acc;
      }, {});
  console.log(result);
}
export default Standings