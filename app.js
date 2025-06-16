// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    displayPromotionalProducts();
    displayAllProducts();
    updateCartUI();
}

// Setup all event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', () => handleSearch());
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Cart sidebar toggle
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });
    
    // Checkout modal
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModal = document.getElementById('closeModal');
    
    checkoutBtn.addEventListener('click', openCheckoutModal);
    closeModal.addEventListener('click', closeCheckoutModal);
    
    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Success modal
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    
    closeSuccessModal.addEventListener('click', closeSuccessModal);
    continueShoppingBtn.addEventListener('click', () => {
        closeSuccessModalHandler();
        cartSidebar.classList.remove('open');
    });
    
    // Close modals when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });
}

// Display promotional products
function displayPromotionalProducts() {
    const promoGrid = document.getElementById('promoGrid');
    const promoProducts = getPromotionalProducts();
    
    promoGrid.innerHTML = promoProducts.map(product => createProductCard(product)).join('');
}

// Display all products
function displayAllProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const allProducts = getAllProducts();
    
    productsGrid.innerHTML = allProducts.map(product => createProductCard(product)).join('');
}

// Handle search functionality
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    const searchResults = searchProducts(query);
    
    const productsGrid = document.getElementById('productsGrid');
    
    if (searchResults.length === 0 && query) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3>No products found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
    } else {
        productsGrid.innerHTML = searchResults.map(product => createProductCard(product)).join('');
    }
    
    // Update section title based on search
    const productsSection = document.querySelector('.products-section h2');
    if (query) {
        productsSection.textContent = `Search Results for "${query}"`;
    } else {
        productsSection.textContent = 'All Products';
    }
}

// Open checkout modal
function openCheckoutModal() {
    if (cart.length === 0) return;
    
    const checkoutModal = document.getElementById('checkoutModal');
    updateOrderSummary();
    checkoutModal.classList.add('show');
    
    // Focus first input
    setTimeout(() => {
        document.getElementById('customerName').focus();
    }, 300);
}

// Close checkout modal
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('show');
}

// Update order summary in checkout modal
function updateOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');
    
    const cartItems = getCartForCheckout();
    
    summaryItems.innerHTML = cartItems.map(item => `
        <div class="summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${formatPrice(item.total)}</span>
        </div>
    `).join('');
    
    summaryTotal.textContent = formatPrice(getCartTotal());
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerPhone = document.getElementById('customerPhone').value;
    
    // Basic form validation
    if (!customerName || !customerEmail || !customerAddress) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate order processing
    simulateOrderProcessing();
}

// Simulate order processing and show success
function simulateOrderProcessing() {
    const checkoutModal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');
    const orderNumber = document.getElementById('orderNumber');
    
    // Generate random order number
    const orderId = 'TZ' + Date.now().toString().slice(-6);
    orderNumber.textContent = orderId;
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate processing delay
    setTimeout(() => {
        // Close checkout modal
        checkoutModal.classList.remove('show');
        
        // Show success modal
        successModal.classList.add('show');
        
        // Clear cart
        clearCart();
        
        // Reset form
        document.getElementById('checkoutForm').reset();
        
        // Reset submit button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Close success modal
function closeSuccessModalHandler() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('show');
}

// Utility function to show notifications (could be enhanced)
function showNotification(message, type = 'success') {
    // Simple alert for now - could be enhanced with custom notifications
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Handle keyboard navigation and accessibility
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(modal => {
            modal.classList.remove('show');
        });
        
        if (document.getElementById('cartSidebar').classList.contains('open')) {
            document.getElementById('cartSidebar').classList.remove('open');
        }
    }
});

// Add smooth scrolling to page navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Performance optimization: Debounce search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);

// Update search event listener to use debounced version
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.removeEventListener('input', handleSearch);
        searchInput.addEventListener('input', debouncedSearch);
    }
});