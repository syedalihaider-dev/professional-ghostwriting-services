/**
 * Reveal signals.
 * - Loader: fires once, when the first-visit preloader hands over.
 * - Reveal: fires whenever fresh page content becomes visible — after the
 *   preloader on first load, and after every page transition. Entrance
 *   animations and autoplaying films wait on `onReveal`.
 */
let loaderDone = false;
let transitioning = false;
const loaderListeners = new Set<() => void>();
const revealListeners = new Set<() => void>();

function flushReveal() {
  if (!loaderDone || transitioning) return;
  const fns = [...revealListeners];
  revealListeners.clear();
  fns.forEach((fn) => fn());
}

export function markLoaderDone() {
  if (loaderDone) return;
  loaderDone = true;
  loaderListeners.forEach((fn) => fn());
  loaderListeners.clear();
  flushReveal();
}

export function onLoaderDone(fn: () => void) {
  if (loaderDone) {
    fn();
    return () => {};
  }
  loaderListeners.add(fn);
  return () => {
    loaderListeners.delete(fn);
  };
}

/** Run `fn` once the current page is uncovered (immediately if it already is). */
export function onReveal(fn: () => void) {
  if (loaderDone && !transitioning) {
    fn();
    return () => {};
  }
  revealListeners.add(fn);
  return () => {
    revealListeners.delete(fn);
  };
}

/** Page transitions: cover begins → content swaps → reveal ends. */
export function beginTransition() {
  transitioning = true;
}
export function endTransition() {
  transitioning = false;
  flushReveal();
}

export const isLoaderDone = () => loaderDone;
