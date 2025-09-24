import { cart } from '../utils/cart.js';

export class ProductCard {
  constructor(product) {
    this.product = product;
  }

  render() {
    return `
      <div class="product-card ${this.product.featured ? 'featured' : ''}">
        <div class="product-image">
          <img src="${this.product.image}" alt="${this.product.name}" loading="lazy">
          ${this.product.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
        <div class="product-info">
          <h3 class="product-title">${this.product.name}</h3>
          <p class="product-description">${this.product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${this.product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-product-id="${this.product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  mount() {
    const addToCartBtn = document.querySelector(`[data-product-id="${this.product.id}"]`);
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        cart.addItem(this.product);

        // Visual feedback
        addToCartBtn.textContent = 'Added!';
        addToCartBtn.classList.add('added');

        setTimeout(() => {
          addToCartBtn.textContent = 'Add to Cart';
          addToCartBtn.classList.remove('added');
        }, 1000);
      });
    }
  }
}