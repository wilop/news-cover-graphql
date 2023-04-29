import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { typeDefs } from './graphql_schema.js';
import { filterNewsByKeyword, filterNewsByCategory, filterNewsByTags, getNews } from './controllers/newsController.js';
import { verifyToken } from './controllers/sessionController.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 4001;
const db = process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/mynewscover';

mongoose.set('strictQuery', false); // to stop showing the warning in the console
mongoose.connect(db, console.log('Connected to the database'));


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    news: async (parent, args, contextValue, info) => {
      if (contextValue && contextValue.session) {
        return await getNews(contextValue.session.email, args.keyword, args.order);
      }
    },

    newsByCategory: async (parent, args, contextValue, info) => {
      if (contextValue && contextValue.session) {
        return await filterNewsByCategory(contextValue.session.email, args.category, args.limit, args.order);
      }
    },

    newsByKeyword: async (parent, args, contextValue, info) => {
      if (contextValue && contextValue.session) {
        return await filterNewsByKeyword(contextValue.session.email, args.keyword, args.limit, args.order);
      }
    },

    newsByTags: async (parent, args, contextValue, info) => {
      if (contextValue && contextValue.session) {
        return await filterNewsByTags(contextValue.session.email, args.tags, args.limit, args.order);
      }
    },

    version: () => "1.0.0"
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production'
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {

  listen: { port: port },
  context: async ({ req }) => {

    // get the user token from the headers

    const token = req.headers.authorization || '';

    // try to retrieve a user with the token

    const session = await verifyToken(token);

    if (!session) {
      // throwing a `GraphQLError` here allows us to specify an HTTP status code,
      // standard `Error`s will have a 500 status code by default

      throw new GraphQLError('User is not authorized', {

        extensions: {
          code: 'Unauthorized',
          http: { status: 401 },
        },

      });

    }


    return { session };


  },

});


console.log(`Apollo Server listening at: ${url}`);