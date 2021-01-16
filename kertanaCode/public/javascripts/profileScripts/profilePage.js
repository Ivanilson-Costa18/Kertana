const farmerID = 1;
var farmer = {}
var fields = []
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
    let elementFarmerData = document.getElementById("photo-section-flex");
    let html ="";
    html += 
    '<section class="photo-section">'+
        '<img id="profile-photo" src="'+farmer.Agricultor_Photo+'">'+
    '</section>'+
    '<section class="name-section">'+
        '<h2 id="name">'+farmer.Agricultor_PrimeiroNome+' '+farmer.Agricultor_UltimoNome+'</h2>'+
    '</section>';

    elementFarmerData.innerHTML = html;
}

function loadFieldsData(fields, growthStates){
    let elementFieldsData = document.getElementById("fields-section-flex");
    let html ="";
    
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
                '<section class="field-item" onclick="sessionSaveFieldID('+ field.Terreno_ID +')">' +                        '<section class="item-description-flex">'+
                        '<section class="title-cancel-section">'+
                            '<section class="title-section">'+
                            '<h2 class="title" id="'+field.Terreno_ID+'" >'+field.Terreno_Nome+'</h2>'+                            '</section>'+
                            '<section class="cancel-section">'+
                            '<button class="delete-field-button" onclick="deleteField()">&times;</button>'+
                            '</section>'+
                        '</section>'+
                        '<section class="description-section">'+
                            '<p class="description">'+field.Terreno_Descricao+'</p>'+
                        '</section>'+
                        '<section class="feedback">'+
                            '<section class="image-feedback-section">'+
                            '<img class="feedback-image" src="/images/colheita-feedback-icon.PNG">'+
                            '</section>'+
                            '<secion class="message-feedback-section">';
                            if(finalTimeLeft <= 0){
                                html += '<p class="feedback-message">'+state+'</p>';
                                } else if(finalTimeLeft == Number.MAX_SAFE_INTEGER) {
                                    html += '<p class="feedback-message">Vazio</p>';  
                                } else{
                                    html += '<p class="feedback-message">'+finalTimeLeft+'</p>';
                                }
                            html += '</section>'+
                            '</secion>'+
                        '</section>'+
                        '</section>'+
                    '</section>';
            
        
        }
    elementFieldsData.innerHTML = html;
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