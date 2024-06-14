export function getGamesByTeams( games ){
    ///create object to hold games by team
    ///Each team should only have games that have already been played
    ///So only acceptable states would be Ended and Forfeited
    let playedGames = games.filter(game => game.gameState == "Ended" || game.gameState == "Forfeited");
    ////console.log(playedGames);
    return playedGames.reduce((acc, curr) => {
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

  export function addWinLossEntries( gamesByTeams ){
    ///Here we add winOrLoss entry depending if the team owning the game has won it
    ///We also add the points each game brought. 2 for win, 1 for loss, and 0 if it's a loss by forfeit
    const games = Object.fromEntries(
      Object.entries(gamesByTeams).map(([team, gamesByTeam]) => {
        return [team, gamesByTeam.map((game) => {
          const winOrLoss = parseInt(game.scoreTeam1) == parseInt(game.scoreTeam2) ? "loss":   ////Forfait Bilateral
              parseInt(game.scoreTeam1) > parseInt(game.scoreTeam2) ? 
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
  export function addTeamStats( gamesAndPoints ){
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
        let ppg = 0; ///points per game
        let dppg = 0; ///points conceided per game
        let group = gamesByTeam[0].team1.group || 10;
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
          if(last5Streak.length > 5) last5Streak.pop(); ///Keep the length to 5
          if(game.winOrLoss === 'win'){
            game.scoreTeam1 > game.scoreTeam2 ? 
                  (pointsScored += game.scoreTeam1, pointsConceided += game.scoreTeam2) : 
                  (pointsScored += game.scoreTeam2, pointsConceided += game.scoreTeam1);
          }    
          else {///game.winOrLoss is 'loss'
            game.scoreTeam1 < game.scoreTeam2 ? 
                  (pointsScored += game.scoreTeam1, pointsConceided += game.scoreTeam2) : 
                  (pointsScored += game.scoreTeam2, pointsConceided += game.scoreTeam1);
                }
            ppg = (pointsScored / (wins + losses + forfeits)).toFixed(1);
            dppg = (pointsConceided / (wins + losses + forfeits)).toFixed(1);
            return game;
        }), {points, wins, losses, forfeits, ppg, 
            dppg, last5Streak: [...last5Streak].reverse(), 
            pointsScored, pointsConceided, teamLogo, teamSlug, group}]];
      })
    );
    return games;
  }
  export function sortTeamsByStats(gamesbyTeamsWithStats){
    ////return an array of objects with index being the rank
    return Object.entries(gamesbyTeamsWithStats).sort((teamA, teamB) => {
      let rank = teamB[1][1].points - teamA[1][1].points;
      if (rank == 0){ ///if points equal check who has more wins in face
        rank = teamB[1][1].wins - teamA[1][1].wins;
          if(rank == 0){ /// if same wins, check points differentials
            rank = (teamB[1][1].pointsScored - teamB[1][1].pointsConceided) - 
                    (teamA[1][1].pointsScored - teamA[1][1].pointsConceided);
                    ///This should give something, but first we need to check
                    ///team record facing each other
          }
        }
      return rank;
    });
  }

  export function sortTeamsByAStat(gamesbyTeamsWithStats, stat, selectedLeague){
    ////console.log(gamesbyTeamsWithStats);
    ////return an array of objects with index being the rank
    return Object.entries(gamesbyTeamsWithStats).sort((teamA, teamB) => {
      let rank = teamB[1][1][stat] - teamA[1][1][stat];
      if (rank == 0){ ///if points equal check who has more points in face off matchups
        ////If rank is still same, for some leagues, before checking point differential, 
        ////check face Off record by each team
          let faceOffGames = teamA[1][0].filter(game => 
          game.team1.name === teamB[0] || game.team2.name === teamB[0]);
          ///use the same process for 2 teams to know who has more points in machup games
          if(faceOffGames.length > 0 && selectedLeague == "EUBAGO"){ ///Make sure they've already faced off before executing the algo
            ///Also for our limited user base, only eubago care about matchup record. EUBABUK don't. We'll modify this once we go full SAAS
            let gamesByTeams = getGamesByTeams(faceOffGames); ///Assigning games by each team
            let gamesAndPoints = addWinLossEntries(gamesByTeams); ///Adding winOrLoss and points entries depending if the team owning the game won or lost
            let gamesbyTeamsWithStatsAA = addTeamStats(gamesAndPoints); ///Adding stats per team. Wins, Losses, Last5streak,...
            let teamAA = gamesbyTeamsWithStatsAA[teamA[0]];
            let teamBB = gamesbyTeamsWithStatsAA[teamB[0]];
            rank = teamBB[1][stat] - teamAA[1][stat];
          }
          if(rank == 0){ /// if same wins, check points differentials
            rank = (teamB[1][1].pointsScored - teamB[1][1].pointsConceided) - 
                    (teamA[1][1].pointsScored - teamA[1][1].pointsConceided);
                    ///This should give something, but first we need to check
                    ///team record facing each other
          }
        }
      return rank;
    });
  }
  export function sortTeamsByDiff( gamesWithTeamStats){
    ////return an array of objects with index being the rank
    return Object.entries(gamesWithTeamStats).sort((teamA, teamB) => 
    (teamB[1][1].ppg - teamB[1][1].dppg) - (teamA[1][1].ppg - teamA[1][1].dppg))
  }
  export function getBlowoutGames( games ){
    let sortedArr = games.sort((game1, game2) => 
    Math.abs(game2.scoreTeam1 - game2.scoreTeam2) - 
    Math.abs(game1.scoreTeam1 - game1.scoreTeam2)
    )
    return sortedArr.slice(0, 10);
  }
   
  