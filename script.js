const products = [
    {
        id: 1,
        name: "COSRX Advanced Snail 96 Mucin",
        category: "Уходовая",
        price: 1800,
        description: "Увлажняющая эссенция с муцином улитки для восстановления кожи",
        img: "https://hollyshop.ru/upload/iblock/07d/0xafeasbrzwe2pft5tsvfl0aa4smeol1/mutsin-_1_.png"
    },
    {
        id: 2,
        name: "Beauty of Joseon Sunscreen",
        category: "Уходовая",
        price: 1500,
        description: "Легкий солнцезащитный крем с рисом и прополисом SPF50+",
        img: "https://hollyshop.ru/upload/iblock/b96/tjlap6g7azydlgy6iicv38bn55ti2jf5/Beauty-of-Joseon-Relief-Sun-Rice-_-Probiotics-SPF50_-PA_.jpg"
    },
    {
        id: 3,
        name: "Rom&nd Juicy Lasting Tint",
        category: "Декоративная",
        price: 900,
        description: "Стойкий тинт для губ с эффектом влажного блеска",
        img: "https://hollyshop.ru/upload/iblock/880/swful6deohwue176h7fxa3axb845y60m/rom_nd-Juicy-Lasting-Tint_2.jpg"
    },
    {
        id: 4,
        name: "Laneige Lip Sleeping Mask",
        category: "Уходовая",
        price: 2100,
        description: "Ночная маска для губ с ягодами и витамином C",
        img: "https://www.topcream.ru/images/product_images/popup_images/12627_2.jpg"
    },
    {
        id: 5,
        name: "Etude House Play Color Eyes",
        category: "Декоративная",
        price: 2500,
        description: "Палетка теней с 10 оттенками в розово-персиковой гамме",
        img: "https://external-preview.redd.it/news-new-etude-house-play-color-eyes-peach-farm-palette-v0-7iZ4BMhw59AexLS9UGBkyB9OR1ldmM0bp7AQ8_NiyZ8.jpg?auto=webp&s=7f3d2b2da642217b12043f025e4c708237c62ddd"
    },
    {
        id: 6,
        name: "Innisfree Green Tea Seed Serum",
        category: "Уходовая",
        price: 1900,
        description: "Увлажняющая сыворотка с экстрактом зеленого чая",
        img: "https://hollyshop.ru/upload/iblock/492/2354tnuoy8yvde48tcvliy2hky3832yy/ChatGPT-Image-10-iyun.-2026-g._-15_47_44-1-_1_.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem('kbeauty_cart')) || [];

const catalogEl = document.getElementById('catalog');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const checkoutModal = document.getElementById('checkout-modal');
const orderForm = document.getElementById('order-form');

function renderCatalog() {
    const productsHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="description">${product.description}</p>
            <p class="price">${product.price} ₽</p>
            <button class="add-btn" onclick="addToCart(${product.id})">В корзину</button>
        </article>
    `).join('');
    catalogEl.innerHTML = '<h2>Каталог товаров</h2>' + productsHTML;
}

function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('kbeauty_cart', JSON.stringify(cart));
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartTotalEl.textContent = total;
    cartCountEl.textContent = totalCount;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p style="text-align: center; margin-top: 20px;">Корзина пуста 🎮</p>';
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <strong>${item.name}</strong>
                <p>${item.price} ₽</p>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">X</button>
                </div>
            </div>
        `).join('');
    }
}

document.getElementById('cart-btn').addEventListener('click', () => cartSidebar.classList.remove('hidden'));
document.getElementById('close-cart').addEventListener('click', () => cartSidebar.classList.add('hidden'));

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста! Добавьте товары.');
        return;
    }
    cartSidebar.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => checkoutModal.classList.add('hidden'));
window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) checkoutModal.classList.add('hidden');
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заказ создан! Спасибо за покупку! ');
    
    cart = [];
    localStorage.removeItem('kbeauty_cart');
    updateCart();
    orderForm.reset();
    checkoutModal.classList.add('hidden');
});

renderCatalog();
updateCart();