const pool = require('./connection.js')

module.exports.getAllLocations = async function () {
    try{
        const sql = 'select * from Freguesia;'
        let locations = await pool.query(sql);
        return locations;
    }catch(err){
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