// Product data - hardcoded as requested
const products = [
    
    {
        id: 1,
        name: "DJI Mini Drone",
        price: 499.99,
        originalPrice: null,
        discount: null,
        image: "images/djidrone.png",
        isPromo: false
    },
    {
        id: 2,
        name: "Wireless Headset",
        price: 79.99,
        originalPrice: 109.99,
        discount: "27%",
        image: "images/headset.png",
        isPromo: true
    },
    {
        id: 3,
        name: "ALFA WiFi Adapter",
        price: 39.99,
        originalPrice: null,
        discount: null,
        image: "images/alfawifi.jpg",
        isPromo: false
    },
    {
        id: 4,
        name: "M5 Stick C Plus",
        price: 29.99,
        originalPrice: 39.99,
        discount: "25%",
        image: "images/m5stick.jpeg",
        isPromo: true
    },
    {
        id: 5,
        name: "Flipper Zero",
        price: 199.99,
        originalPrice: null,
        discount: null,
        image: "images/flipper.png",
        isPromo: false
    },
    {
        id: 6,
        name: "GoPro Hero Camera",
        price: 299.99,
        originalPrice: 399.99,
        discount: "25%",
        image: "images/gopro.jpg",
        isPromo: true
    },
    {
        id: 7,
        name: "Portable Power Bank",
        price: 49.99,
        originalPrice: null,
        discount: null,
        image: "🔋",
        isPromo: false
    },
    {
        id: 8,
        name: "USB-C Dongle",
        price: 25.99,
        originalPrice: null,
        discount: null,
        image: "🔌",
        isPromo: false
    },
    {
        id: 9,
        name: "RGB Gaming Keyboard",
        price: 89.99,
        originalPrice: null,
        discount: null,
        image: "⌨️",
        isPromo: false
    },
    {
        id: 10,
        name: "Wireless Gaming Mouse",
        price: 59.99,
        originalPrice: null,
        discount: null,
        image: "🖱️",
        isPromo: false
    },
    {
        id: 11,
        name: "USB Rubber Ducky",
        price: 44.99,
        originalPrice: null,
        discount: null,
        image: "🪛",
        isPromo: false
    },
    {
        id: 12,
        name: "WiFi Pineapple",
        price: 129.99,
        originalPrice: null,
        discount: null,
        image: "🍍",
        isPromo: false
    },
    {
        id: 13,
        name: "Raspberry Pi 4 Model B",
        price: 59.99,
        originalPrice: null,
        discount: null,
        image: "🍓",
        isPromo: false
    },
    {
        id: 14,
        name: "ESP32 Development Board",
        price: 19.99,
        originalPrice: null,
        discount: null,
        image: "🔧",
        isPromo: false
    },
    {
        id: 15,
        name: "Arduino Uno R3",
        price: 27.99,
        originalPrice: 34.99,
        discount: "20%",
        image: "🔌",
        isPromo: true
    },
    {
        id: 16,
        name: "USB Logic Analyzer",
        price: 14.99,
        originalPrice: null,
        discount: null,
        image: "📊",
        isPromo: false
    },
    {
        id: 17,
        name: "HackRF One SDR",
        price: 299.99,
        originalPrice: null,
        discount: null,
        image: "📻",
        isPromo: false
    },
    {
        id: 18,
        name: "Mechanical Keypad",
        price: 39.99,
        originalPrice: 49.99,
        discount: "20%",
        image: "🎮",
        isPromo: true
    },
    {
        id: 19,
        name: "Webcam Cover Slide",
        price: 6.99,
        originalPrice: null,
        discount: null,
        image: "📷",
        isPromo: false
    },
    {
        id: 20,
        name: "USB Kill Stick",
        price: 89.99,
        originalPrice: 109.99,
        discount: "18%",
        image: "⚡",
        isPromo: true
    },
    {
        id: 21,
        name: "Digital Multimeter",
        price: 24.99,
        originalPrice: null,
        discount: null,
        image: "🔍",
        isPromo: false
    },
    {
        id: 22,
        name: "Keylogger USB Device",
        price: 49.99,
        originalPrice: null,
        discount: null,
        image: "🛡️",
        isPromo: false
    }    
];

// Get promotional products (products with discounts)
function getPromotionalProducts() {
    return products.filter(product => product.isPromo);
}

// Get all products
function getAllProducts() {
    return products;
}

// Search products by name
function searchProducts(query) {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase().trim();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Format price for display
function formatPrice(price) {
    return price.toFixed(2);
}

// Create product card HTML
function createProductCard(product) {
    const discountBadge = product.discount ? 
        `<div class="discount-badge">-${product.discount}</div>` : '';
    
    const priceDisplay = product.originalPrice ? 
        `<div class="product-price">
            <span class="price-original">$${formatPrice(product.originalPrice)}</span>
            <span class="price-discount">$${formatPrice(product.price)}</span>
        </div>` :
        `<div class="product-price">$${formatPrice(product.price)}</div>`;
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            ${discountBadge}
            <div class="product-image">
                <img src="${product.image}" alt="Product Image">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                ${priceDisplay}
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}