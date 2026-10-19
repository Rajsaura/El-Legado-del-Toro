/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/sala-1.js
 * 
 * Controlador dedicado para la Sala I: Cronología Histórica (Página Standalone).
 * Milestone 2A:
 * 1. Inicialización y preservación de idioma bilingüe (ES / EN) vía URL query string (?lang=es / ?lang=en).
 * 2. Prohibición estricta de localStorage, sessionStorage y cookies según directrices del repositorio.
 * 3. Sincronización bidireccional con el motor de cronología (journey.js).
 * 4. Actualización de enlaces de retorno al Gran Vestíbulo (index.html?lang=...#hall).
 * 5. Navegación directa por hito cronológico (?event=1..12, mapeo 1-based a índices 0-based).
 * ==========================================================================
 */

(function () {
  'use strict';

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
   * Preserva cualquier otro parámetro presente (como ?event=).
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

    // Sincronizar tarjetas de timeline en journey.js
    var cards = document.querySelectorAll('.hist-stage-card');
    cards.forEach(function (card) {
      var isTranslated = card.classList.contains('hist-translated');
      var capEs = card.querySelector('.hist-card-caption-es');
      var capEn = card.querySelector('.hist-card-caption-en');
      var btn = card.querySelector('.hist-btn-translate');

      if (currentLang === 'en' && !isTranslated) {
        card.classList.add('hist-translated');
        if (capEs) capEs.setAttribute('aria-hidden', 'true');
        if (capEn) capEn.removeAttribute('aria-hidden');
        if (btn) btn.setAttribute('aria-pressed', 'true');
      } else if (currentLang === 'es' && isTranslated) {
        card.classList.remove('hist-translated');
        if (capEs) capEs.removeAttribute('aria-hidden');
        if (capEn) capEn.setAttribute('aria-hidden', 'true');
        if (btn) btn.setAttribute('aria-pressed', 'false');
      }
    });

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
   * Alterna entre español e inglés de forma global en la página y en journey.js.
   */
  function toggleGlobalLanguage() {
    var targetLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(targetLang);
    syncUrlParam(targetLang);
    if (window.historiaJourney && typeof window.historiaJourney.setLanguage === 'function') {
      window.historiaJourney.setLanguage(targetLang);
    }
    try {
      window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: targetLang } }));
    } catch (e) {}
  }

  /**
   * Evalúa y ejecuta la navegación directa por parámetro de hito (?event=N).
   * Convención de indexación:
   * - 1-based para usuarios y parámetros de URL: ?event=1 a ?event=12 corresponden
   *   a los Hitos 1 a 12 (índices internos 0 a 11 en journey.js).
   * - Si se especifica 0, se mapea limpiamente al índice 0.
   * - Si el parámetro está ausente, no es numérico o está fuera de rango, no se altera
   *   el estado inicial predeterminado (Hito 1 / índice 0).
   */
  function checkDirectMilestone() {
    try {
      var params = new URLSearchParams(window.location.search);
      var eventParam = params.get('event');
      if (eventParam === null) return;

      var num = parseInt(eventParam, 10);
      if (isNaN(num)) return;

      var targetIndex = null;
      if (num >= 1 && num <= 12) {
        targetIndex = num - 1; // 1-based a 0-based
      } else if (num === 0) {
        targetIndex = 0;
      }

      if (targetIndex !== null) {
        setTimeout(function () {
          var journeyContainer = document.getElementById('hist-journey-container');
          if (journeyContainer) {
            var stepDistance = 700 + 500; // DWELL (700px) + TRAVEL (500px)
            var targetOffset = targetIndex * stepDistance + 350;
            var containerTop = journeyContainer.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: containerTop + targetOffset,
              behavior: 'auto'
            });
          }
          if (window.historiaJourney && typeof window.historiaJourney.scrollToEvent === 'function') {
            window.historiaJourney.scrollToEvent(targetIndex);
          }
          if (params.get('exhibit') === '1' && window.historiaJourney && typeof window.historiaJourney.openExhibit === 'function') {
            setTimeout(function () {
              window.historiaJourney.openExhibit(targetIndex);
            }, 80);
          }
        }, 120);
      }
    } catch (e) {}
  }

  /**
   * Inicialización al cargar el DOM.
   */
  function init() {
    currentLang = getLangFromUrl();
    applyLanguage(currentLang);

    // Si la URL especificaba 'en', sincronizar el motor de journey.js
    if (currentLang === 'en' && window.historiaJourney && typeof window.historiaJourney.setLanguage === 'function') {
      window.historiaJourney.setLanguage('en');
    }

    // Escuchar el evento de cambio de idioma propagado por journey.js (desde tarjetas o cédula)
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
      }
    });

    // Actualizar enlaces de navegación tras la renderización de nav.js
    setTimeout(function () {
      updateNavLinks(currentLang);
    }, 120);

    // Comprobar enlace directo a hito cronológico
    checkDirectMilestone();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
