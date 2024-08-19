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

export const GET_USER_GRIDS = gql`
  query Grids {
  grids {
    _id
    ships {
      position
      shipName
    }
  }
}
`;

export const GET_GAME = gql`
  query getGame($gameId: String!) {
    game(gameId: $gameId) {
      _id
      playerOne
      playerTwo
      turn
      firstAttacks
      secondAttacks
      winner
      playerOneGrid
      playerTwoGrid
    }
  }
`; 

export const GET_TURN = gql`
  query getGame($gameId: String!) {
    game(gameId: $gameId) {
      turn
    }
  }
`; 

