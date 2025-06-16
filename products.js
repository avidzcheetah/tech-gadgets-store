// Product data - hardcoded as requested
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: null,
        discount: null,
        image: "🎧",
        isPromo: false
    },
    {
        id: 2,
        name: "4K Webcam with Auto Focus",
        price: 89.99,
        originalPrice: 129.99,
        discount: "31%",
        image: "📹",
        isPromo: true
    },
    {
        id: 3,
        name: "Gaming Mechanical Keyboard",
        price: 149.99,
        originalPrice: null,
        discount: null,
        image: "⌨️",
        isPromo: false
    },
    {
        id: 4,
        name: "Wireless Charging Pad",
        price: 24.99,
        originalPrice: 39.99,
        discount: "38%",
        image: "🔌",
        isPromo: true
    },
    {
        id: 5,
        name: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: null,
        discount: null,
        image: "⌚",
        isPromo: false
    },
    {
        id: 6,
        name: "Portable Power Bank 20000mAh",
        price: 34.99,
        originalPrice: 49.99,
        discount: "30%",
        image: "🔋",
        isPromo: true
    },
    {
        id: 7,
        name: "USB-C Hub Multi-Port Adapter",
        price: 45.99,
        originalPrice: null,
        discount: null,
        image: "🔌",
        isPromo: false
    },
    {
        id: 8,
        name: "Wireless Gaming Mouse",
        price: 69.99,
        originalPrice: null,
        discount: null,
        image: "🖱️",
        isPromo: false
    },
    {
        id: 9,
        name: "Smartphone Camera Lens Kit",
        price: 29.99,
        originalPrice: null,
        discount: null,
        image: "📱",
        isPromo: false
    },
    {
        id: 10,
        name: "Bluetooth Portable Speaker",
        price: 55.99,
        originalPrice: null,
        discount: null,
        image: "🔊",
        isPromo: false
    },
    {
        id: 11,
        name: "Tablet Stand Adjustable",
        price: 19.99,
        originalPrice: null,
        discount: null,
        image: "📱",
        isPromo: false
    },
    {
        id: 12,
        name: "LED Ring Light for Streaming",
        price: 39.99,
        originalPrice: null,
        discount: null,
        image: "💡",
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
            <div class="product-image">${product.image}</div>
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