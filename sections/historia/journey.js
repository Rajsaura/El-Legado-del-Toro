/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/journey.js
 * 
 * "Viaje en el tiempo" - Cronología interactiva guiada por scroll:
 * 1. Array de 12 eventos históricos con datos verificados y fuentes bibliográficas.
 * 2. Glosario de vocabulario taurino con tooltips interactivos (hover, focus, tap).
 * 3. Menú fijo de navegación por 5 épocas históricas con resaltado activo.
 * 4. Contador de año / fecha lateral adhesivo (sticky) sensible a la posición del scroll.
 * 5. Tarjetas animadas con IntersectionObserver y alternancia de traducción ES / EN al clic.
 * 6. Encapsulación estricta en IIFE sin variables globales.
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * ==========================================================================
   * 1. 📜 ARRAY DE EVENTOS HISTÓRICOS (EDITAR EVENTOS Y CAPTIONS AQUÍ)
   * ==========================================================================
   * Cada evento contiene:
   * - id: Identificador único del evento (prefijo hist-).
   * - year: Año numérico para ordenación y cómputo.
   * - dateLabel: Etiqueta textual visible (aproximada como "S. XI" o exacta como "1 Nov 1567").
   * - era: Una de las 5 épocas ("Orígenes", "Nobleza y prohibiciones", "El toreo a pie", "Edad de Oro", "Leyes y debate").
   * - title: Título del hito histórico.
   * - captionEs: Explicación en español (incluye palabras del glosario con <span class="hist-vocab">).
   * - captionEn: Traducción / explicación en inglés.
   * - source: { label, url } Fuente archivística o académica oficial.
   * - type: "hecho" (dato documental fáctico) o "interpretacion" (lectura historiográfica).
   */
  const events = [
    {
      id: 'hist-evt-1',
      year: 1080,
      dateLabel: 'Finales del S. XI',
      era: 'Orígenes',
      type: 'interpretacion',
      title: 'Fiestas con toros documentadas en Iberia',
      captionEs: 'TODO: rewrite in my own words. Primeros festejos registrados con reses bravas en la península ibérica; los orígenes exactos de la <span class="hist-vocab" tabindex="0" data-term="tauromaquia" role="button" aria-haspopup="true">tauromaquia</span> continúan siendo objeto de debate historiográfico entre raíces grecorromanas, musulmanas y ritos ganaderos autóctonos.',
      captionEn: 'TODO: rewrite in my own words. Earliest documented festivals featuring wild cattle in Iberia; the exact origins of bullfighting remain subject to historical debate among Roman, Moorish, and indigenous pastoral traditions.',
      source: {
        label: 'Britannica, “Bullfighting: History”',
        url: 'https://www.britannica.com/sports/bullfighting/History'
      }
    },
    {
      id: 'hist-evt-2',
      year: 1260,
      dateLabel: 'Siglo XIII',
      era: 'Nobleza y prohibiciones',
      type: 'interpretacion',
      title: 'Las Siete Partidas de Alfonso X el Sabio',
      captionEs: 'TODO: rewrite in my own words. El célebre cuerpo legislativo de Alfonso X es leído comúnmente por historiadores del derecho como una censura moral hacia los juegos y alanceamiento de toros cuando mediaba retribución monetaria o pérdida de decoro público.',
      captionEn: 'TODO: rewrite in my own words. The 13th-century Siete Partidas legal code is widely interpreted by scholars as censuring bull contests whenever staged for commercial reward or public degradation.',
      source: {
        label: 'Codina Segovia, dA. Derecho Animal 11/3 (2020)',
        url: 'https://doi.org/10.5565/rev/da.503'
      }
    },
    {
      id: 'hist-evt-3',
      year: 1567,
      dateLabel: '1 Nov 1567',
      era: 'Nobleza y prohibiciones',
      type: 'hecho',
      title: 'Bula papal “De Salute Gregis” de San Pío V',
      captionEs: 'TODO: rewrite in my own words. El Papa Pío V promulga la constitución apostólica que prohíbe terminantemente las corridas de toros en toda la cristiandad bajo pena de excomunión y privación de sepultura eclesiástica.',
      captionEn: 'TODO: rewrite in my own words. Pope Pius V issues the papal bull "De Salute Gregis", strictly prohibiting bullfights across Christendom under penalty of excommunication and denial of Christian burial.',
      source: {
        label: 'Britannica, “Bullfighting: History”',
        url: 'https://www.britannica.com/sports/bullfighting/History'
      }
    },
    {
      id: 'hist-evt-4',
      year: 1720,
      dateLabel: 'Princ. S. XVIII',
      era: 'El toreo a pie',
      type: 'interpretacion',
      title: 'Transición del rejoneo nobiliario al toreo a pie',
      captionEs: 'TODO: rewrite in my own words. Con la llegada de los Borbones la aristocracia abandona las lizas a caballo, permitiendo que peones y varilargueros del pueblo tomen el centro del <span class="hist-vocab" tabindex="0" data-term="albero" role="button" aria-haspopup="true">albero</span>, profesionalizando la lidia a pie.',
      captionEn: 'TODO: rewrite in my own words. Following the Bourbon ascension, Spanish nobles steadily abandoned horseback spearing, allowing lower-class artisans and foot lancers to dominate the golden arena sand and establish modern rules.',
      source: {
        label: 'Shubert, Death and Money in the Afternoon (Oxford UP)',
        url: 'https://academic.oup.com/book/47400'
      }
    },
    {
      id: 'hist-evt-5',
      year: 1785,
      dateLabel: '1785',
      era: 'El toreo a pie',
      type: 'hecho',
      title: 'Inauguración de la Real Maestranza de Ronda',
      captionEs: 'TODO: rewrite in my own words. Queda oficialmente inaugurada la plaza de toros de Ronda en un histórico festejo donde Pedro Romero y Pepe-Hillo consolidan los cánones de la lidia moderna y la arquitectura circular de piedra.',
      captionEn: 'TODO: rewrite in my own words. The stone bullring of Ronda is officially inaugurated in a landmark corrida featuring Pedro Romero, consolidating the classical aesthetic and modern circular arena design.',
      source: {
        label: 'Real Maestranza de Ronda',
        url: 'https://www.rmcr.org/en/tauromachy/'
      }
    },
    {
      id: 'hist-evt-6',
      year: 1785,
      dateLabel: 'Década de 1780',
      era: 'Nobleza y prohibiciones',
      type: 'hecho',
      title: 'Restricciones ilustradas de Carlos III',
      captionEs: 'TODO: rewrite in my own words. El monarca reformista Carlos III decreta sucesivas órdenes reales limitando y suspendiendo las corridas de toros de muerte en el reino, impulsado por las críticas de los ministros ilustrados como Jovellanos.',
      captionEn: 'TODO: rewrite in my own words. Enlightenment monarch Charles III issues royal decrees restricting and banning bullfights resulting in animal death, influenced by modernizing ministers seeking agricultural and economic reform.',
      source: {
        label: 'Codina Segovia, dA. Derecho Animal (2020)',
        url: 'https://doi.org/10.5565/rev/da.503'
      }
    },
    {
      id: 'hist-evt-7',
      year: 1920,
      dateLabel: '16 Mayo 1920',
      era: 'Edad de Oro',
      type: 'hecho',
      title: 'Muerte de Joselito el Gallo en Talavera de la Reina',
      captionEs: 'TODO: rewrite in my own words. José Gómez Ortega “Joselito”, considerado el torero más completo y arquitecto técnico del toreo moderno, fallece trágicamente tras la cornada del toro Bailador, poniendo fin simbólico a la Edad de Oro.',
      captionEn: 'TODO: rewrite in my own words. José Gómez Ortega "Joselito", celebrated as the consummate prodigy and technical architect of modern tauromaquia, is fatally gored by the bull Bailador, marking the tragic end of the Golden Age.',
      source: {
        label: 'Britannica, “Joselito”',
        url: 'https://www.britannica.com/biography/Joselito'
      }
    },
    {
      id: 'hist-evt-8',
      year: 1914,
      dateLabel: 'Princ. S. XX',
      era: 'Edad de Oro',
      type: 'interpretacion',
      title: 'La revolución del temple estético de Juan Belmonte',
      captionEs: 'TODO: rewrite in my own words. Belmonte desafía la física del toreo al quedarse quieto y obligar al animal a humillar junto a su cuerpo, transformando la lidia de una prueba de agilidad en un arte trágico ante el <span class="hist-vocab" tabindex="0" data-term="morrillo" role="button" aria-haspopup="true">morrillo</span> de la fiera.',
      captionEn: 'TODO: rewrite in my own words. Juan Belmonte reshapes the criteria of bullfighting judgment by planting his feet firm and drawing the horns inches past his chest, turning dodging into solemn aesthetic stillness.',
      source: {
        label: 'Britannica, “Juan Belmonte” (TODO: URL)',
        url: 'https://www.britannica.com/biography/Juan-Belmonte'
      }
    },
    {
      id: 'hist-evt-9',
      year: 1991,
      dateLabel: '1991',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Canarias aprueba la Ley 8/1991 de protección animal',
      captionEs: 'TODO: rewrite in my own words. El Parlamento de Canarias promulga la primera normativa autonómica de España que prohíbe la utilización de animales en espectáculos que entrañen crueldad o muerte, excluyendo las corridas del archipiélago.',
      captionEn: 'TODO: rewrite in my own words. The Canary Islands Parliament passes Law 8/1991 on animal welfare, becoming the first Spanish territory to forbid blood spectacles, effectively phasing out bullfights across the islands.',
      source: {
        label: 'UNED, artículo doctrinal sobre STC 177/2016',
        url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
      }
    },
    {
      id: 'hist-evt-10',
      year: 2010,
      dateLabel: '2010 (vigor 2012)',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'El Parlamento de Cataluña vota la abolición de las corridas',
      captionEs: 'TODO: rewrite in my own words. Tras la tramitación de una masiva Iniciativa Legislativa Popular impulsada por la plataforma Prou!, el hemiciclo catalán aprueba suprimir las corridas en Cataluña con efectos desde el 1 de enero de 2012.',
      captionEn: 'TODO: rewrite in my own words. Following a citizen-led popular initiative with 180,000 signatures, the Catalan Parliament votes to ban bullfighting throughout Catalonia effective January 1, 2012.',
      source: {
        label: 'UNED / Diario Oficial (TODO: enlace BOE)',
        url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
      }
    },
    {
      id: 'hist-evt-11',
      year: 2013,
      dateLabel: '12 Nov 2013',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Ley 18/2013: Protección de la tauromaquia como patrimonio cultural',
      captionEs: 'TODO: rewrite in my own words. Las Cortes Generales aprueban la Ley estatal 18/2013 que declara la fiesta de los toros como patrimonio cultural inmaterial español, asignando al Estado el deber de su fomento y protección.',
      captionEn: 'TODO: rewrite in my own words. The Spanish Parliament passes national Law 18/2013 declaring bullfighting an intangible cultural heritage, mandating the central state to preserve and promote it nationwide.',
      source: {
        label: 'BOE, Ley 18/2013',
        url: 'https://www.boe.es/eli/es/l/2013/11/12/18'
      }
    },
    {
      id: 'hist-evt-12',
      year: 2016,
      dateLabel: '20 Oct 2016',
      era: 'Leyes y debate',
      type: 'hecho',
      title: 'Sentencia STC 177/2016 del Tribunal Constitucional',
      captionEs: 'TODO: rewrite in my own words. El Tribunal Constitucional estima el recurso contra la ley catalana y declara inconstitucional la prohibición, concluyendo que la comunidad autónoma invadió competencias exclusivas del Estado sobre patrimonio común.',
      captionEn: 'TODO: rewrite in my own words. The Constitutional Court overturns the Catalan ban, ruling that autonomous regions lack legal jurisdiction to prohibit cultural practices protected by central state legislation.',
      source: {
        label: 'Congreso de los Diputados, Respuesta STC 177/2016',
        url: 'https://www.congreso.es/entradap/l12p/e4/e_0040859_n_000.pdf'
      }
    }
  ];

  /**
   * ==========================================================================
   * 2. 📖 GLOSARIO DE VOCABULARIO TAURINO (EDITAR TÉRMINOS Y DEFINICIONES AQUÍ)
   * ==========================================================================
   * Términos definidos para los tooltips interactivos de las palabras marcadas
   * con <span class="hist-vocab" data-term="...">.
   */
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
      en: 'The muscular hump on the bull’s neck and upper back that raises its horns and powers its forward charge.'
    }
  };

  /**
   * Definición estructurada de las 5 épocas históricas con sus metadatos y enlaces.
   */
  const ERAS = [
    {
      id: 'hist-era-origenes',
      name: 'Orígenes',
      label: '1. Orígenes',
      subtitle: 'Ritos ganaderos ancestrales y la mitología sacrificial ibérica',
      period: 'Hasta el S. XI'
    },
    {
      id: 'hist-era-nobleza',
      name: 'Nobleza y prohibiciones',
      label: '2. Nobleza y prohibiciones',
      subtitle: 'Cortes medievales, el alanceamiento a caballo y las bulas papales',
      period: 'Siglos XIII – XVIII'
    },
    {
      id: 'hist-era-toreo-pie',
      name: 'El toreo a pie',
      label: '3. El toreo a pie',
      subtitle: 'La profesionalización popular, la cantería de Ronda y las primeras reglas',
      period: 'Siglo XVIII'
    },
    {
      id: 'hist-era-edad-oro',
      name: 'Edad de Oro',
      label: '4. Edad de Oro',
      subtitle: 'La cumbre clásica, la revolución de Belmonte y la tragedia de Joselito',
      period: '1910 – 1920'
    },
    {
      id: 'hist-era-leyes-debate',
      name: 'Leyes y debate',
      label: '5. Leyes y debate',
      subtitle: 'Prohibiciones autonómicas, recursos constitucionales y patrimonio inmaterial',
      period: '1991 – Actualidad'
    }
  ];

  // Referencias a elementos del DOM
  let eraNavContainer = null;
  let yearCounterElement = null;
  let activeCardElements = [];

  /**
   * Genera el HTML de una tarjeta individual a partir del objeto de evento.
   * @param {Object} event - Objeto del evento histórico
   * @returns {string} Markup HTML de la tarjeta
   */
  function createCardHTML(event) {
    const isFact = event.type === 'hecho';
    const badgeClass = isFact ? 'hist-badge-fact' : 'hist-badge-interp';
    const badgeLabel = isFact ? 'Hecho' : 'Interpretación';
    const badgeTooltip = isFact ? 'Hecho: documented fact' : 'Interpretación: a historian’s reading';

    return `
      <article class="hist-card" id="${event.id}" data-year="${event.year}" data-datelabel="${event.dateLabel}" data-era="${event.era}" tabindex="0" role="region" aria-label="${event.title}">
        <div class="hist-card-inner">
          <div class="hist-card-topbar">
            <span class="hist-card-date">${event.dateLabel}</span>
            <div class="hist-badge-wrapper">
              <span class="hist-badge ${badgeClass}" tabindex="0" data-tooltip="${badgeTooltip}" aria-label="${badgeTooltip}">
                <span class="hist-badge-dot" aria-hidden="true"></span>
                ${badgeLabel}
              </span>
            </div>
          </div>

          <h3 class="hist-card-title">${event.title}</h3>

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

            <button type="button" class="hist-btn-translate" aria-label="Alternar explicación en inglés" title="Clic para alternar idioma inglés / español">
              <span class="hist-translate-icon" aria-hidden="true">🌐</span>
              <span class="hist-translate-label">EN / ES</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Renderiza las 5 secciones de época con sus tarjetas asociadas en el contenedor principal.
   */
  function renderJourneyContent() {
    const journeyContainer = document.getElementById('hist-journey-container');
    if (!journeyContainer) return;

    let html = '';

    ERAS.forEach((era, eraIndex) => {
      // Filtrar los eventos correspondientes a esta época
      const eraEvents = events.filter(e => e.era === era.name);

      html += `
        <section class="hist-era-section ${era.id}" id="${era.id}" data-era-index="${eraIndex}" data-era-name="${era.name}">
          <div class="hist-era-backdrop" aria-hidden="true"></div>
          <div class="site-container hist-era-container">
            <header class="hist-era-header">
              <div class="hist-era-kicker">
                <span class="hist-era-badge">${era.period}</span>
              </div>
              <h2 class="hist-era-title">${era.label}</h2>
              <p class="hist-era-subtitle">${era.subtitle}</p>
            </header>

            <div class="hist-cards-grid">
              ${eraEvents.map(createCardHTML).join('')}
            </div>
          </div>
        </section>
      `;
    });

    journeyContainer.innerHTML = html;
  }

  /**
   * Configura el menú fijo de épocas (hist-era-nav) para navegación suave y resaltado.
   */
  function initEraNav() {
    eraNavContainer = document.getElementById('hist-era-nav');
    if (!eraNavContainer) return;

    const navLinks = eraNavContainer.querySelectorAll('.hist-era-link');

    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const navOffset = eraNavContainer.offsetHeight + 16;
          const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Enfoque accesible
          targetSection.setAttribute('tabindex', '-1');
          targetSection.focus({ preventScroll: true });
        }
      });
    });
  }

  /**
   * Resalta la época activa en la barra de navegación superior.
   * @param {string} eraName - Nombre de la época activa
   */
  function updateActiveEraNav(eraName) {
    if (!eraNavContainer) return;

    const links = eraNavContainer.querySelectorAll('.hist-era-link');
    links.forEach(link => {
      const linkEra = link.getAttribute('data-era');
      if (linkEra === eraName) {
        link.classList.add('hist-active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('hist-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Inicializa el IntersectionObserver para revelar tarjetas al entrar en el viewport
   * y sincronizar el contador de año sticky lateral.
   */
  function initCardObservers() {
    activeCardElements = Array.from(document.querySelectorAll('.hist-card'));
    yearCounterElement = document.getElementById('hist-year-counter');

    // Comprobación de preferencia de reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      activeCardElements.forEach(card => card.classList.add('hist-card-visible'));
    } else {
      const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hist-card-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
      });

      activeCardElements.forEach(card => cardObserver.observe(card));
    }

    // Observer para las 5 secciones de época para actualizar el menú de épocas
    const eraSections = document.querySelectorAll('.hist-era-section');
    const eraObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const eraName = entry.target.getAttribute('data-era-name');
          updateActiveEraNav(eraName);
        }
      });
    }, {
      root: null,
      threshold: 0.25
    });

    eraSections.forEach(section => eraObserver.observe(section));

    // Observer para actualizar el contador de año lateral con la tarjeta visible más relevante
    window.addEventListener('scroll', handleScrollYearCounter, { passive: true });
    handleScrollYearCounter(); // Ejecución inicial
  }

  /**
   * Actualiza el contador de año lateral sticky basándose en la tarjeta más próxima al centro.
   */
  function handleScrollYearCounter() {
    if (!yearCounterElement || activeCardElements.length === 0) return;

    const viewportCenter = window.innerHeight * 0.45;
    let closestCard = null;
    let minDistance = Infinity;

    activeCardElements.forEach(card => {
      const rect = card.getBoundingClientRect();
      // Distancia del centro de la tarjeta al punto focal de la pantalla
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      // Considerar tarjetas que estén en la ventana visible
      if (rect.bottom > 100 && rect.top < window.innerHeight - 80) {
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      }
    });

    if (closestCard) {
      const dateLabel = closestCard.getAttribute('data-datelabel');
      const eraName = closestCard.getAttribute('data-era');

      const dateValueEl = yearCounterElement.querySelector('.hist-year-value');
      const eraLabelEl = yearCounterElement.querySelector('.hist-year-era');

      if (dateValueEl && dateValueEl.textContent !== dateLabel) {
        dateValueEl.textContent = dateLabel;
        dateValueEl.classList.remove('hist-flip');
        void dateValueEl.offsetWidth; // Forzar reflow para animación
        dateValueEl.classList.add('hist-flip');
      }

      if (eraLabelEl && eraLabelEl.textContent !== eraName) {
        eraLabelEl.textContent = eraName;
      }

      yearCounterElement.classList.add('hist-visible');
    }
  }

  /**
   * Alterna la traducción al inglés en una tarjeta.
   * @param {HTMLElement} card - Elemento .hist-card
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
   * Configura los eventos de interacción de las tarjetas (clic y teclado).
   */
  function initCardInteractions() {
    const journeyContainer = document.getElementById('hist-journey-container');
    if (!journeyContainer) return;

    journeyContainer.addEventListener('click', function (e) {
      // Si se hizo clic en un enlace a la fuente externa o en una palabra del vocabulario, no alternar la tarjeta
      if (e.target.closest('.hist-source-link') || e.target.closest('.hist-vocab')) {
        return;
      }

      const card = e.target.closest('.hist-card');
      if (card) {
        toggleCardTranslation(card);
      }
    });

    journeyContainer.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        // Si el foco está en un enlace de fuente o en un término de vocabulario, permitir su acción nativa
        if (e.target.closest('.hist-source-link') || e.target.closest('.hist-vocab')) {
          return;
        }

        const card = e.target.closest('.hist-card');
        if (card && document.activeElement === card) {
          e.preventDefault();
          toggleCardTranslation(card);
        }
      }
    });
  }

  /**
   * Crea y administra los tooltips flotantes para los términos de vocabulario taurino.
   */
  function initVocabTooltips() {
    // Crear el elemento de tooltip único en el body para evitar cortes por overflow
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

      // Si no cabe por arriba, mostrar debajo
      if (top < 10) {
        top = rect.bottom + 10;
      }

      // Evitar que se desborde horizontalmente
      if (left < 12) left = 12;
      if (left + tooltipRect.width > window.innerWidth - 12) {
        left = window.innerWidth - tooltipRect.width - 12;
      }

      floatingTooltip.style.top = `${top + window.scrollY}px`;
      floatingTooltip.style.left = `${left + window.scrollX}px`;
    }

    // Delegación de eventos para las palabras de vocabulario
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
   * Inicialización global de la página principal tras cargar el DOM.
   */
  function init() {
    renderJourneyContent();
    initEraNav();
    initCardObservers();
    initCardInteractions();
    initVocabTooltips();
  }

  // Ejecución segura una vez que el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
