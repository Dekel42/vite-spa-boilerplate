import './style.css'
import { Header } from './components/Header.js'
import { ProductGrid } from './components/ProductGrid.js'
import { CartSidebar } from './components/CartSidebar.js'

class App {
  constructor() {
    this.header = new Header();
    this.productGrid = new ProductGrid();
    this.cartSidebar = new CartSidebar();
  }

  render() {
    document.querySelector('#app').innerHTML = `
      ${this.header.render()}
      <main class="main">
        <div class="hero-section">
          <h1 class="hero-title">Everything for Fresh Parents</h1>
          <p class="hero-subtitle">Discover the best products to help you navigate parenthood with confidence</p>
        </div>
        <div class="product-grid"></div>
      </main>
      ${this.cartSidebar.render()}
    `;
  }

  mount() {
    this.render();
    this.header.mount();
    this.productGrid.mount();
    this.cartSidebar.mount();
  }
}

const app = new App();
app.mount();