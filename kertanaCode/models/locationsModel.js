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