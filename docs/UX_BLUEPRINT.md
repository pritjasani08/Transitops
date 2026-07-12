# TransitHub UX Blueprint

## UX Principles
Every screen within TransitHub adheres to the following principles, inspired by Stripe, Linear, and Vercel:
1. **Insight-First:** Answer "What needs my attention?" before showing raw data.
2. **Action-Oriented:** Every view must provide a clear "next step".
3. **Clarity over Density:** Avoid wall-to-wall tables. Use generous whitespace, clear typography, and progressive disclosure.
4. **Keyboard-Centric:** Power users should be able to navigate entirely via keyboard (e.g., `CTRL + K`).
5. **Contextual Isolation:** Users in different roles operate in distinct mental models; do not force shared generic views.

---

## 1. Authentication Experience
*Inspired by Linear and Clerk.*

### Login Screen
- **Purpose:** Secure, frictionless entry.
- **Layout:** 50/50 Split Screen (Desktop). Left: Immersive, brand-focused hero graphic with subtle animations (e.g., glowing route lines on a dark canvas). Right: Centered, minimal form.
- **Form Width:** Max 400px.
- **Section Hierarchy:** 
  1. TransitHub Logo & "Welcome back"
  2. Single Sign-On (Google CTA - Primary visual weight)
  3. "Or continue with email" divider
  4. Email & Password fields (Floating labels, instant inline validation)
  5. Primary CTA: "Log In"
- **Micro Interactions:** Password visibility toggle. Input focus creates a subtle, glowing primary-colored ring.
- **Loading State:** CTA button text becomes a smooth, spinning loader. Form inputs disable gracefully (opacity 50%).
- **Error State:** Inline red text below the specific input, accompanied by a soft vibration animation on the input field.

### Signup / Forgot Password / Reset
- Follows the identical spatial layout as Login.
- **Signup:** Adds a "Select your role" card grid (Fleet, Dispatch, Safety, Finance) before submission. Each card has a hover elevation and click state.
- **Success Experience:** A sleek, center-screen checkmark animation that seamlessly scales into the workspace dashboard.

---

## 2. Global Application Layout
*The persistent shell around every workspace.*

### Left Sidebar
- **Behavior:** Expandable/Collapsible.
- **Header:** Workspace Switcher (if multi-role) showing current context (e.g., "Dispatch Ops").
- **Navigation Items:** Distinct per workspace. Active state is highlighted with a primary-colored background and a left-aligned vertical indicator bar.
- **Footer:** User Profile snippet (Avatar, Name, Role) and "Settings" link.

### Top Navigation (Context Bar)
- **Left:** Breadcrumbs (e.g., `Fleet / Vehicle Registry / MH-12-AB`).
- **Right:** 
  - Global Search / Command Center Trigger (`CTRL + K` visual hint)
  - Activity Bell (with pulsing red dot for unread urgent items)
  - Theme Toggle (Sun/Moon icon)

---

## 3. Fleet Workspace (Target: Fleet Manager)
*Inspired by Fleetio and Motive. Focused on asset health.*

### Fleet Landing Dashboard
- **Above the Fold:** 
  - **Greeting & AI Insight:** "Good morning. 3 vehicles require immediate maintenance."
  - **Hero KPIs (4 Cards):** Fleet Health Score, Total Assets, Vehicles In-Shop, 30-Day Utilization Rate.
- **Below the Fold:**
  - **Left (2/3 width):** Maintenance Pipeline (Timeline view of upcoming and active repairs).
  - **Right (1/3 width):** Expiring Documents widget.

### Vehicle Registry
- **Purpose:** Centralized asset database.
- **Above the Fold:** 
  - Title & Quick Search/Filter Bar. 
  - Primary CTA: "+ Add Vehicle" (Opens a side-drawer, not a modal, to preserve context).
- **Primary Section:** Data Grid (Table).
  - Columns: Image, Registration, Status Badge, Odometer, Next Service, Health Indicator.
  - Context Menu (Hover): Edit, Log Fuel, Schedule Maintenance.
- **Empty State:** Parked truck illustration -> "No vehicles registered. Add your first asset."

### Vehicle Detail
- **Header:** Vehicle Name, Registration Plate badge, Large Status Dropdown.
- **Content:** Tabbed navigation (Overview, Trips, Maintenance, Fuel Logs, Documents).
- **Widgets:** Circular gauge for Fleet Health Score.

---

## 4. Dispatch Workspace (Target: Dispatcher)
*Inspired by Uber Freight. Focused on velocity and matching.*

### Dispatch Landing Dashboard
- **Above the Fold:**
  - **Hero KPIs:** Active Deliveries, Unassigned Trips, Delayed Trips, Driver Availability (%).
  - **Live Dispatch Map/Timeline:** Visual representation of active loads in transit.
- **Below the Fold:** Urgent action required queue (e.g., "Trip #102 driver delayed").

