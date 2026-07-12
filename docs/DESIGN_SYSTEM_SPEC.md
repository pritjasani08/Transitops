# TransitHub: Design System & Component Library Specification

## 1. DESIGN PRINCIPLES
The TransitHub Design System (THDS) serves as the singular source of truth for all frontend interfaces. It ensures that regardless of the persona (Fleet Manager, Dispatcher, Safety Officer, Finance Analyst), the product feels unified, premium, and meticulously crafted.

*   **Minimal & Elegant:** Maximize signal, minimize noise. Data should breathe. 
*   **Enterprise Yet Modern:** Handle complex data density without looking like legacy software.
*   **Accessible & Fast:** Keyboard-first, high-contrast, zero layout shift.
*   **Consistent:** A button in Dispatch behaves exactly like a button in Finance.

---

## 2. DESIGN TOKENS

### 2.1 Spacing Scale (8px Base)
Used for padding, margin, and layout gaps.
| Token | Value | Rem (at 16px) | Usage |
| :--- | :--- | :--- | :--- |
| `spacing-1` | 4px | 0.25rem | Micro-adjustments, icon/text gaps |
| `spacing-2` | 8px | 0.5rem | Tight component padding |
| `spacing-3` | 12px | 0.75rem | Standard component padding |
| `spacing-4` | 16px | 1rem | Container padding, standard margins |
| `spacing-6` | 24px | 1.5rem | Section gaps, modal padding |
| `spacing-8` | 32px | 2rem | Large section gaps, layout padding |
| `spacing-12` | 48px | 3rem | Major page section dividers |

### 2.2 Typography Scale
**Fonts:** Inter (UI, Paragraphs, Headings), JetBrains Mono (Data, Tables, Code).
| Level | Font Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 36px | 600 (Semibold) | 1.1 | Hero metrics, Empty state titles |
| **H1** | 24px | 600 (Semibold) | 1.2 | Page titles, Workspace headers |
| **H2** | 20px | 600 (Semibold) | 1.3 | Modal titles, Section headers |
| **H3** | 16px | 500 (Medium) | 1.4 | Card titles, form group headers |
| **Body (Base)** | 14px | 400 (Regular) | 1.5 | Standard text, descriptions |
| **Label** | 12px | 500 (Medium) | 1.2 | Inputs, Table headers, Badges |
| **Data (Mono)**| 14px | 400 (Regular) | 1.5 | Financials, IDs, License Plates |

### 2.3 Color Palette
| Category | Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `primary-500` | `#2563EB` (Royal) | `#3B82F6` | Primary CTAs, active states, focus rings |
| **Secondary**| `secondary-500`| `#10B981` (Emerald)| `#34D399` | Success markers, positive trends |
| **Surface** | `surface-100` | `#FFFFFF` | `#1F2937` | Cards, Modals, Drawers |
| **Background**| `bg-base` | `#F9FAFB` | `#0B1220` | Main application canvas |
| **Text** | `text-primary` | `#111827` | `#F9FAFB` | Headings, primary body |
| **Text Soft**| `text-muted` | `#6B7280` | `#9CA3AF` | Helper text, placeholders |
| **Danger** | `danger-500` | `#EF4444` | `#F87171` | Errors, destructive actions, high risk |
| **Warning** | `warning-500` | `#F59E0B` | `#FBBF24` | Alerts, expiring documents |

### 2.4 Border Radius & Shadows
| Token | Radius | Shadow (Elevation) | Usage |
| :--- | :--- | :--- | :--- |
| `sm` | 6px | None | Badges, Tooltips, Tags |
| `md` | 12px | `0 1px 3px rgba(0,0,0,0.1)` | Buttons, Inputs, Menus |
| `lg` | 16px | `0 4px 20px rgba(0,0,0,0.05)` | Cards, Charts, Tables |
| `xl` | 24px | `0 24px 48px rgba(0,0,0,0.12)`| Modals, Drawers, Floating Command Center |

---

## 3. BUTTONS

*   **Purpose:** Trigger actions, submit forms, navigate.
*   **Padding:** `12px` Horizontal, `8px` Vertical (Medium).
*   **Typography:** Label (14px, Medium).
*   **Transitions:** `transform 150ms ease, background-color 150ms ease`.

| Variant | Styling (Light Mode) | Use Case |
| :--- | :--- | :--- |
| **Primary** | Bg: Primary, Text: White, Border: None | Main call to action (e.g., "Create Trip"). Max 1 per view. |
| **Secondary** | Bg: White, Text: Gray-700, Border: 1px Solid Gray-200 | Alternative actions (e.g., "Cancel", "Filter"). |
| **Outline** | Bg: Transparent, Text: Primary, Border: 1px Solid Primary | Contextual actions, secondary steps. |
| **Ghost** | Bg: Transparent, Text: Gray-600, Hover: Gray-100 | Icon buttons, tertiary actions (e.g., Kebab menu triggers). |
| **Danger** | Bg: Danger, Text: White | Destructive actions (e.g., "Suspend Driver"). |

