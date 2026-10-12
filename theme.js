// Loaded in <head> so the theme is set before the page paints (no flash).
(function () {
  var root = document.documentElement;
  var saved = localStorage.getItem('theme');
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.theme-toggle')) return;
    var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  });
})();
