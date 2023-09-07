import { getAllGames } from '@/services';
import React, {useState, useEffect} from 'react';


const Standings = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);
  if(games.length == 0) return <p>Loading</p> ///If has not loaded yet
  const gamesbyTeams = getGamesByTeams(games); ///Assigning games by each team
  const gamesByTeams = addWinLossEntries(gamesbyTeams); ///Adding winOrLoss entry depending if the team owning the game won or lost
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
    const games = Object.fromEntries(
      Object.entries(gamesByTeams).map(([team, gamesByTeam]) => 
          [team, gamesByTeam.map((game) => (
            {...game, winOrLoss : parseInt(game.scoreTeam1) > parseInt(game.scoreTeam2) ? 
                                          (game.team1.shortName === team ? "win" : "loss") : 
                                          (game.team2.shortName === team ? "win" : "loss")}))])
    );
    /* const keys = Object.keys(games);
    ///console.log("=======================TEAMS AND GAMES===========================");
    keys.forEach((team) => {
      console.log("\n\n---------------" + team + "----------------\n")
      games[team].map((game) => {
        console.log(game.team1.name + " " + game.scoreTeam1 + " - " + game.scoreTeam2 + " " + game.team2.name);
        console.log(team + " " + game['winOrLoss']);
      })
    });
    console.log(games);*/
    return games;
}
export default Standings