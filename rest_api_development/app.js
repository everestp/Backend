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


//add new book
app.post('/add',(req ,res)=>{
const newBook={
    id:books.length +1,
    title:`Book ${books.length +1}`
}
books.push(newBook)
res.status(200).json({
    data: newBook,
    message:"New Book is added sucessfully"
})
})

//upadate a book 
app.put('/update/:id',(req ,res)=>{
const findCurrentBook = books.find(book=>book.id ==req.params.id)
if(findCurrentBook){
    findCurrentBook.title =req.body.title || findCurrentBook.title
    res.status(200).json(
    {
        message :`Book with iD :${req.params.id} update sucessfull`,
        data:findCurrentBook
    }
    )
}
 res.status(404).json({
    message:"Book not found try with different id"
 })


})

//delete the book
app.delete('/delete/:id',(req ,res)=>{
 const  findIndexOfCurrentBook = books.findIndex(item=>item.id===req.params.id)
if(findIndexOfCurrentBook !==-1){
    const deleteBook = books.splice(findIndexOfCurrentBook,1)
    res.status(200).json({
        message:`Book delete with ID ${findIndexOfCurrentBook +1}`,
        data: deleteBook[0]
    })
}
 res.status(404).json({
    message:"Book not found try with different id"
 })

})









const PORT =3001;
 
 app.listen(PORT,()=> {
    console.log("Server is now running");
    
    
 })