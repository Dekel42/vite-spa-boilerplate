import { cart } from '../utils/cart.js';

export class Header {
  constructor() {
    this.cartCount = 0;
    cart.subscribe(() => {
      this.updateCartCount();
    });
  }

  updateCartCount() {
    this.cartCount = cart.getTotalItems();
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = this.cartCount;
      cartCountElement.style.display = this.cartCount > 0 ? 'block' : 'none';
    }
  }

  render() {
    return `
      <header class="header">
        <div class="header-container">
          <div class="logo">
            <h1>🍼 BabyBloom</h1>
          </div>
          <nav class="nav">
            <a href="#" class="nav-link active" data-category="all">All Products</a>
            <a href="#" class="nav-link" data-category="Baby Gear">Baby Gear</a>
            <a href="#" class="nav-link" data-category="Feeding">Feeding</a>
            <a href="#" class="nav-link" data-category="Sleep">Sleep</a>
            <a href="#" class="nav-link" data-category="Safety">Safety</a>
            <a href="#" class="nav-link" data-category="Toys">Toys</a>
            <a href="#" class="nav-link" data-category="Clothing">Clothing</a>
          </nav>
          <div class="header-actions">
            <button class="cart-btn" id="cartBtn">
              🛒
              <span class="cart-count" style="display: none;">0</span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  mount() {
    this.updateCartCount();

    // Add navigation event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');

        // Dispatch category change event
        const category = e.target.dataset.category;
        document.dispatchEvent(new CustomEvent('categoryChange', { detail: category }));
      });
    });

    // Cart button event listener
    document.getElementById('cartBtn').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggleCart'));
    });
  }
}