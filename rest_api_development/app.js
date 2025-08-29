const express = require('express')
const app = express();

//Middleware
app.use(express.json())

let books = [
    {
        id:'1',
        title :"Book 1"
    },
     {
        id:'2',
        title :"Book 2"
    }
];



//Get all book
app.get('/',(req,res)=>{
res.json({
    message:'Welcome to Book Store APi'
})
})

//get all book 
app.get('/get',(req,res)=>{
    res.json(books)
})

//get singke book
app.get("/get/:id",(req ,res)=>{
    const book = books.find(item =>item.id ==req.params.id);
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({message:"Book not found try different ID"})
        }
})

const PORT =3001;
 
 app.listen(PORT,()=> {
    console.log("Server is now running");
    
    
 })