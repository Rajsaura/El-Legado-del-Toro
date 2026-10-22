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
 * - Navegador de Salas del Museo (Section Navigator) y seguimiento de scroll.
 * ==========================================================================
 */

(function () {
  'use strict';

  var currentLang = 'es';
  try {
    var initialUrlParams = new URLSearchParams(window.location.search);
    var initialLang = initialUrlParams.get('lang');
    if (initialLang === 'en' || initialLang === 'es') {
      currentLang = initialLang;
    }
  } catch (e) {}

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

    updateDoorwayLinks(currentLang);
  }

  /**
   * Registro canónico de las cinco salas del Museo Histórico.
   * Prohíbe totalmente la coincidencia difusa de subcadenas ("Sala I" vs "Sala II").
   */
  var ROOM_REGISTRY = {
    'sala-1': {
      page: 'sala-1-cronologia.html',
      isStandalone: true,
      nameEs: 'Sala I: Cronología',
      nameEn: 'Gallery I: Timeline'
    },
    'sala-2': {
      page: 'sala-2-cartografia.html',
      isStandalone: true,
      nameEs: 'Sala II: Cartografía',
      nameEn: 'Gallery II: Cartography'
    },
    'sala-3': {
      page: 'sala-3-archivo.html',
      isStandalone: true,
      nameEs: 'Sala III: Archivo Digital',
      nameEn: 'Gallery III: Digital Archive'
    },
    'sala-4': {
      page: 'sala-4-cuestionario.html',
      isStandalone: true,
      nameEs: 'Sala IV: Cuestionario',
      nameEn: 'Gallery IV: Quiz'
    },
    'sala-5': {
      page: 'sala-5-reflexion.html',
      isStandalone: true,
      nameEs: 'Sala V: Reflexión',
      nameEn: 'Gallery V: Reflection'
    }
  };

  /**
   * Resuelve el identificador único canónico ('sala-1'..'sala-5') sin subcadenas ambiguas.
   * @param {HTMLElement} el
   * @returns {'sala-1' | 'sala-2' | 'sala-3' | 'sala-4' | 'sala-5' | null}
   */
  function resolveRoomKey(el) {
    if (!el) return null;
    var dataRoom = el.getAttribute('data-room-id') || el.getAttribute('data-room');
    if (dataRoom && ROOM_REGISTRY[dataRoom]) {
      return dataRoom;
    }
    var id = el.id || '';
    var m = id.match(/sala-([1-5])/);
    if (m && ROOM_REGISTRY['sala-' + m[1]]) {
      return 'sala-' + m[1];
    }
    for (var i = 1; i <= 5; i++) {
      if (el.classList.contains('hist-doorway-sala-' + i)) {
        return 'sala-' + i;
      }
    }
    return null;
  }

  /**
   * Actualiza los enlaces arquitectónicos de las salas extraídas para preservar el idioma activo (?lang=es o ?lang=en).
   * @param {'es' | 'en'} lang
   */
  function updateDoorwayLinks(lang) {
    Object.keys(ROOM_REGISTRY).forEach(function (key) {
      var item = ROOM_REGISTRY[key];
      if (!item.isStandalone) return;
      var doorway = document.getElementById('hist-doorway-' + key);
      if (doorway) {
        doorway.setAttribute('href', item.page + '?lang=' + encodeURIComponent(lang));
      }
      var mobile = document.getElementById('hist-mobile-doorway-' + key);
      if (mobile) {
        mobile.setAttribute('href', item.page + '?lang=' + encodeURIComponent(lang));
      }
    });
    var btnExploreGalleries = document.getElementById('btn-explore-galleries');
    if (btnExploreGalleries) {
      btnExploreGalleries.setAttribute('href', 'sala-1-cronologia.html?lang=' + encodeURIComponent(lang));
    }
    var btnHallExplore = document.getElementById('btn-hall-explore');
    if (btnHallExplore) {
      btnHallExplore.setAttribute('href', 'sala-1-cronologia.html?lang=' + encodeURIComponent(lang));
    }
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



  /**
   * ==========================================================================
   * FASE 2: ESCENARIO EXTERIOR Y ANIMACIÓN 3D INTERACTIVA DE PUERTAS
   * ==========================================================================
   */
  /**
   * ==========================================================================
   * FASE 2: ESCENARIO CINEMATOGRÁFICO EXTERIOR-A-ENTRADA (MILESTONE 1B)
   * Journey de cámara continua en 4 etapas:
   * Stage A: Fachada Panorámica de Establecimiento (exterior-establishing.webp)
   * Stage B: Aproximación por el Patio Exterior (exterior-approach.webp)
   * Stage C: Apertura fluida de puertas (doors-closed -> opening -> open)
   * Stage D: Tránsito por el umbral (interior-threshold) -> Corredor abovedado -> Vestíbulo
   * ==========================================================================
   */
  function initMuseumExterior() {
    var exteriorSection = document.getElementById('hist-museum-exterior');
    if (!exteriorSection) return;

    // Elementos del escenario cinemático y capas
    var cineStage = document.getElementById('hist-cinematic-stage');
    var layerEstablishing = document.getElementById('cine-layer-establishing');
    var layerApproach = document.getElementById('cine-layer-approach');
    var layerDoorsClosed = document.getElementById('cine-layer-doors-closed');
    var layerDoorsOpening = document.getElementById('cine-layer-doors-opening');
    var layerDoorsOpen = document.getElementById('cine-layer-doors-open');
    var layerThreshold = document.getElementById('cine-layer-threshold');
    var layerCorridor = document.getElementById('cine-layer-corridor');
    var corridorRig = document.getElementById('hist-corridor-camera-rig');
    var cineLightBlend = document.getElementById('hist-cine-light-blend');

    // Vistas y controles
    var viewHall = document.getElementById('hist-central-hall-view');
    var btnEnter = document.getElementById('btn-enter-museum');
    var btnSkip = document.getElementById('btn-skip-doors');
    var btnSkipJourney = document.getElementById('btn-skip-journey');
    var btnReset = document.getElementById('btn-reset-doors');
    var btnExplore = document.getElementById('btn-explore-galleries');
    var liveRegion = document.getElementById('hist-exterior-live-region');
    var btnFacadeHotspot = document.getElementById('btn-facade-hotspot');

    // Acciones del vestíbulo y cabecera
    var btnHallExplore = document.getElementById('btn-hall-explore');
    var btnHallReplay = document.getElementById('btn-hall-replay');
    var btnHallReturn = document.getElementById('btn-hall-return');
    var btnReplayIntro = document.getElementById('btn-replay-intro');

    // Banderas de estado para prevenir activación solapada
    var isOpening = false;
    var areDoorsOpen = false;
    var isJourneying = false;
    var journeyTimeouts = [];

    function clearAllTimers() {
      journeyTimeouts.forEach(function (id) {
        clearTimeout(id);
      });
      journeyTimeouts = [];
    }

    function announceLive(message) {
      if (liveRegion) {
        liveRegion.textContent = '';
        setTimeout(function () {
          liveRegion.textContent = message;
        }, 50);
      }
    }

    // Pre-carga en memoria de imágenes para garantizar fluidez sin parpadeos
    var CINE_ASSETS = [
      'assets/museum/exterior-establishing.webp',
      'assets/museum/exterior-approach.webp',
      'assets/museum/entrance-doors-closed.webp',
      'assets/museum/entrance-doors-opening.webp',
      'assets/museum/entrance-doors-open.webp',
      'assets/museum/entrance-interior-threshold.webp',
      'assets/museum/corridor-bg.webp',
      'assets/museum/central-hall-bg.webp'
    ];
    CINE_ASSETS.forEach(function (src) {
      var img = new Image();
      img.src = src;
    });

    /**
     * Activa una capa cinemática específica ocultando las demás con accesibilidad.
     * @param {HTMLElement} activeLayer
     */
    function setCineLayer(activeLayer) {
      var allLayers = [
        layerEstablishing,
        layerApproach,
        layerDoorsClosed,
        layerDoorsOpening,
        layerDoorsOpen,
        layerThreshold,
        layerCorridor
      ];
      allLayers.forEach(function (layer) {
        if (!layer) return;
        if (layer === activeLayer) {
          layer.classList.add('is-active');
          layer.removeAttribute('aria-hidden');
        } else {
          layer.classList.remove('is-active');
          layer.setAttribute('aria-hidden', 'true');
        }
      });
    }

    var allViews = {
      facade: {
        labelEs: 'Vista exterior del palacio activa',
        labelEn: 'Palace exterior view active'
      },
      portal: {
        labelEs: 'Acceso por el pórtico activo',
        labelEn: 'Courtyard entrance view active'
      },
      corridor: {
        labelEs: 'Tránsito hacia el interior del museo',
        labelEn: 'Transit to museum interior'
      },
      hall: {
        labelEs: 'Gran Vestíbulo del Palacio',
        labelEn: 'Grand Palace Hall'
      }
    };

    /**
     * Alterna la perspectiva visual entre Fachada, Pórtico, Corredor y Vestíbulo.
     * @param {'facade' | 'portal' | 'corridor' | 'hall'} viewType
     */
    function switchView(viewType) {
      if (!allViews[viewType]) return;

      if (viewType === 'hall') {
        if (cineStage) {
          cineStage.style.display = 'none';
          cineStage.classList.remove('hist-view-active');
        }
        if (viewHall) {
          viewHall.style.display = 'block';
          viewHall.classList.add('hist-view-active');
        }
      } else {
        if (viewHall) {
          viewHall.style.display = 'none';
          viewHall.classList.remove('hist-view-active');
        }
        if (cineStage) {
          cineStage.style.display = 'block';
          cineStage.classList.add('hist-view-active');
        }
        if (viewType === 'facade') {
          setCineLayer(layerEstablishing);
        } else if (viewType === 'portal') {
          setCineLayer(areDoorsOpen ? layerDoorsOpen : layerDoorsClosed);
        } else if (viewType === 'corridor') {
          setCineLayer(layerCorridor);
        }
      }

      announceLive(currentLang === 'es' ? allViews[viewType].labelEs : allViews[viewType].labelEn);
    }

    /**
     * Inicia el recorrido cinematográfico fluido desde la fachada exterior,
     * atravesando el patio, abriendo las puertas, cruzando el umbral y recorriendo
     * el corredor hasta el Gran Vestíbulo Central.
     * @param {Object} [options]
     * @param {boolean} [options.immediate] - Salta directamente al vestíbulo (reduced motion / skip)
     * @param {Function} [options.onOpened] - Callback opcional al finalizar la llegada
     */
    function startCinematicJourney(options) {
      options = options || {};

      // 1. PREVENCIÓN ESTRICTA DE ACTIVACIÓN REPETIDA / SOLAPAMIENTO
      if (isJourneying || isOpening) {
        return;
      }

      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (options.immediate || prefersReducedMotion) {
        skipToCentralHall();
        if (options.onOpened) options.onOpened();
        return;
      }

      isJourneying = true;
      isOpening = true;
      clearAllTimers();

      // Asegurar que el escenario cinemático esté visible y en movimiento
      switchView('facade');
      if (cineStage) {
        cineStage.classList.add('hist-cine-stage-moving');
      }

      if (btnEnter) {
        btnEnter.disabled = true;
        btnEnter.setAttribute('aria-busy', 'true');
        var enterText = btnEnter.querySelector('.hist-btn-enter-text');
        if (enterText) {
          enterText.innerHTML = currentLang === 'es'
            ? '<span class="hist-lang-es">Avanzando al museo...</span><span class="hist-lang-en" style="display:none;">Advancing to museum...</span>'
            : '<span class="hist-lang-es" style="display:none;">Avanzando al museo...</span><span class="hist-lang-en">Advancing to museum...</span>';
        }
      }

      if (btnSkipJourney) {
        btnSkipJourney.style.display = 'inline-flex';
      }

      // ETAPA A: Fachada Monumental (Inicio con cámara serena avanzando suavemente)
      setCineLayer(layerEstablishing);
      announceLive(currentLang === 'es'
        ? 'Avanzando lentamente por el patio monumental hacia el pórtico de entrada...'
        : 'Gliding slowly across the monumental courtyard toward the entrance portal...');

      // ETAPA B: Aproximación pausada al pórtico (t1 = 1800ms, crossfade gradual de 1.0s)
      var t1 = setTimeout(function () {
        if (!isJourneying) return;
        setCineLayer(layerApproach);
      }, 1800);
      journeyTimeouts.push(t1);

      // ETAPA C: Secuencia de Apertura de Puertas (Cámara prácticamente estacionaria en el pórtico)
      // Llegada frente al pórtico de piedra (t2 = 3600ms, contemplación del pórtico con puertas cerradas)
      var t2 = setTimeout(function () {
        if (!isJourneying) return;
        setCineLayer(layerDoorsClosed);
        announceLive(currentLang === 'es'
          ? 'Frente al pórtico monumental de entrada. Puertas de cedro cerradas.'
          : 'In front of the monumental entrance portal. Cedar doors closed.');
      }, 3600);
      journeyTimeouts.push(t2);

      // Comienzo de la apertura fluida de hojas (t3 = 4800ms; las puertas giran con arquitectura fija)
      var t3 = setTimeout(function () {
        if (!isJourneying) return;
        setCineLayer(layerDoorsOpening);
        announceLive(currentLang === 'es'
          ? 'Abriendo las puertas monumentales de cedro hacia el interior...'
          : 'Opening the monumental cedar doors inward...');
      }, 4800);
      journeyTimeouts.push(t3);

      // Puertas completamente abiertas (t4 = 5800ms; transición suave a puertas abiertas)
      var t4 = setTimeout(function () {
        if (!isJourneying) return;
        setCineLayer(layerDoorsOpen);
      }, 5800);
      journeyTimeouts.push(t4);

      // ETAPA D: Tránsito por el Umbral y Corredor Abovedado (Comienza tras abrirse las puertas: t5 = 6800ms)
      var t5 = setTimeout(function () {
        if (!isJourneying) return;
        setCineLayer(layerThreshold);
        if (cineLightBlend) {
          cineLightBlend.classList.add('is-active');
        }
        announceLive(currentLang === 'es'
          ? 'Cruzando el umbral de piedra hacia la galería interior iluminada...'
          : 'Crossing the stone threshold into the illuminated interior gallery...');
      }, 6800);
      journeyTimeouts.push(t5);

      // Paso suave a la galería abovedada del corredor (t6 = 8200ms)
      var t6 = setTimeout(function () {
        if (!isJourneying) return;
        setCineLayer(layerCorridor);
        if (corridorRig) {
          corridorRig.classList.add('hist-corridor-animating');
        }
        announceLive(currentLang === 'es'
          ? 'Avanzando bajo las bóvedas de arista hacia el gran vestíbulo central...'
          : 'Advancing beneath the groin vaults toward the grand central hall...');
      }, 8200);
      journeyTimeouts.push(t6);

      // Llegada majestuosa al Gran Vestíbulo Central (t7 = 9600ms)
      var t7 = setTimeout(function () {
        if (!isJourneying) return;
        completeJourneyToHall();
        if (options.onOpened) {
          options.onOpened();
        }
      }, 9600);
      journeyTimeouts.push(t7);
    }

    /**
     * Culmina el recorrido aterrizando en el Gran Vestíbulo Central del Museo.
     */
    function completeJourneyToHall() {
      clearAllTimers();
      isJourneying = false;
      isOpening = false;
      areDoorsOpen = true;

      if (cineStage) {
        cineStage.classList.remove('hist-cine-stage-moving');
      }
      if (cineLightBlend) {
        cineLightBlend.classList.remove('is-active');
      }
      if (corridorRig) {
        corridorRig.classList.remove('hist-corridor-animating');
      }
      if (btnSkipJourney) {
        btnSkipJourney.style.display = 'none';
      }

      switchView('hall');

      if (btnEnter) {
        btnEnter.disabled = true;
        btnEnter.setAttribute('aria-busy', 'false');
        btnEnter.style.display = 'none';
      }
      if (btnReset) {
        btnReset.style.display = 'inline-flex';
      }

      announceLive(currentLang === 'es'
        ? 'Ha llegado al Gran Vestíbulo Central del Museo.'
        : 'You have arrived at the Grand Central Hall of the Museum.');

      if (btnHallExplore) {
        try {
          btnHallExplore.focus({ preventScroll: true });
        } catch (e) {}
      }
    }

    /**
     * Oprime el salto directo e inmediato al Gran Vestíbulo Central sin esperas.
     */
    function skipToCentralHall() {
      completeJourneyToHall();
      announceLive(currentLang === 'es'
        ? 'Recorrido omitido. Vestíbulo Central del Museo.'
        : 'Journey skipped. Grand Central Hall of the Museum.');
    }

    /**
     * Cierra las puertas y devuelve el escenario a la fachada exterior inicial (Stage A).
     */
    function resetToExterior() {
      clearAllTimers();
      isJourneying = false;
      isOpening = false;
      areDoorsOpen = false;

      if (cineStage) {
        cineStage.classList.remove('hist-cine-stage-moving');
      }
      if (cineLightBlend) {
        cineLightBlend.classList.remove('is-active');
      }
      if (corridorRig) {
        corridorRig.classList.remove('hist-corridor-animating');
      }
      if (btnSkipJourney) {
        btnSkipJourney.style.display = 'none';
      }

      setCineLayer(layerEstablishing);
      switchView('facade');

      if (btnEnter) {
        btnEnter.style.display = 'inline-flex';
        btnEnter.disabled = false;
        btnEnter.removeAttribute('aria-busy');
        var enterText = btnEnter.querySelector('.hist-btn-enter-text');
        if (enterText) {
          enterText.innerHTML = currentLang === 'es'
            ? '<span class="hist-lang-es">Entrar al Museo</span><span class="hist-lang-en" style="display:none;">Enter Museum</span>'
            : '<span class="hist-lang-es" style="display:none;">Entrar al Museo</span><span class="hist-lang-en">Enter Museum</span>';
        }
      }

      if (btnReset) {
        btnReset.style.display = 'none';
      }

      announceLive(currentLang === 'es'
        ? 'Fachada monumental exterior del palacio.'
        : 'Monumental exterior facade of the palace.');

      if (btnEnter) {
        try {
          btnEnter.focus({ preventScroll: true });
        } catch (e) {}
      }
    }

    /**
     * Repite el recorrido cinematográfico completo desde el exterior.
     */
    function replayJourney() {
      resetToExterior();
      var exteriorSection = document.getElementById('hist-museum-exterior');
      if (exteriorSection) {
        exteriorSection.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(function () {
        startCinematicJourney();
      }, 120);
    }

    /**
     * Regresa directamente al Gran Vestíbulo Central del Museo.
     * No reproduce la introducción animada ni secuestra el scroll del navegador.
     */
    function returnToHall() {
      if (isJourneying) {
        skipToCentralHall();
      } else {
        switchView('hall');
      }
      var exteriorSection = document.getElementById('hist-museum-exterior');
      if (exteriorSection) {
        exteriorSection.scrollIntoView({ behavior: 'smooth' });
        var arrivalCard = document.getElementById('hist-hall-arrival-card');
        if (arrivalCard) {
          arrivalCard.setAttribute('tabindex', '-1');
          try {
            arrivalCard.focus({ preventScroll: true });
          } catch (e) {}
        }
      }
      announceLive(currentLang === 'es'
        ? 'Ha regresado al Gran Vestíbulo Central del Museo.'
        : 'Returned to the Grand Central Hall of the Museum.');
    }

    /**
     * Redirige hacia la sala independiente seleccionada preservando el idioma activo.
     * @param {string} roomId - ID o clave del destino
     */
    function goToRoom(roomId) {
      if (!roomId) return;
      var cleanId = roomId.replace(/^#/, '');
      var destinationMap = {
        'hist-journey-container': 'sala-1-cronologia.html',
        'hist-room-entry-sala-1': 'sala-1-cronologia.html',
        'sala-1': 'sala-1-cronologia.html',
        'hist-map-section': 'sala-2-cartografia.html',
        'hist-room-entry-sala-2': 'sala-2-cartografia.html',
        'sala-2': 'sala-2-cartografia.html',
        'historia-referencias-section': 'sala-3-archivo.html',
        'hist-room-entry-sala-3': 'sala-3-archivo.html',
        'sala-3': 'sala-3-archivo.html',
        'hist-quiz-section': 'sala-4-cuestionario.html',
        'hist-room-entry-sala-4': 'sala-4-cuestionario.html',
        'sala-4': 'sala-4-cuestionario.html',
        'historia-reflexion-section': 'sala-5-reflexion.html',
        'hist-room-entry-sala-5': 'sala-5-reflexion.html',
        'sala-5': 'sala-5-reflexion.html'
      };

      var targetPage = destinationMap[cleanId];
      if (targetPage) {
        window.location.href = targetPage + '?lang=' + encodeURIComponent(currentLang);
      }
    }

    // Escuchadores de eventos para activación y control accesible
    if (btnEnter) {
      btnEnter.addEventListener('click', function () {
        startCinematicJourney();
      });
    }

    if (btnFacadeHotspot) {
      btnFacadeHotspot.addEventListener('click', function () {
        startCinematicJourney();
      });
    }

    if (layerEstablishing) {
      layerEstablishing.addEventListener('click', function (e) {
        if (!e.target.closest('button') && !isJourneying && !areDoorsOpen) {
          startCinematicJourney();
        }
      });
    }

    if (btnSkip) {
      btnSkip.addEventListener('click', function () {
        skipToCentralHall();
      });
    }

    if (btnSkipJourney) {
      btnSkipJourney.addEventListener('click', function () {
        skipToCentralHall();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', function () {
        resetToExterior();
      });
    }

    if (btnHallReturn) {
      btnHallReturn.addEventListener('click', function () {
        resetToExterior();
      });
    }

    if (btnHallExplore) {
      btnHallExplore.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'sala-1-cronologia.html?lang=' + encodeURIComponent(currentLang);
      });
    }

    if (btnHallReplay) {
      btnHallReplay.addEventListener('click', function () {
        replayJourney();
      });
    }

    if (btnReplayIntro) {
      btnReplayIntro.addEventListener('click', function () {
        replayJourney();
      });
    }

    // Interacción con las 5 puertas interactivas del Vestíbulo Central (Phase 4)
    var hallDoorways = document.querySelectorAll('.hist-hall-doorway');
    hallDoorways.forEach(function (doorwayLink) {
      doorwayLink.addEventListener('click', function (e) {
        var roomKey = resolveRoomKey(doorwayLink);
        if (!roomKey) {
          var rawHref = doorwayLink.getAttribute('href');
          if (rawHref && rawHref.startsWith('#')) {
            e.preventDefault();
            goToRoom(rawHref.substring(1));
          }
          return;
        }

        var config = ROOM_REGISTRY[roomKey];
        if (config && config.isStandalone && config.page) {
          e.preventDefault();
          window.location.href = config.page + '?lang=' + encodeURIComponent(currentLang);
          return; // Navegación normal forzada a la página independiente correspondiente
        }

        // Para salas aún no extraídas (Sala III, IV, V): NUNCA redirigir a Sala I
        var href = doorwayLink.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          goToRoom(href.substring(1));
        }
      });

      // Activación accesible con tecla Espacio (Space) cuando el enlace tiene el foco
      doorwayLink.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 32) {
          e.preventDefault();
          doorwayLink.click();
        }
      });
    });

    // Interacción con todos los botones de retorno al Vestíbulo Central
    var returnHallButtons = document.querySelectorAll('.hist-btn-room-return-hall');
    returnHallButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        returnToHall();
      });
    });

    // Delegación de eventos para botones de retorno generados dinámicamente en HUD de Sala I
    document.addEventListener('click', function (e) {
      var returnBtn = e.target.closest('.hist-btn-room-return-hall');
      if (returnBtn) {
        e.preventDefault();
        returnToHall();
      }
    });

    // API pública para pruebas y control
    window.historiaMuseum = {
      openDoors: startCinematicJourney,
      startJourney: startCinematicJourney,
      skipDoors: skipToCentralHall,
      skipJourney: skipToCentralHall,
      closeDoors: resetToExterior,
      resetToExterior: resetToExterior,
      replayJourney: replayJourney,
      returnToPortal: resetToExterior,
      returnToHall: returnToHall,
      switchView: switchView,
      goToRoom: goToRoom,
      doorways: hallDoorways,
      isOpening: function () { return isOpening; },
      areDoorsOpen: function () { return areDoorsOpen; },
      isJourneying: function () { return isJourneying; }
    };

    // Activación directa e inmediata del Gran Vestíbulo Central cuando se navega con #hall (retorno desde sala standalone)
    if (window.location.hash === '#hall' || window.location.hash === '#hist-central-hall-view') {
      skipToCentralHall();
      var exteriorSection = document.getElementById('hist-museum-exterior');
      if (exteriorSection) {
        exteriorSection.scrollIntoView({ behavior: 'auto' });
      }
      setTimeout(function () {
        var arrivalCard = document.getElementById('hist-hall-arrival-card');
        if (arrivalCard) {
          arrivalCard.setAttribute('tabindex', '-1');
          try {
            arrivalCard.focus({ preventScroll: true });
          } catch (e) {}
        }
        var hallEl = document.getElementById('hist-central-hall-view') || document.getElementById('hist-museum-exterior');
        if (hallEl) {
          hallEl.scrollIntoView({ behavior: 'auto' });
        }
      }, 50);
    }

    // Escuchar cambios de ancla en el historial del navegador
    window.addEventListener('hashchange', function () {
      if (window.location.hash === '#hall' || window.location.hash === '#hist-central-hall-view') {
        returnToHall();
      }
    });
  }

  // Inicialización y manejo de enlaces internos de navegación accesible
  function initMuseumApp() {
    try {
      var urlParams = new URLSearchParams(window.location.search);
      var langParam = urlParams.get('lang');
      if (langParam === 'en' || langParam === 'es') {
        currentLang = langParam;
      }
    } catch (e) {}

    applyLanguage(currentLang);
    initMuseumExterior();

    // Alternador de idioma de cabecera si está presente
    var headerLangBtn = document.getElementById('btn-toggle-language');
    if (headerLangBtn) {
      headerLangBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var nextLang = currentLang === 'es' ? 'en' : 'es';
        applyLanguage(nextLang);
        try {
          var url = new URL(window.location.href);
          url.searchParams.set('lang', currentLang);
          window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        } catch (err) {}
        try {
          window.dispatchEvent(new CustomEvent('historiaLanguageChange', { detail: { lang: currentLang } }));
        } catch (err) {}
      });
    }

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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMuseumApp);
  } else {
    initMuseumApp();
  }
})();
