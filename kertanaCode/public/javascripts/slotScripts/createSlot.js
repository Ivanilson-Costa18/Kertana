var farmerID = 0;
window.onload = function(){
    farmerID = sessionStorage.getItem('farmerID')
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
    center: [0,0], 
    zoom: 8
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

var data;
var polygon = [
    [-1.1681408857372446, 35.4484092768448],
    [-9.97393239574319, 27.332218632602476],
    [5.788983075815224, 18.423175614138017],
    [17.385985172747837, 25.82185871900832],
    [10.968226730755788, 37.21090991265636],
    [-1.1681408857372446, 35.44840]
]


const polygonIsChild = (pol1, pol2) => {
}

function updateArea(e) {
    data = draw.getAll();
    return data.features[0].geometry.coordinates
}

const saveSlot = async () => {
    let name = document.getElementById('slotName').value
    let err = document.getElementById('errMsg')
    let agroID = await createPolygon(updateArea())

    let send = await $.ajax({
        url:'api/fields/'+farmerID+'/Terreno',
        method: 'post',
        dataType: 'json',
        data: {
            "nome": name,
            "descricao": "Test",
            "coordenadas": JSON.stringify(updateArea()[0]),
            "agroId": agroID
        }
    })
    alert('Successful')
    window.location = 'profilePage.html'
}

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