// Loaded in <head> so the theme is set before the page paints (no flash).
// The toggle cycles System -> Light -> Dark. System follows the OS setting.
(function () {
  var root = document.documentElement;
  var system = matchMedia('(prefers-color-scheme: dark)');
  var modes = ['system', 'light', 'dark'];
  var names = { system: 'System', light: 'Light', dark: 'Dark' };

  function mode() {
    var saved = localStorage.getItem('theme');
    return modes.indexOf(saved) > 0 ? saved : 'system';
  }

  function apply() {
    var m = mode();
    root.dataset.themeMode = m;
    root.dataset.theme = m === 'system' ? (system.matches ? 'dark' : 'light') : m;

    var button = document.querySelector('.theme-toggle');
    if (button) {
      var next = modes[(modes.indexOf(m) + 1) % modes.length];
      var label = 'Theme: ' + names[m] + ' (switch to ' + names[next] + ')';
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }

  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', apply);

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.theme-toggle')) return;
    var next = modes[(modes.indexOf(mode()) + 1) % modes.length];
    if (next === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', next);
    apply();
  });
})();
