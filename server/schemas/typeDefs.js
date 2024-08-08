// Define the GraphQL type definitions
const typeDefs = `

  # Define the User type with fields _id, username, email, and password
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  # Define the Game type with fields for firstUserId and secondUserId
  type Game {
    _id: ID
    firstUserId: ID
    secondUserId: ID
  }
    
  # Define the Auth type to handle returning data from a user creation or login
  type Auth {
    token: ID!
    user: User
  }

  # Define the root Query type with fields to retrieve users and a single user by ID
  type Query {

    # Retrieves an array of User objects
    users: [User]!

    games: [Game]!

    # Retrieves a single User object by ID
    user(userId: ID!): User

    game(gameId: ID!): Game
  }

    
  # Define the root Mutation type with fields to add a user, log in, and remove a user
  type Mutation {

    # Creates a new user and returns an Auth object containing the token and user data
    addUser(name: String!, email: String!, password: String!): Auth

    # Logs in a user and returns an Auth object containing the token and user data
    login(email: String!, password: String!): Auth

    # Removes a user by ID and returns the removed User object
    removeUser(userId: ID!): User
  }
`;

// Export the type definitions

module.exports = typeDefs;
