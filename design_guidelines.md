# OrbitalEdge LEO-as-a-Service Platform - Design Guidelines

## Design Approach

**Reference Strategy**: Fusion of SpaceX's bold space visualization aesthetics + Apple's refined minimalism + Linear's dark mode execution. The platform should feel like cutting-edge space technology meets premium enterprise SaaS.

**Core Principle**: "Mission Control meets Modern SaaS" - professional, precise, yet awe-inspiring.

---

## Color Palette

### Dark Mode Foundation
- **Background Base**: 8 8% 4% (deep space black)
- **Surface Elevated**: 220 12% 8% (card backgrounds)
- **Surface Higher**: 220 10% 12% (interactive elements)

### Primary Brand Colors
- **Orbital Blue**: 195 100% 65% (primary actions, accents, orbital paths)
- **Deep Space Navy**: 220 25% 18% (secondary surfaces)

### Accent & Status Colors
- **Success Green**: 142 70% 55% (active satellites, successful bookings)
- **Warning Amber**: 38 92% 58% (orbit warnings, time-sensitive)
- **Danger Red**: 0 84% 60% (debris zones, critical alerts)
- **Neutral Gray**: 220 8% 55% (text secondary, borders)

### Glows & Effects
- Orbital paths: Use Orbital Blue with 0.6 opacity, 20px blur for glow effects
- Active payload slots: Pulsing animation with Success Green
- Hover states: Increase brightness by 10%, add subtle shadow

---

## Typography

**Font Stack**: 
- Primary: 'Inter' (Google Fonts) - Weights: 400, 500, 600, 700
- Monospace: 'JetBrains Mono' (technical data, coordinates, telemetry)

**Scale**:
- Hero Display: text-6xl lg:text-7xl font-bold (Mission-critical headlines)
- Section Headers: text-4xl lg:text-5xl font-semibold
- Card Titles: text-xl font-semibold
- Body Text: text-base leading-relaxed
- Technical Data: text-sm font-mono (coordinates, IDs, timestamps)
- Captions: text-xs text-gray-400

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 lg:py-32
- Card padding: p-6 lg:p-8
- Element gaps: gap-4 (small), gap-8 (medium), gap-12 (large)

**Container Strategy**:
- Full-width hero: w-full with max-w-none
- Content sections: max-w-7xl mx-auto px-6
- Text-heavy areas: max-w-4xl
- Dashboard grids: max-w-screen-2xl

**Grid Patterns**:
- Payload cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature showcase: grid-cols-1 lg:grid-cols-2 with asymmetric emphasis
- Dashboard metrics: grid-cols-2 md:grid-cols-4

---

## Component Library

### Navigation
- **Header**: Fixed top, backdrop-blur-xl, border-b border-white/10
- Logo left, navigation center, CTA button right
- Mobile: Hamburger menu with slide-in drawer

### Hero Section (Homepage)
- **Height**: min-h-screen (full viewport for 3D Earth)
- **3D Canvas**: Full-bleed background with Three.js Earth
- **Content Overlay**: Centered z-10 with gradient backdrop (from-black/80 to-transparent)
- **Headline**: "Launch less. Do more in orbit." - 7xl bold white
- **Subheadline**: Max-width prose, text-xl text-gray-300
- **CTAs**: Primary "Explore Marketplace" + Secondary "View Demo" with gap-4
- **Floating Metrics**: Bottom overlay with live stats (24 active payloads, 48 providers, etc.)

### Marketplace Cards
- **Container**: Rounded-2xl with border border-white/10
- **Background**: Gradient from deep-space-navy to transparent
- **Hover State**: Transform scale-105, border-orbital-blue transition-all duration-300
- **Structure**: 
  - Top: 3D payload thumbnail (square aspect, rounded-lg)
  - Middle: Provider badge, slot ID (monospace), service type icons
  - Bottom: Pricing (text-2xl font-bold), duration, availability status
  - Footer: "Book Now" button full-width

### 3D Earth Visualization
- **Canvas**: Absolute positioned, full container coverage
- **Controls**: Bottom-right floating control panel (zoom, rotate, auto-rotate toggle)
- **Overlay Elements**: SVG orbital paths with animated dashed lines
- **Payload Markers**: Pulsing dots with on-hover info cards
- **Atmosphere Glow**: Outer ring with radial gradient cyan to transparent

