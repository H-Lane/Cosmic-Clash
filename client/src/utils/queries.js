import { gql } from "@apollo/client";

//Queries that are available to our front end from apollo server

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      grids {
        ships {
          shipName
          position
        }
        userId
        gameId
      }
    }
  }
`;
  ;
  export const  GET_USER_GRIDS = gql`
  query GetUserGrids($userId: ID!) {
    getUserGrids(userId: $userId) {
      id
      cells
    }
  }
`;
// export const QUERY_GAMES = gql`
// `