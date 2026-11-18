// AnkiMobile's console has no error / warn / info / debug: three.js calls them while loading
// (a missing console.error crashed the model load). Give it harmless stand-ins first.
(function () {
  var c = (typeof console !== 'undefined' && console) || (globalThis.console = {});
  var log = typeof c.log === 'function' ? c.log.bind(c) : function () {};
  ['error', 'warn', 'info', 'debug', 'trace', 'group', 'groupEnd', 'time', 'timeEnd', 'table', 'assert']
    .forEach(function (k) { if (typeof c[k] !== 'function') c[k] = k === 'assert' ? function () {} : log; });
})();
