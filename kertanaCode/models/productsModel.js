pool = require('./connection');

module.exports.getAllProducts = async function() {
    try {
        const sql = 'SELECT * FROM kertana.Produto;';
        let products = await pool.query(sql);
        console.log(sql);
        return {status:200, data: products}; 
    }  catch (err) {
        console.log(err);
        return {status: 500, data: err};
    }
}


module.exports.getProduct = async function(productName) {
    try {
        const sql = 'SELECT * FROM kertana.Produto WHERE Produto_Nome = '+productName+';';
        const product = await pool.query(sql);
        console.log(sql);
        return {status:200, data: product}; 
    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
}
}