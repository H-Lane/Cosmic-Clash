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
  }
  
  # Define the Grid type with fields ships, userId
  type Grid {
  _id: ID
  ships: [Ship]
  userId: ID
  }

  # Define the Ship type with fields shipName and position
  type Ship {
  shipName: String
  position: [Int]
  }

  # Define the Game type with fields for playerOne and playerTwo
  type Game {
    _id: ID
    playerOne: ID
    playerTwo: ID
    turn: ID
    firstAttacks: [Int]
    secondAttacks: [Int]
    winner: ID
    playerOneGrid: ID
    playerTwoGrid: ID
  }

  input GameInput {
  playerOne: ID
  turn: ID
  playerOneGrid: ID!
  }

  #Should turn be in the JoinGameInput?
  input JoinGameInput {
  playerTwo: ID
  playerTwoGrid: ID
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
    grids: [Grid]!
  }

    
  input ShipInput {
    shipName: String
    position: [Int]
  }

  # Define the input type for an attack
  input AttackInput {
    gameId: ID!
    gridId: ID!
  }

  # Define the result type of an attack
  type AttackResult {
    hit: Boolean!
    shipSunk: Boolean
    gameOver: Boolean
  }

  # Define the root Mutation type with fields to add a user, log in, 
  type Mutation {

    # Creates a new user and returns an Auth object containing the token and user data
    addUser(username: String!, email: String!, password: String!): Auth

    # Logs in a user and returns an Auth object containing the token and user data
    login(email: String!, password: String!): Auth

    createGrid(ships: [ShipInput]! ): Grid

    createGame(playerOne: GameInput!): Game

    joinGame(playerTwo: JoinGameInput!): Game

    createAttack(attackData: AttackInput! ): AttackResult
    
  }
`;

// Export the type definitions

module.exports = typeDefs;
