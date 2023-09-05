import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesbyTeams = getGamesByTeams(games);
  ///console.log(gamesbyTeams);
  const gamesByTeams = addWinLossEntries(gamesbyTeams);
  Object.keys(gamesByTeams).forEach((team) => {
    console.log(team + "\n-----------------------------------------");
      gamesByTeams[team].map((game) => {
        console.log(game.team1.name + " " + game.scoreTeam1 + " - " + game.scoreTeam2 + " " + game.team2.name);
        console.log(team + " " + game.winOrLoss);
      })
  })

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
    const teams = Object.keys(gamesByTeams);
    
    teams.forEach((team) => {
      ///console.log(team + "\n-----------------------------------------");
      gamesByTeams[team].map((game, index) => {
        let winOrLoss = parseInt(game.scoreTeam1) > parseInt(game.scoreTeam2) ? (game.team1.name === team) : (game.team2.name === team);
        winOrLoss = winOrLoss ? 'Win' : 'Loss';
       /// console.log(game.team1.name + " " + game.scoreTeam1 + " - " + game.scoreTeam2 + " " + game.team2.name);
      ///console.log(team + " " + winOrLoss);
        game['winOrLoss'] = winOrLoss;
        return game;
      })
    });
    return gamesByTeams;
}
export default Standings