**States:**
*   **Hover:** `scale(0.98)` slightly inwards. Darken background by 5%.
*   **Focus:** `ring-2 ring-primary/50 ring-offset-2`.
*   **Disabled:** Opacity `50%`, `cursor-not-allowed`, Grayscale background.
*   **Loading:** Text fades out, centered spinner fades in. Button retains original width.

---

## 4. INPUTS & FORM COMPONENTS

*   **Purpose:** Data capture, configuration, and filtering.
*   **Padding:** `12px` uniform padding. Radius: `12px`.
*   **Border:** `1px solid gray-300` (Light) / `gray-700` (Dark).

### Specific Form Behaviors
*   **Focus State:** Border changes to Primary, `ring-2 ring-primary/20`.
*   **Error State:** Border changes to Danger, subtle horizontal shake animation. Inline error message in Danger color below input.
*   **Success State:** Trailing Emerald checkmark icon appears.
*   **Dropdown/Select:** Uses a popover portal to prevent clipping. Features keyboard arrow navigation and typeahead search.
*   **File Upload (Drag & Drop):** Dashed border area. On `dragenter`, border becomes Primary, background tints Primary-50.
*   **Toggle/Switch:** Smooth 200ms spring slide for the knob. Background transitions from Gray to Primary (or Emerald for success contexts).
*   **Date/Time Picker:** Opens a floating calendar card. Uses JetBrains Mono for date inputs to ensure perfect vertical alignment.

---

## 5. ENTERPRISE DATA TABLE

*   **Purpose:** Display and manage dense collections of structured data (Vehicles, Trips, Logs).
*   **When NOT to use:** For lists of fewer than 5 items (use Cards or Simple Lists instead).

**Features & Layout:**
*   **Sticky Header:** Table header remains pinned to the top of the container during scrolling. Background includes a 12px backdrop blur.
*   **Sticky Column:** The first column (usually ID or Name) remains pinned to the left during horizontal scrolling.
*   **Row Selection:** Checkbox in column 0. Selecting rows reveals a floating "Bulk Actions" bar at the bottom center of the screen.
*   **Column Visibility:** Trailing button in header opens a popover to toggle columns on/off.
*   **Sorting:** Clicking a header cycles `None -> Asc -> Desc`. Shows a subtle arrow icon.
*   **Pagination:** Bottom right. Shows "Rows per page" dropdown, current range ("1-50 of 240"), and Prev/Next buttons.
*   **Empty State:** Custom illustration (e.g., empty folder), "No records found", and a clear "Clear Filters" or "Add New" CTA inside the table body.
*   **Loading Skeleton:** 5-10 rows of pulsing gray rectangles matching column widths.

---

## 6. CARDS

*   **Radius:** 16px. **Elevation:** Level 1. **Padding:** 24px.
*   **Hover State:** Lift up by `-2px`, increase shadow to Level 2.

| Type | Structure & Usage |
| :--- | :--- |
| **KPI Card** | Title (Label), Large Value (Display), Trend Indicator (+5% in Emerald), Sparkline chart in background. |
| **Vehicle Card** | Asset thumbnail, Status Badge (Available/In-Shop), Key Specs (Odometer), Quick Action (Dispatch). |
| **AI Insight Card** | Gradient border (Primary to Purple). Sparkle icon. Conversational text: "Fuel costs spiked 10%". Primary CTA to view details. |
| **Glass Card** | Used over maps or complex backgrounds. 60% opacity background, 12px backdrop blur. |

---

## 7. CHARTS & DATA VISUALIZATION

*   **Library Vibe:** Recharts/D3 inspired. Clean lines, minimal axes.
*   **Colors:** Use categorical palettes avoiding harsh primary reds unless indicating failure. (e.g., Azure, Emerald, Violet, Amber).
*   **Interactions:** Hovering on a data point renders a highly styled, floating Tooltip Card with exact values (using Mono font).
*   **Responsive:** All charts are fluid (`width: 100%`) and maintain aspect ratio.
*   **Empty State:** Render chart axes, but replace lines/bars with a centered "Not enough data" message.

---

## 8. OVERLAYS (Modals, Drawers, Tooltips)

### Modal (Dialog)
*   **Purpose:** Blocking tasks requiring immediate attention (e.g., Suspend Driver, Confirm Deletion).
*   **Layout:** Fixed width (400px, 600px, 800px). Centered on screen. Backdrop is `#000000` at 40% opacity with `4px` blur.
*   **Animation:** Scales up from `0.95` to `1.0`, opacity `0` to `1` in 200ms spring.

### Drawer (Slide-over)
*   **Purpose:** Complex forms, deep-dives (e.g., Create Trip Wizard, Vehicle Details) that shouldn't lose underlying context.
*   **Layout:** Slides in from right edge. Height `100vh`. Width `400px` (standard) or `800px` (large).

