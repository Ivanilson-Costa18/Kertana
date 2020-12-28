const overlay = document.getElementById('overlay');

function openModal() {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');

  var hortalicas = [];
  var getProductVar = [];
  
  
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
      let elemLista = document.getElementById("list");
      let html ="";
      for (let product of products) {
          html += 
          "<section id='search-result' onclick='selectProduct("+product.Produto_ID+")'>"+
          "<h3>"+product.Produto_Nome+"</h3>"+
          "</section>";
      }
      elemLista.innerHTML = html;
    }
    
 
  
  
    
    
      getProducts();  
}

 
  function addProductList() {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  function cancelAddProduct() {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  overlay.addEventListener('click', () => {
    cancelAddProduct();
  })
  

  