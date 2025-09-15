

const express = require('express')
const { asyncHandler } = require('../middleware/errorHandler')

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

module.exports = router