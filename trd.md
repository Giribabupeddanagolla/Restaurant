# Technical Requirements Document (TRD)
## Project: FastMobile - High-Performance Mobile Restaurant Web App

---

## 1. Technical Architecture & Tech Stack Choice

### 1.1 Core Frontend Stack
- **Framework / Runtime**: Modern Vanilla JavaScript (ESNext) / React with Vite bundle pipeline.
- **Styling Architecture**: Native Vanilla CSS with CSS Custom Properties (Design System Tokens), CSS Grid/Flexbox, dynamic Glassmorphism backdrop-filters, and GPU-accelerated CSS animations (`transform: translate3d`).
- **Icons & Assets**: Feather / Lucide SVG Icons embedded inline for zero render-blocking network requests.
- **Sound Engine**: Custom Web Audio API synthesizer for instant audio feedback without external MP3 dependencies.

### 1.2 State & Event Management Architecture
- **Global Application State**: Lightweight centralized store with reactive subscriber callbacks.
- **Cross-Tab & Device Real-Time Sync**:
  - `BroadcastChannel` API ("fastmobile_restaurant_channel") for latency-free (<5ms) sync across Customer view, Kitchen KDS, and Waiter screens on the same browser/device.
  - WebSockets / Server-Sent Events (SSE) adapter interface for multi-device network deployments.
- **Persistence Layer**: `window.localStorage` backup with seed dataset initialization for instant offline boot.

---

## 2. Component System & File Architecture

```
/resturant
├── index.html              # Main mobile view entry point & shell metadata
├── style.css               # Modern CSS design system, dark luxury theme & animations
├── app.js                  # Main JS bundle: App router, view switching, audio & state
├── data/
│   └── mockData.js         # Initial menu categories, dishes, tables, mock orders
├── modules/
│   ├── store.js            # State store, event bus, BroadcastChannel real-time sync
│   ├── audio.js            # Web Audio API sound generator (chimes, clicks, alerts)
│   ├── components/
│   │   ├── header.js       # Table selector, search bar, cart trigger
│   │   ├── menu.js         # Category pills, dish card grid, filter chips
│   │   ├── modal.js        # Dish details customization modal
│   │   ├── cart.js         # Sliding mobile cart drawer, tips, total calculation
│   │   ├── tracker.js      # Animated order progress tracker
│   │   ├── kds.js          # Kitchen display Kanban board & ticket controls
│   │   └── admin.js        # Menu manager & analytics dashboard
└── .env                    # Environment configuration template
```

---

## 3. Data Schema & Models

### 3.1 MenuItem Interface
```typescript
interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks' | 'specials';
  price: number;
  description: string;
  image: string;
  dietary: ('veg' | 'non-veg' | 'gluten-free' | 'chef-special' | 'spicy')[];
  calories: number;
  prepTimeMinutes: number;
  available: boolean;
  options?: {
    name: string;
    choices: { label: string; extraPrice: number }[];
  }[];
}
```

### 3.2 Order Interface
```typescript
interface Order {
  id: string;
  tableNumber: string;
  createdAt: string; // ISO Timestamp
  status: 'placed' | 'preparing' | 'cooking' | 'ready' | 'served' | 'cancelled';
  items: {
    dishId: string;
    dishName: string;
    quantity: number;
    unitPrice: number;
    customizations: string[];
    itemTotal: number;
  }[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  notes?: string;
  estimatedTimeMin: number;
}
```

### 3.3 StaffCall Interface
```typescript
interface StaffCall {
  id: string;
  tableNumber: string;
  type: 'waiter' | 'water' | 'bill' | 'cleaning';
  status: 'pending' | 'acknowledged' | 'resolved';
  timestamp: string;
}
```

---

## 4. Mobile Performance Optimization Techniques

1. **GPU Hardware Acceleration**: All slide drawers, modals, and scale micro-interactions utilize `will-change: transform` and 3D transforms (`translate3d(0,0,0)`).
2. **Zero Layout Shifts (CLS = 0)**: Fixed aspect-ratio containers (`aspect-ratio: 4/3`) for dish imagery to eliminate cumulative layout shifts.
3. **Passive Touch Listeners**: Scrollable elements use `{ passive: true }` event listeners for silky smooth 60 FPS mobile scrolling.
4. **Debounced Search**: Search input debounced at 150ms to prevent unnecessary DOM re-renders while typing fast.
5. **Touch Feedback**: `navigator.vibrate([15])` triggered on primary mobile touch events for native app feel.

---

## 5. Browser Compatibility & PWA Readiness
- **Supported Browsers**: Mobile Safari (iOS 14+), Mobile Chrome (Android 8+), Edge, Firefox, Samsung Internet.
- **PWA Manifest & Service Worker**: `manifest.json` ready with standalone display mode, dark theme color (`#0D0F12`), and splash icons.
