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

module.exports.insertField = async function(farmerID, fieldObj) {
    try{
        const sql = 'INSERT INTO Terreno (Terreno_Agricultor_ID, Terreno_Nome, Terreno_Descricao, Terreno_Coordenadas) VALUES (?, ?, ?, ?)';
        let result = await pool.query(sql, [farmerID, fieldObj.nome, fieldObj.descricao, fieldObj.coordenadas])
        return result
    }catch(err){
        console.log(err)
    }
}