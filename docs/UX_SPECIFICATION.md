# TransitHub: Complete UX Blueprint & Frontend Design Specification

## 1. DESIGN SYSTEM & TOKENS

Inspired by Apple, Stripe, and Linear.

*   **Grid:** 8px base grid system. 12-column layout for main content.
*   **Typography:** Inter for UI elements, JetBrains Mono for data/numbers.
*   **Colors:** 
    *   Primary: Royal Blue (`#2563EB`)
    *   Secondary: Emerald (`#10B981`)
    *   Surface/Cards: `#1F2937` (Dark Mode), `#FFFFFF` (Light Mode)
    *   Background: `#0B1220` (Dark Mode), `#F9FAFB` (Light Mode)
*   **Border Radius:** 
    *   Cards/Modals: 16px (`rounded-2xl`)
    *   Buttons/Inputs: 12px (`rounded-xl`)
    *   Badges: 9999px (`rounded-full`)
*   **Shadows:** Soft, diffused shadows (`0 4px 20px rgba(0,0,0,0.05)`).
*   **Icons:** Lucide Icons (stroke-width 2, consistent 20px/24px sizing).
*   **Animations:** Spring-based (`framer-motion`), 200-300ms duration, smooth easing.
*   **Micro Interactions:** Hover elevation on cards, scale down (`0.98`) on button press, focus rings (`ring-2 ring-primary/50`).

---

## 2. GLOBAL APPLICATION

### 2.1 Authentication (Login / Signup)
1. **Screen Name:** Secure Entry Gateway (Login/Register)
2. **Purpose:** Authenticate users and route them to their role-specific workspace.
3. **User Flow:** User lands -> Views brand value prop -> Enters credentials/Google SSO -> Routed to Fleet/Dispatch/Safety/Finance workspace.
4. **Layout Structure:** 50/50 Split Screen (Desktop). Left: Immersive brand illustration. Right: Form container.
5. **Sections:** Hero Branding (Left), Auth Card (Right).
6. **Components:** Floating label inputs, SSO Buttons, Role Selector (Signup).
7. **User Actions:** Input credentials, Toggle password visibility, Select SSO, Reset password.
8. **Responsive Behaviour:** Left hero hides on mobile, form centers.
9. **Empty State:** N/A.
10. **Loading State:** Button transitions to a spinner, inputs disable (50% opacity).
11. **Accessibility Notes:** ARIA labels on inputs, keyboard navigable form, high contrast focus rings.
12. **UX Improvements:** Auto-focus first input. Instant inline validation on blur.

### 2.2 Global Layout Shell
1. **Screen Name:** Workspace Shell
2. **Purpose:** Provide persistent navigation and global tools.
3. **User Flow:** Persistent across all authenticated routes.
4. **Layout Structure:** Left Sidebar (Role-specific), Top Navbar, Main Content Canvas.
5. **Sections:** 
    *   **Sidebar:** Branding, Workspace Title, Nav Links, Settings.
    *   **Top Navbar:** Breadcrumb, Command Palette Trigger, Notification Bell, Profile Menu.
6. **Components:** Collapsible Sidebar, Breadcrumb Trail, User Avatar, Quick Action FAB.
7. **User Actions:** Navigate, Open Command Palette, View Notifications, Toggle Theme.
8. **Responsive Behaviour:** Sidebar converts to a slide-out drawer on mobile (Hamburger menu).
9. **Empty State:** N/A.
10. **Loading State:** Skeleton blocks for nav items during initial load.
11. **Accessibility Notes:** Skip-to-content link, semantic `<nav>`, `<header>`, `<main>`.
12. **UX Improvements:** Command Palette (`Ctrl+K`) reduces reliance on mouse navigation.

---

## 3. FLEET WORKSPACE

### 3.1 Fleet Dashboard
1. **Screen Name:** Fleet Control Center
2. **Purpose:** High-level overview of asset health and utilization.
3. **User Flow:** Daily login -> Scan KPIs -> Check AI Insights -> Action pending maintenance.
4. **Layout Structure:** Header -> Insight Cards -> Chart Grid -> Activity Feed.
5. **Sections:** Hero KPIs, AI Recommendations, Utilization Chart, Needs Attention List.
6. **Components:** Glassmorphic KPI Cards, Recharts Area Chart, Alert List Items.
7. **User Actions:** Click KPI to filter registry, Dismiss AI recommendation, Quick schedule maintenance.
8. **Responsive Behaviour:** Grid goes from 4 cols (Desktop) to 1 col (Mobile).
9. **Empty State:** "Add your first vehicle" illustration.
10. **Loading State:** Staggered skeleton fade-in.
11. **Accessibility Notes:** Charts include screen-reader accessible data tables.
12. **UX Improvements:** AI Insight cards push actionable tasks to the top, preventing data hunting.

