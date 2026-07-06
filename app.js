// Mock Shopify Catalog Data (Storefront API format)
let products = [
  {
    id: "prod-1",
    title: "Afrophysiques Signature Hoodie",
    category: "tops",
    price: 125.00,
    oldPrice: null,
    stock: 42,
    image: "assets/hoodie_onyx.jpg",
    description: "Engineered for style and comfort. Featuring a premium matte onyx finish, customized performance tailoring, and custom moisture-wicking technology."
  },
  {
    id: "prod-2",
    title: "Apex Athletic Joggers",
    category: "bottoms",
    price: 95.00,
    oldPrice: 110.00,
    stock: 24,
    image: "assets/joggers_gold.jpg",
    description: "Premium charcoal athletic joggers with custom gold zippers. Tailored fit designed to flex with high intensity movement."
  },
  {
    id: "prod-3",
    title: "Performance Aero Tee",
    category: "tops",
    price: 75.00,
    oldPrice: null,
    stock: 18,
    image: "assets/tee_teal.jpg",
    description: "Ultra-breathable athletic tee in high-performance teal. Seamless structural layout decreases drag and increases motion comfort."
  }
];

// Local state
let cart = JSON.parse(localStorage.getItem('afrophysiques_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const filterTabs = document.querySelectorAll('.filter-tab');
const cartTrigger = document.getElementById('cart-trigger');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartBadgeCount = document.getElementById('cart-badge-count');
const checkoutBtn = document.getElementById('checkout-btn');
const productModal = document.getElementById('product-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const closeModalBtn = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');
const logsTerminal = document.getElementById('logs-terminal');
const toastContainer = document.getElementById('toast-container');

// Simulation Trigger Buttons
const simStockBtn = document.getElementById('sim-stock-update');
const simPriceBtn = document.getElementById('sim-price-drop');
const simNewItemBtn = document.getElementById('sim-new-item');

/* --- Render Catalog --- */
function renderProducts() {
  productGrid.innerHTML = '';
  
  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p class="empty-cart-message">No apparel found matching "${searchQuery}".</p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = `product-card` + (p.pulsePending ? ' webhook-pulse' : '');
    card.id = `card-${p.id}`;
    
    // Reset pulse state
    if (p.pulsePending) {
      setTimeout(() => {
        card.classList.remove('webhook-pulse');
        p.pulsePending = false;
      }, 1500);
    }

    let stockBadgeHtml = '';
    if (p.stock === 0) {
      stockBadgeHtml = `<span class="product-badge out-of-stock">Sold Out</span>`;
    } else if (p.stock <= 5) {
      stockBadgeHtml = `<span class="product-badge low-stock">Only ${p.stock} Left</span>`;
    } else {
      stockBadgeHtml = `<span class="product-badge">Stock: ${p.stock}</span>`;
    }

    const priceHtml = p.oldPrice 
      ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>$${p.price.toFixed(2)}`
      : `$${p.price.toFixed(2)}`;

    card.innerHTML = `
      <div class="product-image-container">
        <img class="product-image" src="${p.image}" alt="${p.title}" loading="lazy">
        ${stockBadgeHtml}
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-card-title">${p.title}</h3>
        <div class="product-price-row">
          <span class="product-price">${priceHtml}</span>
          <button class="btn btn-secondary btn-sm select-product-btn" data-id="${p.id}">View Details</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll('.select-product-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openProductModal(id);
    });
  });
}

/* --- Cart Management --- */
function saveCart() {
  localStorage.setItem('afrophysiques_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, size = 'M', quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock === 0) {
    showToast("Product is currently out of stock!");
    return;
  }

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      title: product.title,
      price: product.price,
      image: product.image,
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  showToast(`Added ${product.title} (Size ${size}) to cart!`);
  openCartDrawer();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;
  let totalCount = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    cartBadgeCount.textContent = '0';
    cartSubtotal.textContent = '$0.00';
    return;
  }

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    totalCount += item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <div class="cart-item-qty">
          <span>Size: ${item.size}</span>
          <button class="qty-btn" onclick="adjustCartQty(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="adjustCartQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartBadgeCount.textContent = totalCount;
}

window.adjustCartQty = function(index, amount) {
  if (index < 0 || index >= cart.length) return;
  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
};

/* --- Drawer Controls --- */
function openCartDrawer() {
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cartTrigger.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);
cartDrawerBackdrop.addEventListener('click', closeCartDrawer);

/* --- Modal Controls --- */
let selectedSize = 'M';

