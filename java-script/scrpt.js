var productName = document.getElementById("pName")
var productPrice = document.getElementById("pPrice")
var productCategory = document.getElementById("pCategory")
var productDesc = document.getElementById("pDesc")
var searchInput = document.getElementById("searchInput")
var addBtn = document.getElementById("addBtn")
var clearData = document.getElementById("clearData")
var currentIndex;
var productsArray = JSON.parse(localStorage.getItem("myProducts")) || []
displayProducts(productsArray)
addBtn.onclick = function(){
   if(addBtn.innerHTML=="Add Product"){
        addProduct()
   }else{
        updateProduct(currentIndex)
        addBtn.innerHTML= "Add Product"    
   }
}
function addProduct(){
var product ={
        id: productsArray.length>0? productsArray[productsArray.length - 1].id + 1 : 1 ,
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    }    
    productsArray.push(product)
    localStorage.setItem("myProducts", JSON.stringify(productsArray))
    displayProducts(productsArray)
    clearForm()
}
function displayProducts(myArr){
    var productContainer='';
    for(var i =0; i< myArr.length; i++){//0, 1
        productContainer +=  `
    <tr>
      <th scope="row"> ${myArr[i].id} </th>
      <td>${myArr[i].name}</td>
      <td>${myArr[i].price} </td>
      <td>${myArr[i].category}</td>
      <td> ${myArr[i].desc} </td>
      <td> <button class="btn btn-warning"  onclick="getProductsInfo(${i})">Update</button></td>
      <td> <button class="btn btn-danger"  onclick="deleteProduct(${i})">Delete</button></td>

    </tr>
    `
    }
    document.getElementById("tBody").innerHTML= productContainer
}
function deleteProduct(index){
  productsArray.splice(index,1)
 localStorage.setItem("myProducts", JSON.stringify(productsArray))
    displayProducts(productsArray)  
}
function clearForm(){
    productName.value=''
    productPrice.value=''
    productCategory.value=''
    productDesc.value =''
}
searchInput.onkeyup = function(){
    console.log(this.value)
        var searchArr =[]
    for(var i =0; i< productsArray.length; i++){
        if(productsArray[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
         searchArr.push(productsArray[i])
        }
    }
   displayProducts(searchArr)
}
function getProductsInfo(index){
    currentIndex = index
    productName.value = productsArray[index].name
    productPrice.value = productsArray[index].price
    productCategory.value = productsArray[index].category
    productDesc.value = productsArray[index].desc
    addBtn.innerHTML ="Update Product"
}
function updateProduct(currentIndex){
    productsArray[currentIndex].name = productName.value
    productsArray[currentIndex].price = productPrice.value
    productsArray[currentIndex].category = productCategory.value
    productsArray[currentIndex].desc = productDesc.value
    localStorage.setItem("myProducts", JSON.stringify(productsArray))
    displayProducts(productsArray)
    clearForm()
}
clearData.onclick =function(){ 
    localStorage.removeItem("myProducts")
    productsArray=[]
    displayProducts(productsArray)
}

