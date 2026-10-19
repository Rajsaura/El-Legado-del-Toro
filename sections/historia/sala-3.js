/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/sala-3.js
 * 
 * Controlador dedicado para la Sala III: Archivo Histórico Digital (Página Standalone).
 * Milestone 2C:
 * 1. Inicialización y preservación de idioma bilingüe (ES / EN) vía URL query string (?lang=es / ?lang=en).
 * 2. Prohibición estricta de localStorage, sessionStorage y cookies según directrices del repositorio.
 * 3. Gestión interactiva accesible de los filtros documentales (all, legal, tratado, jurisprudencia, doctrina).
 * 4. Actualización y control accesible de enlaces de retorno al Gran Vestíbulo (index.html?lang=...#hall).
 * 5. Navegación cross-room a Sala I (sala-1-cronologia.html?lang=...&event=N) desde los hitos vinculados.
 * 6. Preservación absoluta de fuentes primarias y enlaces diplomáticos a repositorios oficiales.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Señalizar modo standalone para scripts auxiliares
  window.isSala3Standalone = true;

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
   * Preserva cualquier otro parámetro presente (como ?filter=).
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

    updateReturnLinks(currentLang);
    updateNavLinks(currentLang);
    updateMilestoneReferences(currentLang);
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
   * Configura las referencias de hitos hacia la Sala I con enlaces interactivos accesibles.
   * Mapeo canónico a los 12 hitos de sala-1-cronologia.html:
   * - Cédula 1 (legal): Hito 2 (Las Siete Partidas)
   * - Cédula 2 (tratado): Hito 4 (Toreo a pie reglamentado)
   * - Cédula 3 (jurisprudencia): Hito 12 (STC 177/2016 del Pleno)
   * - Cédula 4 (doctrina): Hito 7 (Revolución estilística de Juan Belmonte)
   * @param {'es' | 'en'} lang
   */
  function updateMilestoneReferences(lang) {
    var mapping = {
      'ref-card-legal': 2,
      'ref-card-tratado': 4,
      'ref-card-jurisprudencia': 12,
      'ref-card-doctrina': 7
    };

    Object.keys(mapping).forEach(function (cardId) {
      var card = document.getElementById(cardId);
      if (!card) return;
      var milestoneBox = card.querySelector('.hist-archive-milestone-ref');
      if (!milestoneBox) return;

      var targetEvent = mapping[cardId];
      milestoneBox.style.cursor = 'pointer';
      milestoneBox.setAttribute('role', 'link');
      milestoneBox.setAttribute('tabindex', '0');
      var label = lang === 'en' ? 'Jump to Gallery I timeline' : 'Saltar a la cronología de Sala I';
      milestoneBox.setAttribute('aria-label', label);
      milestoneBox.setAttribute('title', label);
      milestoneBox.setAttribute('data-target-event', targetEvent);
    });
  }

  /**
   * Alterna entre español e inglés de forma global en la página.
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
   * Inicializa y gestiona los filtros interactivos por categoría de expediente.
   */
  function initArchiveFilters() {
    var filterBtns = document.querySelectorAll('.hist-archive-filter-btn');
    var cards = document.querySelectorAll('.referencias-grid .referencia-card');
    if (!filterBtns.length || !cards.length) return;

    function applyFilter(filter) {
      filterBtns.forEach(function (b) {
        var isMatch = b.getAttribute('data-filter') === filter;
        b.classList.toggle('hist-filter-active', isMatch);
        b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      cards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.style.display = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter') || 'all';
        applyFilter(filter);
      });
    });

    // Soporte para apertura directa con ?filter= o ?category= en la URL
    try {
      var params = new URLSearchParams(window.location.search);
      var initialFilter = params.get('filter') || params.get('category');
      if (initialFilter) {
        var matchingBtn = document.querySelector('.hist-archive-filter-btn[data-filter="' + initialFilter.toLowerCase() + '"]');
        if (matchingBtn) {
          applyFilter(initialFilter.toLowerCase());
        }
      }
    } catch (e) {}
  }

  /**
   * Inicialización al cargar el DOM.
   */
  function init() {
    currentLang = getLangFromUrl();
    applyLanguage(currentLang);
    initArchiveFilters();

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

      // Delegación para saltar a Sala I desde los hitos vinculados
      var milestoneBox = e.target.closest('.hist-archive-milestone-ref');
      if (milestoneBox && milestoneBox.hasAttribute('data-target-event')) {
        var evtNum = milestoneBox.getAttribute('data-target-event');
        if (evtNum) {
          e.preventDefault();
          window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLang) + '&event=' + encodeURIComponent(evtNum);
          return;
        }
      }
    });

    // Atajo accesible de teclado (Enter / Espacio) en los hitos vinculados
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        var milestoneBox = e.target.closest('.hist-archive-milestone-ref');
        if (milestoneBox && milestoneBox.hasAttribute('data-target-event')) {
          e.preventDefault();
          milestoneBox.click();
        }
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
