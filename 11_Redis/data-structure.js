

const redis = require('redis')

const client = redis.createClient({
    host:'localhost',
    port:6379
})

// event listner 
client.on('error',(error)=>{
 console.log('Redis client error',error)
})



async function redisDataStructures() {
    try {
        //Stirng -> SET , GET .MSET 

        await client.connect()
        await client.set("user:name","Everest Paudel")
        const name = await client.get("user:name")
        console.log(name);
        await client.mSet(["user:email","paudeleverest@gmail.com","user:age","60","user:country","nepal"])
        const [email ,age,country]= await client.mGet(["user:email","user:age","user:country"])
        console.log(email,age,country)

 //list -> LPUSH ->insert the element at begging of list
 //RPUSH , LRANGE , LPOP ,RPOP
//  await client.lPush('notes',['note 1','note 2','notes 3'])
 const extractAllNotes = await client.lRange('notes',0 ,-1)
 console.log(extractAllNotes)

 const firstTask = await client.lPop('notes')
 const remaingNotes = await client.lRange("notes", 0,-1)
 console.log(remaingNotes)
 console.log(firstTask)

// sets ->SADD , SMEMBERS ,SISMEMBER ,SREM
//  await client.sAdd("user:nickName",['john','varun','xyz'])
 const extractUserNickNames = await client.sMembers('user:nickName')
 console.log(extractUserNickNames)

 await client.sRem('user:nickName','xyz')
 const getUpdateNicjName = await client.sMembers('user:nickName')
  console.log(getUpdateNicjName)


  //sorted sets
  //ZADD ,ZRANGE ,ZRANK ,ZREM
  await client.zAdd('cart',[
    {
        score :100 , value :'Cart 1'
    },
     {
        score :150 , value :'Cart 2'
    },
     {
        score :10 , value :'Cart 3'
    },
     {
        score :20 , value :'Cart 4'
    }
  ])

  const getTopCartItems = await client.zRange('cart',0,-1);
  console.log(getTopCartItems)
const extractAllCartItemsWithScore = await client.zRangeWithScores('cart',0,-1)
console.log(extractAllCartItemsWithScore)

const cartTwoRank = await client.zRank("cart","Cart 4")
console.log(cartTwoRank)



// hashed -> HSET ,HGET , HGETALL ,HDEL

await client.hSet('product:1',{
    name:"Product 1",
    description :'product one description',
    rating:'5'
})
 const getProductRating = await client.hGet('product:1','rating')
 console.log(getProductRating)

 const getProducrDetail = await client.hGetAll('product:1')
 console.log(getProducrDetail)

 await client.hDel('product:1','rating')
 const updateProductDetail = await client.hGetAll('product:1')
console.log(updateProductDetail)
    } catch (error) {
        console.error("Error",error)
    } finally{
        client.quit()
    }
    
}

redisDataStructures()