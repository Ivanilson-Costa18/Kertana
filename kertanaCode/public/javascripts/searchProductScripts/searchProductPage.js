mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';

var count=0
var hortalicas = [];  
var getProductVar = [];
var allLocations = []
var results = 0


///////////////////////////////////////// WINDOW //////////////////////////////////////////////////////

var suitable_locations = {}
window.onload = async function loadListProducts() {

    const getProducts = async () =>{
        productsItems = await $.ajax({
        url: '/api/products', 
        method:'get',
        dataType: 'json'
    });
    let objProductItem
    for(productItem of productsItems){
      objProductItem = productItem;
    hortalicas.push(objProductItem);
      }
    for(let productItem of productsItems){
      getProductVar.push(productItem.Produto_Nome);
    }
    }

    getProducts();
    autocomplete(document.querySelector("#search-hortalica"), getProductVar)

    let productID = sessionStorage.getItem("productID");

    let product = await $.ajax({
        url: "/api/products/"+productID,
        method: "get",
        dataType: "json"
    });
    suitable_locations = await $.ajax({
        url: "/api/products/"+productID+"/locations",
        method: 'get',
        dataType: 'json'
    }).then( value => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
        center: [-7.956215,39.506282], 
        zoom: 5.5
        });
    map.on('load', function () {   
      let count = 0
      for (local of value[0]){
        allLocations.push(local.Freguesia_Nome)
          let coordinate = JSON.parse(local.Freguesia_Coordenadas)
          map.addSource(String(count), {
                  'type': 'geojson',
                  'data': {
                          'type': 'FeatureCollection',
                          'features': [
                                          {
                                          'type': 'Feature',
                                          'geometry': {
                                          'type': 'Polygon',
                                          'coordinates': [coordinate]                               
                                                          }}
                                  ]}}); 
          map.addLayer({
                  'id': String(count),
                  'type': 'fill',
                  'source': String(count),
                  'layout': {},
                  'paint': {
                      'fill-color': '#088',
                      'fill-opacity': 0.65
                  }
                  });
          count++}
          results+=count
          listLocations()
          allLocations=[]
          resultCounter(results)
        });                   
        listProducts(product);
})}


function listProducts(products) {
    let elemHortlist = document.getElementById("hortSearched");
    let html =
    '<tr>'+
        '<th>Cor</th>'+
        '<th>Nome</th>'+
        '<th>Germinação(dias)</th>'+
        '<th>Maturação(dias)</th>'+
    '</tr>';
    for (let product of products) {
        html += 
    '<tr class="result">'+
        '<td><div class="circle" style = "background-color: '+product.Produto_Cor+'"></div></td>'+
        '<td>'+product.Produto_Nome+'</td>'+
        '<td>'+product.Produto_TempoGerminacao+'</td>'+
        '<td>'+product.Produto_TempoMaturacao+'</td>'+
    '</tr>';
    }

    elemHortlist.innerHTML = html;
}




function listLocations() {
  let html = ""
    let elemHortlist = document.getElementById("locationResult");
    html =
    '<tr>'+
        '<th>Nome</th>'+
        '<th>Produtos</th>'+
    '</tr>'
  for(nomeLocal of allLocations){
      html += 
    '<tr class="result">'+
        '<td>'+nomeLocal+'</td>'+
        '<td>produto</td>'+
    '</tr>';
    }

    elemHortlist.innerHTML = html;
}


arr=[]
async function addProduct() {
    productID = JSON.parse(sessionStorage.getItem('productID'));  
    if (Array.isArray(productID)){
        arr=[]
        for(let ID of productID){
        arr.push(ID)
        }
    } else {
        arr.push(productID)
    }
    let productItemID = 0;
    let productName = document.getElementById("search-hortalica").value;
    for(let productItem of hortalicas){
      if(productItem.Produto_Nome == productName) productItemID = productItem.Produto_ID;
    }
    arr.push(productItemID)
    sessionStorage.setItem('productID', JSON.stringify(arr));


    let elemHortlist = document.getElementById("hortSearched");
    let html =
    '<tr>'+
        '<th>Cor</th>'+
        '<th>Nome</th>'+
        '<th>Germinação(dias)</th>'+
        '<th>Maturação(dias)</th>'+
    '</tr>';
    for(productItem of productsItems){
        for(item of arr){
            if(productItem.Produto_ID==item){
                html += 
                '<tr class="result">'+
                  '<td><div class="circle" style = "background-color: '+productItem.Produto_Cor+'"></div></td>'+
                  '<td>'+productItem.Produto_Nome+'</td>'+
                  '<td>'+productItem.Produto_TempoGerminacao+'</td>'+
                  '<td>'+productItem.Produto_TempoMaturacao+'</td>'+
                '</tr>';
            }   
        }
    }
    elemHortlist.innerHTML = html;
    suitable_locations = []

    let productSessionIDs = sessionStorage.getItem("productID");
    productSessionParsedIDs = JSON.parse(productSessionIDs)

    mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
        center: [-7.956215,39.506282], 
        zoom: 5.5
        });
        map.on('load', async function () {   
        let count = 0
        for(productSessionID of productSessionParsedIDs){
            suitable_locations2 = await $.ajax({
                url: "/api/products/"+productSessionID+'/locations',
                method: 'get',
                dataType: 'json'
            }).then( value => {
            for (locations of value[0]){
              allLocations.push(locations.Freguesia_Nome)
            let coordinate = JSON.parse(locations.Freguesia_Coordenadas)
            map.addSource(String(count), {
                    'type': 'geojson',
                    'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                            {
                                            'type': 'Feature',
                                            'geometry': {
                                            'type': 'Polygon',
                                            'coordinates': [coordinate]                               
                                                            }}
                                    ]}}); 
            map.addLayer({
                    'id': String(count),
                    'type': 'fill',
                    'source': String(count),
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.65
                    }
                    });
            count++}
            results=0
            results += count
            listLocations()
            console.log(results);
            resultCounter(results)


          }

            )
          }
          allLocations=[]

        });

}


function resultCounter(count){
  let elemHortlist = document.getElementById("totalLocations");
  elemHortlist.innerHTML = count;

}


function deleteResult(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
}

function autocomplete (inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "search-container-list");
        a.setAttribute("class", "search-container-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for(i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()){
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "search-container-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("search-container-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("search-container-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("search-container-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }


