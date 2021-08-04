const graphql = require('graphql')
const {GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList} = graphql
const UserType = require('./TypeDefs/UserType')
const userData=require('../MOCK_DATA.json');
const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        getAllUsers :{ 
        type: new GraphQLList(UserType),
        args: {id:{type:GraphQLInt}},
        resolve(parent,args){
             return userData
          }
        }  
     
      }
    })
const mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        createUser:{
            type:UserType,
            args:{
                firstName:{type:GraphQLString},
                lastName:{type:GraphQLString},
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            resolve(parent,args){
                // currently data is just pushed to array not actual database
                userData.push({id: userData.length + 1 , 
                               firstName: args.firstName ,
                               lastName:args.lastName ,
                               email:args.email ,
                               password:args.password})
                return args
            }
        }
    }
})
// schema is combination of mutation and queries 
module.exports =  new graphql.GraphQLSchema({query:rootQuery,mutation:mutation})