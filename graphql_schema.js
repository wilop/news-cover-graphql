// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

   #This "Category" type defines the queryable fields for every Categoy in our data source new.
  
  "This type defines a Category"
  type Category {
    _id: String
    name: String!
  }

   #This "NewSource" type defines the queryable fields for every NewSource in our data source new.
  
  "This type defines a NewSource"
  type NewSource {
    _id: String
    url: String!
    name: String!
  }

  #This "News" type defines the queryable fields for every New in our data source.
  
  "This type defines a New"
  type New {
    _id: String
   title: String!
   short_description: String!
   permalink: String!
   image: String!
   date: String!
   news_source: NewSource!
   category: Category!
   tags: [String]!
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "news" query returns an array of zero or more news (defined above).
 
  "This type defines a Query"
  type Query {

    "Get all news"
    news(order: String): [New]

    "Get news by category"
    newsByCategory(category: String!, order: String): [New]

    "Get news by keyword"
    newsByKeyword(keyword: String!, order: String): [New]
    
    "Get news by tags"
     newsByTags(tags: [String]!, order: String): [New]

    "Get version of this API"
    version: String
  }
`;