// Shopping cart functionality
let cart = [];

// Add item to cart
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartAnimation();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI elements
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    updateCheckoutButton();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const count = getCartItemCount();
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
}

// Update cart items display
function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p>Add some products to get started!</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${formatPrice(item.price)} each</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-total">
                $${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');
}

// Update cart total display
function updateCartTotal() {
    const cartTotal = document.getElementById('cartTotal');
    cartTotal.textContent = formatPrice(getCartTotal());
}

// Update checkout button state
function updateCheckoutButton() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.textContent = cart.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout';
}

// Show cart animation when item added
function showCartAnimation() {
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Clear cart
function clearCart() {
    cart = [];
    updateCartUI();
}

// Get cart contents for checkout
function getCartForCheckout() {
    return cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
    }));
}