# Design System & UI/UX Specifications
## Project: FastMobile - Dark Luxury & Vibrant Restaurant Experience

---

## 1. Visual Aesthetics & Design System Tokens

FastMobile adheres to a modern **Dark Luxury & Vibrant Food** visual theme featuring dark obsidian background surfaces, high contrast vibrant food warm accents, glassmorphic translucency, and subtle glowing highlights.

### 1.1 Color Palette

```css
:root {
  /* Surface Colors */
  --bg-dark: #0D0F12;           /* Deep obsidian base */
  --surface-card: #161B22;      /* Elevated card background */
  --surface-glass: rgba(22, 27, 34, 0.75); /* Glassmorphism background */
  --surface-border: rgba(255, 255, 255, 0.08); /* Subtle glass outline */
  --surface-hover: #1F242D;

  /* Accent & Status Colors */
  --accent-primary: #FF6B00;   /* Warm Amber Orange - Food Accent */
  --accent-primary-hover: #FF852E;
  --accent-glow: rgba(255, 107, 0, 0.25);
  
  --color-success: #10B981;    /* Ready / Veg Green */
  --color-warning: #F59E0B;    /* Preparing / Cooking Yellow */
  --color-danger: #EF4444;     /* Non-Veg / Alert Red */
  --color-info: #3B82F6;       /* Customer Call Blue */

  /* Typography Colors */
  --text-main: #F8FAFC;        /* High contrast pure white/slate */
  --text-muted: #94A3B8;       /* Secondary text */
  --text-dim: #64748B;         /* Low priority info */

  /* Elevation Shadows & Blur */
  --glass-blur: blur(16px);
  --shadow-lg: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px var(--accent-glow);
}
```

---

## 2. Ergonomic Mobile Layout & Thumb-Zone Guidelines

To maximize speed and comfort on mobile devices:
1. **Primary Touch Zone (Bottom 35%)**: Cart checkout button, primary CTA, bottom navigation bar, and quantity adjustment steppers are placed within natural thumb reach.
2. **Secondary Touch Zone (Middle 50%)**: Scrollable menu items, category pill carousel, dish customization choices.
3. **Tertiary Zone (Top 15%)**: Table selector badge, search bar, and app identity.
4. **Touch Target Size**: All interactive buttons, chips, and icons maintain a minimum touch target area of **48px x 48px** with ripple/scale touch response.

---

## 3. Micro-Interactions & Animation Guidelines

- **Active Press State**: `transform: scale(0.96); transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)` applied to all buttons and dish cards.
- **Cart Badge Pulse**: Spring animation when dish is added:
  ```css
  @keyframes badgePop {
    0% { transform: scale(1); }
    50% { transform: scale(1.35) rotate(-5deg); }
    100% { transform: scale(1); }
  }
  ```
- **Order Tracker Stage Progress**: Animated glowing pulse line connecting active stages with smooth color transitions.
- **Drawer Slide Animation**: Smooth 280ms cubic-bezier transition for bottom cart drawer opening and closing.

---

## 4. Component Visual Mockup Guidelines

### 4.1 Dish Card
- **Layout**: Horizontal layout for fast scrolling list or vertical cards on grid.
- **Visual Elements**:
  - Crisp dish photo container with rounded corners (`border-radius: 16px`).
  - Dietary tag pills (e.g. 🌿 Veg, 🔥 Spicy, ⭐️ Chef Special).
  - Title in bold 16px font, 2-line clamped description in muted text.
  - Price in glowing primary amber font (`$14.50`).
  - Tactile "+" button with glow effect on touch.

### 4.2 Floating Bottom Dock
- Fixed bottom dock featuring a translucent glass backdrop (`backdrop-filter: blur(16px)`).
- Quick access buttons: **Menu**, **My Order (with live badge)**, **Call Waiter**, **Kitchen (KDS)**.
