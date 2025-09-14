/*
readable -> user for read
writeable -> write to a file

duplex -> can be used for both read and write(TCP socket)

transfer ->  zlibs streams



*/

 const fs = require('fs')
 const zlib = require('zlib')
 const crypto = require('crypto')

 const {Transform}= require('stream')



  class EncrpytStream extends Transform{
    constructor(key ,vector){
        super()
        this.key= key
        this.vector= vector
    }

    _transform(chunk ,encoding ,callback){
        const cipher = crypto.createCipheriv('aes-256-cbc',this.key ,this.vector)
        const encryted = Buffer.concat([cipher.update(chunk), cipher.final()])  //encrpyt the chunk data
        this.push(encryted)
        callback()

    }
  }


  const key = crypto.randomBytes(32);
  const vector = crypto.randomBytes(16);

  const readbleStream = fs.createReadStream('input.txt')

  // new gzip object to compress the stream  of data
  const gzipStream = zlib.createGzip()


  const encryptStream = new EncrpytStream(key ,vector);
  const writeableStream = fs.createWriteStream('output.txt.gz.enc')

  // read -> compress -> encrypt -> write
  readbleStream.pipe(gzipStream).pipe(encryptStream).pipe(writeableStream)
  console.log("Streaming -> Compressing -> writing data")