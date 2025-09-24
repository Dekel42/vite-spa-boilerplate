import { ProductCard } from './ProductCard.js';
import { products } from '../data/products.js';

export class ProductGrid {
  constructor() {
    this.currentCategory = 'all';
    this.filteredProducts = products;
  }

  filterProducts(category) {
    this.currentCategory = category;
    this.filteredProducts = category === 'all'
      ? products
      : products.filter(product => product.category === category);
    this.render();
  }

  render() {
    const featuredProducts = this.filteredProducts.filter(p => p.featured);
    const regularProducts = this.filteredProducts.filter(p => !p.featured);

    const gridContainer = document.querySelector('.product-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = `
      ${featuredProducts.length > 0 ? `
        <section class="featured-section">
          <h2 class="section-title">Featured Products</h2>
          <div class="product-grid-container featured-grid">
            ${featuredProducts.map(product => new ProductCard(product).render()).join('')}
          </div>
        </section>
      ` : ''}

      <section class="all-products-section">
        <h2 class="section-title">${this.currentCategory === 'all' ? 'All Products' : this.currentCategory}</h2>
        <div class="product-grid-container">
          ${regularProducts.map(product => new ProductCard(product).render()).join('')}
        </div>
      </section>
    `;

    // Mount all product cards
    this.filteredProducts.forEach(product => {
      new ProductCard(product).mount();
    });
  }

  mount() {
    // Listen for category changes
    document.addEventListener('categoryChange', (e) => {
      this.filterProducts(e.detail);
    });

    this.render();
  }
}