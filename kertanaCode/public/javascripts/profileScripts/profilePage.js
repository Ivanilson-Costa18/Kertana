const farmerID = 1;
var farmer = {}
var fields = []
var plantationCounter = 0

window.onload = async function loadProfileData() {
    farmer = await $.ajax({
        url: "/api/farmers/"+farmerID,
        method: "get",
        dataType: "json"
    });

    fields = await $.ajax({
        url: "/api/fields/"+farmerID,
        method: "get",
        dataType: "json"
    });

    let growthStates =  await $.ajax({
        url: "/api/productions/"+fields[0].Terreno_ID+"/growthStates",
        method: 'get',
        dataType: 'json'
    });
    console.log(growthStates)
    console.log(fields)
    loadFarmerData(farmer[0]);
    loadFieldsData(fields, growthStates);
}


function loadFarmerData(farmer){
    let elementFarmerData = document.getElementById("farmer-section-flex");
    let html ="";
    html += 
    '<section class="photo-section">'+
        '<img id="photo" src="https://thispersondoesnotexist.com/image">'+ //'+farmer.Agricultor_Photo+'
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

function loadFieldsData(fields, growthStates){
    let elementFieldsData = document.getElementById("field-items-section");
    let html ="";
    let count = 0
    for (let field of fields) {
        let timeLeft = 0;
        let state = ''; 
        let finalTimeLeft = Number.MAX_SAFE_INTEGER;
        for (let growthState of growthStates){
            console.log(growthState.Producao_Terreno_ID)
            if (field.Terreno_ID == growthState.Producao_Terreno_ID){
                timeLeft = growthState.TimeLeft;
                        if (finalTimeLeft > timeLeft){
                        state = growthState.EstadoCrescimento_Estado;
                        finalTimeLeft = timeLeft; 
                        }      
                }
            }

                html += 
                '<section class="field-item" onclick="sessionSaveFieldID('+ field.Terreno_ID +')">' +
                    '<section id="title-section">'+                        
                        '<h2 class="title" id="'+field.Terreno_ID+'" >'+field.Terreno_Nome+'</h2>'+                            
                    '</section>'+
                    '<section id="delete-field-button-section">'+
                        '<input type="button" class="delete-field-button" value="&times;" onclick="deleteField()"></input>'+
                    '</section>'+
                    '<section id="description-section">'+
                        '<p class="description">'+field.Terreno_Descricao+'</p>'+
                    '</section>'+
                    '<section id="feedback-section">'+
                        '<section id="feedback-image-section">'+
                            '<img class="feedback-image" src="/images/feedback-status-ready.PNG">'+
                        '</section>'+
                        '<section id="feedback-message-section">';
                            if(finalTimeLeft <= 0){
                                html += '<p id="feedback-message">'+state+'</p>';
                            } else if(finalTimeLeft == Number.MAX_SAFE_INTEGER) {
                                html += '<p id="feedback-message">Vazio</p>';  
                            } else{
                                html += '<p id="feedback-message">'+finalTimeLeft+'</p>';
                            }
                                html +=
                        '</section>'+
                    '</section>'+
                '</section>';
                
            
        count++
        }
        getPlantationCounter(count)

    elementFieldsData.innerHTML = html;
    }

function getPlantationCounter(count){
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