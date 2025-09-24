# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BabyBloom is a single-page application (SPA) for an online shop specializing in products for fresh parents. The app is built with vanilla JavaScript, Vite, and features an Apple Store-inspired design with clean, minimalist aesthetics.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Install dependencies
npm install
```

## Architecture

This is a component-based vanilla JavaScript SPA using ES6 modules with the following key architectural patterns:

### Component System
- **Render/Mount Pattern**: All components implement `render()` to generate HTML strings and `mount()` to attach event listeners
- **Component Lifecycle**: Components are instantiated in main.js, rendered to DOM, then mounted for interactivity
- **Event-Driven Communication**: Components communicate via custom DOM events (`categoryChange`, `toggleCart`)

### State Management
- **CartManager Singleton**: Central cart state management with observer pattern using `subscribe()`/`listeners[]`
- **LocalStorage Persistence**: Cart state persists across browser sessions
- **Reactive Updates**: Cart changes automatically update UI via subscribed listeners

### Data Layer
- **Static Product Data**: Product catalog stored in `src/data/products.js` with categories and featured flags
- **Client-Side Filtering**: Product filtering by category handled in ProductGrid component

## Key Components

### Main App (`src/main.js`)
- Application entry point that orchestrates all components
- Handles component instantiation and mounting

### Cart System (`src/utils/cart.js`)
- Observable CartManager class with CRUD operations
- Automatic localStorage synchronization
- Event-driven UI updates

### Component Structure
- **Header**: Navigation with active states and cart indicator
- **ProductGrid**: Dynamic product filtering with featured/regular sections
- **ProductCard**: Individual product display with add-to-cart functionality
- **CartSidebar**: Sliding cart panel with quantity controls

## Styling Architecture

Uses CSS custom properties (CSS variables) for consistent theming:
- Apple-inspired design system with specific color palette
- Component-scoped styles with BEM-like naming
- Responsive grid layouts using CSS Grid
- Smooth animations and hover effects throughout

## Data Structure

Products contain: `id`, `name`, `price`, `category`, `image`, `description`, `featured` (boolean)
Categories: Baby Gear, Feeding, Sleep, Safety, Toys, Clothing

## Development Notes

- All images use Unsplash URLs with consistent 400x400 crop parameters
- Component event listeners are attached in the `mount()` method after DOM insertion
- Cart state changes trigger re-renders of affected components automatically
- Mobile-responsive design with navigation collapse on smaller screens