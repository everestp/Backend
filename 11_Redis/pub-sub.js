



// ->publisher ->send -> channel and subsciber will consume the message



const redis = require('redis')




const client = redis.createClient({
    host:'localhost',
    port:6379
})

// event listner 
client.on('error',(error)=>{
 console.log('Redis client error',error)
})


async function testAdditionalFeature() {
    try {
        await client.connect()
        const   subscriber = client.duplicate()  //-> create a new client -> shares the same connectiom
         await subscriber.connect() // connect to redis server for the subsciber

         await subscriber.subscribe('dummy-channel',(message ,channel)=>{
            console.log(`Recieve message=> ${channel} from ${channel}`,message,channel)
         })

         //publish message to the dummy-channel 

         await client.publish('dummy-channel',"Some duumy data form publidher")
         await client.publish('dummy-channel',"Again from publisher")

         await new Promise((resolve)=> setTimeout(resolve ,10000))
         await subscriber.unsubscribe('dummy-channel')
         await subscriber.quit() //close the subscriber channel




        
    } catch (error) {
        console.error("Error",error)
    }
    finally{
        await client.quit()
    }
    
}

testAdditionalFeature()