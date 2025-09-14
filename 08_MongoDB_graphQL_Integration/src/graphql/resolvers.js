// graphql/resolvers.js

const Product = require('../models/Product')
const resolvers = {
  Query: {
    products: async () =>  await Product.find({}),
    product: async (_ ,{id})=> await Product.findById(id)
  },
  Mutation:{
        createProduct : async(_ ,args) =>{
          const newlyCreatedPRoduct = new Product(args)
          return await newlyCreatedPRoduct.save()
        },
        updateProduct : async(_,{id,...updatedField})=>{
          return await Product.findByIdAndUpdate(id ,updatedField)
         
        },
        deleteProduct: async(_ ,{id})=>{
          const result = await Product.findByIdAndDelete(id)
           return  !!result
        }
    },
   
};

module.exports = resolvers;
