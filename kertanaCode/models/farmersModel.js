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

module.exports.logFarmer = async function(farmer) {
    try {
        const sql = 'SELECT * FROM Agricultor WHERE Agricultor_Email = ? AND Agricultor_Password = ?'
        let result = await pool.query(sql, [farmer.email, farmer.password])
        return {id: result[0].Agricultor_ID}
    } catch(err) {
        console.log(err)
        return err
    }
                
}

module.exports.createFarmer = async function(farmerObj){
    try {
        const sql = 'SELECT * FROM Agricultor WHERE Agricultor_Email = ?'
        let farmer = await pool.query(sql,[farmerObj.emailAddress])
        if ( farmer.length > 0){
            return {msg: 'Email already in use.', status: false}
        } 
        const sql2 = 'INSERT INTO Agricultor (Agricultor_PrimeiroNome, Agricultor_UltimoNome, Agricultor_Email, Agricultor_Password, Agricultor_Photo) Values (?,?,?,?,\'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fgeneric-avatar-icon-12.jpg&f=1&nofb=1\')' 
        let newFarmer = await pool.query(sql2,[farmerObj.firstName, farmerObj.lastName, farmerObj.emailAddress, farmerObj.pass])
        if(newFarmer.insertId){
            return {msg: 'Resgistro efetuado com sucesso.', status: true}
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