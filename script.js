const products = [
    { id: 1, name: "COSRX Snail Mucin", category: "Уходовая", price: 1800 },
    { id: 2, name: "Beauty of Joseon Sunscreen", category: "Уходовая", price: 1500 },
    { id: 3, name: "Rom&nd Lip Tint", category: "Декоративная", price: 900 },
    { id: 4, name: "Laneige Lip Mask", category: "Уходовая", price: 2100 },
    { id: 5, name: "Etude Eye Palette", category: "Декоративная", price: 2500 },
    { id: 6, name: "Innisfree Green Tea Serum", category: "Уходовая", price: 1900 }
];

let cart = [];

console.log("Товары загружены:", products);

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    console.log("Товар добавлен:", product.name);
    console.log("Корзина:", cart);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        addToCart(productId);
    });
});

function updateCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    
    cartItemsEl.innerHTML = '';
    let total = 0;
    let totalCount = 0;
    
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>${item.price} ₽</p>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `;
        cartItemsEl.appendChild(itemEl);
        total += item.price * item.quantity;
        totalCount += item.quantity;
    });
    
    cartTotalEl.textContent = total;
    cartCountEl.textContent = totalCount;
}

document.getElementById('cart-btn').addEventListener('click', function() {
    document.getElementById('cart-sidebar').classList.remove('hidden');
    updateCart();
});

document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-sidebar').classList.add('hidden');
});

function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}