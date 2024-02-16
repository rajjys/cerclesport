import { request, gql } from 'graphql-request';

///Retrieve games
export const fetchGamesFromGQL = async ( league, division ) => {
   const query = gamesQueries[division];
   const graphqlAPI = league == "EUBAGO"? eubagoGraphqlAPI :
                     (league == "EUBABUK"? eubabukGraphqlAPI: null);
   const result = await request(graphqlAPI, query);
      return result["games" + division];
}

export const fetchTeamsFromGQL = async ( league, division ) => {
  const query = teamsQueries[division];
  const graphqlAPI = league == "EUBAGO"? eubagoGraphqlAPI :
                     (league == "EUBABUK"? eubabukGraphqlAPI: null);
  const result = await request(graphqlAPI, query);
     return result["teams" + division];
}
export const fetchStadiumsFromGQL = async (league)=>{
  const query = gql`
      query StadiumsQuery {
        stadiums(orderBy: name_ASC){
          name
          slug
        }
      }`
      const graphqlAPI = league == "EUBAGO"? eubagoGraphqlAPI :
                        (league == "EUBABUK"? eubabukGraphqlAPI: null);
      const result = await request(graphqlAPI, query);
      return result['stadiums'];
}
const eubagoGraphqlAPI = process.env.NEXT_PUBLIC_EUBAGO_ENDPOINT;
const eubabukGraphqlAPI = process.env.NEXT_PUBLIC_EUBABUK_ENDPOINT;
const gamesQueries = {
  "D1M" : gql`query Assets {
    gamesD1M(orderBy: dateAndTime_DESC, last: 150){
      coachTeam1
      coachTeam2
      dateAndTime
      featuredImage {
        url
      }
      lineup1
      lineup2
      otTeam1
      otTeam2
      q1Team1
      q1Team2
      q2Team1
      q2Team2
      q3Team1
      q3Team2
      q4Team1
      q4Team2
      referee
      scoreTeam1
      scoreTeam2
      slug
      stadium {
        city
        capacity
        name
        image {
          url
        }
        slug
      }
      team1 {
        name
        biography
        photo {
          url
        }
        shortName
        slug
      }
      team2 {
        biography
        name
        photo {
          url
        }
        shortName
        slug
      }
      gameType
      gameState
    }
  }
  `,
  "D1F" : gql`query Assets {
    gamesD1F(orderBy: dateAndTime_DESC, last: 150) {
      coachTeam1
      coachTeam2
      dateAndTime
      featuredImage {
        url
      }
      lineup1
      lineup2
      otTeam1
      otTeam2
      q1Team1
      q1Team2
      q2Team1
      q2Team2
      q3Team1
      q3Team2
      q4Team1
      q4Team2
      referee
      scoreTeam1
      scoreTeam2
      slug
      stadium {
        city
        capacity
        name
        image {
          url
        }
        slug
      }
      team1 {
        name
        biography
        photo {
          url
        }
        shortName
        slug
      }
      team2 {
        biography
        name
        photo {
          url
        }
        shortName
        slug
      }
      gameType
      gameState
    }
  }
  `,
  "D2M" : gql`query Assets {
    gamesD2M(orderBy: dateAndTime_DESC, last: 150) {
      coachTeam1
      coachTeam2
      dateAndTime
      featuredImage {
        url
      }
      lineup1
      lineup2
      otTeam1
      otTeam2
      q1Team1
      q1Team2
      q2Team1
      q2Team2
      q3Team1
      q3Team2
      q4Team1
      q4Team2
      referee
      scoreTeam1
      scoreTeam2
      slug
      stadium {
        city
        capacity
        name
        image {
          url
        }
        slug
      }
      team1 {
        name
        biography
        photo {
          url
        }
        shortName
        slug
      }
      team2 {
        biography
        name
        photo {
          url
        }
        shortName
        slug
      }
      gameType
      gameState
    }
  }
  `
}
const teamsQueries = {
  "D1M" : gql`query MyQuery {
    teamsD1M(last: 50, orderBy: name_ASC){
      biography
      name
      photo {
        url
      }
      shortName
      slug
    }
  }
  `,
  "D1F" : gql`query MyQuery {
    teamsD1F{
      biography
      name
      photo {
        url
      }
      shortName
      slug
    }
  }
  `,
  "D2M": gql`query MyQuery {
    teamsD2M(last: 50, orderBy: name_ASC){
      biography
      name
      photo {
        url
      }
      shortName
      slug
    }
  }
  `
}