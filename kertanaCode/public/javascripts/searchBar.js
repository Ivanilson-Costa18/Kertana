function saveProduct() {
    let productName = document.getElementById("search-hortalica").value;
    let json = JSON.stringify(productName);
    sessionStorage.setItem("productName",json);
    console.log(json);
    window.location = "map.html";
}