import db from "../../config/database.js"


const viewProducts = async ( req, res) =>{
    try{
        const getProducts = await db.query(` 
            SELECT category, product_name, product_size, price
            FROM products`)
        const products = getProducts.rows
        return res.status(200).json(products)
    }catch(err){
        console.log('Error displaying products', err)
        return res.status(500).json({
            message : 'Error displaying products',
            error : err.stack
        })
    }
}

export { viewProducts }
