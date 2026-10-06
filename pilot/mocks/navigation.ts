export function navigateToUrl(url: string) {
  window.dispatchEvent(new CustomEvent('pilot:navigate', {detail: url}));
}
