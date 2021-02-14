mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
var map
var chosenProduct
var searchedProducts = []
var resultLocations = []
///////////////////////////////////////// WINDOW //////////////////////////////////////////////////////

window.onload = async function loadListProducts() {
  let productID = JSON.parse(sessionStorage.getItem("productID"));
  searchedProducts.push(productID)
  let allProducts = await $.ajax({
    url: '/api/products', 
    method:'get',
    dataType: 'json'
  });
  
  let product = await $.ajax({
      url: "/api/products/"+productID,
      method: "get",
      dataType: "json"
  });

  let suitable_locations = await $.ajax({
      url: "/api/products/"+productID+"/locations",
      method: 'get',
      dataType: 'json'
  })
  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
      center: [-7.956215,39.506282], 
      zoom: 5.5
      });
  map.on('load', function () {   
    let count = 0
    for (local of suitable_locations[0]){
        let coordinate = JSON.parse(local.Freguesia_Coordenadas)
        map.addSource(String(local.Freguesia_ID), {
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
                'id': String(local.Freguesia_ID),
                'type': 'fill',
                'source': String(local.Freguesia_ID),
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.65
                }
              });
        count++
      } 
      document.getElementById("totalLocations").innerHTML = count
    });                   
  listProduct(product[0]);
  listLocations(suitable_locations[0])
  autocomplete(document.querySelector("#search-hortalica"), allProducts)
}


function listProduct(product) {
    let elemHortlist = document.getElementById("hortSearched");
    let html =
      '<tr class="result">'+
          '<td><div class="circle circle-products" style = "background-color: '+product.Produto_Cor+'"></div></td>'+
          '<td>'+product.Produto_Nome+'</td>'+
          '<td>'+product.Produto_TempoGerminacao+'</td>'+
          '<td>'+product.Produto_TempoMaturacao+'</td>'+
      '</tr>';
  
    elemHortlist.innerHTML += html;
}


function listLocations(locations) {
  let html = ""
  let elemHortlist = document.getElementById("locationResult");
  for(local of locations){
    let index = resultLocations.indexOf(local.Freguesia_Nome)
    /*Verificar se a localização já se encontra na tabela*/
    if(index<0){
      resultLocations.push(local.Freguesia_Nome)
        html += 
          '<tr class="result">'+
            '<td>'+local.Freguesia_Nome+'</td>'+
            '<td id="locationProducts-'+local.Freguesia_ID+'"><div class="circle" style = "background-color: '+local.Produto_Cor+'"></div></td>'+
          '</tr>'
      } else {
      document.getElementById('locationProducts-'+local.Freguesia_ID).innerHTML += '<div class="circle" style = "background-color: '+local.Produto_Cor+'"></div>'
        }
    }
  document.getElementById('totalLocations').innerHTML = resultLocations.length
  elemHortlist.innerHTML += html;
}


async function addProduct() {
  let index = searchedProducts.indexOf(chosenProduct.Produto_ID)
  /*Verificar se o produto já foi pesquisado*/
  if(index >= 0) {return alert('O produto inserido já foi pesquisado.')}

  /*Inserir o produto na lista dos já pesquisados*/
  searchedProducts.push(chosenProduct.Produto_ID)

  /*Receber localizações do produto inserido*/
  let locations = await $.ajax({
    url: "/api/products/"+chosenProduct.Produto_ID+"/locations",
    method: 'get',
    dataType: 'json'
  })

  listProduct(chosenProduct)
  listLocations(locations[0])

  /*Introduzir as localizações no mapa */
  for (local of locations[0]){
      let coordinate = JSON.parse(local.Freguesia_Coordenadas)
      /*Verificar se a Localização está no mapa */
      if(!map.getLayer(local.Freguesia_ID) && !map.getSource(local.Freguesia_ID)){
        map.addSource(String(local.Freguesia_ID), {
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
                'id': String(local.Freguesia_ID),
                'type': 'fill',
                'source': String(local.Freguesia_ID),
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.65
                }
              });
      } else {
        map.getLayer()
      }
    }
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
          if (arr[i].Produto_Nome.substr(0, val.length).toUpperCase() == val.toUpperCase()){
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].Produto_Nome.substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].Produto_Nome.substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].Produto_Nome + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            let product = arr[i]
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                chosenProduct = product
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


