import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getAllGames = async () => {

    const query = gql`query MyQuery {
        games(orderBy: dateAndTime_ASC) {
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