const Product = require('../models/Product')






const getProductStats = async(req ,res)=>{
    try {

        const result = await Product.aggregate([
            //stage 1
            {
                $match :{
                    inStock: true,
                    price :{
                        $gte :10

                    }
                }
            },

            // stage 2 : Group docunment
            {
                $group:{
                    _id :"$category",
                    avgPrice:{
                        $avg:"$price"
                    },
                    count:{
                        $sum:1
                    },
                }

            }
        ]);

        res.status(200).json({
            success:true,
            data:result
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}


const getProductAnalysis = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    category: 'Electronics'
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" },
                    averagePrice: { $avg: "$price" },
                    maxProductPrice: { $max: "$price" },
                    minProductPrice: { $min: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1, // ✅ FIXED: changed from 2 → 1 (MongoDB uses 1 to include fields)
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"] // ✅ FIXED: typo "$substact" → "$subtract"
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const insertSampleProducts = async (req, res) => {
    try {
const sampleProductsNext = [
  {
    "name": "Gaming Keyboard",
    "category": "Electronics",
    "price": 59.99,
    "inStock": true,
    "tags": ["gaming", "keyboard", "rgb"]
  },
  {
    "name": "Ceramic Coffee Mug",
    "category": "Kitchen",
    "price": 12.75,
    "inStock": true,
    "tags": ["mug", "ceramic", "coffee"]
  },
  {
    "name": "Running Shoes",
    "category": "Fitness",
    "price": 85.0,
    "inStock": false,
    "tags": ["shoes", "running", "sportswear"]
  },
  {
    "name": "Smartphone Stand",
    "category": "Electronics",
    "price": 19.99,
    "inStock": true,
    "tags": ["mobile", "accessories", "stand"]
  },
  {
    "name": "Office Chair",
    "category": "Furniture",
    "price": 150.0,
    "inStock": true,
    "tags": ["office", "chair", "ergonomic"]
  }
];


        const result = await Product.insertMany(sampleProductsNext);
        
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`
        });

        console.log(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = { insertSampleProducts ,getProductStats ,getProductAnalysis};