### 3.2 Vehicle Registry
1. **Screen Name:** Master Vehicle Asset Registry
2. **Purpose:** Manage the complete fleet inventory.
3. **User Flow:** Open Registry -> Search/Filter -> View Details or Add New.
4. **Layout Structure:** Toolbar (Search/Filters) -> Data Table -> Pagination.
5. **Sections:** Search & Filter Bar, Bulk Actions Row, Main Table.
6. **Components:** Advanced Data Table, Multi-select checkboxes, Status Badges.
7. **User Actions:** Search, Filter by Status/Type, Export CSV, Bulk Update, Click row for details.
8. **Responsive Behaviour:** Table transforms into stacked cards on mobile.
9. **Empty State:** "No vehicles found matching criteria." Clear filters button.
10. **Loading State:** Table skeleton with 5 shimmering rows.
11. **Accessibility Notes:** `aria-sort` on column headers.
12. **UX Improvements:** Sticky table headers. Save custom filter views.

### 3.3 Vehicle Details
1. **Screen Name:** Vehicle 360 View
2. **Purpose:** Deep dive into a single asset's history and health.
3. **User Flow:** Click from Registry -> View Overview -> Tab through Maintenance/Documents.
4. **Layout Structure:** Hero Profile Header -> Tab Navigation -> Tab Content Area.
5. **Sections:** Vehicle Hero (Image, Reg Plate, Status), Quick Stats, Tabs (Overview, Trips, Maintenance, Documents, Timeline).
6. **Components:** Circular Progress (Health Score), Tab Group, Timeline List.
7. **User Actions:** Change Status, Upload Document, Schedule Maintenance.
8. **Responsive Behaviour:** Tabs become a scrollable horizontal row on mobile.
9. **Empty State:** Empty states specific to tabs (e.g., "No maintenance records yet").
10. **Loading State:** Hero skeleton and content skeleton.
11. **Accessibility Notes:** Keyboard navigation between tabs.
12. **UX Improvements:** Contextual floating action button based on the active tab (e.g., "Upload" on Documents tab).

---

## 4. DISPATCH WORKSPACE

### 4.1 Dispatcher Dashboard
1. **Screen Name:** Logistics Command Center
2. **Purpose:** Real-time monitoring of active trips and unassigned queue.
3. **User Flow:** Login -> Monitor active map/timeline -> Assign drivers to pending trips.
4. **Layout Structure:** Hero KPIs -> Active Trips Timeline -> Pending Queue.
5. **Sections:** Live Metrics (Active, Delayed, Pending), Map Placeholder, Queue List.
6. **Components:** Pulse indicators for active trips, Drag-and-drop queue cards (Future).
7. **User Actions:** Quick dispatch, View trip details, Contact driver.
8. **Responsive Behaviour:** Map hides on mobile, lists take priority.
9. **Empty State:** "No active trips right now. Kick back or schedule one."
10. **Loading State:** Shimmering map placeholder and queue items.
11. **Accessibility Notes:** Live region announcements for trip status changes.
12. **UX Improvements:** Color-coded urgency indicators on queue items.

### 4.2 Create Trip Wizard
1. **Screen Name:** Intelligent Dispatch Wizard
2. **Purpose:** Frictionless creation of new logistics trips.
3. **User Flow:** Open Wizard -> Enter Route -> Select Vehicle -> Select Driver -> Review & Dispatch.
4. **Layout Structure:** Full-screen modal or slide-over drawer to maintain focus. Stepper Header -> Form Area -> Footer Actions.
5. **Sections:** Route Info, Asset Matching, Driver Matching, Summary.
6. **Components:** Step Indicator, Autocomplete Inputs, Filtered Selection Cards.
7. **User Actions:** Next/Previous step, Select Asset, Confirm Dispatch.
8. **Responsive Behaviour:** Full screen on mobile, drawer on desktop.
9. **Empty State:** N/A.
10. **Loading State:** Inline loading when calculating distance/ETA.
11. **Accessibility Notes:** Focus trapping inside the modal.
12. **UX Improvements:** Auto-filtering unavailable drivers/vehicles prevents dispatch errors before they happen.

---

## 5. SAFETY WORKSPACE

### 5.1 Safety Dashboard
1. **Screen Name:** Compliance & Risk Overview
2. **Purpose:** Monitor fleet safety scores and identify compliance risks.
3. **User Flow:** Login -> Review Global Safety Score -> Action compliance alerts (expiring licenses).
4. **Layout Structure:** Hero Score -> Urgent Alerts -> Driver Leaderboard (Bottom/Top).
5. **Sections:** Safety KPI, Incident Alerts, Top Performers, High-Risk Drivers.
6. **Components:** Gauge Chart (Score), Alert Banner Cards, Avatar Lists.
7. **User Actions:** View incident, Suspend driver, Send reminder.
8. **Responsive Behaviour:** 2-column grid collapses to single column.
9. **Empty State:** "100% Compliant. No active alerts." (Success State illustration).
10. **Loading State:** Gauge skeleton, list skeleton.
11. **Accessibility Notes:** High contrast colors for alerts (Red/Yellow).
12. **UX Improvements:** One-click "Send Reminder" button next to expiring document alerts.