### Orbital Simulator
- **Layout**: Split-screen on desktop (60/40)
  - Left: 3D trajectory canvas with time scrubber
  - Right: Configuration panel with sliders for altitude, inclination, duration
- **Output Panel**: Below with cost breakdown table, launch window calendar, pass predictions

### Telemetry Dashboard
- **Grid**: 3-column stats cards at top (CPU, Memory, Temperature)
- **Charts**: Line graphs with gradient fills, real-time updating animations
- **Status Timeline**: Vertical timeline with checkpoints (Upload → Launch → Execution → Return)
- **Log Console**: Bottom panel with monospace text, syntax highlighting for JSON data

### Buttons
- **Primary**: bg-orbital-blue hover:brightness-110 text-white px-8 py-3 rounded-lg font-semibold
- **Secondary**: border-2 border-orbital-blue text-orbital-blue hover:bg-orbital-blue/10
- **Outline on Images**: backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20

### Forms
- **Input Fields**: bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-orbital-blue focus:ring-2 focus:ring-orbital-blue/50
- **Labels**: text-sm font-medium text-gray-300 mb-2
- **File Upload**: Dashed border with upload icon, drag-and-drop zone

---

## Page Structure

### Homepage Sections (6-7 sections)
1. **Hero**: Full-viewport 3D Earth with headline overlay
2. **How It Works**: 3-step process with animated icons (Browse → Book → Launch)
3. **Services Showcase**: 4-column grid (Computing, Storage, Thermal Testing, Sample Return)
4. **Live Marketplace Preview**: Featured payload slots carousel
5. **Technology Stack**: Hardware adapter 3D viewer with specifications
6. **Testimonials**: 2-column grid with university/startup logos
7. **CTA Section**: Final push with mission timeline graphic

### Marketplace Page
- Filter sidebar (left, 280px) with service type, price range, duration sliders
- Main grid (right) with sorting dropdown
- Pagination at bottom

### Simulation Page
- Top toolbar with scenario presets
- Main canvas (70% width) with control overlays
- Results panel (30% width) with tabs for Cost, Windows, Trajectory Data

---

## Animations & Effects

**Sparingly Used**:
- Hero Earth: Continuous slow rotation (0.0005 rad/frame)
- Orbital paths: Animated dash-offset for traveling light effect
- Card hover: Subtle lift with shadow (translateY -4px)
- Page transitions: Fade-in from opacity-0 to opacity-100 duration-500
- Number counters: Animate from 0 to value on scroll-into-view

**Avoid**: Excessive parallax, distracting particle systems, auto-playing videos

---

## Icons

**Library**: Heroicons (via CDN)
- Use outline variant for navigation, forms
- Use solid variant for status indicators, badges
- Size: w-5 h-5 for inline, w-8 h-8 for feature cards, w-12 h-12 for service icons

---

## Images

### Large Hero Image
**No traditional hero image** - The 3D Earth visualization IS the hero visual

### Supporting Images
1. **Hardware Adapter Mockups**: 3D rendered CAD models of payload adapters (Technology section)
2. **Provider Logos**: University/company logos in testimonials (grayscale with opacity-60, hover:opacity-100)
3. **Orbital Diagrams**: Schematic illustrations of LEO zones, inclination angles (How It Works section)
4. **Team Photos**: Optional in About section if needed for credibility

All images should maintain dark theme compatibility with subtle borders or shadows for definition.

---

## Responsive Behavior

- **Mobile**: Stack all multi-column grids to single column, reduce text sizes by one step, hide 3D canvas on <640px and show static Earth image placeholder
- **Tablet**: 2-column grids, maintain 3D canvas with simplified particle count
- **Desktop**: Full multi-column layouts, enhanced 3D effects

---

## Accessibility

- Maintain WCAG AA contrast (4.5:1 minimum) - all text on dark backgrounds uses gray-100 or lighter
- Focus states: ring-2 ring-orbital-blue ring-offset-2 ring-offset-black
- 3D canvas: Provide "Skip to content" link, descriptive alt attributes for fallback images
- Form inputs: Always dark backgrounds with light text, proper label associations