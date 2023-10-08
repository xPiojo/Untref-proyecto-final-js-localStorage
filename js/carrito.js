document.addEventListener("DOMContentLoaded", function () {
  // Cargar informacion del carrito desde el local storage
  let productosEnCarrito = localStorage.getItem("carrito");
  productosEnCarrito = JSON.parse(productosEnCarrito);
  // console.log(productosEnCarrito);
  productosEnCarrito.forEach((producto) => {
    // console.log(producto);
    crearCajaProducto(producto);
  });

  // Remover productos del carrito
  let removeCartButtons = document.getElementsByClassName("carrito-eliminar");
  // console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removerProducto);
  }
  actualizarTotal();
  let botonComprar = document.querySelector("#btn-compra");
  botonComprar.addEventListener("click", comprar);
});

function crearCajaProducto(producto) {
  const contenidoCarrito = document.querySelector(".carrito-contenido");
  const carritoCaja = document.createElement("div");
  carritoCaja.className = "carrito-caja";

  const img = document.createElement("img");
  img.src = `${producto.imagen}`;
  img.className = "carrito-img";
  img.alt = `${producto.img}`;

  carritoCaja.appendChild(img);

  const carritoDetalle = document.createElement("div");
  carritoDetalle.className = "carrito-detalle";
  const carritoTitulo = document.createElement("p");
  carritoTitulo.className = "carrito-producto-titulo";
  carritoTitulo.innerHTML = `<span class="nombre-producto">${producto.nombre}</span><br><span class="descripcion-producto">${producto.descripcion}</span>`;

  const carritoPrecio = document.createElement("div");
  carritoPrecio.className = "carrito-precio";
  carritoPrecio.innerHTML = `<span>Precio: </span><span class="precio">$${producto.precio}</span>`;

  carritoDetalle.appendChild(carritoTitulo);
  carritoDetalle.appendChild(carritoPrecio);

  const btnRemover = document.createElement("i");
  btnRemover.className = "bi bi-trash-fill carrito-eliminar";

  carritoCaja.appendChild(carritoDetalle);
  carritoCaja.appendChild(btnRemover);

  contenidoCarrito.appendChild(carritoCaja);
}

function removerProducto(event) {
  let buttonClicked = event.target;
  let productNode = buttonClicked.parentElement;
  
  // Obtener el nombre o identificador del producto que deseamos eliminar
  let productName = productNode.querySelector('.carrito-producto-titulo span:first-child').textContent;

  // Remover el producto del DOM
  productNode.remove();

  // Llamar a la función para actualizar el total
  actualizarTotal();

  // Obtener el carrito actual del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Filtrar el carrito para excluir el producto que se quiere eliminar
  carrito = carrito.filter(producto => producto.nombre !== productName);

  // Actualizar el carrito en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

}


function actualizarTotal() {
  let cartContent = document.querySelector(".carrito-contenido");
  let cartBoxes = cartContent.getElementsByClassName("carrito-caja");
  let total = 0;

  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("precio")[0];
    // console.log(priceElement);

    let price = parseFloat(priceElement.innerText.replace("$", "").replace(".", ""));
    // console.log(price);
    total += price;
  }

  total = Math.round(total * 100) / 100;
  document.getElementById("total-precio").innerText = `$${total}`;
}


function comprar() {
  Swal.fire({
    title: 'Compra realizada con éxito',
    text: '¡Gracias por tu compra!',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });

  // Limpiar el carrito
  let cartItems = document.querySelector(".carrito-contenido");
  cartItems.innerHTML = '';

  // Limpiar el localStorage
  localStorage.removeItem("carrito");

  // Actualizar el total a cero
  actualizarTotal();
}
