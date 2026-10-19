/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/sala-2.js
 * 
 * Controlador dedicado para la Sala II: Cartografía Histórica (Página Standalone).
 * Milestone 2B:
 * 1. Inicialización y preservación de idioma bilingüe (ES / EN) vía URL query string (?lang=es / ?lang=en).
 * 2. Prohibición estricta de localStorage, sessionStorage y cookies según directrices del repositorio.
 * 3. Integración con el motor cartográfico interactivo (map.js).
 * 4. Navegación cross-room a la Sala I standalone (sala-1-cronologia.html?lang=...&event=N)
 *    con mapeo exacto 1-based a partir de los índices 0-based de map.js.
 * 5. Actualización y control accesible de enlaces de retorno al Gran Vestíbulo (index.html?lang=...#hall).
 * ==========================================================================
 */

(function () {
  'use strict';

  // Señalizar modo standalone para map.js y otros scripts auxiliares
  window.isSala2Standalone = true;

  var currentLang = 'es';

  /**
   * Obtiene y valida el parámetro de idioma desde la URL actual.
   * Regla de negocio: sólo se aceptan 'es' y 'en'. Si está ausente o no es válido,
   * se utiliza 'es' de manera predeterminada.
   * @returns {'es' | 'en'}
   */
  function getLangFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      var lang = params.get('lang');
      if (lang === 'en') return 'en';
      return 'es';
    } catch (e) {
      return 'es';
    }
  }

  /**
   * Actualiza el parámetro ?lang en la barra de direcciones del navegador sin recargar la página.
   * Preserva cualquier otro parámetro presente (como ?location=).
   * @param {'es' | 'en'} lang
   */
  function syncUrlParam(lang) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  /**
   * Aplica la visibilidad de elementos bilingües estáticos y sincroniza el atributo lang en <html>.
   * @param {'es' | 'en'} lang
   */
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'es';
    if (document.documentElement) {
      document.documentElement.lang = currentLang;
    }

    var esSpans = document.querySelectorAll('.hist-lang-es');
    var enSpans = document.querySelectorAll('.hist-lang-en');

    esSpans.forEach(function (el) {
      el.style.display = currentLang === 'es' ? '' : 'none';
      if (currentLang === 'es') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    enSpans.forEach(function (el) {
      el.style.display = currentLang === 'en' ? '' : 'none';
      if (currentLang === 'en') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    var esParagraphs = document.querySelectorAll('.hist-lang-p-es');
    var enParagraphs = document.querySelectorAll('.hist-lang-p-en');

    esParagraphs.forEach(function (el) {
      el.style.display = currentLang === 'es' ? 'block' : 'none';
      if (currentLang === 'es') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    enParagraphs.forEach(function (el) {
      el.style.display = currentLang === 'en' ? 'block' : 'none';
      if (currentLang === 'en') {
        el.removeAttribute('aria-hidden');
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });

    // Sincronizar el motor cartográfico map.js
    if (window.historiaMap && typeof window.historiaMap.setLanguage === 'function') {
      window.historiaMap.setLanguage(currentLang);
    }

    updateReturnLinks(currentLang);
    updateNavLinks(currentLang);
  }

  /**
   * Actualiza todos los enlaces de retorno al Gran Vestíbulo Central para preservar el idioma.
   * Formato exigido: index.html?lang=es#hall o index.html?lang=en#hall
   * @param {'es' | 'en'} lang
   */
  function updateReturnLinks(lang) {
    var returnLinks = document.querySelectorAll('.hist-btn-room-return-hall');
    returnLinks.forEach(function (link) {
      link.setAttribute('href', 'index.html?lang=' + encodeURIComponent(lang) + '#hall');
    });
  }

  /**
   * Propaga el parámetro de idioma a los enlaces de la barra de navegación compartida (nav.js).
   * Mantiene rutas 100% relativas según directriz técnica.
   * @param {'es' | 'en'} lang
   */
  function updateNavLinks(lang) {
    var navLinks = document.querySelectorAll('#main-header a, #site-nav-container a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
      try {
        var hashIndex = href.indexOf('#');
        var hashPart = hashIndex !== -1 ? href.substring(hashIndex) : '';
        var withoutHash = hashIndex !== -1 ? href.substring(0, hashIndex) : href;
        var qIndex = withoutHash.indexOf('?');
        var pathPart = qIndex !== -1 ? withoutHash.substring(0, qIndex) : withoutHash;
        var queryPart = qIndex !== -1 ? withoutHash.substring(qIndex + 1) : '';
        var params = new URLSearchParams(queryPart);
        params.set('lang', lang);
        link.setAttribute('href', pathPart + '?' + params.toString() + hashPart);
      } catch (err) {}
    });
  }

  /**
   * Alterna entre español e inglés de forma global en la página y en map.js.
   */
  function toggleGlobalLanguage() {
    var targetLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(targetLang);
    syncUrlParam(targetLang);
    if (window.historiaMap && typeof window.historiaMap.setLanguage === 'function') {
      window.historiaMap.setLanguage(targetLang);
    }
    try {
      window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: targetLang } }));
    } catch (e) {}
  }

  /**
   * Evalúa y ejecuta la selección directa de una sede por parámetro (?location= o ?sede=).
   */
  function checkDirectLocation() {
    try {
      var params = new URLSearchParams(window.location.search);
      var locParam = params.get('location') || params.get('sede');
      if (!locParam) return;
      setTimeout(function () {
        if (window.historiaMap && typeof window.historiaMap.selectLocation === 'function') {
          window.historiaMap.selectLocation(locParam.toLowerCase());
        }
      }, 150);
    } catch (e) {}
  }

  /**
   * Inicialización al cargar el DOM.
   */
  function init() {
    currentLang = getLangFromUrl();
    applyLanguage(currentLang);

    // Escuchar el evento de cambio de idioma propagado por otros componentes
    window.addEventListener('historiaLanguageChange', function (e) {
      if (e.detail && e.detail.lang) {
        currentLang = e.detail.lang;
        applyLanguage(currentLang);
        syncUrlParam(currentLang);
      }
    });

    // Botón de alternancia de idioma en la cabecera de la sala
    var headerLangBtn = document.getElementById('btn-toggle-language');
    if (headerLangBtn) {
      headerLangBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleGlobalLanguage();
      });
    }

    // Delegación accesible para todos los botones de retorno al Gran Vestíbulo Central
    document.addEventListener('click', function (e) {
      var returnBtn = e.target.closest('.hist-btn-room-return-hall');
      if (returnBtn) {
        e.preventDefault();
        window.location.href = 'index.html?lang=' + encodeURIComponent(currentLang) + '#hall';
        return;
      }

      // Delegación para saltar a Sala I desde el dossier de detalle
      var jumpBtn = e.target.closest('#hist-btn-jump-timeline');
      if (jumpBtn) {
        e.preventDefault();
        var rawIdx = jumpBtn.getAttribute('data-event-index');
        var evtIdx = parseInt(rawIdx, 10);
        if (!isNaN(evtIdx)) {
          var eventNum = evtIdx + 1; // 0-based a 1-based (?event=1..12)
          window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLang) + '&event=' + encodeURIComponent(eventNum);
        }
        return;
      }

      // Delegación para abrir la cédula de Sala I desde el dossier
      var exhibitBtn = e.target.closest('#hist-btn-open-exhibit');
      if (exhibitBtn) {
        e.preventDefault();
        var rawExIdx = exhibitBtn.getAttribute('data-event-index');
        var exEvtIdx = parseInt(rawExIdx, 10);
        if (!isNaN(exEvtIdx)) {
          var exEventNum = exEvtIdx + 1; // 0-based a 1-based (?event=1..12)
          window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLang) + '&event=' + encodeURIComponent(exEventNum) + '&exhibit=1';
        }
        return;
      }
    });

    // Actualizar enlaces de navegación tras la renderización de nav.js
    setTimeout(function () {
      updateNavLinks(currentLang);
    }, 120);

    // Comprobar apertura directa de sede
    checkDirectLocation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
