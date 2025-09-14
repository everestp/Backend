// graphql/resolvers.js

const products = require('../data/products');

const resolvers = {
  Query: {
    products: () => products,
    product:(_ ,{id})=>products.find((item)=>item.id ===id)
  },
  Mutation:{
    createProduct :(_,{title,category ,price,inStock})=>{
        const newlyCreatedPRoduct = {

            id:String(products.length +1),
            title,
            category,
            price,
            inStock
        }
        products.push(newlyCreatedPRoduct)
        return newlyCreatedPRoduct
    },
    deleteProduct:(_ ,{id})=>{
        const index =products.findIndex(products=>products.id ===id);
        if(index==-1)  return false
        products.splice(index ,1)
        return true
    },
     updateProduct:(_ ,{id, ...updates}) =>{
        const index =products.findIndex(products=>products.id ===id);
        if(index==-1)  return false


        const updatedProdcut = {
            ...products[index] ,...updates
        }
        products[index] = updatedProdcut
        return updatedProdcut

     }

  }
};

module.exports = resolvers;
