// 8/11 TO DO: Check to see if the Grid and Ship type should be required. 
// 8/11 TO DO: Whats the logic behind a turn key and winner key in Game type being an ID?

// Define the GraphQL type definitions
const typeDefs = `

  # Define the User type with fields _id, username, email, and password
  type User {
    _id: ID
    username: String
    email: String
    password: String
    grids: [Grid]
  }
  
  # Define the Grid type with fields ships, userId, and gameId
  type Grid {
  ships: [Ship]
  userId: ID
  gameId: ID
  }

  # Define the Ship type with fields shipName and position
  type Ship {
  shipName: String
  position: [Int]
  }

  # Define the Game type with fields for firstUserId and secondUserId
  type Game {
    _id: ID
    playerOne: [Player]
    playerTwo: [Player]
    turn: ID
    firstAttacks: [Int]
    secondAttacks: [Int]
    winner: ID
    playerOneGrid: [Grid]
    playerTwoGrid: [Grid]
  }

  # Define the Player type with fields for userId, hits, and misses
  type Player {
  userId: ID
  hits: [Int]
  misses: [Int]
  }
    
  # Define the Auth type to handle returning data from a user creation or login
  type Auth {
    token: ID!
    user: User
  }

  # Define the root Query type with fields to retrieve users and a single user by ID
  type Query {
    
    games: [Game]!
    game(gameId: ID!): Game
    me: User
  }

    
  input ShipInput {
  shipName: String
  position: [Int]
  }

  # Define the root Mutation type with fields to add a user, log in, 
  type Mutation {

    # Creates a new user and returns an Auth object containing the token and user data
    addUser(username: String!, email: String!, password: String!): Auth

    # Logs in a user and returns an Auth object containing the token and user data
    login(email: String!, password: String!): Auth

    createGrid(ships: [ShipInput]!, userId: ID!, gameId: ID): Grid
    
  }
`;

// Export the type definitions

module.exports = typeDefs;
