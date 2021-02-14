const overlay = document.getElementById('overlay');
var chosenProductID
var hortalicas = [];
var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
     polygon: true,
     trash: true
  }
  });

function openModal() {
  document.getElementById('button-add-product').disabled = true
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');

  const getProducts = async () =>{
      products = await $.ajax({
      url: '/api/products', 
      method:'get',
      dataType: 'json'
    });
    for(product of products){
      hortalicas.push(product);
    }
}

  getProducts();  
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
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
        if (arr[i].Produto_Nome.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].Produto_Nome.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].Produto_Nome.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].Produto_Nome + "'>";
          let product = arr[i]
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              chosenProductID = product.Produto_ID;
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

autocomplete(document.querySelector("#search-container"), hortalicas);
 
 
function cancelAddProduct() {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
overlay.addEventListener('click', () => {
    cancelAddProduct();
  })
  
function updateArea(e) {
  var data = draw.getAll();
  if (data.features.length > 0 ) {

    let slot = turf.polygon([JSON.parse(field.Terreno_Coordenadas)])
    let production = turf.polygon(data.features[0].geometry.coordinates)
    let isInside = turf.booleanContains(slot, production)

    /* Se produção estiver dentro do terreno devolve as coordenadas*/
    if (isInside) {
      modal.classList.add('active');
      overlay.classList.add('active');
      document.getElementById('draw-button').disabled = true
      return data.features[0].geometry.coordinates
    } else {
      alert('A área de produção não se encontra dentro do terreno.')
      draw.deleteAll()
    }

  } else {
    alert('Defina a área da sua produção.')
  }
  return null
}

const createProduction = () => {
  modal.classList.remove('active')
  overlay.classList.remove('active');
  document.getElementById('button-add-product').disabled = true

  map.addControl(draw);
  
  map.on('draw.create',updateArea);
  map.on('draw.delete',updateArea);
  map.on('draw.update',updateArea);

  if(updateArea()){
    return updateArea()
  }
  document.getElementById('button-add-product').disabled = false
}

const addProduction = async () => {
  let json = sessionStorage.getItem("field");
  let field = JSON.parse(json);
  let coordinates = updateArea()[0]
  let result
  if(value){
    let productID = chosenProductID
    let date = document.getElementById('date').value
    let production = {
                    coordinates: JSON.stringify(coordinates),
                    product: productID,
                    date: date
                  }
      result = await $.ajax({
      url: 'api/fields/'+field.Terreno_ID+'/productions',
      method: 'post',
      dataType:'json',
      data: production
    })
    alert('Produção criada com sucesso!')
    modal.classList.remove('active')
    overlay.classList.remove('active');
    document.location.reload(true)
  }    
}