### Dispatch Queue
- **Layout:** Kanban board or dense list view.
- **Cards:** Source -> Destination, Cargo Weight, Required Vehicle Type, ETA.
- **Drag-and-Drop:** Ability to drag an unassigned trip onto an available driver card.

### Create Trip Wizard
- **Layout:** Full-screen modal to remove distractions.
- **Steps:** 
  1. Route & Cargo (Source/Dest inputs with autocomplete).
  2. Vehicle Matching (Filters out incompatible/in-shop vehicles).
  3. Driver Assignment (Filters out resting/non-compliant drivers).
  4. Review & Dispatch.

---

## 5. Safety Workspace (Target: Safety Officer)
*Inspired by Enterprise Compliance Software. Focused on risk.*

### Safety Landing Dashboard
- **Hero KPIs:** Global Safety Score, Active Suspensions, Upcoming Renewals, Incident Rate.
- **Alerts Section (Top Priority):** Red/Yellow cards highlighting critical compliance failures (e.g., "Driver X license expired today").
- **Charts:** Safety trend over 6 months (Line chart).

### Driver Directory & Profile
- **Directory:** Grid of driver cards. Visual indicator (Green/Yellow/Red ring around avatar) for safety status.
- **Profile:** Deep dive into incident logs, uploaded licenses (previewable), and training completion.
- **Primary Action:** "Suspend Driver" (Requires mandatory reason input in a modal).

---

## 6. Finance Workspace (Target: Financial Analyst)
*Inspired by Stripe Dashboard. Focused on numbers, trends, and exports.*

### Finance Landing Dashboard
- **Hero KPIs:** MTD Expenses, Fuel Cost, Maintenance Cost, Cost Per Mile.
- **Primary Section:** Massive, interactive Area Chart comparing this month vs last month's operational costs.
- **Secondary Section:** Top expense anomalies (e.g., "Vehicle Y fuel costs spiked 20%").
- **Quick Actions:** "Export Monthly P&L", "Log Manual Expense".

---

## 7. Global Workspaces & Centers

### Notification Workspace (Not a drawer)
- **Layout:** Split view. Left pane: Categories (Unread, Fleet, Dispatch, System) and list of items. Right pane: Detail view of selected notification.
- **Actions:** Contextual buttons directly inside the notification (e.g., "Approve Estimate" inside a maintenance notification).

### Command Center (`CTRL + K`)
- **Experience:** Instantly blurs the background. 
- **Hierarchy:** 
  - Search Input (Massive typography).
  - "Suggestions" (if empty) -> Go to Dashboard, Create Trip, Add Vehicle.
  - "Results" (as typing) -> Categorized (e.g., [Drivers] John Doe, [Vehicles] MH-12).
- **Keyboard Navigation:** Up/Down arrows to select, Enter to execute.

### Document Center
- **Layout:** File-explorer style grid/list. 
- **Cards:** Document thumbnail, Entity Tag (Vehicle/Driver), Expiry Date pill.
- **Upload:** Persistent floating action button or drag-and-drop zone over the entire content area.

---

## 8. Design System & Enterprise Tokens

### Tokens
- **Grid:** 12-column fluid grid. Max container width 1440px for ultra-wides, scaled down for laptops.
- **Typography:** 
  - Headings: Inter, tightly tracked, semi-bold.
  - Data points: JetBrains Mono for tabular alignment.
- **Spacing:** Base unit 4px. Typical block margins 24px or 32px.
- **Border Radius:** `14px` for buttons/inputs, `18px` for cards, `24px` for modals.
- **Shadows:** 
  - Cards: `0 2px 8px rgba(0,0,0,0.04)` (Very soft)
  - Modals: `0 24px 48px rgba(0,0,0,0.12)` (Deep)
- **Glass Effects:** Used exclusively for the Command Center, Sticky Headers, and Toast Notifications (Backdrop blur 12px, background opacity 60%).

### States
- **Loading:** Skeleton loaders matching the exact shape of the incoming content. No generic spinners except inside buttons.
- **Empty:** High-quality, monochromatic SVG illustrations that match the brand, accompanied by a clear, primary CTA.
- **Dark Mode:** Deep charcoal (`#0B1220`) background, elevated surfaces (`#111827`). Borders use subtle opacity (`rgba(255,255,255,0.1)`).

---

## 9. Final UX Review & Critique
- **Complexity Check:** By isolating workspaces, we have successfully removed cognitive overload. A Dispatcher never sees fuel cost graphs; a Finance Analyst never sees routing maps.
- **Productivity Focus:** The Command Center (`CTRL + K`) is the ultimate productivity hack, bypassing clicks.
- **Apple/Stripe Polish:** The use of glassmorphism is restrained to structural elements, keeping data clean and readable. The reliance on contextual AI insights shifts the software from a "dumb database" to a "smart assistant."
- **Scalability:** The architecture perfectly scales. Adding a new module (e.g., IoT Telemetry) simply requires injecting a new route into the Fleet Workspace without breaking the Dispatch or Finance views.
