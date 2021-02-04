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
        const sql = 'INSERT INTO Terreno (Terreno_Agricultor_ID, Terreno_Nome, Terreno_Descricao, Terreno_Coordenadas, Terreno_AgroAPI_ID, Terreno_FreguesiaID) VALUES (?, ?, ?, ?, ?, ?)';
        let result = await pool.query(sql, [farmerID, fieldObj.nome, fieldObj.descricao, fieldObj.coordenadas, fieldObj.agroId, fieldObj.fregID])
        return result
    }catch(err){
        console.log(err)
    }
}

module.exports.removeField = async function(farmerID, fieldID){
    try {
        const sql = 'DELETE FROM Terreno WHERE Terreno_ID = ? and Terreno_Agricultor_ID = ?'
        let result = await pool.query(sql, [fieldID, farmerID])
        if(result.changedRows > 0)
            return {msg: 'Update database successful'}
        else return{msg: 'Update database failed'}
    } catch(err){
        console.log(err)
        return err
    }
}