### 5.2 Driver Profile
1. **Screen Name:** Driver Safety 360
2. **Purpose:** Comprehensive view of a driver's performance and credentials.
3. **User Flow:** Click from Directory -> View Score -> Check License -> Review Incident History.
4. **Layout Structure:** Profile Hero -> Safety Score Chart -> Document Previews -> Incident Timeline.
5. **Sections:** Hero, License Details, Performance Graph, Audit Trail.
6. **Components:** Radar Chart (Performance), Document Thumbnail Cards.
7. **User Actions:** Renew License, Log Incident, Suspend/Activate.
8. **Responsive Behaviour:** Standard stacking.
9. **Empty State:** "No incidents recorded."
10. **Loading State:** Standard skeleton block.
11. **Accessibility Notes:** Alt text for document previews.
12. **UX Improvements:** Visual timeline of the driver's tenure and milestones.

---

## 6. FINANCE WORKSPACE

### 6.1 Finance Dashboard
1. **Screen Name:** Financial Analytics Center
2. **Purpose:** Track expenses, fuel costs, and calculate ROI.
3. **User Flow:** Login -> Review MTD Expenses -> Analyze cost breakdowns -> Export reports.
4. **Layout Structure:** Financial KPIs -> Large Trend Chart -> Expense Breakdown (Donut) -> Recent Transactions.
5. **Sections:** Metrics, Trend Analysis, Category Breakdown, Transaction Ledger.
6. **Components:** Area Chart, Donut Chart, Mini-Ledger Table.
7. **User Actions:** Change date range, Export PDF/CSV, Drill down into categories.
8. **Responsive Behaviour:** Charts scroll horizontally on mobile.
9. **Empty State:** "No financial data for this period."
10. **Loading State:** Chart skeletons (animated grid lines).
11. **Accessibility Notes:** Tabular data alternative for charts.
12. **UX Improvements:** "Export" is a primary action universally available on this dashboard.

---

## 7. SHARED MODULES

### 7.1 Command Palette (Ctrl+K)
1. **Screen Name:** Global Omni-Search
2. **Purpose:** Instant, keyboard-driven navigation and action execution.
3. **User Flow:** Press Ctrl+K -> Type -> Select Result -> Navigate/Execute.
4. **Layout Structure:** Floating centered modal over blurred background.
5. **Sections:** Search Input, Suggestions/Recent, Categorized Results.
6. **Components:** Headless Combobox, Highlighted Text.
7. **User Actions:** Type, Navigate with arrows, Press Enter.
8. **Responsive Behaviour:** Takes up upper 80% of screen on mobile.
9. **Empty State:** "No results found for '...'".
10. **Loading State:** Inline spinner in input.
11. **Accessibility Notes:** `role="combobox"`, `aria-expanded`, focus management.
12. **UX Improvements:** Support natural language commands (e.g., "Add vehicle").

### 7.2 Notification Workspace
1. **Screen Name:** Notification Inbox
2. **Purpose:** Centralized hub for all system, fleet, and compliance alerts.
3. **User Flow:** Click Bell -> View Inbox -> Filter by Category -> Action/Mark Read.
4. **Layout Structure:** Split View (Categories on left, List on right).
5. **Sections:** Category Sidebar, Notification List, Action Bar.
6. **Components:** Unread Badges, Notification Cards with inline actions.
7. **User Actions:** Mark all read, Filter, Click inline action (e.g., "View Trip").
8. **Responsive Behaviour:** Mobile uses a single list view with dropdown filter.
9. **Empty State:** "You're all caught up!" illustration.
10. **Loading State:** List skeleton.
11. **Accessibility Notes:** `aria-live` regions for new notifications.
12. **UX Improvements:** Inline actions prevent context switching.

---

## 8. EXTRA FEATURES & UX UPGRADES

*   **Fleet Health Score:** A proprietary algorithm visualizing asset health as a single 0-100 score, using a beautiful circular gauge.
*   **AI Recommendation Cards:** Subtle, non-intrusive cards appearing at the top of dashboards. "Smart Insights: Tire costs are up 15%. Click to analyze."
*   **Toast Notifications:** Non-blocking, animated popups at the bottom-right for CRUD operations ("Vehicle saved successfully").
*   **Skeleton Loading:** No blank white screens. Every page uses shimmering gray blocks that match the final content structure, reducing perceived load time.
*   **Beautiful Empty States:** Every empty table or list features a custom, brand-colored illustration with a clear call-to-action button, ensuring dead-ends don't exist.
*   **Document Expiry Tracker:** Visual progress bars on document cards that turn from Green (Valid) to Orange (Expiring) to Red (Expired).

---
*End of UX Blueprint.*