### Command Palette (Ctrl + K)
*   **Purpose:** Omni-search and global command execution.
*   **Layout:** Top-centered floating glass modal. Massive search input. Categorized list below.
*   **Interaction:** Arrow keys to navigate, Enter to execute.

---

## 9. STATUS & FEEDBACK COMPONENTS

### Badges (Status Indicators)
*   **Shape:** Fully rounded (`9999px`), 6px Horizontal / 2px Vertical padding. Text: 12px Medium.
*   **Success:** Emerald background at 10% opacity, Emerald text. (e.g., "Active", "Available").
*   **Warning:** Amber background 10%, Amber text. (e.g., "Maintenance Due", "Delayed").
*   **Danger:** Red background 10%, Red text. (e.g., "Suspended", "In-Shop").

### Toasts (Snackbars)
*   **Purpose:** Non-blocking system feedback.
*   **Position:** Bottom Right.
*   **Animation:** Slide up from bottom, fade in. Auto-dismiss after 4 seconds.
*   **Variants:** Success (Check icon), Error (X icon, Danger colors), Info (Info icon, Primary colors).

---

## 10. EMPTY & LOADING STATES

### Empty States
*   Never leave a blank screen. Every list, table, or container must have an empty state.
*   **Structure:**
    1.  **Illustration:** Soft, monochromatic SVG (120x120px) representing the domain (e.g., empty road for trips, clipboard for documents).
    2.  **Title:** H3, Semi-bold. (e.g., "No Trips Scheduled").
    3.  **Description:** Body text, Muted. (e.g., "Get started by creating your first dispatch.").
    4.  **CTA:** Primary Button.

### Loading States (Skeletons)
*   **Concept:** Prefer structural skeletons over generic spinners.
*   **Animation:** Shimmer effect sliding left to right across a muted gray block.
*   **Usage:** Table rows, Chart blocks, Profile headers.

---

## 11. SPECIAL / DOMAIN COMPONENTS

### Fleet Health Ring
*   **Design:** SVG circular progress ring. Thick stroke.
*   **Colors:** Transitions smoothly from Red (0-40) -> Yellow (41-79) -> Emerald (80-100).
*   **Center:** Large Mono typography displaying exact score.

### Activity / Audit Timeline
*   **Layout:** Vertical line on the left.
*   **Nodes:** Small circular dots (solid gray, or colored based on event severity).
*   **Content:** Timestamp (Mono font, muted), Actor (Strong), Action taken (Regular).

### Document Upload Card
*   **Design:** Large dashed border area.
*   **Interaction:** Dragging a file over triggers a pulse animation. Includes a visual progress bar (Primary color) during the upload phase, transforming into a Document Preview Card upon success.

---

## 12. RESPONSIVE BEHAVIOUR

| Breakpoint | Width | Global Adjustments | Component Adjustments |
| :--- | :--- | :--- | :--- |
| **Mobile** | `< 768px` | Sidebar becomes hamburger drawer. Bottom sheet for filters. | Tables become stacked cards. Modals become fullscreen. Hidden columns. |
| **Tablet** | `768px - 1024px` | Sidebar can be mini (icons only). Grid goes 2-column. | Charts scale down. Buttons might shed text for icons. |
| **Laptop** | `1024px - 1440px`| Standard Desktop layout. 12-column fluid grid. | All components display at standard sizing. |
| **Desktop**| `> 1440px` | Container locks at max-width 1440px to prevent infinite stretch. | Extra white space used elegantly. |

---

## 13. ACCESSIBILITY (A11y)

*   **Keyboard Navigation:** All interactive elements must be reachable via `Tab`. Use `Esc` to close Modals, Drawers, and Dropdowns.
*   **Focus Management:** When a modal opens, focus is trapped inside. When it closes, focus returns to the triggering element.
*   **Color Contrast:** All text must meet WCAG AA standards (4.5:1 ratio for normal text). Do not rely solely on color to convey status (use icons + text).
*   **Screen Readers:** Use `aria-live="polite"` for Toasts and dynamic AI Insights. Ensure all icon-only buttons have `aria-label`.
*   **Reduced Motion:** Respect `@media (prefers-reduced-motion: reduce)`. Disable spring physics and substitute with simple cross-fades.

---

## 14. MICRO INTERACTIONS (Motion)

*   **Philosophy:** Motion should feel physical, snappy, and purposeful. Never laggy.
*   **Curve:** Custom `cubic-bezier(0.23, 1, 0.32, 1)` for snappy entry, gentle settling.
*   **Page Transitions:** Fade in + slide up `10px` on route change (200ms).
*   **Hover Effects:** Cards lift (`translateY(-2px)`), buttons scale (`scale(0.98)`).
*   **Dropdowns:** Scale origin from the triggering click point.

*End of Design System & Component Library Specification.*
