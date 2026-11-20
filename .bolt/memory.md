# Project memory

## Product intent & audience

- BLINK Digital Bank: a web-based digital banking simulation, not a real financial product.
- Built with Vite + React + Tailwind CSS.
- Core modules: Savings (Simpanan), Giro, Time Deposits (Deposito).
- User must create an account before accessing product features (e.g., virtual card appears on Simpanan page after account creation).
- UI labels and user communication are in Indonesian.

## Brand personality & voice

- Brand name: BLINK.
- Slogan/tagline: "Smart Banking, Happy Living" — shown below BLINK logo in navbar and on card front.
- Mascot: Binky, a cute pig character; used as a friendly, playful brand element across the app.
- Tone: friendly, playful, approachable digital banking.

## Visual design & UX direction

- Overall layout: Bento-Grid design pattern.
- Navbar: floating header with BLINK logo; slogan placed directly below logo; slogan auto-hidden on very small screens to keep navbar clean.
- Virtual debit/ATM card:
  - 3D flip animation triggered by clicking the card or a toggle button ("Balik Kartu" ↔ "Lihat Depan").
  - Front: purple-to-pink pastel gradient, BLINK logo + slogan, account number, customer name, balance (with hide/unhide toggle).
  - Back: large Binky pig illustration centered, black magnetic strip near top, signature panel, simulated CVV.
  - Button placed below the card for flip control.
- Icons: lucide-react only.
- Imports: use `@/` path alias (maps to `src/`); avoid deep relative paths.
- Responsive considerations: hide secondary navbar text on very small screens.

## Decisions, constraints & rationale

- No extra UI/icon packages beyond lucide-react unless explicitly requested.
- Simulated financial data only (CVV, balance, account number are mock/simulated).
- Balance hide/unhide pattern already implemented on the virtual card.
- Flip interaction supports both direct card click and an explicit button for discoverability.

## Open questions & assumptions

- Binky mascot illustration is rendered in-app (assumed CSS/SVG/inline); no external image asset pipeline confirmed.
- Exact module scope and routing structure for Giro and Deposito not yet detailed.
- No backend or persistence assumed; state is client-side simulation only.