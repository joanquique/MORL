//Efecto de header
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var scrollPosition = window.scrollY;
    scrollPosition > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
});

// Función para filtrar los productos
function filtrarProductos() {
    // Obtener el texto ingresado en el cuadro de búsqueda
    var textoBusqueda = document.querySelector('input[name="q"]').value.toLowerCase();
    // Obtener todos los elementos de artículo (productos)
    var productos = document.querySelectorAll('.item');
    // Recorrer todos los productos y mostrar u ocultar según coincidan con el texto de búsqueda
    productos.forEach(function(producto) {
        // Obtener el texto del título del producto
        var titulo = producto.querySelector('h2').textContent.toLowerCase();
        // Mostrar u ocultar el producto según coincida con el texto de búsqueda
        if (titulo.includes(textoBusqueda)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Escuchar el evento de cambio en el cuadro de búsqueda
document.querySelector('input[name="q"]').addEventListener('input', function() {
    // Filtrar los productos al cambiar el texto en el cuadro de búsqueda
    filtrarProductos();
});

// Funciones de carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const cartIcon = document.getElementById('cart-icon');

    if (menuIcon && cartIcon) {
        // Menú
        document.getElementById('menu-toggle').addEventListener('click', () => {
            console.log("Clic en el icono de menu");
            const menu = document.querySelector('.menu');
            menu.classList.toggle('menu--open');

            // Cambiar ícono al abrir/cerrar menú con animación de escala desde el centro
            if (menu.classList.contains('menu--open')) {
                menuIcon.style.transform = 'scale(0.8)'; // Reducir tamaño
                setTimeout(() => {
                    menuIcon.src = 'img/x.svg'; // Cambiar ícono
                    menuIcon.style.transform = 'scale(1)'; // Restaurar tamaño
                }, 300); // Tiempo de espera igual a la duración de la transición en milisegundos
            } else {
                menuIcon.style.transform = 'scale(0.8)'; // Reducir tamaño
                setTimeout(() => {
                    menuIcon.src = 'img/menu.svg'; // Cambiar ícono
                    menuIcon.style.transform = 'scale(1)'; // Restaurar tamaño
                }, 300); // Tiempo de espera igual a la duración de la transición en milisegundos
            }
        });

        document.getElementById('menu-close').addEventListener('click', () => {
            console.log("Clic en el icono de cerrar menu");
            const menu = document.querySelector('.menu');
            menu.classList.remove('menu--open');

            // Restaurar ícono al cerrar menú con animación de escala desde el centro
            menuIcon.style.transform = 'scale(0.8)'; // Reducir tamaño
            setTimeout(() => {
                menuIcon.src = 'img/menu.svg'; // Cambiar ícono
                menuIcon.style.transform = 'scale(1)'; // Restaurar tamaño
            }, 300); // Tiempo de espera igual a la duración de la transición en milisegundos
        });

        // Carrito
        document.getElementById('cart-toggle').addEventListener('click', function() {
            console.log("Clic en el icono de carrito");
            const cart = document.querySelector('.cart');
            cart.classList.toggle('cart--open');

            // Aplicar animación de escala al ícono del carrito
            cartIcon.style.transform = cart.classList.contains('cart--open') ? 'scale(0.8)' : 'scale(1)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)'; // Restaurar tamaño
            }, 300); // Tiempo de espera igual a la duración de la transición en milisegundos
        });

        document.getElementById('cart-close').addEventListener('click', function() {
            console.log("Clic en el icono de cerrar carrito");
            const cart = document.querySelector('.cart');
            cart.classList.remove('cart--open');

            // Aplicar animación de escala al ícono del carrito
            cartIcon.style.transform = 'scale(0.8)'; // Reducir tamaño
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)'; // Restaurar tamaño
            }, 300); // Tiempo de espera igual a la duración de la transición en milisegundos
        });

        // Añadir al carrito
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const product = button.parentNode;
                const productName = product.querySelector('h2').textContent;
                const productPrice = product.querySelector('span').textContent;
                const imgSrc = product.querySelector('img').getAttribute('src');
                addToCart(productName, productPrice, imgSrc);
                // Aplicar animación de escala al ícono del carrito
                cartIcon.style.transform = 'scale(0.8)'; // Reducir tamaño
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)'; // Restaurar tamaño
                }, 300);
            });
        });
    } else {
        console.error('No se encontraron elementos con los IDs especificados.');
    }
});

// Selecciona todos los botones "Agregar al carrito" y agrega un evento de clic a cada uno
// const addToCartButtons = document.querySelectorAll('.add-to-cart');
// addToCartButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const product = button.parentNode;
//         const productName = product.querySelector('h2').textContent;
//         const productPrice = product.querySelector('span').textContent;
//         const imgSrc = product.querySelector('img').getAttribute('src');
//         addToCart(productName, productPrice, imgSrc);
//     });
// });

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

    // Botones de incrementar y eliminar
    const quantityControls = document.createElement('div');
    quantityControls.classList.add('cart__quantity-controls');

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.classList.add('cart__quantity-decrement');
    decrementButton.addEventListener('click', () => {
        updateCartItemQuantity(cartItem, -1);
    });
    quantityControls.appendChild(decrementButton);

    const itemCount = document.createElement('span');
    itemCount.textContent = '1';
    itemCount.classList.add('cart__item-count');
    quantityControls.appendChild(itemCount);

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.classList.add('cart__quantity-increment');
    incrementButton.addEventListener('click', () => {
        updateCartItemQuantity(cartItem, 1);
    });
    quantityControls.appendChild(incrementButton);
    cartItem.appendChild(quantityControls);
    
    // Agrega el elemento del producto al carrito
    const cart = document.querySelector('.cart');
    cart.appendChild(cartItem);
    updateCartItemCount(1); // Aumenta el contador de productos

    // Mostrar notificación
    showNotification();
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');

    // Forzar el reflujo para reiniciar la animación
    void notification.offsetWidth;

    notification.classList.add('visible');

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 500); // Espera a que la transición termine antes de agregar la clase 'hidden'
    }, 2000);
}


function updateCartItemCount(change) {
    const itemCountElements = document.querySelectorAll('.cart__item-count');
    itemCountElements.forEach(element => {
        let currentCount = parseInt(element.textContent);
        currentCount += change;
        element.textContent = currentCount;
        element.style.display = currentCount > 0 ? 'inline-block' : 'none'; // Mostrar el contador sólo si hay artículos en el carrito
    });
}

function updateCartItemQuantity(cartItem, change) {
    const itemCountElement = cartItem.querySelector('.cart__item-count');
    let currentCount = parseInt(itemCountElement.textContent);
    currentCount += change;
    if (currentCount < 1) {
        cartItem.remove(); // Elimina el elemento del carrito si la cantidad es cero o negativa
        updateCartItemCount(-1); // Disminuye el contador de productos
    } else {
        itemCountElement.textContent = currentCount;
    }
}

