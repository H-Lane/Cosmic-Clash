// Import the User model and authentication utilities
const { User, Game, Grid } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Define the resolvers for the GraphQL queries and mutations
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("grids");
      }
      throw new AuthenticationError("You need to be logged in!");
    },


    grids: async ( parent,args,context ) => {
      console.log(context.user)
      return Grid.find({userId: context.user._id});
    },

    //Resolver for fetching all games
    games: async () => {
      return Game.find();
    },

    //Resolver for fetching a single game by ID
    game: async (parent, args, { gameId }) => {
      return Game.findOne({ _id: gameId });
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
      console.log(email,password)
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

    createGrid: async (parent, { ships }, context) => {
      if (context.user) {
        console.log(ships);
        const newGrid = await Grid.create({ ships, userId: context.user._id });

        return newGrid;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

// Export the resolvers as a module

module.exports = resolvers;
