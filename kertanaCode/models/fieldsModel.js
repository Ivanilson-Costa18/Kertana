const pool = require('./connection.js');

module.exports.getAllProductions = async function(fieldID) {
    try{
        const sql = 'SELECT * FROM Produto WHERE Produto_ID IN (SELECT Producao_Produto_ID FROM Producao WHERE Producao_Terreno_ID = ? AND Producao_EstadoPoligonoProducao_ID = 2);'
        let products = await pool.query(sql, [fieldID]);
        const sql2 = 'SELECT Producao_ID, Producao_Produto_ID, Producao_Terreno_ID, Producao_EstadoCrescimento_ID, Producao_EstadoColheita_ID, Producao_EstadoPoligonoProducao_ID, Producao_Coordenadas, Producao_dataPlantacao, EstadoCrescimento_Estado, Produto_TempoGerminacao + Produto_TempoMaturacao - DATEDIFF(CURRENT_DATE, Producao_dataPlantacao) AS TimeLeft FROM Producao, Produto, EstadoCrescimento WHERE Producao_Terreno_ID = ? AND Producao_Produto_ID = Produto_ID AND Producao_EstadoCrescimento_ID = EstadoCrescimento_ID AND Producao_EstadoPoligonoProducao_ID = 2 ORDER BY Producao_ID;'
        let production = await pool.query(sql2, [fieldID]);
        let productions = {
            products: products,
            productions: production,
        }
        return productions
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports.insertProduction = async function(fieldID, production){
    try{
        const sql = 'INSERT INTO Producao(Producao_Produto_ID, Producao_Terreno_ID, Producao_EstadoCrescimento_ID, Producao_EstadoPoligonoProducao_ID, Producao_Coordenadas, Producao_dataPlantacao) VALUES(?,?,1,2,?,?)'
        const sql2 = 'UPDATE Terreno SET Terreno_EstadoTerreno_ID = 2 WHERE Terreno_ID = ?'
        let update = await pool.query(sql2, [fieldID])
        let result = await pool.query(sql,[production.product, fieldID, production.coordinates, production.date])
        if(result.affectedRows > 0) return {msg: 'Insert into database successful'}
        else return{msg: 'Insert into database failed'}
    } catch(err){
        console.log(err)
        return err
    }
}

module.exports.removeProduction = async function(productionID, fieldID){
    try {
        const sql = 'DELETE FROM Producao WHERE Producao_Terreno_ID = ? AND Producao_ID = ? '
        let result = await pool.query(sql, [fieldID, productionID])
        return result
    } catch (err) {
        console.log(err);
        return err
    }
}
