/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/sala-4.js
 * 
 * Controlador dedicado para la Sala IV: Cuestionario Histórico (Página Standalone).
 * Milestone 2D:
 * 1. Inicialización y preservación de idioma bilingüe (ES / EN) vía URL query string (?lang=es / ?lang=en).
 * 2. Prohibición estricta de localStorage, sessionStorage y cookies según directrices del repositorio.
 * 3. Integración bidireccional con el motor interactivo de autoevaluación (quiz.js).
 * 4. Navegación cross-room a Sala I (sala-1-cronologia.html?lang=...&event=N) desde los hitos vinculados.
 * 5. Navegación cross-room a Sala II (sala-2-cartografia.html?lang=...&location=...) desde las sedes vinculadas.
 * 6. Actualización y control accesible de enlaces de retorno al Gran Vestíbulo (index.html?lang=...#hall).
 * ==========================================================================
 */

(function () {
  'use strict';

  // Señalizar modo standalone para quiz.js y otros scripts auxiliares
  window.isSala4Standalone = true;

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
   * Preserva cualquier otro parámetro presente.
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

    // Sincronizar el motor interactivo quiz.js
    if (window.historiaQuiz && typeof window.historiaQuiz.setLanguage === 'function') {
      window.historiaQuiz.setLanguage(currentLang);
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
   * Alterna entre español e inglés de forma global en la página y en quiz.js.
   */
  function toggleGlobalLanguage() {
    var targetLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(targetLang);
    syncUrlParam(targetLang);
    try {
      window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: targetLang } }));
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

    // Delegación accesible para botones y enlaces de retorno y saltos cross-room
    document.addEventListener('click', function (e) {
      // 1. Botones de retorno al Gran Vestíbulo Central
      var returnBtn = e.target.closest('.hist-btn-room-return-hall');
      if (returnBtn) {
        e.preventDefault();
        window.location.href = 'index.html?lang=' + encodeURIComponent(currentLang) + '#hall';
        return;
      }

      // 2. Saltos directos a hitos de Sala I (Cronología)
      var milestoneLink = e.target.closest('.hist-milestone-jump-link') || e.target.closest('.hist-feedback-h-link') || e.target.closest('.hist-review-h-ref');
      if (milestoneLink && milestoneLink.hasAttribute('data-timeline-event')) {
        e.preventDefault();
        var evtNum = milestoneLink.getAttribute('data-timeline-event');
        window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLang) + '&event=' + encodeURIComponent(evtNum);
        return;
      }

      // 3. Saltos directos a sedes de Sala II (Cartografía)
      var mapLink = e.target.closest('.hist-map-jump-link') || e.target.closest('.hist-feedback-map-link') || e.target.closest('.hist-review-map-ref');
      if (mapLink && mapLink.hasAttribute('data-map-location')) {
        e.preventDefault();
        var locKey = mapLink.getAttribute('data-map-location');
        window.location.href = 'sala-2-cartografia.html?lang=' + encodeURIComponent(currentLang) + '&location=' + encodeURIComponent(locKey);
        return;
      }

      // 4. Botón de la barra de acciones finales hacia Cronología
      var timelineActionBtn = e.target.closest('#hist-quiz-btn-timeline');
      if (timelineActionBtn) {
        e.preventDefault();
        window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLang);
        return;
      }

      // 5. Botón de la barra de acciones finales hacia Mapa
      var mapActionBtn = e.target.closest('#hist-quiz-btn-map');
      if (mapActionBtn) {
        e.preventDefault();
        window.location.href = 'sala-2-cartografia.html?lang=' + encodeURIComponent(currentLang);
        return;
      }

      // 6. Botón de la barra de acciones finales hacia Vestíbulo
      var hallActionBtn = e.target.closest('#hist-quiz-btn-hall');
      if (hallActionBtn) {
        e.preventDefault();
        window.location.href = 'index.html?lang=' + encodeURIComponent(currentLang) + '#hall';
        return;
      }
    });

    // Actualizar enlaces de navegación tras la renderización de nav.js
    setTimeout(function () {
      updateNavLinks(currentLang);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
