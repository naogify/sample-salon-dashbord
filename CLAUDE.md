@AGENTS.md

# Salon Management Dashboard (#She nail & eyelash POS)

Next.js App Router + Tailwind CSS + shadcn/ui salon POS dashboard.

## Tech Stack
- Next.js (App Router), TypeScript, Tailwind CSS v4
- UI: shadcn/ui (components/ui/)
- Icons: lucide-react
- Data: mock data in lib/mock-data.ts (no API)

## File Map

### Pages (app/)
- `app/layout.tsx` — Root layout. Sidebar + Header + main
- `app/page.tsx` — Dashboard. KPIs, staff sales ranking, category/channel sales charts. Period switcher
- `app/pos/page.tsx` — POS register. Menu search/category filter + cart + checkout
- `app/reservations/page.tsx` — Reservations. Day navigator + staff×time timeline grid + new reservation dialog
- `app/customers/page.tsx` — Customer list. Search/source filter/sort + detail dialog
- `app/reports/page.tsx` — Reports (placeholder, not implemented)
- `app/settings/page.tsx` — Settings (placeholder, not implemented)
- `app/staff/page.tsx` — Staff management (placeholder, not implemented)
- `app/globals.css` — Global CSS. Color theme via CSS variables

### Layout (components/layout/)
- `header.tsx` — Header bar. Page title, store selector, notification/dark-mode/logout buttons, profile dialog
- `sidebar.tsx` — Sidebar nav. Hamburger menu on mobile. Links from NAV_ITEMS

### Dashboard (components/dashboard/)
- `kpi-cards.tsx` — 4 KPI cards: sales, visitors, new customers, average spend
- `period-tabs.tsx` — Period switcher tabs: today/week/month/custom
- `staff-kpi-table.tsx` — Staff sales ranking table
- `category-sales.tsx` — Category sales horizontal bar chart
- `channel-sales.tsx` — Channel (source) sales horizontal bar chart

### POS (components/pos/)
- `menu-search.tsx` — Menu name search input
- `category-tabs.tsx` — Category filter tabs
- `menu-grid.tsx` — Menu card grid
- `menu-card.tsx` — Single menu card. Price, duration, add-to-cart
- `cart.tsx` — Cart. Staff select, subtotal, discount, checkout button

### Reservations (components/reservations/)
- `day-navigator.tsx` — Date prev/next + calendar picker + new reservation button
- `timeline-grid.tsx` — Staff × time timeline grid
- `reservation-block.tsx` — Reservation block. Click for detail dialog
- `new-reservation-dialog.tsx` — New reservation dialog. Customer search, source, treatment space, menu select
- `source-legend.tsx` — Source color legend

### Customers (components/customers/)
- `customer-search.tsx` — Customer name search input
- `source-filter.tsx` — Source filter button group
- `customer-table.tsx` — Customer table. Sortable by name/visit count/last visit
- `customer-detail-dialog.tsx` — Customer detail dialog. Visit history, allergies, notes
- `source-badge.tsx` — Colored source badge

### UI (components/ui/) — shadcn/ui primitives
badge, button, card, dialog, input, select, table, tabs

### Library (lib/)
- `types.ts` — Types: Source, Category, TreatmentSpace, Staff, MenuItem, Customer, Reservation
- `constants.ts` — Constants: SOURCE_COLORS/LABELS, CATEGORY_COLORS, NAV_ITEMS, STORES, business hours
- `mock-data.ts` — Mock data: staffList, menuItems, customers, reservations, dashboardKpi
- `utils.ts` — Utility: cn() (clsx + tailwind-merge)

## Styling Notes
- Colors use CSS variables defined in globals.css. Use variables, not hardcoded colors
- Responsive: sidebar hidden on mobile (hamburger), grid columns adapt
- Dark mode: .dark section in CSS variables
