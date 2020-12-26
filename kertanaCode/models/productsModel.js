const pool = require('./connection.js');

module.exports.getAllProducts = async function() {
    try {
        const sql = 'SELECT * FROM Produto;';
        let products = await pool.query(sql);
        return products; 
    }  catch (err) {
        console.log(err);
        return err;
    }
}


module.exports.getProduct = async function(productID) {
    try {
        const sql = 'SELECT * FROM Produto WHERE Produto_ID = ?';
        const product = await pool.query(sql,[productID]);
        return product; 
    } catch (err) {
        console.log(err);
        return err;
}
}

module.exports.getSuitableProducts = async function (local) {
    try{
        const sql = 'CALL verified_products(?);';
        let suitable_products = await pool.query(sql,[local]);
        return suitable_products
    }catch(err){
        console.log(err);
        return err;
    }
}