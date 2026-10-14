// Loaded in <head> so the theme is set before the page paints (no flash).
// Follows the OS setting unless the user picks a theme with the toggle.
(function () {
  var root = document.documentElement;
  var system = matchMedia('(prefers-color-scheme: dark)');

  function apply() {
    root.dataset.theme = localStorage.getItem('theme') || (system.matches ? 'dark' : 'light');
  }
  apply();
  system.addEventListener('change', apply);

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.theme-toggle')) return;
    var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    // Choosing the same theme as the OS goes back to following the OS
    if (theme === (system.matches ? 'dark' : 'light')) localStorage.removeItem('theme');
    else localStorage.setItem('theme', theme);
    apply();
  });
})();
