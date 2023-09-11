import { StandingsTable } from '@/components';
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
  const sortedGames = sortGamesByStats(gamesWithTeamStats); ///Returns the equivalent array, sorted by points, wins or points scored difference
  ///console.log(sortedGames);
  return (
    <div>
      <div className='text-center font-bold text-xl py-4 text-indigo-900'>
        EUBAGO 2022-2023 CLASSEMENT SAISON REGULIERE 
      </div>
      <div className='grid place-items-center'>
        <StandingsTable standingsArray={sortedGames}/>
      </div>
    </div>
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
  ///Here we add winOrLoss entry depending if the team owning the game has won it
  ///We also add the points each game brought. 2 for win, 1 for loss, and 0 if it's a loss by forfeit
  const games = Object.fromEntries(
    Object.entries(gamesByTeams).map(([team, gamesByTeam]) => {
      return [team, gamesByTeam.map((game) => {
        const winOrLoss = parseInt(game.scoreTeam1) > parseInt(game.scoreTeam2) ? 
          (game.team1.name === team ? "win" : "loss") : 
          (game.team2.name === team ? "win" : "loss");
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
      let pointsScored = 0;
      let pointsConceided = 0;
      let teamSlug = "";
      let teamLogo = "";
      team === gamesByTeam[0].team1.name ? 
                    (teamLogo = gamesByTeam[0].team1.photo.url,
                      teamSlug = gamesByTeam[0].team1.slug):
                    (teamLogo = gamesByTeam[0].team2.photo.url,
                      teamSlug = gamesByTeam[0].team2.slug);
      
      
      return [team, [gamesByTeam.map((game) => {
        points += game['points'];
        if(game.winOrLoss === 'win') wins++;
        else if(game.winOrLoss === 'loss' && game.gameState === "Forfeited") forfeits++;
        else losses++;
        last5Streak.push(game.winOrLoss);
        if(last5Streak.length > 5) last5Streak.shift(); ///Keep the length to 5
        if(game.winOrLoss === 'win'){
          game.scoreTeam1 > game.scoreTeam2 ? 
                (pointsScored += game.scoreTeam1, pointsConceided += game.scoreTeam2) : 
                (pointsScored += game.scoreTeam1, pointsConceided += game.scoreTeam2);
        }    
        else {///game.winOrLoss is 'loss'
          game.scoreTeam1 < game.scoreTeam2 ? 
                (pointsScored += game.scoreTeam1, pointsConceided += game.scoreTeam2) : 
                (pointsScored += game.scoreTeam1, pointsConceided += game.scoreTeam2);
        }
          return game;
      }), {points, wins, losses, forfeits, last5Streak, pointsScored, pointsConceided, teamLogo, teamSlug}]];
    })
  );
  return games;
}
function sortGamesByStats(gamesWithTeamStats){
  ////return an array of objects with index being the rank
  return Object.entries(gamesWithTeamStats).sort((teamA, teamB) => {
    let index = teamB[1][1].points - teamA[1][1].points;
    if (index == 0){ ///if points equal check who has more wins
      index = teamB[1][1].wins - teamA[1][1].wins;
        if(index == 0){ /// if same wins, check points differentials
          index = (teamB[1][1].pointsScored - teamB[1][1].pointsConceided) - 
                  (teamA[1][1].pointsScored - teamA[1][1].pointsConceided);
                  ///This should give something, but first we need to check
                  ///team record facing each other
        }
      }
    return index;
  });
}
export default Standings