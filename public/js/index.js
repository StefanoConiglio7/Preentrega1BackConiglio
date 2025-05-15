const socket = io();

const formNewProduct = document.getElementById("formNewProduct");

formNewProduct.addEventListener("submit", (event)=> {
  event.preventDefault();

  const formData = new FormData(formNewProduct);
  const productData = { status: false }; 

  formData.forEach((value, key) => {
    if (key === "status") {
      productData[key] = formNewProduct.elements[key].checked; 
    } else {
      productData[key] = value;
    }
  });



  socket.emit("newProduct", productData);
})

socket.on("productAdded", (newProduct) => {
  const productsList = document.getElementById("productsList");
  const listItem = document.createElement("li");

  listItem.setAttribute("data-id", newProduct._id); 
  listItem.innerHTML = `
    ${newProduct.title} : ${newProduct.price} 
    <button onclick="deleteProduct('${newProduct._id}')">Eliminar</button>
    <button onclick="viewProductDetail('${newProduct._id}')">Ver detalles</button>
  `;

  productsList.appendChild(listItem);
});

function viewProductDetail(productId) {
  window.location.href = `/product/${productId}`; 
}


function deleteProduct(productId) {
  socket.emit("deleteProduct", productId);
}


socket.on("productDeleted", (productId) => {
  const listItem = document.querySelector(`li[data-id="${productId}"]`);
  if (listItem) {
    listItem.remove(); 
  }
});





