// Función generar items cards
function itemsCards(producto){
    return $('#contenedor__cards--item').append(`
                                                <div class="cards--item">
                                                    <img src="${producto.img}" class="img-fluid"></img>
                                                    <h5 class="card-title">${producto.nombre}</h5>
                                                    <p class="card-text">Precio: $${producto.precio}</p>
                                                    <button id="agregar${producto.id}" class="btn--compra">
                                                    Agregar al carrito
                                                        <div class="contenedor__mensaje--item"></div>
                                                    </button>
                                                </div>`);
};


// Función generar carrito de compras
function generarCarrito() {
    return $('#generar__carrito--compras').append(`
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" id="modal--resumen">
                    <div class="modal--header">
                        <h5 class="modal-title text-center" id="exampleModalLabel">Carrito de compras</h5>
                    </div>
                    <div class="modal-body">
                        <p class="text-center carrito--vacio">Aún no agregaste nada en el carrito de compras</p>
                        <!-- Apertura carrito de compras -->
                        <div id="contenedor__carrito" class="padding" style="display: none;">
                            <!-- Apertura tabla compras -->
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Subtotal Producto</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="contenedor__carrito--item">
                                    <!-- Items agregados al carrito por JS -->
                                </tbody>
                                    <!-- Subtotal compra -->
                                    <tr>
                                        <th colspan="4" scope="col" class="text-right">Subtotal:</th>
                                        <th scope="col">
                                            <p id="subtotal"></p>
                                        </th>
                                    </tr>
                                    <!-- IVA compra -->
                                    <tr>
                                        <th colspan="4" scope="col" class="text-right">IVA:</th>
                                        <th scope="col">
                                            <p id="IVA"></p>
                                        </th>
                                    </tr>
                                    <!-- Total compra -->
                                    <tr>
                                        <th colspan="4" scope="col" class="text-right">Total:</th>
                                        <th scope="col">
                                            <p class="total"></p>
                                        </th>
                                    </tr>
                            </table>
                            <!-- Cierre tabla compras -->
                        </div>
                        <!-- Cierre carrito de compras -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <!-- Btn vaciar carrito -->
                            <button type="button" id="vaciar--carrito" class="btn btn-danger">Vaciar</button>
                            <!-- Btn finalizar compra -->
                            <button type="button" class="btn btn-primary" id="btn__finalizar--compra">Finalizar compra
                                <div class="contenedor__finalizar--compra"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`);
};



// Mensaje al agregar productos al carrito
function msjProdAgregado(producto) {
    $('.contenedor__mensaje--item').html(`
                                            <div class="mensaje--body" style="display: none">
                                                <strong class="mr-auto">Producto agregado:</strong>
                                                <div class="toast-body">
                                                    <p>${producto.nombre} $${producto.precio}</p>
                                                </div>
                                            </div>`);

    $('.mensaje--body').fadeIn().fadeOut(500);

};



// Función generar items agregados en carrito
function itemsCarrito(producto){
    return $('#contenedor__carrito--item').append(`
                                                    <tr>
                                                        <th scope="row">${producto.id}</th>
                                                        <td>${producto.nombre}</td>
                                                        <td id="precio--prod">${producto.precio}</td>
                                                        <td class="seleccion--prod${producto.id}">${producto.seleccion}</td>
                                                        <td id="subtotal--prod${producto.id}">${producto.subtotal}</td>
                                                        <td><button id="borrar${producto.id}" class="borrar-producto bi bi-x-circle"></button></td>
                                                    </tr>`);
};



// Función mensaje al finalizar compra (despedida)
function msjTerminarCompra() {
        $('#modal--resumen').html(`
                                <div class="modal--header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">¡Gracias por su compra!</h5>
                                </div>
                                <div class="modal-body">
                                    <p class="text-center">En breve nos comunicaremos.</p>
                                    <p class="text-center">Orden n°: 000000012030</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>`);

    vaciarCarrito()
};



// Función vaciar carrito
function vaciarCarrito() {
    // Eliminar productos del carrito
    carrito = [];

    // Mensaje al vaciar el carrito
    $('#contenedor__carrito--item').html(`
                                        <tr>
                                            <td colspan="6" class="text-center carrito--vacio">
                                            Vaciaste tu carrito
                                            </td>
                                        </tr>`);

    // Eliminar del carrito
    calcularTotales()
};