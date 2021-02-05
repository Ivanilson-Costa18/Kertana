var farmerID = 0;
var fregID = 0;
var locations = []

window.onload = function(){
    farmerID = sessionStorage.getItem('farmerID')
    getLocations()
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
    center: [-7.956215,39.506282], 
    zoom: 5.5
});

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    }
});

map.addControl(draw);
map.on('draw.create',updateArea);
map.on('draw.delete',updateArea);
map.on('draw.update',updateArea);


function updateArea(e) {
    let data = draw.getAll();
    if (data.features.length > 0) {
        let polygon = data.features[0].geometry.coordinates
        let local = getPolygonLocation(polygon)
        console.log(local.Freguesia_ID);
        if(local){
            getSuitableProducts(local.Freguesia_ID);
            fregID = local.Freguesia_ID
            return polygon
        } 
    } else {
        document.getElementById('product-result').innerHTML=""
    }
}


const getLocations = async () => {
     locations = await $.ajax({
        url: 'api/locations',
        method: 'get',
        dataType: 'json'
    })
}


const getPolygonLocation = polygon => {
    let pol1 = turf.polygon(polygon)
    let result = null
    for(let local of locations){
        let pol2 = turf.polygon([JSON.parse(local.Freguesia_Coordenadas)])
        if(turf.booleanContains(pol2,pol1)){
            result = local
            break;
        } 
    }
    return result
}

const getSuitableProducts = async id => {
    let products = await $.ajax({
        url:'/api/locations/'+id+'/products',
        method:'get',
        dataType:'json'
    })
    showProducts(products[0])
}

const showProducts = products => {
    let elem = document.getElementById('product-result')
    elem.innerHTML=""
    let html =""
    for(product of products){
        html += 
        "<section id= \"hortalica-result\">"+
            "<section id=\"image-product-section\">"+
                "<img id=\"image-icon\" src="+product.Produto_Photo+">"+
            "</section>"+
            "<section id=\"title-section\">"+
                "<h3 id=\"title-result\">"+product.Produto_Nome+"</h3>"+
            "</section>"+
            "<section id=\"product-description-section\">"+
            '<p id="description-result"><b>Tipo Solo: </b>'+product.Produto_TipoSoloDescricao+'</p>'+
            '<p id="description-result"><b>Epoca Semear: </b>'+product.Produto_EpocaSemearDescricao+'</p>'+
            '<p id="description-result"><b>Epoca Colheita: </b>'+product.Produto_EpocaColheitaDescricao+'</p>'+
            '<p id="description-result"><b>Exposição: </b>'+product.Produto_ExposicaoDescricao+'</p>'+            "</section>"+
            "<section id=\"separation\">"+
                "<hr style= \"width: 90%; margin-bottom:20px;\">"+
            "</section>"+
        "</section>"
    }
    elem.innerHTML = html
}


const saveSlot = async () => {
    let name = document.getElementById('slotName').value
    let description = document.getElementById('slotDescription').value
    let agroID = await createPolygon(updateArea())
    console.log(agroID)
    let send = await $.ajax({
        url:'api/farmers/'+farmerID+'/fields',
        method: 'post',
        dataType: 'json',
        data: {
            "nome": name,
            "descricao": description,
            "coordenadas": JSON.stringify(updateArea()[0]),
            "agroId": agroID,
            "fregID": fregID
        }

    }).then(value => {
        alert('Successful')
        window.location = 'profilePage.html'
    })
}

//////////////////////////////////////////////////AGRO API HANDLER////////////////////////////////////////////////


async function createPolygon(coordinates) {
    try {
        obj = 
        {
            "name":"Search Polygon",
            "geo_json":{
               "type":"Feature",
               "properties":{
         
               },
               "geometry":{
                  "type":"Polygon",
                  "coordinates":coordinates
               }
            }
         }
            let result = await $.ajax({
            url: "http://api.agromonitoring.com/agro/1.0/polygons?appid=eaf41ee48e35adb39c24586fc8eb11c6",
            method: "post",
            dataType: "json",
            data:JSON.stringify(obj),
            contentType: "application/json"
        });
        return result.id;
    } catch(err) {
        console.log(err);
    }
}

