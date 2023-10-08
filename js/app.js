const listaProductos = document.getElementById("contenedor-productos");
const url = "https://xpiojo.github.io/Untref-Proyecto-Final-Js/productos.json"
// /productos.json

fetch(url)
.then((response) => {
  return response.json();
})
  .catch((error) => console.error("Error al obtener archivo JSON:", error))
  .then((datosProductos) => {
    datosProductos.forEach((datosProducto) => {
      // Creo contenedor producto
      const contenedorProducto = document.createElement("DIV");
      contenedorProducto.className = "producto";

      // Creo contenedor imagen
      const cajaImagen = document.createElement("DIV");
      cajaImagen.className = "producto-img";
      const img = document.createElement("img");
      img.src = datosProducto.imagen;
      img.alt = `Imagen del ${datosProducto.nombre}`;
      img.className = "img-producto";
      cajaImagen.appendChild(img);

      // Creo contenedor texto
      const cajaTexto = document.createElement("DIV");
      cajaTexto.className = "caja-texto";

      const nombreProducto = document.createElement("H2");
      nombreProducto.textContent = datosProducto.nombre;
      nombreProducto.className = "producto-nombre";
      cajaTexto.appendChild(nombreProducto);

      const descripcionProducto = document.createElement("H2");
      descripcionProducto.textContent = datosProducto.descripcion;
      descripcionProducto.className = "producto-descripcion";
      cajaTexto.appendChild(descripcionProducto);

      const precioProducto = document.createElement("H3");
      precioProducto.textContent = `$${datosProducto.precio}`;
      precioProducto.className = "producto-precio";
      cajaTexto.appendChild(precioProducto);

      const botonVerMas = document.createElement("A");
      botonVerMas.id = `${JSON.stringify(datosProducto)}`
      botonVerMas.textContent = "Ver mas";
      botonVerMas.className = "boton-ver_mas";
      botonVerMas.href = "#";
      // botonVerMas.href = `producto.html?id=${datosProducto.id}`;
      botonVerMas.addEventListener("click", guardarProductoLocalStorage);
      cajaTexto.appendChild(botonVerMas);

      // Agrego los contenedores de la imagen y el tengo al contenedor del producto
      contenedorProducto.appendChild(cajaImagen);
      contenedorProducto.appendChild(cajaTexto);
      listaProductos.appendChild(contenedorProducto);
    });
  })
  .catch((error) => console.error("Error al obtener los datos:", error));



function guardarProductoLocalStorage(e) {
  e.preventDefault();
  arrayMiListaDeProductos = [];
  console.log(this.id);
  //Aquí estoy guardando en el array de forma completa el objeto 
   arrayMiListaDeProductos.push(this.id);
   //Hago esto para poder converir el objeto seleccionado en un array
   miObjeto = JSON.parse(arrayMiListaDeProductos[0])
   codigo = miObjeto.id;
   //Aquí guardo en el localStorage el objeto que usuario seleccionó
   localStorage.setItem('detallesProducto', JSON.stringify(arrayMiListaDeProductos))
   //Aquí construyo mi Query strings - Lo cual es la ruta a donde debo enviar al usuario y además junto a ello le envío el código que fué seleccionado
   location.href = `producto.html?id=${codigo}`
  
}


