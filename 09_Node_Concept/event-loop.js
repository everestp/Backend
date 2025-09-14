 


// times->pending callback ->idle ,preparte ->polls -> check-> closecllback

  const fs = require('fs')
  const crypto = require('crypto')
 console.log("1. script start")
  setTimeout(()=>{
    console.log("2. setTime =out 0s callback(macrotask)")
  },0)

    setTimeout(()=>{
    console.log("3. setTime =out 0s callback(macrotask)")
  },0)



  setImmediate(()=>{
    console.log("4. setImediate callback(check)")
  })

  Promise.resolve().then(()=>{
    console.log(" 5. Promis resolve")
  })

  process.nextTick(()=>{
    console.log("6. process.nextTick callback(microtask)")
  })


  fs.readFile(__filename,()=>{
    console.log("7. file read operations (I/o callback)")
  })

  crypto.pbkdf2("secret",'salt',1000 ,64 ,"sha512",(err ,key)=>{
 if(err) throw err
 console.log("8 .pbkdf2 operation complete ->THis is the cpu intensice task")
  })

   console.log("9. script end")