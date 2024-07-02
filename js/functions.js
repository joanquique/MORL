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

            const newSrc = menu.classList.contains('menu--open') ? 'img/x.svg' : 'img/menu.svg';
            animateIcon(menuIcon, newSrc);
        });

        document.getElementById('menu-close').addEventListener('click', () => {
            console.log("Clic en el icono de cerrar menu");
            const menu = document.querySelector('.menu');
            menu.classList.remove('menu--open');
            animateIcon(menuIcon, 'img/menu.svg');
        });

        // Carrito
        document.getElementById('cart-toggle').addEventListener('click', function() {
            console.log("Clic en el icono de carrito");
            const cart = document.querySelector('.cart');
            cart.classList.toggle('cart--open');
            animateIcon(cartIcon);
        });

        document.getElementById('cart-close').addEventListener('click', function() {
            console.log("Clic en el icono de cerrar carrito");
            const cart = document.querySelector('.cart');
            cart.classList.remove('cart--open');
            animateIcon(cartIcon);
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
                animateIcon(cartIcon);
            });
        });
    } else {
        console.error('No se encontraron elementos con los IDs especificados.');
    }
});

function animateIcon(iconElement, newSrc = null) {
    iconElement.style.transform = 'scale(0.8)'; // Reducir tamaño
    setTimeout(() => {
        if (newSrc) {
            iconElement.src = newSrc; // Cambiar ícono si se proporciona una nueva fuente
        }
        iconElement.style.transform = 'scale(1)'; // Restaurar tamaño
    }, 300); // Tiempo de espera igual a la duración de la transición en milisegundos
}

function addToCart(name, price, imgSrc) {
    const existingCartItem = document.querySelector(`.cart__item[data-name="${name}"]`);

    if (existingCartItem) {
        const itemCountElement = existingCartItem.querySelector('.cart__item-count');
        let currentCount = parseInt(itemCountElement.textContent);
        currentCount += 1;
        itemCountElement.textContent = currentCount;
    } else {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
        cartItem.setAttribute('data-name', name);

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
        itemCount.textContent = '1'; // Inicializa en 1
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
    }

    // Actualizar el contador total del carrito
    updateCartItemCount(1);

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

function updateCartItemQuantity(cartItem, change) {
    const itemCountElement = cartItem.querySelector('.cart__item-count');
    let currentCount = parseInt(itemCountElement.textContent);
    currentCount += change;

    if (currentCount < 1) {
        cartItem.remove(); // Elimina el elemento del carrito si la cantidad es cero o negativa
        updateCartItemCount(-1); // Disminuye el contador global
    } else {
        itemCountElement.textContent = currentCount;
        updateCartItemCount(change); // Actualiza el contador global según el cambio (+1 o -1)
    }
}

function updateCartItemCount(change) {
    const totalItemCountElement = document.getElementById('cart-item-count');
    let currentTotal = parseInt(totalItemCountElement.textContent) || 0; // Inicializa en 0 si no hay valor
    currentTotal += change;
    totalItemCountElement.textContent = currentTotal;
    totalItemCountElement.style.display = currentTotal > 0 ? 'inline-block' : 'none'; // Mostrar el contador solo si hay artículos en el carrito
}

