# Change Log

## Fix iPhone white borders (top and bottom)

- Context: On iOS Safari, the page showed white bands at the top/bottom that didn’t match the gradient background.

### What changed

- `style.css`
  - Switched `body` from `background-attachment: fixed` to `background-attachment: scroll` to avoid iOS Safari rendering glitches.
  - Ensured the background paints on `html` and the body fills the viewport using dynamic viewport units and iOS-specific fallbacks:
    - `min-height: 100vh`, `height: 100%`, `width: 100%` on `body`.
    - `html { height: 100%; background: var(--bg-color); }`
    - `@supports (height: 100dvh) { body { height: 100dvh; } }`
    - `@supports (-webkit-touch-callout: none) { body { height: -webkit-fill-available; } }`
  - Updated `.background-layer` to cover the full viewport using `top/right/bottom/left: 0` and edge-based sizing, with support for `100dvh` and `-webkit-fill-available` fallbacks to respect dynamic UI chrome.

- `index.html`
  - Added `<meta name="theme-color" content="#667eea">` so browser UI bars better match the page’s gradient on mobile.

### Why this fixes it

- iOS Safari’s `100vh` doesn’t account for dynamic UI chrome; it often leaves visible white gaps. Using `100dvh` where supported and `-webkit-fill-available` as fallback ensures the app background fills the visible space.
- Avoiding `background-attachment: fixed` sidesteps known iOS compositing issues with gradients and fixed backgrounds.
- Covering the viewport with the `.background-layer` via inset edges rather than `vh` helps respect safe areas and dynamic toolbar resizing.
- `theme-color` reduces visual mismatch by tinting the browser chrome to the app’s accent.

### Validation

- Preview locally on iOS Safari (and cross-check in Chrome mobile). Rotate device and open/close the address bar; ensure no white bands appear.
  - Key selectors: `body`, `html`, `.background-layer`.
  - Responsive checks: portrait, landscape, and small-height devices.

### Notes

- If you prefer a darker bar in dark mode, you can set `theme-color` dynamically based on current theme.