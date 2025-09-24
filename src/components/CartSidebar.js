import { cart } from '../utils/cart.js';

export class CartSidebar {
  constructor() {
    this.isOpen = false;
    cart.subscribe(() => {
      this.updateCartDisplay();
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const sidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');

    if (this.isOpen) {
      sidebar.classList.add('open');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const emptyMessage = document.querySelector('.empty-cart');

    if (!cartItems) return;

    const items = cart.getItems();

    if (items.length === 0) {
      emptyMessage.style.display = 'block';
      cartItems.style.display = 'none';
      cartTotal.style.display = 'none';
    } else {
      emptyMessage.style.display = 'none';
      cartItems.style.display = 'block';
      cartTotal.style.display = 'block';

      cartItems.innerHTML = items.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
              <button class="quantity-btn" data-action="decrease" data-id="${item.id}">−</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-item" data-id="${item.id}">✕</button>
        </div>
      `).join('');

      cartTotal.innerHTML = `
        <div class="total-line">
          <span>Total: $${cart.getTotalPrice().toFixed(2)}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      `;
    }
  }

  render() {
    return `
      <div class="cart-overlay"></div>
      <div class="cart-sidebar">
        <div class="cart-header">
          <h3>Shopping Cart</h3>
          <button class="close-cart">✕</button>
        </div>
        <div class="cart-content">
          <div class="empty-cart">
            <p>Your cart is empty</p>
          </div>
          <div class="cart-items"></div>
          <div class="cart-total"></div>
        </div>
      </div>
    `;
  }

  mount() {
    // Close cart events
    document.querySelector('.close-cart').addEventListener('click', () => this.toggle());
    document.querySelector('.cart-overlay').addEventListener('click', () => this.toggle());

    // Toggle cart event
    document.addEventListener('toggleCart', () => this.toggle());

    // Cart item events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quantity-btn')) {
        const action = e.target.dataset.action;
        const id = parseInt(e.target.dataset.id);
        const item = cart.getItems().find(item => item.id === id);

        if (action === 'increase') {
          cart.updateQuantity(id, item.quantity + 1);
        } else if (action === 'decrease') {
          cart.updateQuantity(id, item.quantity - 1);
        }
      }

      if (e.target.classList.contains('remove-item')) {
        const id = parseInt(e.target.dataset.id);
        cart.removeItem(id);
      }
    });

    this.updateCartDisplay();
  }
}