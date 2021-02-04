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

module.exports.getSuitableLocations = async function (productID) {
    try{
        const sql = 'CALL verified_location(?);';
        let suitable_locations = await pool.query(sql,[productID]);
        return suitable_locations;
    }catch (err) {
        console.log(err);
        return err;
    }
}