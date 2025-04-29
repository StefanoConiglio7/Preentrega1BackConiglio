const socket = io();

const formNewProduct = document.getElementById("formNewProduct");

formNewProduct.addEventListener("submit", (event)=> {
  event.preventDefault();

  const formData = new FormData(formNewProduct);
  const productData = {};

  formData.forEach((value, key)=> {
    productData[key] = value;
  });

  socket.emit("newProduct", productData);
})

socket.on("productAdded", (newProduct)=> {
  console.log("Producto recibido del servidor:", newProduct);
  const productsList = document.getElementById("productsList");
  const listItem = document.createElement("li");
  
  listItem.innerHTML = `${newProduct.title} : ${newProduct.price} 
  <button class="delete-button" id="${newProduct.id}">Eliminar</button>`;
  
  productsList.appendChild(listItem);

  const button = listItem.querySelector(".delete-button");
  button.addEventListener("click", () => {
    socket.emit("deleteProduct", newProduct.id); 
  });
});

socket.on("productDeleted", (deletedProductId) => {
  const productElement = document.getElementById(deletedProductId);
  if (productElement) {
    productElement.parentElement.remove(); 
  }
});

