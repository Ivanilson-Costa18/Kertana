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
    loadFarmerData(farmer[0]);
    loadFieldsData(fields);
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

function loadFieldsData(fields){
    let elementFieldsData = document.getElementById("fields-section-flex");
    let html ="";
    for (let field of fields) {
    html += 
        '<section class="field-item" onclick="sessionSaveFieldID('+ field.Terreno_ID +')">' +
            '<section class="item-description-flex">'+
            '<section class="title-cancel-section">'+
                '<section class="title-section">'+
                '<h2 class="title" id="'+field.Terreno_ID+'" >'+field.Terreno_Nome+'</h2>'+
                '</section>'+
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
                '<secion class="message-feedback-section">'+
                '<p class="feedback-message">Pronto a colher!</p>'+
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
        console.log(field)
        sessionStorage.setItem("field",json);
        window.location = 'slotPage.html'
      }
    }
}
  
  
const addField = () => {
    sessionStorage.setItem("farmerID", farmer[0].Agricultor_ID)
    window.location = 'createSlotPage.html'
}