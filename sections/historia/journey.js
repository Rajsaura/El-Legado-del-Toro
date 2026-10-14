/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/journey.js
 * 
 * "Viaje en el tiempo" - Pinned Scroll Stage:
 * 1. Escenario fijo (position: sticky; height: 100vh) dentro de un contenedor alto.
 * 2. Progreso de scroll (0 a 1) sincronizado con requestAnimationFrame.
 * 3. Segmentos alternados de permanencia (DWELL) y transición (TRAVEL).
 *    - En un dwell: el escenario permanece estático y la tarjeta permanece
 *      abierta y legible indefinidamente hasta que el usuario hace scroll o
 *      pulsa el botón "Continuar →". Nada avanza automáticamente.
 * 4. 12 eventos históricos con orden cronológico estricto y épocas unificadas.
 * 5. Barra inferior con un dot por evento que permite saltar a su parada al clic.
 * 6. Contador de año simple y degradados temáticos por época.
 * 7. Navegación por teclado (Flechas, Home, End).
 * 8. 100% data-driven: adaptable al añadir un 13º evento al array.
 * 9. Encapsulación estricta en IIFE sin variables globales.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. ⚙️ CONFIGURACIÓN DE SCROLL PINNED: DWELL Y TRAVEL (EDITAR AQUÍ)
  // =========================================================================
  /**
   * DWELL_LENGTH_PX: Distancia de scroll (en píxeles) durante la cual el escenario
   * permanece inmóvil y la tarjeta del evento está 100% abierta e interactiva.
   * Modificar este valor para cambiar la duración de la parada.
   */
  const DWELL_LENGTH_PX = 700;

  /**
   * TRAVEL_LENGTH_PX: Distancia de scroll (en píxeles) durante la cual se realiza
   * la transición fluida y cinematográfica entre dos eventos consecutivos.
   */
  const TRAVEL_LENGTH_PX = 500;

  // =========================================================================
  // 2. 📜 ARRAY DE EVENTOS HISTÓRICOS (DATA-DRIVEN)
  // =========================================================================
  /**
   * Secuencia cronológica estricta:
   * 1. Finales S. XI (Orígenes)
   * 2. S. XIII Siete Partidas y 3. 1567 Pío V (Nobleza y prohibiciones)
   * 4. Princ. S. XVIII toreo a pie, 5. 1785 Ronda y 6. Década de 1780 Carlos III (El toreo a pie)
   * 7. Princ. S. XX Belmonte y 8. 16 Mayo 1920 Joselito (Edad de Oro)
   * 9. 1991, 10. 2010 a 2012, 11. 2013 y 12. 2016 (Leyes y debate)
   *
   * Para añadir un 13º evento en el futuro, basta con agregar un nuevo objeto
   * a este array; todo el stage, las paradas y los dots se ajustan automáticamente.
   */
  const events = [
    // 1. Orígenes
    {
      id: 'hist-evt-1',
      year: 1080,
      dateLabel: 'Finales del S. XI',
      era: 'Orígenes',
      type: 'interpretacion',
      title: 'Fiestas con toros documentadas en Iberia',
      captionEs: 'Primeros festejos registrados con reses bravas en la península ibérica; los orígenes exactos de la <span class="hist-vocab" tabindex="0" data-term="tauromaquia" role="button" aria-haspopup="true">tauromaquia</span> continúan siendo objeto de debate historiográfico entre raíces grecorromanas, musulmanas y ritos ganaderos autóctonos.',
      captionEn: 'Earliest documented festivals featuring wild cattle in Iberia; the exact origins of bullfighting remain subject to historical debate among Roman, Moorish, and indigenous pastoral traditions.',
      source: {
        label: 'Britannica, “Bullfighting: History”',
        url: 'https://www.britannica.com/sports/bullfighting/History'
      },
      image: 'assets/timeline/01-origenes-siglo-xi.png'
    },

    // 2. Nobleza y prohibiciones
    {
      id: 'hist-evt-2',
      year: 1260,
      dateLabel: 'Siglo XIII',
      era: 'Nobleza y prohibiciones',
      type: 'interpretacion',
      title: 'Las Siete Partidas de Alfonso X el Sabio',
      captionEs: 'El célebre cuerpo legislativo de Alfonso X es leído comúnmente por historiadores del derecho como una censura moral hacia los juegos y alanceamiento de toros cuando mediaba retribución monetaria o pérdida de decoro público.',
      captionEn: 'The 13th-century Siete Partidas legal code is widely interpreted by scholars as censuring bull contests whenever staged for commercial reward or public degradation.',
      source: {
        label: 'Codina Segovia, dA. Derecho Animal 11/3 (2020)',
        url: 'https://doi.org/10.5565/rev/da.503'
      },
      image: 'assets/timeline/02-siete-partidas-alfonso-x.png'
    },

    // 3. Nobleza y prohibiciones
    {
      id: 'hist-evt-3',
      year: 1567,
      dateLabel: '1 Nov 1567',
      era: 'Nobleza y prohibiciones',
      type: 'hecho',
      title: 'Bula papal “De Salute Gregis” de San Pío V',
      captionEs: 'El Papa Pío V promulga la constitución apostólica que prohíbe terminantemente las corridas de toros en toda la cristiandad bajo pena de excomunión y privación de sepultura eclesiástica.',
      captionEn: 'Pope Pius V issues the papal bull "De Salute Gregis", strictly prohibiting bullfights across Christendom under penalty of excommunication and denial of Christian burial.',
      source: {
        label: 'Britannica, “Bullfighting: History”',
        url: 'https://www.britannica.com/sports/bullfighting/History'
      },
      image: 'assets/timeline/03-bula-papal-pio-v.png'
    },

    // 4. El toreo a pie
    {
      id: 'hist-evt-4',
      year: 1720,
      dateLabel: 'Princ. S. XVIII',
      era: 'El toreo a pie',
      type: 'interpretacion',
      title: 'Transición del rejoneo nobiliario al toreo a pie',
      captionEs: 'Con la llegada de los Borbones la aristocracia abandona las lizas a caballo, permitiendo que peones y varilargueros del pueblo tomen el centro del <span class="hist-vocab" tabindex="0" data-term="albero" role="button" aria-haspopup="true">albero</span>, profesionalizando la lidia a pie.',
      captionEn: 'Following the Bourbon ascension, Spanish nobles steadily abandoned horseback spearing, allowing lower-class artisans and foot lancers to dominate the golden arena sand and establish modern rules.',
      source: {
        label: 'Shubert, Death and Money in the Afternoon (Oxford UP)',
        url: 'https://academic.oup.com/book/47400'
      },
      image: 'assets/timeline/04-transicion-rejoneo-a-pie.png'
    },

    // 5. El toreo a pie
    {
      id: 'hist-evt-5',
      year: 1785,
      dateLabel: '1785',
      era: 'El toreo a pie',
      type: 'hecho',
      title: 'Inauguración de la Real Maestranza de Ronda',
      captionEs: 'Queda oficialmente inaugurada la plaza de toros de Ronda en un histórico festejo donde Pedro Romero y Pepe-Hillo consolidan los cánones de la lidia moderna y la arquitectura circular de piedra.',
      captionEn: 'The stone bullring of Ronda is officially inaugurated in a landmark corrida featuring Pedro Romero, consolidating the classical aesthetic and modern circular arena design.',
      source: {
        label: 'Real Maestranza de Ronda',
        url: 'https://www.rmcr.org/en/tauromachy/'
      },
      image: 'assets/timeline/05-maestranza-de-ronda.png'
    },

    // 6. El toreo a pie
    {
      id: 'hist-evt-6',
      year: 1785,
      dateLabel: 'Década de 1780',
      era: 'El toreo a pie',
      type: 'hecho',
      title: 'Restricciones ilustradas de Carlos III',
      captionEs: 'El monarca reformista Carlos III decreta sucesivas órdenes reales limitando y suspendiendo las corridas de toros de muerte en el reino, impulsado por las críticas de los ministros ilustrados como Jovellanos.',
      captionEn: 'Enlightenment monarch Charles III issues royal decrees restricting and banning bullfights resulting in animal death, influenced by modernizing ministers seeking agricultural and economic reform.',
      source: {
        label: 'Codina Segovia, dA. Derecho Animal (2020)',
        url: 'https://doi.org/10.5565/rev/da.503'
      },
      image: 'assets/timeline/06-carlos-iii-restricciones.png'
    },

    // 7. Edad de Oro (Belmonte revolucionario antes de la muerte de Joselito)
    {
      id: 'hist-evt-7',
      year: 1914,
      dateLabel: 'Princ. S. XX',
      era: 'Edad de Oro',
      type: 'interpretacion',
      title: 'La revolución del temple estético de Juan Belmonte',
      captionEs: 'Belmonte desafía la física del toreo al quedarse quieto y obligar al animal a humillar junto a su cuerpo, transformando la lidia de una prueba de agilidad en un arte trágico ante el <span class="hist-vocab" tabindex="0" data-term="morrillo" role="button" aria-haspopup="true">morrillo</span> de la fiera.',
      captionEn: 'Juan Belmonte reshapes the criteria of bullfighting judgment by planting his feet firm and drawing the horns inches past his chest, turning dodging into solemn aesthetic stillness.',
      source: {
        label: 'Britannica, “Juan Belmonte”',
        url: 'https://www.britannica.com/biography/Juan-Belmonte'
      },
      image: 'assets/timeline/07-belmonte-temple-estetico.png'
    },

    // 8. Edad de Oro
    {
      id: 'hist-evt-8',
      year: 1920,
      dateLabel: '16 Mayo 1920',
      era: 'Edad de Oro',
      type: 'hecho',
      title: 'Muerte de Joselito el Gallo en Talavera de la Reina',
      captionEs: 'José Gómez Ortega “Joselito”, considerado el torero más completo y arquitecto técnico del toreo moderno, fallece trágicamente tras la cornada del toro Bailador, poniendo fin simbólico a la Edad de Oro.',
      captionEn: 'José Gómez Ortega "Joselito", celebrated as the consummate prodigy and technical architect of modern tauromaquia, is fatally gored by the bull Bailador, marking the tragic end of the Golden Age.',
      source: {
        label: 'Britannica, “Joselito”',
        url: 'https://www.britannica.com/biography/Joselito'
      },
      image: 'assets/timeline/08-muerte-joselito-el-gallo.png'
    },

    // 9. Leyes y debate
    {
      id: 'hist-evt-9',
      year: 1991,
      dateLabel: '1991',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Canarias aprueba la Ley 8/1991 de protección animal',
      captionEs: 'El Parlamento de Canarias promulga la primera normativa autonómica de España que prohíbe la utilización de animales en espectáculos que entrañen crueldad o muerte, excluyendo las corridas del archipiélago.',
      captionEn: 'The Canary Islands Parliament passes Law 8/1991 on animal welfare, becoming the first Spanish territory to forbid blood spectacles, effectively phasing out bullfights across the islands.',
      source: {
        label: 'UNED, artículo doctrinal sobre STC 177/2016',
        url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
      },
      image: 'assets/timeline/09-canarias-ley-1991.png'
    },

    // 10. Leyes y debate
    {
      id: 'hist-evt-10',
      year: 2010,
      dateLabel: '2010 (vigor 2012)',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'El Parlamento de Cataluña vota la abolición de las corridas',
      captionEs: 'Tras la tramitación de una masiva Iniciativa Legislativa Popular impulsada por la plataforma Prou!, el hemiciclo catalán aprueba suprimir las corridas en Cataluña con efectos desde el 1 de enero de 2012.',
      captionEn: 'Following a citizen-led popular initiative with 180,000 signatures, the Catalan Parliament votes to ban bullfighting throughout Catalonia effective January 1, 2012.',
      source: {
        label: 'UNED / Diario Oficial',
        url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
      },
      image: 'assets/timeline/10-cataluna-abolicion-2010.png'
    },

    // 11. Leyes y debate
    {
      id: 'hist-evt-11',
      year: 2013,
      dateLabel: '12 Nov 2013',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Ley 18/2013: Protección de la tauromaquia como patrimonio cultural',
      captionEs: 'Las Cortes Generales aprueban la Ley estatal 18/2013 que declara la fiesta de los toros como patrimonio cultural inmaterial español, asignando al Estado el deber de su fomento y protección.',
      captionEn: 'The Spanish Parliament passes national Law 18/2013 declaring bullfighting an intangible cultural heritage, mandating the central state to preserve and promote it nationwide.',
      source: {
        label: 'BOE, Ley 18/2013',
        url: 'https://www.boe.es/eli/es/l/2013/11/12/18'
      },
      image: 'assets/timeline/11-ley-18-2013-patrimonio-cultural.png'
    },

    // 12. Leyes y debate
    {
      id: 'hist-evt-12',
      year: 2016,
      dateLabel: '20 Oct 2016',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Sentencia STC 177/2016 del Tribunal Constitucional',
      captionEs: 'El Tribunal Constitucional estima el recurso contra la ley catalana y declara inconstitucional la prohibición, concluyendo que la comunidad autónoma invadió competencias exclusivas del Estado sobre patrimonio común.',
      captionEn: 'The Constitutional Court overturns the Catalan ban, ruling that autonomous regions lack legal jurisdiction to prohibit cultural practices protected by central state legislation.',
      source: {
        label: 'Congreso de los Diputados, Respuesta STC 177/2016',
        url: 'https://www.congreso.es/entradap/l12p/e4/e_0040859_n_000.pdf'
      },
      image: 'assets/timeline/12-sentencia-tc-177-2016.png'
    }
  ];

  // =========================================================================
  // 3. 📖 GLOSARIO DE TÉRMINOS TAURINOS
  // =========================================================================
  const vocab = {
    'tauromaquia': {
      es: 'Tauromaquia',
      en: 'The art, technique and cultural practice of fighting bulls (from Greek tauros [bull] + mache [fight]).'
    },
    'albero': {
      es: 'Albero',
      en: 'The fine golden-yellow crushed calcarenite sand that carpets traditional Spanish bullrings, quarried in Los Alcores.'
    },
    'morrillo': {
      es: 'Morrillo',
      en: 'The muscular hump on the bull’s neck and upper back that powers its forward charge.'
    }
  };

  // =========================================================================
  // 4. 🏛️ CONFIGURACIÓN DE LAS 5 ÉPOCAS
  // =========================================================================
  const ERAS = [
    {
      id: 'hist-era-origenes',
      name: 'Orígenes',
      label: '1. Orígenes',
      period: 'Hasta el S. XI',
      bgClass: 'hist-era-bg-0'
    },
    {
      id: 'hist-era-nobleza',
      name: 'Nobleza y prohibiciones',
      label: '2. Nobleza y prohibiciones',
      period: 'Siglos XIII – XVIII',
      bgClass: 'hist-era-bg-1'
    },
    {
      id: 'hist-era-toreo-pie',
      name: 'El toreo a pie',
      label: '3. El toreo a pie',
      period: 'Siglo XVIII',
      bgClass: 'hist-era-bg-2'
    },
    {
      id: 'hist-era-edad-oro',
      name: 'Edad de Oro',
      label: '4. Edad de Oro',
      period: '1910 – 1920',
      bgClass: 'hist-era-bg-3'
    },
    {
      id: 'hist-era-leyes-debate',
      name: 'Leyes y debate',
      label: '5. Leyes y debate',
      period: '1991 – Actualidad',
      bgClass: 'hist-era-bg-4'
    }
  ];

  // =========================================================================
  // 5. VARIABLES DE ESTADO Y ELEMENTOS DOM
  // =========================================================================
  let journeyContainer = null;
  let stageElement = null;
  let hudEraTitle = null;
  let hudYearNum = null;
  let hudCounter = null;
  let dotsLineFill = null;
  let dotButtons = [];
  let cardElements = [];
  let eraBgElements = [];

  // Fondos cinemáticos dinámicos
  let cinemaStageElement = null;
  let cinemaLayerElements = [];
  let activeCinemaIndex = 0;
  let programmaticTargetIndex = null;
  let programmaticScrollTimer = null;

  // Navegación superior y contador lateral
  let eraNavContainer = null;
  let yearCounterElement = null;

  // Control de scroll y animación
  let isTicking = false;
  let activeEventIndex = 0;

  /**
   * Pre-carga de imágenes de la cronología en segundo plano para evitar parpadeos.
   */
  function preloadTimelineImages() {
    events.forEach(evt => {
      if (evt.image) {
        const img = new Image();
        img.src = evt.image;
      }
    });
  }

  /**
   * Actualiza la imagen cinemática activa con transición suave y sin parpadeos.
   * @param {number} index - Índice del evento seleccionado
   */
  function setCinemaImage(index) {
    if (index < 0 || index >= events.length) return;
    if (activeCinemaIndex === index && cinemaLayerElements[index] && cinemaLayerElements[index].classList.contains('hist-cinema-active')) {
      return;
    }

    activeCinemaIndex = index;

    cinemaLayerElements.forEach((layer, idx) => {
      if (idx === index) {
        layer.classList.add('hist-cinema-active');
        layer.setAttribute('aria-hidden', 'false');
      } else {
        layer.classList.remove('hist-cinema-active');
        layer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Genera el HTML de una tarjeta individual para el pinned scroll stage.
   * @param {Object} event - Objeto del evento histórico
   * @param {number} index - Índice del evento
   * @returns {string} Markup HTML
   */
  function createStageCardHTML(event, index) {
    const isFact = event.type === 'hecho';
    const badgeClass = isFact ? 'hist-badge-fact' : 'hist-badge-interp';
    const badgeLabel = isFact ? 'Hecho' : 'Interpretación';
    const badgeTooltip = isFact ? 'Hecho: documented fact' : 'Interpretación: a historian’s reading';
    const isLast = index === events.length - 1;
    const continueLabel = isLast ? 'Siguiente sección ↓' : 'Continuar →';

    return `
      <article class="hist-stage-card ${index === 0 ? 'hist-card-active' : ''}" 
               id="hist-card-${event.id}" 
               data-index="${index}" 
               data-year="${event.year}" 
               data-datelabel="${event.dateLabel}" 
               data-era="${event.era}" 
               tabindex="0" 
               role="region" 
               aria-label="${event.title}">
        <div class="hist-card-inner">
          <div class="hist-card-topbar">
            <span class="hist-card-era-badge">${event.era}</span>
            <div class="hist-badge-wrapper">
              <span class="hist-badge ${badgeClass}" tabindex="0" data-tooltip="${badgeTooltip}" aria-label="${badgeTooltip}">
                <span class="hist-badge-dot" aria-hidden="true"></span>
                ${badgeLabel}
              </span>
            </div>
          </div>

          <div class="hist-card-heading-group">
            <span class="hist-card-date">${event.dateLabel}</span>
            <h3 class="hist-card-title">${event.title}</h3>
          </div>

          <div class="hist-card-content">
            <p class="hist-card-caption-es">${event.captionEs}</p>
            <p class="hist-card-caption-en" aria-hidden="true">${event.captionEn}</p>
          </div>

          <div class="hist-card-footer">
            <div class="hist-source-container">
              <a href="${event.source.url}" class="hist-source-link" target="_blank" rel="noopener noreferrer" title="Consultar fuente original">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Fuente: ${event.source.label}</span>
              </a>
            </div>

            <div class="hist-card-actions">
              <button type="button" class="hist-btn-translate" aria-label="Alternar traducción EN / ES" title="Alternar idioma inglés / español">
                <span class="hist-translate-icon" aria-hidden="true">🌐</span>
                <span class="hist-translate-label">EN / ES</span>
              </button>

              <button type="button" 
                      class="hist-btn-prev" 
                      data-prev-index="${index - 1}" 
                      aria-label="Evento anterior" 
                      ${index === 0 ? 'disabled' : ''}>
                <span aria-hidden="true">←</span>
                <span>Anterior</span>
              </button>

              <button type="button" class="hist-btn-continue" data-next-index="${index + 1}" aria-label="${continueLabel}">
                <span>${continueLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Construye dinámicamente todo el escenario fijo (Pinned Scroll Stage).
   */
  function renderPinnedStage() {
    journeyContainer = document.getElementById('hist-journey-container');
    if (!journeyContainer) return;

    // 0. Capas cinemáticas por evento (12 imágenes históricas)
    const cinemaLayersHTML = events.map((evt, i) => `
      <div class="hist-cinema-layer ${i === 0 ? 'hist-cinema-active' : ''}" 
           id="hist-cinema-layer-${i}" 
           data-index="${i}" 
           role="img" 
           aria-label="${evt.dateLabel}: ${evt.title}"
           aria-hidden="${i === 0 ? 'false' : 'true'}">
        <img src="${evt.image}" 
             alt="${evt.title} (${evt.dateLabel})" 
             class="hist-cinema-img" 
             loading="${i === 0 ? 'eager' : 'lazy'}" 
             decoding="async" />
      </div>
    `).join('');

    // 1. Fondos con degradados temáticos por época
    const backdropsHTML = ERAS.map((era, i) => `
      <div class="hist-era-bg ${era.bgClass} ${i === 0 ? 'hist-bg-active' : ''}" data-era="${era.name}"></div>
    `).join('');

    // 2. Tarjetas de eventos
    const cardsHTML = events.map((evt, i) => createStageCardHTML(evt, i)).join('');

    // 3. Dots de navegación inferior (uno por evento)
    const dotsHTML = events.map((evt, i) => `
      <button type="button" 
              class="hist-dot ${i === 0 ? 'hist-dot-active' : ''}" 
              data-index="${i}" 
              role="tab" 
              aria-selected="${i === 0}" 
              aria-label="Parada ${i + 1} de ${events.length}: ${evt.dateLabel} - ${evt.title}">
        <span class="hist-dot-marker" aria-hidden="true"></span>
        <span class="hist-dot-tooltip">${evt.dateLabel} • ${evt.era}</span>
      </button>
    `).join('');

    // Montar la estructura completa del stage
    journeyContainer.innerHTML = `
      <div class="hist-stage" id="hist-stage" role="region" aria-label="Escenario interactivo de la historia">
        
        <!-- Capas de fondos cinemáticos y degradados de época -->
        <div class="hist-stage-backdrop-wrap" aria-hidden="true">
          <!-- 1. Capas cinemáticas con imágenes históricas -->
          <div class="hist-cinema-stage" id="hist-cinema-stage">
            ${cinemaLayersHTML}
          </div>

          <!-- 2. Overlay oscuro translúcido para garantizar legibilidad -->
          <div class="hist-cinema-overlay" aria-hidden="true"></div>

          <!-- 3. Degradados temáticos por época (tinte sutil) -->
          ${backdropsHTML}

          <!-- 4. Viñeta perimetral de sombra cinemática -->
          <div class="hist-stage-vignette" aria-hidden="true"></div>
        </div>

        <!-- HUD superior con época actual y año simple -->
        <header class="hist-stage-hud" id="hist-stage-hud">
          <div class="hist-hud-inner">
            <div class="hist-hud-left">
              <span class="hist-hud-era-kicker">Época</span>
              <h2 class="hist-hud-era-title" id="hist-hud-era-title">${events[0].era}</h2>
            </div>

            <div class="hist-hud-center">
              <div class="hist-stage-year-badge">
                <span class="hist-stage-year-icon" aria-hidden="true">⏳</span>
                <span class="hist-stage-year-num" id="hist-stage-year-num">${events[0].dateLabel}</span>
              </div>
            </div>

            <div class="hist-hud-right">
              <span class="hist-hud-counter" id="hist-hud-counter">1 / ${events.length}</span>
              <span class="hist-hud-scroll-hint" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 5v14M19 12l-7 7-7-7"></path>
                </svg>
                Desplaza
              </span>
            </div>
          </div>
        </header>

        <!-- Lienzo central con tarjetas -->
        <div class="hist-stage-canvas" id="hist-stage-canvas">
          <div class="hist-stage-card-wrap" id="hist-stage-card-wrap">
            ${cardsHTML}
          </div>
        </div>

        <!-- Barra inferior de progreso y puntos -->
        <footer class="hist-stage-bottom-bar" id="hist-stage-bottom-bar">
          <div class="hist-bottom-bar-inner">
            <div class="hist-dots-track" id="hist-dots-track" role="tablist" aria-label="Paradas cronológicas">
              <div class="hist-dots-line-bg" aria-hidden="true">
                <div class="hist-dots-line-fill" id="hist-dots-line-fill"></div>
              </div>
              ${dotsHTML}
            </div>
          </div>
        </footer>

      </div>
    `;

    // Cachear referencias DOM
    stageElement = document.getElementById('hist-stage');
    hudEraTitle = document.getElementById('hist-hud-era-title');
    hudYearNum = document.getElementById('hist-stage-year-num');
    hudCounter = document.getElementById('hist-hud-counter');
    dotsLineFill = document.getElementById('hist-dots-line-fill');
    dotButtons = Array.from(document.querySelectorAll('.hist-dot'));
    cardElements = Array.from(document.querySelectorAll('.hist-stage-card'));
    eraBgElements = Array.from(document.querySelectorAll('.hist-era-bg'));
    cinemaStageElement = document.getElementById('hist-cinema-stage');
    cinemaLayerElements = Array.from(document.querySelectorAll('.hist-cinema-layer'));
    eraNavContainer = document.getElementById('hist-era-nav');
    yearCounterElement = document.getElementById('hist-year-counter');

    updateContainerHeight();
  }

  /**
   * Calcula y asigna la altura del contenedor principal:
   * (N - 1) * (DWELL + TRAVEL) + DWELL + 100vh
   */
  function updateContainerHeight() {
    if (!journeyContainer) return;
    const numEvents = events.length;
    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    const totalScrollRange = (numEvents - 1) * stepDistance + DWELL_LENGTH_PX;
    const totalHeight = window.innerHeight + totalScrollRange;
    journeyContainer.style.height = totalHeight + 'px';
  }

  /**
   * Obtiene la posición de scroll actual relativa al contenedor del stage.
   * @returns {Object} Datos del estado actual (dwell o travel, índices, factores)
   */
  function computeScrollState() {
    if (!journeyContainer) return null;

    const rect = journeyContainer.getBoundingClientRect();
    const scrollOffset = -rect.top;
    const numEvents = events.length;
    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    const totalScrollRange = (numEvents - 1) * stepDistance + DWELL_LENGTH_PX;

    // Offset restringido dentro del rango del stage
    const clampedOffset = Math.max(0, Math.min(totalScrollRange, scrollOffset));
    const progress = totalScrollRange > 0 ? clampedOffset / totalScrollRange : 0;

    // Buscar en qué segmento (dwell o travel) nos encontramos
    for (let i = 0; i < numEvents; i++) {
      const dwellStart = i * stepDistance;
      const dwellEnd = dwellStart + DWELL_LENGTH_PX;

      if (clampedOffset <= dwellEnd || i === numEvents - 1) {
        if (clampedOffset >= dwellStart) {
          // ==================== FASE DWELL ====================
          // El escenario está inmóvil y la tarjeta abierta
          return {
            isDwell: true,
            activeEventIndex: i,
            fromIndex: i,
            toIndex: i,
            travelFactor: 0,
            progress: progress,
            clampedOffset: clampedOffset,
            totalScrollRange: totalScrollRange
          };
        } else {
          // ==================== FASE TRAVEL ===================
          // Transición suave entre el evento anterior (i - 1) y el actual (i)
          const travelStart = (i - 1) * stepDistance + DWELL_LENGTH_PX;
          const travelFactor = (clampedOffset - travelStart) / TRAVEL_LENGTH_PX;
          const normalizedFactor = Math.max(0, Math.min(1, travelFactor));

          return {
            isDwell: false,
            activeEventIndex: normalizedFactor < 0.5 ? i - 1 : i,
            fromIndex: i - 1,
            toIndex: i,
            travelFactor: normalizedFactor,
            progress: progress,
            clampedOffset: clampedOffset,
            totalScrollRange: totalScrollRange
          };
        }
      }
    }

    return null;
  }

  /**
   * Actualiza visualmente el escenario en función del progreso de scroll.
   * Ejecutado dentro de requestAnimationFrame para 60fps constante.
   */
  function updateStage() {
    const state = computeScrollState();
    if (!state) return;

    activeEventIndex = state.activeEventIndex;
    const activeEvent = events[activeEventIndex];

    // 1. Actualizar HUD superior
    if (hudEraTitle && hudEraTitle.textContent !== activeEvent.era) {
      hudEraTitle.textContent = activeEvent.era;
    }
    if (hudYearNum && hudYearNum.textContent !== activeEvent.dateLabel) {
      hudYearNum.textContent = activeEvent.dateLabel;
    }
    if (hudCounter) {
      hudCounter.textContent = `${activeEventIndex + 1} / ${events.length}`;
    }

    // 2. Sincronizar contador lateral antiguo si existe en el DOM
    if (yearCounterElement) {
      const dateVal = yearCounterElement.querySelector('.hist-year-value');
      const eraVal = yearCounterElement.querySelector('.hist-year-era');
      if (dateVal && dateVal.textContent !== activeEvent.dateLabel) {
        dateVal.textContent = activeEvent.dateLabel;
      }
      if (eraVal && eraVal.textContent !== activeEvent.era) {
        eraVal.textContent = activeEvent.era;
      }
    }

    // 3. Sincronizar la barra de menú fija superior (#hist-era-nav)
    if (eraNavContainer) {
      const links = eraNavContainer.querySelectorAll('.hist-era-link');
      links.forEach(link => {
        const era = link.getAttribute('data-era');
        if (era === activeEvent.era) {
          link.classList.add('hist-active');
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove('hist-active');
          link.removeAttribute('aria-current');
        }
      });
    }

    // 4. Actualizar barra de progreso inferior y dots
    if (dotsLineFill) {
      dotsLineFill.style.width = (state.progress * 100) + '%';
    }

    dotButtons.forEach((btn, i) => {
      if (i === activeEventIndex) {
        btn.classList.add('hist-dot-active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('hist-dot-active');
        btn.setAttribute('aria-selected', 'false');
      }

      if (i < activeEventIndex) {
        btn.classList.add('hist-dot-passed');
      } else {
        btn.classList.remove('hist-dot-passed');
      }
    });

    // 5. Actualizar visibilidad y crossfade de las tarjetas
    if (state.isDwell) {
      // En dwell: la tarjeta activa está estática y 100% visible
      cardElements.forEach((card, idx) => {
        if (idx === state.activeEventIndex) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.pointerEvents = 'auto';
          card.classList.add('hist-card-active');
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.pointerEvents = 'none';
          card.classList.remove('hist-card-active');
        }
      });
    } else {
      // En travel: desvanecimiento cruzado suave entre fromIndex y toIndex
      const u = state.travelFactor;
      cardElements.forEach((card, idx) => {
        if (idx === state.fromIndex) {
          const opacity = Math.max(0, 1 - u * 2.2);
          const ty = -u * 30;
          card.style.opacity = opacity.toFixed(3);
          card.style.transform = `translateY(${ty.toFixed(1)}px)`;
          card.style.pointerEvents = opacity > 0.7 ? 'auto' : 'none';
        } else if (idx === state.toIndex) {
          const opacity = Math.max(0, (u - 0.45) * 1.8);
          const ty = (1 - u) * 30;
          card.style.opacity = opacity.toFixed(3);
          card.style.transform = `translateY(${ty.toFixed(1)}px)`;
          card.style.pointerEvents = opacity > 0.7 ? 'auto' : 'none';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.pointerEvents = 'none';
          card.classList.remove('hist-card-active');
        }
      });
    }

    // 6. Transición suave de degradados por época
    const currentEraName = events[activeEventIndex].era;
    eraBgElements.forEach(bg => {
      const era = bg.getAttribute('data-era');
      if (era === currentEraName) {
        bg.style.opacity = '1';
      } else {
        bg.style.opacity = '0';
      }
    });

    // 7. Fondo cinemático dinámico y paralaje sutil
    if (programmaticTargetIndex === null) {
      setCinemaImage(activeEventIndex);
    }

    if (cinemaStageElement && state) {
      // Paralaje sutil y contenido (+/- 14px a lo largo de todo el recorrido de scroll)
      const parallaxY = (state.progress - 0.5) * 28;
      cinemaStageElement.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0)`;
    }
  }

  /**
   * Manejador de evento scroll regulado con requestAnimationFrame.
   */
  function onScroll() {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(function () {
        updateStage();
        isTicking = false;
      });
    }
  }

  /**
   * Navega de forma suave al punto medio del dwell del evento especificado.
   * @param {number} targetIndex - Índice del evento al que saltar
   */
  function scrollToEvent(targetIndex) {
    const clampedIndex = Math.max(0, Math.min(events.length - 1, targetIndex));
    programmaticTargetIndex = clampedIndex;

    // Cambiar inmediatamente el fondo cinemático al evento destino para un crossfade
    // directo y limpio, evitando parpadeos por los eventos intermedios.
    setCinemaImage(clampedIndex);

    clearTimeout(programmaticScrollTimer);
    programmaticScrollTimer = setTimeout(() => {
      programmaticTargetIndex = null;
    }, 700);

    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    // Ubicar el scroll en el centro exacto del dwell para máxima holgura
    const targetOffset = clampedIndex * stepDistance + (DWELL_LENGTH_PX * 0.5);

    if (!journeyContainer) return;

    const containerTop = journeyContainer.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = containerTop + targetOffset;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }

  /**
   * Configura las interacciones por clic en los dots inferiores y botones de continuar.
   */
  function initNavigationControls() {
    if (!journeyContainer) return;

    // Clic en los dots de la pista inferior
    journeyContainer.addEventListener('click', function (e) {
      const dot = e.target.closest('.hist-dot');
      if (dot) {
        e.preventDefault();
        const index = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          scrollToEvent(index);
        }
        return;
      }

      // Clic en el botón "← Anterior" de la tarjeta
      const prevBtn = e.target.closest('.hist-btn-prev');
      if (prevBtn && !prevBtn.disabled) {
        e.preventDefault();
        const prevIndex = parseInt(prevBtn.getAttribute('data-prev-index'), 10);
        if (!isNaN(prevIndex) && prevIndex >= 0) {
          scrollToEvent(prevIndex);
        }
        return;
      }

      // Clic en el botón "Continuar →" de la tarjeta
      const continueBtn = e.target.closest('.hist-btn-continue');
      if (continueBtn) {
        e.preventDefault();
        const nextIndex = parseInt(continueBtn.getAttribute('data-next-index'), 10);
        if (nextIndex < events.length) {
          scrollToEvent(nextIndex);
        } else {
          // Último evento: desplazarse suavemente a la siguiente sección (Cuestionario)
          const quizSection = document.getElementById('hist-quiz-section');
          if (quizSection) {
            quizSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }

      // Alternar idioma inglés / español
      const translateBtn = e.target.closest('.hist-btn-translate');
      if (translateBtn) {
        e.preventDefault();
        const card = translateBtn.closest('.hist-stage-card');
        if (card) {
          toggleCardTranslation(card);
        }
        return;
      }
    });

    // Clic en enlaces de la barra de épocas (#hist-era-nav)
    if (eraNavContainer) {
      eraNavContainer.addEventListener('click', function (e) {
        const link = e.target.closest('.hist-era-link');
        if (link) {
          e.preventDefault();
          const targetEra = link.getAttribute('data-era');
          // Encontrar el primer evento que pertenece a esa época
          const targetEventIndex = events.findIndex(evt => evt.era === targetEra);
          if (targetEventIndex !== -1) {
            scrollToEvent(targetEventIndex);
          }
        }
      });
    }
  }

  /**
   * Alterna la traducción al inglés en una tarjeta.
   * @param {HTMLElement} card - Elemento .hist-stage-card
   */
  function toggleCardTranslation(card) {
    if (!card) return;

    const isTranslated = card.classList.contains('hist-translated');
    const captionEs = card.querySelector('.hist-card-caption-es');
    const captionEn = card.querySelector('.hist-card-caption-en');
    const translateBtn = card.querySelector('.hist-btn-translate');

    if (isTranslated) {
      card.classList.remove('hist-translated');
      if (captionEs) captionEs.removeAttribute('aria-hidden');
      if (captionEn) captionEn.setAttribute('aria-hidden', 'true');
      if (translateBtn) translateBtn.setAttribute('aria-pressed', 'false');
    } else {
      card.classList.add('hist-translated');
      if (captionEs) captionEs.setAttribute('aria-hidden', 'true');
      if (captionEn) captionEn.removeAttribute('aria-hidden');
      if (translateBtn) translateBtn.setAttribute('aria-pressed', 'true');
    }
  }

  /**
   * Configura el soporte de teclado (Flechas, Home, End).
   */
  function initKeyboardNavigation() {
    window.addEventListener('keydown', function (e) {
      // Ignorar si el usuario está escribiendo en campos de texto
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (!journeyContainer) return;

      // Verificar si la ventana de visualización se encuentra en o cerca del stage
      const rect = journeyContainer.getBoundingClientRect();
      const isInStage = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3;

      if (isInStage) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          scrollToEvent(activeEventIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          scrollToEvent(activeEventIndex - 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          scrollToEvent(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          scrollToEvent(events.length - 1);
        }
      }
    });
  }

  /**
   * Configura los tooltips flotantes para los términos del glosario taurino.
   */
  function initVocabTooltips() {
    let floatingTooltip = document.getElementById('hist-floating-vocab-tooltip');
    if (!floatingTooltip) {
      floatingTooltip = document.createElement('div');
      floatingTooltip.id = 'hist-floating-vocab-tooltip';
      floatingTooltip.className = 'hist-vocab-tooltip';
      floatingTooltip.setAttribute('role', 'tooltip');
      floatingTooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(floatingTooltip);
    }

    let activeVocabElement = null;

    function showTooltip(el) {
      const termKey = el.getAttribute('data-term');
      const entry = vocab[termKey];
      if (!entry) return;

      activeVocabElement = el;
      floatingTooltip.innerHTML = `
        <div class="hist-tooltip-title">${entry.es}</div>
        <div class="hist-tooltip-def">${entry.en}</div>
      `;
      floatingTooltip.classList.add('hist-tooltip-active');
      floatingTooltip.setAttribute('aria-hidden', 'false');

      positionTooltip(el);
    }

    function hideTooltip() {
      if (floatingTooltip) {
        floatingTooltip.classList.remove('hist-tooltip-active');
        floatingTooltip.setAttribute('aria-hidden', 'true');
      }
      activeVocabElement = null;
    }

    function positionTooltip(el) {
      const rect = el.getBoundingClientRect();
      const tooltipRect = floatingTooltip.getBoundingClientRect();

      let top = rect.top - tooltipRect.height - 10;
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

      if (top < 10) {
        top = rect.bottom + 10;
      }
      if (left < 12) left = 12;
      if (left + tooltipRect.width > window.innerWidth - 12) {
        left = window.innerWidth - tooltipRect.width - 12;
      }

      floatingTooltip.style.top = `${top + window.scrollY}px`;
      floatingTooltip.style.left = `${left + window.scrollX}px`;
    }

    document.addEventListener('mouseover', function (e) {
      const vocabEl = e.target.closest('.hist-vocab');
      if (vocabEl) showTooltip(vocabEl);
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('.hist-vocab')) hideTooltip();
    });

    document.addEventListener('focusin', function (e) {
      const vocabEl = e.target.closest('.hist-vocab');
      if (vocabEl) showTooltip(vocabEl);
    });

    document.addEventListener('focusout', function (e) {
      if (e.target.closest('.hist-vocab')) hideTooltip();
    });

    document.addEventListener('click', function (e) {
      const vocabEl = e.target.closest('.hist-vocab');
      if (vocabEl) {
        e.stopPropagation();
        if (activeVocabElement === vocabEl) {
          hideTooltip();
        } else {
          showTooltip(vocabEl);
        }
      } else {
        hideTooltip();
      }
    });

    window.addEventListener('resize', () => {
      if (activeVocabElement) positionTooltip(activeVocabElement);
    });
  }

  /**
   * Inicialización global del módulo al cargar la página.
   */
  function init() {
    preloadTimelineImages();
    renderPinnedStage();
    initNavigationControls();
    initKeyboardNavigation();
    initVocabTooltips();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateContainerHeight();
      updateStage();
    }, { passive: true });

    // Primera pasada de renderizado
    updateStage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
