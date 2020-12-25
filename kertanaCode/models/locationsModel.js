const pool = require('./connection.js')

module.exports.getAllLocations = async function () {
    try{
        const sql = 'select Freguesia_Nome from freguesia;'
        let locations = await pool.query(sql);
        return locations;
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports.getSuitableLocations = async function (productName) {
    try{
        const sql = 'CALL verified_location(?);';
        let suitable_locations = await pool.query(sql,[productName]);
        return suitable_locations;
    }catch (err) {
        console.log(err);
        return err;
    }
}