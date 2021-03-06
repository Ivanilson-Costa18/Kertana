var farmer = {}
var fields = []
var completeProductions = []
var plantationCounter = 0

window.onload = async function loadProfileData() {
    let farmerID = sessionStorage.getItem("user_id")
    farmer = await $.ajax({
        url: "/api/farmers/"+farmerID,
        method: "get",
        dataType: "json"
    });

    fields = await $.ajax({
        url: "/api/farmers/"+farmerID+"/fields",
        method: "get",
        dataType: "json"
    });
    
    let productions = await $.ajax({
        url:"/api/farmers/"+farmerID+"/fields/productions",
        method: "get",
        dataType: "json"
    })
    loadFarmerData(farmer[0], productions);

    loadFieldsData(fields);
    getFieldsCounter(fields.length)
    checkFields(completeProductions)

}


function loadFarmerData(farmer, productions){
    let elementFarmerData = document.getElementById("farmer-section-flex");
    let html ="";
    html += 
    '<section class="photo-section">'+
        '<img id="photo" src="'+farmer.Agricultor_Photo+'">'+ //'+farmer.Agricultor_Photo+'
    '</section>'+
    '<section class="name-section">'+
        '<p id="greetings">Olá</p>'+
        '<p id="name"><b>'+farmer.Agricultor_PrimeiroNome+' '+farmer.Agricultor_UltimoNome+'</b></p>'+
    '</section>'+
    '<section class="add-field-button-section">'+
        '<input type="button" class="add-field-button" value="+ Adicionar Terreno" onclick="addField()"></input>'+
    '</section>'+
    '<section id="field-info-section">'+
        '<p id="field-info-plantation">Nº Plantações: <b>'+productions.length+'</b></p>'+
        '<p id="field-info-harvest">Prontas a colher: <b>'+getAllReadyProductions(productions)+'</b></p>'+
        '<p id="field-info">Histórico Plantações:'+
        '<br>'+
        '<b>X</b> Produto1 · <b>X</b> Produto2 · <b>X</b> Produto3</p>'+
    '</section>';

    elementFarmerData.innerHTML = html;
}

function loadFieldsData(fields){
    let elementFieldsData = document.getElementById("field-items-section");
    let html ="";
    for (let field of fields) {
                html += 
                '<section class="field-item">' +
                    '<section id="title-section" onclick="sessionSaveFieldID('+ field.Terreno_ID +')">'+                        
                        '<h2 class="title" id="'+field.Terreno_ID+'" >'+field.Terreno_Nome+'</h2>'+                            
                    '</section>'+
                    '<section id="delete-field-button-section" onclick="deleteField('+field.Terreno_ID+')">'+
                        '<input type="button" class="delete-field-button" value="&times;"></input>'+
                    '</section>'+
                    '<section id="description-section">'+
                        '<p class="description">'+field.Terreno_Descricao+'</p>'+
                    '</section>'+
                    '<section id="feedback-section">'+
                        '<section id="feedback-image-section">'+
                            '<img class="feedback-image" src="/images/feedback-status-ready.PNG">'+
                        '</section>'+
                        '<section id="feedback-message-section">'+
                        '<p id="feedback-message">'+field.EstadoTerreno_Tipo+'</p>'+
                        '</section>'+
                    '</section>'+
                '</section>';                
            
        }
        
    elementFieldsData.innerHTML = html;
    }

function getFieldsCounter(count){
    let plantation = document.getElementById("field-count");
    plantation.innerHTML = '<b>Terrenos</b> '+count+ ' terrenos';
}

function getAllReadyProductions(productions){
    let count = 0
    for(let production of productions){
        if(production.Producao_EstadoCrescimento_ID == 3){
            completeProductions.push(production)
            count++
        }
    }
    return count
}


function sessionSaveFieldID(id){
    for(field of fields){
        if(field.Terreno_ID == id){
        let json = JSON.stringify(field);
        sessionStorage.setItem("field",json);
        window.location = 'slotPage.html'
      }
    }
}
  
  
const addField = () => {
    sessionStorage.setItem("farmerID", farmer[0].Agricultor_ID)
    window.location = 'createSlotPage.html'
}

const deleteField = async fieldID => {
    let farmerID = sessionStorage.getItem("user_id")
    let result = await $.ajax({
        url: '/api/farmers/'+farmerID+'/fields/'+fieldID,
        method: 'post',
        dataType: 'json'
    })
    document.location.reload()


}

function checkFields(completeProductions) {
    if(completeProductions.length > 0){
        for(let production of completeProductions){
            document.getElementById('notifications-content').innerHTML += '<a href="#"> A produção '+production.Producao_ID+' está pronta há '+production.TimeLeft*-1+' dias.</a>'                                                                                                                                  
        }
    }
}
