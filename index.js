import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql_schema.js';
import { filterNewsByKeyword, getNews } from './controllers/newsController.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 4000;
const db = process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/mynewscover';

mongoose.set('strictQuery', false); // to stop showing the warning in the console
mongoose.connect(db, console.log('Connected to the database'));


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    news: async (parent, args, context, info) => {
      return await getNews(args.email, args.keyword, args.order);
    },
 
    newsByKeyword: async (parent, args, context, info) => {
      return await filterNewsByKeyword(args.email, args.keyword, args.limit, args.order);
    },
   
    version: () => "1.0.0"
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log(`Apollo Server ready at: ${url}`);
