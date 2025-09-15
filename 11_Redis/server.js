

const redis = require('redis')

const client = redis.createClient({
    host:'localhost',
    port:6379
})

// event listner 
client.on('error',(error)=>{
 console.log('Redis client error',error)
})


async function testRedisConncetion() {
    try {
        await client.connect()
        console.log('Connected to redis')
        await client.set('name','everest')
        const extractValue = await client.get("name")
        const deleteCount = await client.del("name")
        console.log(extractValue)
        //delete operation 
        console.log(deleteCount)

        // increament and decrement
        await client.set("count",'100')
        const increamentCount = await client.incr('count')
      console.log(increamentCount)
       const increamentCount1 = await client.incr('count')
      console.log(increamentCount1)

  //deceremanet 
  await client.decr('count')
  await client.decr('count')
  await client.decr('count')
  await client.decr('count')
  await client.decr('count')
  const decreamentCount = await client.decr('count')
    console.log(decreamentCount)
    } catch (error) {
        console.error("Error",error)
    }
    finally{
        await client.quit()
    }
}

testRedisConncetion()