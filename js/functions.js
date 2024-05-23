// Función para filtrar los productos
function filtrarProductos() {
    // Obtener el texto ingresado en el cuadro de búsqueda
    var textoBusqueda = document.querySelector('input[name="q"]').value.toLowerCase();

    // Obtener todos los elementos de artículo (productos)
    var productos = document.querySelectorAll('.item');

    // Recorrer todos los productos y mostrar u ocultar según coincidan con el texto de búsqueda
    productos.forEach(function(producto) {
        // Obtener el texto del título del producto
        var titulo = producto.querySelector('h3').textContent.toLowerCase();

        // Mostrar u ocultar el producto según coincida con el texto de búsqueda
        if (titulo.includes(textoBusqueda)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Funciones de carrito de compras
document.getElementById('cart-toggle').addEventListener('click', function() {
    console.log("Clic en el icono de carrito");
    document.querySelector('.cart').classList.toggle('cart--open');
});

document.getElementById('cart-close').addEventListener('click', function() {
    console.log("Clic en el icono de cerrar carrito");
    document.querySelector('.cart').classList.remove('cart--open');
});

// Escuchar el evento de envío del formulario de búsqueda
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Filtrar los productos al enviar el formulario
    filtrarProductos();
});

// Escuchar el evento de cambio en el cuadro de búsqueda
document.querySelector('input[name="q"]').addEventListener('input', function() {
    // Filtrar los productos al cambiar el texto en el cuadro de búsqueda
    filtrarProductos();
});

// Selecciona todos los botones "Agregar al carrito" y agrega un evento de clic a cada uno
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentNode;
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('span').textContent;
        const imgSrc = product.querySelector('img').getAttribute('src');
        addToCart(productName, productPrice, imgSrc);
    });
});

function addToCart(name, price, imgSrc) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart__item');

    // Imagen del producto
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = name;
    cartItem.appendChild(img);

    // Nombre y precio del producto
    const itemName = document.createElement('p');
    itemName.textContent = name;
    cartItem.appendChild(itemName);

    const itemPrice = document.createElement('p');
    itemPrice.textContent = price;
    cartItem.appendChild(itemPrice);

    // Botón para eliminar el producto del carrito
    const deleteIcon = document.createElement('i');
    deleteIcon.innerHTML = `<img src="img/quitar.png" class="cart__item-delete-icon" alt="Icono Quitar">`;
    deleteIcon.addEventListener('click', () => {
        cartItem.remove(); // Elimina el elemento del carrito
        //updateCartItemCount(-1); // Disminuye el contador de productos
    });
    cartItem.appendChild(deleteIcon);

    // Agrega el elemento del producto al carrito
    const cart = document.querySelector('.cart');
    cart.appendChild(cartItem);
}
