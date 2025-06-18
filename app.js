document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    displayPromotionalProducts();
    displayAllProducts();
    updateCartUI();
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', () => handleSearch());
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    document.addEventListener('click', function(e) {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModal = document.getElementById('closeModal');
    
    checkoutBtn.addEventListener('click', openCheckoutModal);
    closeModal.addEventListener('click', closeCheckoutModal);
    
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', handleCheckout);
    
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    
    closeSuccessModal.addEventListener('click', closeSuccessModal);
    continueShoppingBtn.addEventListener('click', () => {
        closeSuccessModalHandler();
        cartSidebar.classList.remove('open');
    });
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });
}

function displayPromotionalProducts() {
    const promoGrid = document.getElementById('promoGrid');
    const promoProducts = getPromotionalProducts();
    
    promoGrid.innerHTML = promoProducts.map(product => createProductCard(product)).join('');
}

function displayAllProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const allProducts = getAllProducts();
    
    productsGrid.innerHTML = allProducts.map(product => createProductCard(product)).join('');
}

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

    const productsSection = document.querySelector('.products-section h2');
    if (query) {
        productsSection.textContent = `Search Results for "${query}"`;
    } else {
        productsSection.textContent = 'All Products';
    }
}

function openCheckoutModal() {
    if (cart.length === 0) return;
    
    const checkoutModal = document.getElementById('checkoutModal');
    updateOrderSummary();
    checkoutModal.classList.add('show');
    
    setTimeout(() => {
        document.getElementById('customerName').focus();
    }, 300);
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('show');
}

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

function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerPhone = document.getElementById('customerPhone').value;
    

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

function simulateOrderProcessing() {
    const checkoutModal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');
    const orderNumber = document.getElementById('orderNumber');
    
    const orderId = 'TZ' + Date.now().toString().slice(-6);
    orderNumber.textContent = orderId;
    
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

function closeSuccessModalHandler() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('show');
}


function showNotification(message, type = 'success') {
    console.log(`${type.toUpperCase()}: ${message}`);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(modal => {
            modal.classList.remove('show');
        });
        
        if (document.getElementById('cartSidebar').classList.contains('open')) {
            document.getElementById('cartSidebar').classList.remove('open');
        }
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

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

const debouncedSearch = debounce(handleSearch, 300);

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.removeEventListener('input', handleSearch);
        searchInput.addEventListener('input', debouncedSearch);
    }
});