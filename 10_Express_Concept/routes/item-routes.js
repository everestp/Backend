

const express = require('express')
const { asyncHandler, APIError } = require('../middleware/errorHandler')

const router = express.Router()

const items = [
    {
        id:1,
        name:'item-1'
    },
    {
        id:2,
        name:'item-2'
    },
    {
        id:3,
        name:'item-3'
    },
    {
        id:4,
        name:'item-4'
    },
]

router.get('/items' ,asyncHandler( async (req ,res)=>{
  res.json(items)
}))


 router.post ('/items',asyncHandler(async(req ,res)=>{
    if(!req.body.name){
        throw new APIError('Items name is required',400)
    }
    const newItems = {
        id:items.length +1,
        name:req.body.name
    }
    items.push(newItems)
    res.status(201).json(newItems)
 }))

module.exports = router