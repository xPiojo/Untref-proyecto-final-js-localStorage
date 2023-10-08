document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el ID del producto de los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // Carga la información del producto desde el local storage y la muertra en la pagina.
  cargarProductoLocalStorage();
  // Carga la información del producto y la muestra en la página
  // cargarProducto(productId);

  // Configura el evento para el botón de compra
  const btnComprar = document.getElementById("boton-compra");
  btnComprar.addEventListener("click", () => comprarProducto(productId));
});

// Funcion para cargar los datos desde el localStorage. No entiendo por que hacerlo asi, si la puedo cagar desde el json¿?
function cargarProductoLocalStorage() {
  //Tomo los datos del localStorage
  let detalleProducto = JSON.parse(localStorage.getItem("detallesProducto"));
  //Convierto el objeto literal a un array
  let arrayDetalle = JSON.parse(detalleProducto[0]);
  console.log(arrayDetalle);
  cargarInfoProducto(arrayDetalle);

}

// Función para cargar la información del producto desde el archivo JSON
function cargarProducto(productId) {
  fetch("https://xpiojo.github.io/Untref-proyecto-final-js-localStorage/productos.json")
    .then((response) => response.json())
    .then((data) => {
      const productoSeleccionado = data.find(
        (producto) => producto.id === productId
      );
      // Llamo a la funcion para mostrar la información del producto en la página
      cargarInfoProducto(productoSeleccionado);
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}


// Función para mostrar la información del producto en la página
function cargarInfoProducto(producto) {
  const nombreProducto = document.getElementById("nombre-producto");
  nombreProducto.textContent = producto.nombre;

  const descripcionProducto = document.getElementById("descripcion-producto");
  descripcionProducto.textContent = producto.descripcion;

  const detalleProducto = document.getElementById("detalle-producto");
  detalleProducto.innerText = producto.detalle;

  const listaCaracteristicas = document.getElementById("caracteristicas-lista");
  producto.caracteristicas.forEach((caracteristica) => {
    const li = document.createElement("li");
    li.textContent = caracteristica;
    listaCaracteristicas.appendChild(li);
  });

  const precioProducto = document.getElementById("precio-producto");
  precioProducto.innerText = `$${producto.precio}`;

  agregarImagenesCarrusel(producto.imagenesCarrusel);
}

// Función para comprar un producto
function comprarProducto(productId) {
  fetch("https://xpiojo.github.io/Untref-proyecto-final-js-localStorage/productos.json")
    .then((response) => response.json())
    .then((data) => {
      const productoSeleccionado = data.find(
        (producto) => producto.id === productId
      );

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      productoInfo = {
        id: productoSeleccionado.id,
        precio: productoSeleccionado.precio,
        nombre: productoSeleccionado.nombre,
        descripcion: productoSeleccionado.descripcion,
        imagen: productoSeleccionado.imagen,
      };
      carrito.push(productoInfo);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      Swal.fire({
        title: "¿Quieres seguir comprando?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          window.location.href = "index.html";
        } else {
          window.location.href = "carrito.html";
        }
      });
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}

// Función para agregar las imágenes al carrusel
function agregarImagenesCarrusel(imagenes) {
  const carruselInner = document.getElementById("carousel-inner");
  carruselInner.innerHTML = ""; // Limpiar contenido existente

  imagenes.forEach((imagen, index) => {
    const carruselItem = document.createElement("div");
    carruselItem.className =
      index === 0 ? "carousel-item active" : "carousel-item";

    const img = document.createElement("img");
    img.src = imagen;
    img.className = "d-block mx-auto";
    carruselItem.appendChild(img);

    carruselInner.appendChild(carruselItem);
  });
}
