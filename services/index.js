import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const fetchAllGamesGQL = async () => {
    const query = gql`query MyQuery {
        games(orderBy: dateAndTime_DESC, last: 50, where: {OR: [{gameType: regular}, {gameType: null}]}) {
          otTeam1
          otTeam2
          dateAndTime
          id
          q1Team1
          q1Team2
          q2Team1
          q2Team2
          q3Team1
          q3Team2
          q4Team1
          q4Team2
          scoreTeam1
          scoreTeam2
          team1 {
            name
            photo {
              url(transformation: {image: {resize: {height: 60, width: 60}}})
            }
            slug
            shortName
          }
          team2 {
            id
            name
            photo {
              url(transformation: {image: {resize: {height: 60, width: 60}}})
            }
            slug
            shortName
          }
          slug
          lineup1
          coachTeam1
          lineup2
          coachTeam2
          referee
          stadium {
            city
            capacity
            name
            image {
              url(transformation: {image: {resize: {height: 280, width: 470, fit: scale}}})
            }
          }
            gameType
            gameDivision
            gameVersion
            gameSeason
            gameState
        }
      }`;
      const result = await request(graphqlAPI, query);
      return result['games'];
}
export const fetchAllTeams = async () => {
  const query = gql`
      query TeamsQuery {
        teams(last: 50, orderBy: name_ASC){
          name
          photo {
            url(transformation: {image: {resize: {height: 60, width: 60}}})
          }
          slug
          shortName
        }
      }`
      const result = await request(graphqlAPI, query);
      return result['teams'];
}
export const fetchAllStadiums = async ()=>{
  const query = gql`
      query TeamsQuery {
        stadiums(last: 50, orderBy: name_ASC){
          name
          slug
        }
      }`
      const result = await request(graphqlAPI, query);
      return result['stadiums'];
}

export const getAllPlayoffData = async ( ) => {
  const query = gql`
  query playoffQuery {
    playoffPools {
      slug
      name
      level
      description
      relatedPools {
        slug
        name
      }
      games {
        gameType
        dateAndTime
        gameState
        slug
        team1 {
          name
          slug
          shortName
          photo {
            url(transformation: {image: {resize: {height: 30, width: 30}}})
          }
        }
        team2 {
          name
          slug
          shortName
          photo {
            url(transformation: {image: {resize: {height: 30, width: 30}}})
          }
        }
        scoreTeam1
        scoreTeam2
      }
      teams {
        name
        shortName
        slug
        photo {
          url(transformation: {image: {resize: {height: 30, width: 30}}})
        }
      }
    }
  }`;
  const result = await request(graphqlAPI, query);
      return result['playoffPools'];
}