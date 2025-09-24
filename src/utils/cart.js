class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.listeners = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }

    this.saveAndNotify();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveAndNotify();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveAndNotify();
      }
    }
  }

  getItems() {
    return this.items;
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clear() {
    this.items = [];
    this.saveAndNotify();
  }

  saveAndNotify() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.listeners.forEach(listener => listener(this.items));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const cart = new CartManager();