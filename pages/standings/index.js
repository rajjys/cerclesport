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
  const gamesWithTeamStats = addTeamStats(gamesAndPoints); ///Adding stats per team like Wins, Losses, Last5 streak,...
  console.log(gamesWithTeamStats);

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
  const games = Object.fromEntries(
    Object.entries(gamesAndPoints).map(([team, gamesByTeam]) => {
      let points = 0; ///To track total points made from each game
      let wins = 0; ///To track wins
      let losses = 0; ///To track losses
      let forfeits = 0; ////To tracks forfeits
      let last5Streak = []; ///To track the last 5 games
      return [team, [gamesByTeam.map((game) => {
        points += game['points'];
        if(game.winOrLoss == 'win') wins++;
        else if(game.winOrLoss == 'loss' && game.gameState === "Forfeited") forfeits++;
        else losses++;
        last5Streak.push(game.winOrLoss);
        if(last5Streak.length > 5) last5Streak.shift(); ///Keep the length to 5
        return game;
      }), {points, wins, losses, forfeits, streak: last5Streak}]];

    })
  );
  return games;
}
export default Standings