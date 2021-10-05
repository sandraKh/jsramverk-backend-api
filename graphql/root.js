const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,

} = require('graphql');

const data = require("../models/data.js");

var TodoType = new GraphQLObjectType({  
    name: 'docs',
    fields: function () {
      return {

        title: {
          type: GraphQLString
        },
        creator: {
            type: GraphQLString
          }
      }
    }
  });

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        docs: {
          type: new GraphQLList(TodoType),
          resolve: () => {
            return new Promise((resolve, reject) => {
                data.find((err, todos) => {
                if (err) reject(err)
                else resolve(todos)
              })
            })
          }
        }
      })
});

module.exports = RootQueryType;