function openProductModal(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  selectedSize = 'M'; // Reset size

  modalBody.innerHTML = `
    <img class="modal-product-img" src="${p.image}" alt="${p.title}">
    <div class="modal-details">
      <h3 class="modal-title">${p.title}</h3>
      <span class="modal-price">$${p.price.toFixed(2)}</span>
      <p class="modal-desc">${p.description}</p>
      
      <div class="size-selector">
        <span class="size-label">Select Size</span>
        <div class="size-options">
          <button class="size-btn active" onclick="selectModalSize(this, 'S')">S</button>
          <button class="size-btn" onclick="selectModalSize(this, 'M')">M</button>
          <button class="size-btn" onclick="selectModalSize(this, 'L')">L</button>
          <button class="size-btn" onclick="selectModalSize(this, 'XL')">XL</button>
        </div>
      </div>

      <button class="btn btn-primary" id="modal-add-to-cart-btn" ${p.stock === 0 ? 'disabled' : ''}>
        ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  `;

  document.getElementById('modal-add-to-cart-btn').addEventListener('click', () => {
    addToCart(p.id, selectedSize, 1);
    closeProductModal();
  });

  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

window.selectModalSize = function(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
};

function closeProductModal() {
  productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeProductModal);
modalBackdrop.addEventListener('click', closeProductModal);

/* --- Webhook Logs Terminal Terminal --- */
function appendLog(message, type = 'system') {
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  const timestamp = new Date().toLocaleTimeString();
  line.textContent = `[${timestamp}] ${message}`;
  logsTerminal.appendChild(line);
  logsTerminal.scrollTop = logsTerminal.scrollHeight;
}

/* --- Toast Notifications --- */
function showToast(message, isWebhook = false) {
  const toast = document.createElement('div');
  toast.className = 'toast' + (isWebhook ? ' webhook-triggered' : '');
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* --- Webhook Simulations --- */

// Simulation 1: Stock Update Webhook
simStockBtn.addEventListener('click', () => {
  appendLog("Incoming Webhook [Shopify/inventory_levels/update]...", "system");
  
  setTimeout(() => {
    // Modify stock of Hoodie
    const hoodie = products.find(p => p.id === 'prod-1');
    if (hoodie) {
      hoodie.stock = 3;
      hoodie.pulsePending = true;
      
      appendLog("n8n Workflow Action: Signature HMAC checked - Valid", "webhook");
      appendLog("n8n Workflow Action: Flattened inventory data: AP-HD-BLK-M Stock -> 3", "webhook");
      appendLog("Agent Orchestrator Sync: Updated 'Afrophysiques Signature Hoodie' stock to 3", "agent");
      
      showToast("Webhook Sync: Hoodie stock reduced to 3!", true);
      renderProducts();
    }
  }, 400);
});

// Simulation 2: Price drop Markdown Webhook
simPriceBtn.addEventListener('click', () => {
  appendLog("Incoming Webhook [Shopify/products/update]...", "system");

  setTimeout(() => {
    const tee = products.find(p => p.id === 'prod-3');
    if (tee) {
      tee.oldPrice = 75.00;
      tee.price = 49.00;
      tee.pulsePending = true;

      appendLog("n8n Workflow Action: Decrypted secret header - Valid signature", "webhook");
      appendLog("n8n Workflow Action: Price change for AP-Tee-TEAL-M to $49.00", "webhook");
      appendLog("Agent Orchestrator Sync: Markdown applied to 'Performance Aero Tee'", "agent");

      showToast("Webhook Sync: Aero Tee marked down to $49.00!", true);
      renderProducts();
    }
  }, 400);
});

// Simulation 3: Add new Product Drop Webhook
simNewItemBtn.addEventListener('click', () => {
  // Prevent duplicate additions
  if (products.some(p => p.id === 'prod-4')) {
    showToast("Product is already injected in catalog.");
    return;
  }

  appendLog("Incoming Webhook [Shopify/products/create]...", "system");

  setTimeout(() => {
    const newProduct = {
      id: "prod-4",
      title: "AP Compression Tights",
      category: "bottoms",
      price: 110.00,
      oldPrice: null,
      stock: 12,
      image: "assets/joggers_gold.jpg", // reuse image asset
      description: "Elite performance compression legwear with heat regulation technology. Built for cold morning runs and weightlifting cycles."
    };

    newProduct.pulsePending = true;
    products.push(newProduct);

    appendLog("n8n Workflow Action: New product creation received", "webhook");
    appendLog("n8n Workflow Action: Parse image URL and tags - Success", "webhook");
    appendLog("Agent Orchestrator Sync: Injected 'AP Compression Tights' into catalog", "agent");

    showToast("Webhook Sync: AP Compression Tights dropped!", true);
    renderProducts();
  }, 400);
});

/* --- Checkout Simulation --- */
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  appendLog("GraphQL Mutation [checkoutCreate] dispatched to Shopify...", "system");
  
  // Format variables for display
  const itemsList = cart.map(item => `{ variantId: \"${item.id}\", quantity: ${item.quantity} }`).join(', ');
  
  setTimeout(() => {
    appendLog("Shopify Storefront Response: Checkout URL created successfully", "webhook");
    appendLog(`Shopify API Payload Variables: { input: { lineItems: [ ${itemsList} ] } }`, "agent");
    
    alert(`[Shopify Checkout Portal Simulator]\n\nMutating Cart state on Shopify backend...\nVariables sent:\nlineItems: [ ${itemsList} ]\n\nRedirecting to secure Shopify Checkout Page...`);
    
    // Clear cart on checkout success
    cart = [];
    saveCart();
    closeCartDrawer();
    showToast("Checkout simulation complete. Cart cleared.");
  }, 600);
});

/* --- Filter & Search Controls --- */
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

filterTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.getAttribute('data-category');
    renderProducts();
  });
});

/* --- Initialize --- */
renderProducts();
updateCartUI();
appendLog("Storefront catalog synchronized with Shopify Storefront API.", "system");
