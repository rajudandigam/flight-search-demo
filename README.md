# Flight Search Demo — Storybook + Cypress Component Testing

A small, realistic **Flight Search** app demonstrating how to scale **component-driven development** with **Storybook** and **Cypress Component Testing**, plus a thin E2E flow. Built with **React + TypeScript + Vite** and styled with **Tailwind**.

> Why this exists: modern apps have hundreds of interactive components. Testing them only with E2E is slow and flaky; unit tests miss rendering/DOM issues. **Component testing (CT)** in a **real browser** bridges the gap—fast feedback, realistic behavior, and isolated failures.

---

## ✨ What you’ll see in this repo

- **Components**  
  - `SearchForm` — args-driven stories, submit-time validation, a11y roles, keyboard focus  
  - `FlightCard` — airline logo, duration/stops column, pricing/CTA, accessibility labels
- **Pages**  
  - `Home` — full-bleed header, centered container, discover section with city images  
  - `Results` — server-like fetch of `/api/flights/search`, cards grid, loading/empty/error states
- **Storybook** (CSF) — component states used for documentation and reused in tests
- **Cypress Component Testing** — mounts stories via `composeStories`, checks behavior + a11y
- **Cypress E2E** — tiny “happy path” (search → results) smoke

---

## 🧠 Architecture & Folder Layout

```
src/
  components/
    common/
      Button/
      Field/
    layout/
      Header/
  features/
    flights/
      components/
        SearchForm/          # component + stories (+ CT)
        FlightCard/          # component + stories (+ CT)
      pages/
        Home.tsx
        Results.tsx
  cypress/
    e2e/
      search.cy.ts
    support/
      component.ts
      e2e.ts
      component-index.html
.storybook/
  main.ts
  preview.ts
cypress.config.ts
vite.config.ts
tailwind.config.js
```

---

## 🧰 Tech Stack

- **React** + **TypeScript**
- **Vite** (dev server & build)
- **Tailwind CSS** (utility-first styling)
- **Storybook** (Component Story Format, CSF)
- **Cypress 13** (Component Testing + E2E)
- **@storybook/testing-react or @storybook/react-vite** (`composeStories`)
- **@testing-library/cypress** (accessible queries like `findByRole`, `findByLabelText`)
- **cypress-axe** (accessibility audits, opt-in per spec)

---

## 🧩 Key Ideas This Project Demonstrates

1. **Storybook → single source of truth** for component states (args, decorators).  
2. **Cypress CT reuses stories** via `composeStories` to test behavior in a real browser.  
3. **A11y as a habit** — run axe checks scoped to the mounted component root.  
4. **Deterministic validation** — submit-time errors, keyboard-only navigation, roles/labels.  
5. **Thin E2E** — one small journey for confidence; keep most logic in fast CT.

---

## 🚀 Getting Started

> Requires Node 18+ (or current LTS).

```bash
# 1) Install
npm install

# 2) Run the app (Vite)
npm run dev
# opens http://localhost:5173

# 3) Run Storybook
npm run sb
# opens http://localhost:6006

# 4) Open Cypress Component Testing (interactive)
npm run cy:open
# Choose "Component Testing"

# 5) Run all CT specs headlessly (CI-style)
npm run cy:run:ct

# 6) Open Cypress E2E (interactive)
npm run cy:open
# Choose "E2E Testing"

# 7) Run E2E headlessly (CI-style)
npm run cy:run:e2e
```

> If you don’t have these scripts yet, add them under `"scripts"` in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test:ct": "cypress open --component"
  }
}
```

---

## ⚙️ Configuration Highlights

### Vite
- Standard React + TS setup; fast HMR, zero-config dev server.

### Tailwind
- `tailwind.config.js` + `postcss.config.js` wired; includes a few global utility classes (like `.inner`, `.panel`, `.card`) for layout polish.

### Storybook
- Vite builder (fast dev build)  
- CSF stories for `SearchForm` and `FlightCard` define states like:
  - `Default`, `InvalidInputs`, `CorpPolicyBanner` (SearchForm)
  - `Default`, `WithBaggageNote`, `OneStop`, etc. (FlightCard)  
- These stories are imported in CT via `composeStories`.

### Cypress (CT + E2E)
- **`cypress.config.ts`** includes both:
  - `component` block (Vite devServer, viewport ~1200×800 recommended)
  - `e2e` block (baseUrl `http://localhost:5173`)
- **Support files**:
  - `src/cypress/support/component.ts` — mounts React components, brings in `@testing-library/cypress`, and typically defines a helper like `cy.checkComponentA11y()`.
  - `src/cypress/support/e2e.ts`

---

## 🧪 Testing: What’s Covered

### Component Tests (CT)

- **SearchForm**
  - No validation on initial render; errors appear **only after submit**
  - Same-origin/destination, past date, pax < 1 rules
  - Native HTML5 `min=1` on pax: test covers `:invalid` then fixes input before submit
  - Keyboard-only navigation + a11y roles (`role="alert"`, `aria-live`)  
  - Optional corp policy banner (`role="status"`)

- **FlightCard**
  - Renders carrier name/logo, times (`hh:mm`), route (`SFO → JFK`)
  - Duration & stops in a separate column (e.g., “Nonstop” / “1 stop”)
  - Baggage note, price formatting, “Select” CTA
  - a11y checks on labels, focus targets

**CT + Story reuse**  
Each CT spec uses `composeStories` to mount Storybook stories. This avoids duplicating props/fixtures and keeps docs & tests in sync.

### E2E (thin)
- “Happy path” smoke: fill SearchForm on **Home** → navigate to **Results** → assert list renders and a selection action is possible.

---

## 🧪 Accessibility (axe)

- Add `cypress-axe` and run:
  ```ts
  cy.injectAxe();
  cy.checkA11y('[data-cy-root]', {
    rules: {
      region: { enabled: false },
      'page-has-heading-one': { enabled: false }
    }
  });
  ```
- This scopes audits to the mounted component (so you don’t get page-level landmark noise in CT).

---

## 🌍 Running Scenarios

### App (Vite)
- `npm run dev`  
  Home page includes header + centered container + discover section with real images for: Paris, San Francisco, Tokyo, New York, Honolulu, London.  
  Search triggers a fetch to `/api/flights/search` and navigates to Results.

### Storybook
- `npm run sb`  
  Browse the states of each component (great for design review and quick manual checks).

### Cypress CT
- `npm run cy:open` → Component Testing  
  Run specs for `SearchForm` and `FlightCard`. Assertions cover behavior and a11y.

### Cypress E2E
- `npm run cy:open` → E2E Testing  
  Run the main smoke journey (search → results).

---

## 🧾 Notes & Tips

- **Viewport:** In CT, use a desktop-ish viewport so cards/forms don’t collapse:
  ```ts
  // cypress.config.ts
  component: { viewportWidth: 1200, viewportHeight: 800 }
  ```
- **Testing Library:** Make sure `@testing-library/cypress` is imported in support so `findByRole`, `findByLabelText` work in all specs.
- **Submit-time validation:** The form waits for submit to show errors (keeps UX calm). CT asserts this behavior explicitly.

---

## 📋 Scripts (summary)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test:ct": "cypress open --component"
  }
}
```

---

## 🔗 Links

- Repository: **github.com/rajudandigam/flight-search-demo**
