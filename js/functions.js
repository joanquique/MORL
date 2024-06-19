document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const windowWidth = window.innerWidth;

    if (windowWidth <= 600) {
        // Código HTML para dispositivos móviles
        header.innerHTML = `
            <nav class="busqueda-boton">
                <ul>
                    <li>
                        <form action="#" method="GET">
                            <input type="text" name="q" placeholder="Buscar productos...">
                        </form>
                    </li>
                    <li>
                        <button class="login" id="loginButton">Iniciar sesión</button>
                    </li>
                </ul>
            </nav>
            <nav class="nav-mobile">
                <div class="menu-icon-container">
                    <i class="menu__icon" id="menu-toggle">
                        <img src="img/menu.svg" alt="Icono Menú" width="30" style="padding-left: 15px;">
                    </i>
                </div>
                <a href="index.html"><img class="logo-morl" id="logo" src="img/CLIMACLICK_AZUL.png"></a>
                <div class="cart__icon-container">
                    <i id="cart-toggle">
                        <img src="img/shopping-cart.svg" alt="Icono Carrito" width="30" style="padding-right: 20px;">
                    </i>
                </div>
            </nav>
            <nav class="panel-nav hidden">
                <ul>
                    <li class="boton-nav"><a href="productos.html">Productos</a></li>
                    <li class="boton-nav"><a href="#">Servicios</a></li>
                    <li class="boton-nav"><a href="nosotros.html">Nosotros</a></li>
                    <li class="boton-nav"><a href="#">Contacto</a></li>
                </ul>
            </nav>
        `;
    } 
    else {
        // Código HTML para dispositivos grandes
        header.innerHTML = `
            <nav class="busqueda-boton">
                <ul>
                    <li>
                        <form action="#" method="GET">
                            <input type="text" name="q" placeholder="Buscar productos...">
                        </form>
                    </li>
                    <li>
                        <button class="login" id="loginButton">Iniciar sesión</button>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul class="panel-nav">
                    <li class="boton-nav"><a href="productos.html">Productos</a></li>
                    <li class="boton-nav"><a href="#">Servicios</a></li>
                    <a href="index.html"><img class="logo-morl" id="logo" src="img/CLIMACLICK_AZUL.png"></a>
                    <li class="boton-nav"><a href="nosotros.html">Nosotros</a></li>
                    <li class="boton-nav"><a href="#">Contacto</a></li>
                </ul>  
                <div class="cart__icon-container">
                    <i class="header__icon" id="cart-toggle">
                        <img src="img/shopping-cart.svg" alt="Icono Carrito" width="30">
                    </i>
                </div>        
            </nav>
        `;
    }

    // Agrega el evento para mostrar/ocultar el menú en dispositivos móviles
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const panelNav = document.querySelector('.panel-nav');
            panelNav.classList.toggle('hidden');
        });
    }

    // Agrega el evento para mostrar/ocultar el carrito
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            const cart = document.querySelector('.cart');
            if (cart) {
                cart.classList.toggle('hidden');
            }
        });
    }
});

//Efecto de header
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var logo = document.getElementById('logo');
    var cartIcon = document.querySelector('.header__icon'); // Selecciona el ícono del carrito
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
        var titulo = producto.querySelector('h3').textContent.toLowerCase();

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
document.getElementById('cart-toggle').addEventListener('click', function() {
    console.log("Clic en el icono de carrito");
    document.querySelector('.cart').classList.toggle('cart--open');
});

document.getElementById('cart-close').addEventListener('click', function() {
    console.log("Clic en el icono de cerrar carrito");
    document.querySelector('.cart').classList.remove('cart--open');
});

// Menú a la izquierda
document.getElementById('menu-toggle').addEventListener('click', () => {
    console.log("Clic en el icono de menu");
    document.querySelector('.menu').classList.toggle('menu--open');
});

document.getElementById('menu-close').addEventListener('click', () => {
    console.log("Clic en el icono de cerrar menu");
    document.querySelector('.menu').classList.remove('menu--open');
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
