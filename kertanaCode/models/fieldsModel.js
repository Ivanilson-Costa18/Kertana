const pool = require('./connection.js');

module.exports.getAllFields = async function(farmerID) {
    try {
        const sql = 'SELECT * FROM Terreno WHERE Terreno_Agricultor_ID = ?;';
        let fields = await pool.query(sql, [farmerID]);
        return fields; 
    }  catch (err) {
        console.log(err);
        return err;
    }
}