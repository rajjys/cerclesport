import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesByTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
  const gamesAndTeamStats = addTeamStats(gamesAndPoints);
  console.log(gamesAndPoints);

  return (
    <div>Standings</div>
  )
}
function getGamesByTeams( games ){
  ///create object to hold games by team
  return games.reduce((acc, curr) => {
    const {team1, team2} = curr;
    const team1Name = team1.shortName;
    const team2Name = team2.shortName;
    acc[team1Name] = acc[team1Name] || [];
    acc[team2Name] = acc[team2Name] || [];
    acc[team1Name].push(curr);
    acc[team2Name].push(curr);
    return acc;
  }, {});
}
function addWinLossEntries( gamesByTeams ){
  ///Here we add winOrLoss entry depending if the team owning the game has won it
  ///We also add the points each game brought. 2 for win, 1 for loss, and 0 if it's a loss by forfeit
  const games = Object.fromEntries(
    Object.entries(gamesByTeams).map(([team, gamesByTeam]) => {
      return [team, gamesByTeam.map((game) => {
        const winOrLoss = parseInt(game.scoreTeam1) > parseInt(game.scoreTeam2) ? 
          (game.team1.shortName === team ? "win" : "loss") : 
          (game.team2.shortName === team ? "win" : "loss");
        return {...game, winOrLoss,
          points : (winOrLoss == "win") ? 2 : (game.gameState === "Forfeited") ? 0 : 1
        };
      })];
    })
  );
    return games;
}

function addTeamStats( gamesAndPoints ){
  
}
export default Standings