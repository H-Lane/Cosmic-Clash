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
mutation joinGame($playerTwo: JoinGameInput!) {
  joinGame(playerTwo: $playerTwo) {
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
mutation createGame($playerOne: GameInput!) {
  createGame(playerOne: $playerOne) {
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