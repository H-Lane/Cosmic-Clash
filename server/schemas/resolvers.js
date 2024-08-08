
// Import the User model and authentication utilities
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Define the resolvers for the GraphQL queries and mutations
const resolvers = {
  Query: {
    // Resolver for fetching all users
    users: async () => {
      return User.find();
    },

    // Resolver for fetching a single user by ID
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    //Resolver for fetching all games
    games: async () => {
      return Game.find();
    },

    //Resolver for fetching a single game by ID
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId});
    },
  },

  Mutation: {
    // Resolver for adding a new user
    addUser: async (parent, { username, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ username, email, password });
      // Generate a JWT token for the new user
      const token = signToken(user);

      // Return the token and user object
      return { token, user };
    },
    // Resolver for logging in an existing user
    login: async (parent, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });

      // If the user is not found, throw an authentication error
      if (!user) {
        throw AuthenticationError;
      }

      // Check if the provided password is correct
      const correctPw = await user.validatePassword(password);

      // If the password is incorrect, throw an authentication error
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Generate a JWT token for the logged-in user
      const token = signToken(user);

      return { token, user };
    },

    // Resolver for removing a user by ID
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    // //Resolver for creating a new grid
    // createGrid: async (parent, { userId }, context) => {
          
    // // finds user, inputs user and coordinates into grid model, 
    // if (context.user) {
        
    // }
    // },

    // //Resolver for creating a new game
    //   createGame: async (parent, { userId }) => {
    // //
    
    // const game = Game.findOneAndUpdate({ player2: null})
    // },
  },
};

// Export the resolvers as a module

module.exports = resolvers;
