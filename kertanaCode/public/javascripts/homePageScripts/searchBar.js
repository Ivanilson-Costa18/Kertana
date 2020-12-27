function saveProduct() {
  let productID = 0;
  let productName = document.getElementById("search-hortalica").value;
  for(let product of hortalicas){
    if(product.Produto_Nome == productName) productID = product.Produto_ID;
  }
  sessionStorage.setItem("productID",productID); //productID
  window.location = "searchProductPage.html";
}

function saveLocation(){
  let localizacao = document.getElementById("search-localizacao").value;
  for(let local of localizacoes){
    if(local.nome == localizacao){
      let json = JSON.stringify(local)
      sessionStorage.setItem("location",json);
      window.location = 'searchLocationPage.html'
}}}

var localizacoes = [];
var hortalicas = [];
var getLocationVar = [];
var getProductVar = [];


window.onload = () => { 
const getProducts = async () =>{
    products = await $.ajax({
    url: '/api/products', 
    method:'get',
    dataType: 'json'
});
  let objProduct
  for(product of products){
    objProduct = product;
  hortalicas.push(objProduct);
}
  for(let product of products){
    getProductVar.push(product.Produto_Nome);
  }
}

const getLocations = async () =>{
locations = await $.ajax({
  url: '/api/locations', 
  method:'get',
  dataType: 'json'
});
let objLocation={};
  for(local of locations){
    objLocation = {
      'id':local.Freguesia_ID,
      'nome':local.Freguesia_Nome,
      'coordenadas': local.Freguesia_Coordenadas
  }
  localizacoes.push(objLocation);
}
for(let local of locations){
  getLocationVar.push(local.Freguesia_Nome);
}
}

  getProducts();
  getLocations();  

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
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
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




/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.querySelector("#search-localizacao"), getLocationVar);
autocomplete(document.querySelector("#search-hortalica"), getProductVar);

