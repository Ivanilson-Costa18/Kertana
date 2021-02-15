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
        const sql = 'SELECT *,  EstadoTerreno_Tipo FROM Terreno, EstadoTerreno WHERE Terreno_Agricultor_ID = ? AND Terreno_EstadoTerreno_ID = EstadoTerreno_ID AND Terreno_Associacao = "associado";';
        let fields = await pool.query(sql, [farmerID]);
        return fields; 
    }  catch (err) {
        console.log(err);
        return err;
    }
}

module.exports.getAllProductions = async function(farmerID){
    try {
        const sql = 'SELECT Producao_ID, Producao_Produto_ID, Producao_Terreno_ID, Producao_EstadoCrescimento_ID, Producao_EstadoColheita_ID, Producao_EstadoPoligonoProducao_ID, Producao_Coordenadas, Producao_dataPlantacao, EstadoCrescimento_Estado, Produto_TempoGerminacao + Produto_TempoMaturacao - DATEDIFF(CURRENT_DATE, Producao_dataPlantacao) AS TimeLeft FROM Agricultor, Terreno, Producao, Produto, EstadoCrescimento WHERE Agricultor_ID = ? AND Terreno_Agricultor_ID = Agricultor_ID AND Producao_Terreno_ID = Terreno_ID AND Producao_Produto_ID = Produto_ID AND Producao_EstadoCrescimento_ID = EstadoCrescimento_ID AND Producao_EstadoPoligonoProducao_ID = 2 AND Terreno_Associacao = "associado";'
        let productions = await pool.query(sql, [farmerID])
        return productions
    } catch (err) {
        console.log(err)
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
        const sql = 'UPDATE Terreno SET Terreno_Associacao = "não associado" WHERE Terreno_ID = ? AND Terreno_Agricultor_ID = ?'
        let result = await pool.query(sql, [fieldID, farmerID])
        return {msg: 'Update database successful'}
    } catch(err){
        console.log(err)
        return err
    }
}