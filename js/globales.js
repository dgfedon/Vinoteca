// Items cards
function itemsCards(producto){
    return $('#contenedor__cards--item').append(`<div class="cards--item">
                                                    <img src="${producto.img}" class="img-fluid"></img>
                                                    <h5 class="card-title">${producto.nombre}</h5>
                                                    <p class="card-text">Precio: $${producto.precio}</p>
                                                    <button id="boton${producto.id}" class="btn--compra">Agregar al carrito</button>
                                                </div>`);
}

// Items productos agregados en carrito
function itemsCarrito(producto){
    return $('#contenedor__carrito--item').append(`<tr class="carritoItems">
                                                        <th scope="row">${producto.id}</th>
                                                        <td>${producto.nombre}</td>
                                                        <td id="precio--prod">${producto.precio}</td>
                                                        <td class="seleccion--prod${producto.id}">${producto.seleccion}</td>
                                                        <td id="subtotal--prod${producto.id}">${producto.subtotal}</td>
                                                        <td><button id="borrar${producto.id}" class="borrar-producto bi bi-x-circle"></button></td>
                                                    </tr>`);
};

// Items agregados al mensaje  terminar compra
function itemsTerminarCompra(producto) {
    return $('#compra--realizada').append(`<tr>
                                        <td>${producto.nombre}</td>
                                        <td class="seleccion--prod${producto.id}">${producto.seleccion}</td>
                                    </tr>`);
};
