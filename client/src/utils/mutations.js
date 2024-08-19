import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_GRID = gql`
mutation createGrid($ships: [ShipInput]!) {
  createGrid(ships: $ships) {
    ships {
      position
      shipName
    }
    userId
  }
}`

export const JOIN_GAME = gql`
 mutation joinGame($gridId: String!) {
    joinGame(gridId: $gridId) {
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

export const CREATE_GAME = gql`
mutation createGame($gridId: String!) {
  createGame(gridId: $gridId) {
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

export const CREATE_ATTACK = gql`
  mutation CreateAttack($position: Int!, $gameId: String!) {
    createAttack(position: $position, gameId: $gameId) {
      hit
      shipSunk
      allShipsSunk
    }
  }
`;