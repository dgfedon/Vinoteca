// Reemplazar contenido h1 con Jquery
$('h1').html(`Vinoteca`);
// Efecto .slideUp .slideDown
$('h1').css({opacity:'0.8', height:'400px'}).slideUp(1000).slideDown(1500);
console.log($('h1').text());



// Class constructor productos
class Producto {
    constructor (id, nombre, precio, img, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio.toFixed(2);
        this.img = img;
        this.stock = stock;
        this.seleccion = 1;
        this.subtotal = this.precio;
    }
};



// Array productos
let productos = [];
// Array url .json
let urlProd = 'data/productos.json';
// Array carrito de compras
let carrito = [];



// Archivo productos.json
$.get(urlProd, function(datos){
    console.log(datos);

    // Agregar productos en el Array
    datos.forEach((prod) => {
        productos.push(new Producto(prod.id, prod.nombre, prod.precio, prod.img, prod.stock))
    });

    // Mostrar productos en el HTML
    mostrarProd(productos);
});



// Insertar cards de productos en el HTML
function mostrarProd() {
    productos.forEach((producto) =>{

        // Items cards en el HTML
        itemsCards(producto);
        
        // Agregar productos en el carrito
        $(`#boton${producto.id}`).click(() => {

            // Carrito vacio
            $('#carrito--vacio').hide()

            // Mostrar mensaje al agregar producto
            msjProdAgregado(producto)

            // Mostrar productos agregados al carrito
            mostrarCompra(producto.id)
        });

        // Carga cards listas con Jquery .ready
        $('#contenedor__cards--item').ready(function(){
            console.log('Items Cards => Cargadas');
        });
    });
};



// Función mostrar en el carrito
function mostrarCompra(productoId){
    
    let encontrado = carrito.find((prod) => prod.id == productoId);
    if (encontrado == undefined){
        let busqueda = productos.find((prod) => prod.id == productoId);
            carrito.push(busqueda);

            // Items agregados al carrito
            itemsCarrito(busqueda);

            // Aparecer carrito .show
            $("#contenedor__carrito").show(1000);

            // Btn borrar items del carrito
            $(`#borrar${busqueda.id}`).on('click', function eliminar(){
                $(this).closest('tr').remove()
                carrito = carrito.filter((prodEliminado) => prodEliminado.id != busqueda.id);
                localStorage.setItem('productosLS', JSON.stringify(carrito));
                
                // Actualizar montos al eliminar producto
                carritoMontoTotal();
            });

            // Btn finalizar compra (mensaje de despedida)
            $('#btn__finalizar--compra').on('click', msjTerminarCompra)

            // Mostrar subtotal, iva, total en carrito
            carritoMontoTotal();

    } else {
        encontrado.seleccion = encontrado.seleccion + 1;
        encontrado.subtotal = (encontrado.seleccion * encontrado.precio).toFixed(2);

        $(`.seleccion--prod${encontrado.id}`).html(`${encontrado.seleccion}`);
        $(`#subtotal--prod${encontrado.id}`).html(`${encontrado.subtotal}`);

        // Actualizar subtotal, iva, total en carrito si estan repetidos
        carritoMontoTotal();
    }

    // Almacenamiento en el localStorage 
    localStorage.setItem('productosLS', JSON.stringify(carrito));

};



// Función montos totales en carrito
function carritoMontoTotal(){
    let total = 0; subtotal = 0; iva = 0;

        contador = carrito.reduce((acc, producto) => acc + producto.seleccion, 0);
        subtotal = carrito.reduce((acc, producto) => (acc + (producto.precio * producto.seleccion)), 0);
        iva = iva + (subtotal * 0.21);
        total = total + subtotal + iva;

        // Contador de productos en carrito
        $('.cantidad--productos').html(`${contador}`);

        // Subtotal compra
        $('#subtotal').html(`${subtotal.toFixed(2)}`);

        // IVA compra
        $('#IVA').html(`${iva.toFixed(2)}`);

        // Total compra
        $('.total').html(`${total.toFixed(2)}`);
};