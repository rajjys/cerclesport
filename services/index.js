import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getAllGames = async () => {

    const query = gql`query MyQuery {
        games(orderBy: dateAndTime_DESC, last: 50) {
          otTeam1
          otTeam2
          place
          dateAndTime
          gameState
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
        }
      }
      `;
      const result = await request(graphqlAPI, query);
      ////console.log(result['games']);
      return result['games'];
}
export const getGamesByTeam = async ( slug ) => {

  const query = gql`query MyQuery($slug:String!){
      games(where: {OR: [{team1: {slug: $slug}}, {team2: {slug: $slug}}]}) {
        otTeam1
        otTeam2
        place
        dateAndTime
        gameState
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
      }
    }
      `;
  const result = await request(graphqlAPI, query, {slug});
      return result['games'];
}
export const getTeamProfile = async ( slug ) => {
  const query = gql`
      query GetProfile($slug:String!){
        team(where: {slug: $slug}) {
          shortName
          bio
          name
          photo {
            url(transformation: {image: {resize: {height: 120, width: 120}}})
          }
        }
      }`;
  const result = await request(graphqlAPI, query, { slug });
      return result['team'];
}
export const getGameInfo = async ( slug ) => {
  const query = gql`
  query GameInfoQuery($slug:String!){
    game(where: {slug: $slug}) {
      dateAndTime
      gameState
      otTeam1
      otTeam2
      place
      q1Team1
      q1Team2
      q2Team1
      q2Team2
      q3Team1
      q3Team2
      q4Team1
      q4Team2
      scoreTeam2
      scoreTeam1
      team1 {
        name
        photo {
          url(transformation: {image: {resize: {height: 90, width: 90}}})
        }
        shortName
        slug
      }
      team2 {
        name
        photo {
          url(transformation: {image: {resize: {height: 90, width: 90}}})
        }
        shortName
        slug
      }
    }
  }`;
  const result = await request(graphqlAPI, query, { slug });
      return result['game'];
}