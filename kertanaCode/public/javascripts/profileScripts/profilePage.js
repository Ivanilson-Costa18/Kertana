var farmer = {}
var fields = []
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
    console.log(fields);
    loadFarmerData(farmer[0]);
    loadFieldsData(fields);
    getFieldsCounter(fields.length)

}


function loadFarmerData(farmer){
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
        '<p id="field-info-plantation">Plantações <b>X</b></p>'+
        '<p id="field-info-harvest">Colheitas <b>X</b></p>'+
        '<p id="field-info">Histórico Plantações:'+
        '<br>'+
        '<b>X</b> Produto1 · <b>X</b> Produto2 · <b>X</b> Produto3</p>'+
    '</section>';

    elementFarmerData.innerHTML = html;
}

//Aprimorar a lógica da função
function loadFieldsData(fields){
    let elementFieldsData = document.getElementById("field-items-section");
    let html ="";
    for (let field of fields) {
                html += 
                '<section class="field-item" onclick="sessionSaveFieldID('+ field.Terreno_ID +')">' +
                    '<section id="title-section">'+                        
                        '<h2 class="title" id="'+field.Terreno_ID+'" >'+field.Terreno_Nome+'</h2>'+                            
                    '</section>'+
                    '<section id="delete-field-button-section">'+
                        '<input type="button" class="delete-field-button" value="&times;" onclick="deleteField('+field.Terreno_ID+')"></input>'+
                    '</section>'+
                    '<section id="description-section">'+
                        '<p class="description">'+field.Terreno_Descricao+'</p>'+
                    '</section>'+
                    '<section id="feedback-section">'+
                        '<section id="feedback-image-section">'+
                            '<img class="feedback-image" src="/images/feedback-status-ready.PNG">'+
                        '</section>'+
                        '<section id="feedback-message-section">'+
                            '<p id="feedback-message">Ocupado</p>'+
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
    
    let result = await $.ajax({
        url: farmerID+'/fields/'+fieldID,
        method: 'post',
        dataType: 'json'
    })
    console.log(result)
}