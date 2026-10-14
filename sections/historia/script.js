/**
 * ==========================================================================
 * SECCIÓN 1: LA HISTORIA - LÓGICA DE INTERACCIÓN GENERAL Y COORDINACIÓN
 * Archivo: sections/historia/script.js
 * 
 * Coordinación de módulos de la sección:
 * - intro.js: Animación de introducción a pantalla completa con silueta del toro.
 * - journey.js: Cronología interactiva "Viaje en el tiempo" con 5 épocas,
 *   12 eventos, tarjetas animadas, glosario de vocabulario y Cédulas Históricas.
 * - map.js: Cartografía histórica interactiva y geografía de la lidia.
 * - quiz.js: Cuestionario histórico interactivo con evaluación y retroalimentación.
 * - Coordinación bilingüe sincrónica (ES / EN) en toda la sección.
 * ==========================================================================
 */

(function () {
  'use strict';

  var currentLang = 'es';

  /**
   * Aplica el estado de idioma en todos los elementos estáticos y contenedores bilingües.
   * @param {'es' | 'en'} lang
   */
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'es';
    if (document.documentElement) {
      document.documentElement.lang = currentLang;
    }

    // Spans en línea (badge, meta, autor, títulos de archivo)
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

    // Párrafos completos (reflexión editorial, introducciones)
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
  }

  // Escuchar el evento personalizado de propagación bilingüe
  window.addEventListener('historiaLanguageChange', function (e) {
    if (e.detail && e.detail.lang) {
      applyLanguage(e.detail.lang);
    }
  });

  // Helper público para sincronizar el idioma desde consola o scripts externos
  window.historiaSetLanguage = function (lang) {
    var targetLang = lang === 'en' ? 'en' : 'es';
    try {
      window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: targetLang } }));
    } catch (err) {
      applyLanguage(targetLang);
    }
  };

  // Inicialización y manejo de enlaces internos de navegación accesible
  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(currentLang);

    // Enlaces de ancla internos: asegurar foco accesible en saltos
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      var targetEl = document.querySelector(href);
      if (targetEl) {
        targetEl.setAttribute('tabindex', '-1');
      }
    });
  });
})();
