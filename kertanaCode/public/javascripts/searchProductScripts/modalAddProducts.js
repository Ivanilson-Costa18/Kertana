const overlay = document.getElementById('overlay');

var hortalicas = [];

function openModal() {
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
  
  inp.addEventListener("click", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { 
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
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].Produto_Nome.substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].Produto_Nome.substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i].Produto_Nome + "'>";
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

autocomplete(document.querySelector("#search-container"), hortalicas);
 
  function addProductList() {
    product  = document.getElementById('search-container')
    if(product.value == ""){
      alert('Insira uma hortaliça');
    } else {
      list(product.value, hortalicas);
      product.innerHTML= "";
      modal.classList.remove('active');
      overlay.classList.remove('active');
  }
}
  
  function cancelAddProduct() {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  overlay.addEventListener('click', () => {
    cancelAddProduct();
  })
  

  function list(nome, products) {
    let html ="";
    for (product of products) {
      if(nome == product.Produto_Nome){
                 html =  ' <section class="imagem-hortalica">' +
                        '<section class="imagem-frame">' +
                       '     <img id="product-icon" src="'+product.Produto_Photo+'">'+
                       ' </section>'+
                  '  </section>'+
                   ' <section class="imagem-description">'+
                       ' <p id="title-result">'+product.Produto_Nome+'</p>'+
                       '<button id="delete-product" onclick="deleteResult()">&times;</button>'+
                       ' <p id="description-result">'+product.Produto_Descricao+'</p>'+
                   ' </section>';
    }
  }
    let newDiv = document.createElement("section")
    newDiv.classList.add('hortalica-result')
    newDiv.id.add(count)
    newDiv.innerHTML = html
    document.getElementById('product-result').appendChild(newDiv);
}
  