import db from "../../config/database.js";
import dotenv from 'dotenv'

dotenv.config()

const createProduct = async ( req, res )=>{
    try{
        const { category, productName, productSize, stockQuanity, price} = req.body
        const existingProduct = await db.query(` 
            SELECT product_name, product_size FROM products WHERE product_name = $1`,
            [productName])
        if ( existingProduct.rows.length > 0) return res.status(409).json({
            message : ' Product already exit'
        })
        await db.query(`
            INSERT INTO products 
                (category,product_name, product_size, stock_quantity, price)
            VALUES ($1, $2, $3, $4, $5)`, 
            [category, productName, productSize, stockQuanity, price])
        return res.status(201).json({message : 'Product created successfully'})
    }catch(err){
        console.log("Error creating products", err)
        return res.status(500).json({
            message : 'Product creation failed',
            error : err.stack
        })
    }
}









export { createProduct}