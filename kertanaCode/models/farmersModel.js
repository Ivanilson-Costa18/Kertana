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

module.exports.register = async function(farmerObj){
    try {
        const sql = 'SELECT * FROM Agricultor WHERE * = ?'
        let farmer = await pool.query(sql,[farmerObj])
        if ( farmer > 0){
            return {farmer: farmer}
        } else {
            return {msg: 'Email already in use.'}
        }
    } catch (err) {
        console.log(err)
    }
}