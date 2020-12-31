const pool = require('./connection.js');

module.exports.getFarmer = async function(farmerID) {
    try {
        const sql = 'SELECT * FROM Agricultor WHERE Agricultor_ID = ?;';
        let farmer = await pool.query(sql,[farmerID]);
        return farmer; 
    }  catch (err) {
        console.log(err);
        return err;
    }
}