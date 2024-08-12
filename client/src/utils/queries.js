import { gql } from "@apollo/client";

//Queries that are available to our front end from apollo server
export const QUERY_USERs = gql`
  query Users {
    users {
      _id
      username
      email
      password
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      password
    }
  }
`;

// export const QUERY_GAMES = gql`
// `