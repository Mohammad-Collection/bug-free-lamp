# bug-free-lamp

This repo still lacks the Shopify theme/app source. To directly fix your slow
"reveal image" or video playback, please add the Liquid templates, JS, and CSS
that control the effect (usually in `sections/*`, `snippets/*`, and
`assets/*.js|.css`). Once those files are present, I can apply and test a code
change for you.

Until then, follow this focused checklist to remove the 5-second delay (the
wait you see before the image/video/3D element actually appears or starts
playing) and speed up the reveal. The delay is usually caused by a `setTimeout`
in the theme JS or by a heavy asset blocking the main thread; the notes below
explain exactly where to look:

## Find the code that runs the reveal
- Search JavaScript in `assets/` for handlers on `scroll`, `hover`, or
  `IntersectionObserver` tied to image/video elements. Keywords to grep: `reveal`,
  `setTimeout`, `lazy`, `poster`, `video`, `3d`, `play()`, `load()`, and class
  names on the affected section.
- Inspect the section/snippet Liquid where the reveal lives; note any `data-*`
  attributes, `loading="lazy"`, or inline scripts that control timing.

## Remove or shrink the delay
- Look for `setTimeout` values around `5000` (5 seconds). Common places:
  - `assets/theme.js`, `assets/custom.js`, or a similarly named bundle.
  - Inline scripts inside the Liquid section that renders the reveal block
    (e.g., `sections/*reveal*`, `sections/main-product.liquid`, or the snippet
    that holds the media).
  - A library init function that waits for "page ready" and then delays
    another 5000 ms before starting. Search for keywords: `reveal`, `hero`,
    `video`, `model`, `3d`, `lazy`, `play`, `load`.
- If you find code like `setTimeout(startReveal, 5000)`, reduce it to `250` ms or
  remove it entirely if not required.
- If the delay defers media loading, swap it with an `IntersectionObserver` so
  media starts as soon as the section is near the viewport:

  ```js
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    startReveal();
    observer.disconnect();
  }, { rootMargin: '200px 0px' });

  observer.observe(document.querySelector('[data-reveal]'));
  ```

### If you found a 5s setTimeout, remove this whole wrapper
- Delete everything from the opening `setTimeout` line down to its closing `},
  5000);` line (or whatever millisecond value you see). A common pattern:

  ```js
  // Remove everything in this block ↓↓↓
  setTimeout(() => {
    startReveal();
    // any other reveal-related calls
  }, 5000);
  // Stop deleting here ↑↑↑
  ```

- Keep the inside logic, just run it immediately instead of after 5s:

  ```js
  startReveal();
  // any other reveal-related calls that were inside the timeout
  ```

- If you want to be certain about what to delete, temporarily insert
  comment markers before and after the timeout, then remove the marked block:

  ```js
  // BEGIN REMOVE (5s delay)
  setTimeout(() => {
    startReveal();
    initHeroVideo();
    preloadModel();
  }, 5000);
  // END REMOVE (5s delay)
  ```

  Delete everything between `BEGIN REMOVE` and `END REMOVE` (including those
  two lines), then keep the inner calls in place:

  ```js
  startReveal();
  initHeroVideo();
  preloadModel();
  ```

## Speed up media delivery
- Provide a `poster` attribute on videos to avoid blank frames, e.g.
  `<video muted playsinline preload="metadata" poster="{{ poster | img_url: '720x' }}">`.
- Use compressed sources (`mp4`/H.264) and keep 3D assets small; host them on the
  CDN configured in your theme settings.
- Ensure images use modern formats (`webp`, `avif`) with explicit sizes to avoid
  layout shifts.

## Make the main thread lighter
- Mark non-critical scripts `defer` or move them to the footer so they don't
  block rendering.
- Avoid synchronous loops during `DOMContentLoaded`; wrap optional work in
  `requestIdleCallback` when available.

## Measure and confirm
- In Chrome DevTools Performance tab, record the page load and the moment you
  trigger the reveal. Remove scripts or styles that show up as long tasks.
- In Network tab, confirm no single asset blocks for ~5s; if it does, reduce its
  size or load it after the reveal completes.

## Can you run or test it for me?
I can't run or test anything yet because the Shopify theme files (Liquid,
JavaScript, CSS, assets) aren't in this repo. Once you add them, I can:

- Run theme linting (`shopify theme check`) and any repo scripts you include.
- Open the section/snippet that controls the reveal, remove the 5s delay, and
  verify the behavior in a local preview.
- Capture performance timings (e.g., before/after video start or image reveal)
  to confirm the fix.

If you want me to run checks now, please commit or paste the relevant theme
files—especially the section or snippet with the reveal code and its related
`assets/*.js` file.

Share the relevant theme files here after these steps, and I'll apply the exact
code changes and verify them.
