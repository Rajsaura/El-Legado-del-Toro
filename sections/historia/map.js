/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/map.js
 * 
 * FASE 5: MAPA HISTÓRICO INTERACTIVO (GEOGRAFÍA DE LA TAUROMAQUIA)
 * 1. Cartografía vectorial pura SVG (sin dependencias externas ni tiles offline).
 * 2. 7 sedes históricas verificadas (Ronda, Sevilla, Talavera de la Reina,
 *    Madrid, Barcelona, Islas Canarias, Toledo) con coordenadas precisas.
 * 3. Enlace directo bidireccional con la Cronología ("Saltar al hito") y las
 *    Cédulas Documentales del Archivo Digital ("Abrir cédula").
 * 4. Directorio de sedes accesible en barra lateral con filtros por categoría.
 * 5. Dossier de detalle de la sede con imagen histórica, contexto y fuentes oficiales.
 * 6. Accesibilidad completa: navegación por teclado (flechas, enter, esc), aria-*,
 *    foco gestionado y soporte para prefers-reduced-motion.
 * 7. Bilingüismo completo (ES / EN) sincronizado con el timeline.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. 📍 DATOS DE SEDES HISTÓRICAS VERIFICADAS Y COORDENADAS CARTOGRÁFICAS
  // =========================================================================
  const HISTORICAL_LOCATIONS = [
    {
      id: 'ronda',
      coordinates: { lat: 36.7462, lng: -5.1612 },
      svgPos: { x: 335, y: 450 },
      cityEs: 'Ronda',
      cityEn: 'Ronda',
      regionEs: 'Málaga, Andalucía',
      regionEn: 'Málaga, Andalusia',
      eraEs: '1785 • Ilustración',
      eraEn: '1785 • Enlightenment',
      titleEs: 'Real Maestranza de Caballería de Ronda',
      titleEn: 'Real Maestranza of Cavalry of Ronda',
      category: 'fundacional',
      summaryEs: 'Cuna canónica del toreo moderno a pie. Su plaza de toros monumental, inaugurada en mayo de 1785 bajo el mecenazgo de la Real Maestranza (fundada por Felipe II en 1572), consagró la dinastía de los Romero (Pedro Romero), fijando las reglas de la lidia a pie frente a la tradición ecuestre aristocrática.',
      summaryEn: 'Canonical cradle of modern bullfighting on foot. Its monumental bullring, inaugurated in May 1785 under the patronage of the Real Maestranza (founded by Philip II in 1572), established the Romero dynasty (Pedro Romero), defining the rules of foot-based lidia against aristocratic equestrian tradition.',
      image: 'assets/timeline/05-maestranza-de-ronda.png',
      imageCaptionEs: 'Plaza de toros de la Real Maestranza de Caballería de Ronda (inaugurada en mayo de 1785).',
      imageCaptionEn: 'Bullring of the Real Maestranza of Cavalry of Ronda (inaugurated in May 1785).',
      timelineEventIndex: 4, // Hito 5: Inauguración de la Real Maestranza de Ronda (1785)
      eventTitleEs: 'Hito 5: Inauguración de la Real Maestranza de Ronda (1785)',
      eventTitleEn: 'Event 5: Inauguration of the Real Maestranza of Ronda (1785)',
      sources: [
        {
          title: 'Libro de Actas de la Real Maestranza de Caballería de Ronda (mayo 1785)',
          repo: 'Archivo RMC Ronda / BNE Digital',
          url: 'https://bdh.bne.es/bnesearch/detalle/bdh0000038848'
        }
      ]
    },
    {
      id: 'sevilla',
      coordinates: { lat: 37.3861, lng: -5.9924 },
      svgPos: { x: 286, y: 415 },
      cityEs: 'Sevilla',
      cityEn: 'Seville',
      regionEs: 'Sevilla, Andalucía',
      regionEn: 'Seville, Andalusia',
      eraEs: 'Siglos XVIII–XX (1700s–1914)',
      eraEn: '18th–20th Centuries (1700s–1914)',
      titleEs: 'Real Maestranza de Sevilla & Arrabal de Triana',
      titleEn: 'Real Maestranza of Seville & Triana District',
      category: 'escuelas',
      summaryEs: 'Epicentro de la escuela taurina sevillana caracterizada por la gracia, el ritmo plástico y el temple. En el arrabal alfarero de Triana se crió Juan Belmonte, quien en 1914 consumó la revolución estética que suprimió el toreo de piernas y evasión para imponer la quietud geométrica frente a las astas.',
      summaryEn: 'Epicenter of the Seville school of bullfighting, characterized by grace, rhythm (temple), and sculptural stillness. In the potters\' quarter of Triana, Juan Belmonte forged his 1914 aesthetic revolution, eliminating evasive footwork to establish geometric stillness in front of the horns.',
      image: 'assets/timeline/07-belmonte-temple-estetico.png',
      imageCaptionEs: 'Juan Belmonte citando en corto con temple y quietud en el arrabal sevillano.',
      imageCaptionEn: 'Juan Belmonte citing close with stillness and aesthetic control.',
      timelineEventIndex: 6, // Hito 7: Revolución de Juan Belmonte (1914)
      eventTitleEs: 'Hito 7: La revolución del temple estético de Juan Belmonte (Princ. S. XX)',
      eventTitleEn: 'Event 7: The aesthetic revolution of Juan Belmonte (Early 20th C.)',
      sources: [
        {
          title: 'Manuel Chaves Nogales: «Juan Belmonte, matador de toros» (1934)',
          repo: 'Alianza Editorial / Hemeroteca de Sevilla',
          url: 'https://www.worldcat.org/title/juan-belmonte-matador-de-toros-su-vida-y-sus-hazanas/oclc/828279815'
        }
      ]
    },
    {
      id: 'talavera',
      coordinates: { lat: 39.9635, lng: -4.8308 },
      svgPos: { x: 353, y: 277 },
      cityEs: 'Talavera de la Reina',
      cityEn: 'Talavera de la Reina',
      regionEs: 'Toledo, Castilla-La Mancha',
      regionEn: 'Toledo, Castile-La Mancha',
      eraEs: '16 de mayo de 1920 • Edad de Oro',
      eraEn: 'May 16, 1920 • Golden Age',
      titleEs: 'Plaza de Toros de La Caprichosa',
      titleEn: 'La Caprichosa Bullring',
      category: 'tragedias',
      summaryEs: 'Escenario de la muerte en el ruedo de José Gómez Ortega «Joselito el Gallo», considerado el diestro más completo y consumado de la tauromaquia clásica. Su fallecimiento a los 25 años por la cornada del toro «Bailador» causó un duelo nacional y selló el fin mitológico de la Edad de Oro.',
      summaryEn: 'Scene of the death in the ring of José Gómez Ortega «Joselito el Gallo», widely considered the most technically consummate matador in history. His death at age 25 from the goring of the bull «Bailador» triggered national mourning and marked the legendary end of the Golden Age.',
      image: 'assets/timeline/08-muerte-joselito-el-gallo.png',
      imageCaptionEs: 'Enfermería de la plaza de toros de Talavera de la Reina tras la cornada fatal (16/05/1920).',
      imageCaptionEn: 'Infirmary of Talavera de la Reina bullring after the fatal goring (16/05/1920).',
      timelineEventIndex: 7, // Hito 8: Muerte de Joselito el Gallo (1920)
      eventTitleEs: 'Hito 8: Muerte de Joselito el Gallo en Talavera de la Reina (16 Mayo 1920)',
      eventTitleEn: 'Event 8: Death of Joselito el Gallo in Talavera de la Reina (May 16, 1920)',
      sources: [
        {
          title: 'Certificación facultativa de defunción (16 Mayo 1920) y crónicas de ABC y El Sol',
          repo: 'Archivo Municipal de Talavera / Hemeroteca Digital BNE',
          url: 'https://hemerotecadigital.bne.es'
        }
      ]
    },
    {
      id: 'madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 },
      svgPos: { x: 418, y: 252 },
      cityEs: 'Madrid',
      cityEn: 'Madrid',
      regionEs: 'Comunidad de Madrid',
      regionEn: 'Community of Madrid',
      eraEs: '1785 – 2016 • Ilustración y Democracia',
      eraEn: '1785 – 2016 • Enlightenment & Democracy',
      titleEs: 'Sede de la Corona, Cortes Generales y Tribunal Constitucional',
      titleEn: 'Seat of the Crown, Parliament & Constitutional Court',
      category: 'legal',
      summaryEs: 'Centro neurálgico del debate legislativo e institucional español. Desde el Consejo de Castilla de Carlos III (Real Pragmática de 1785) hasta las Cortes Generales (Ley 18/2013 regulando la tauromaquia como patrimonio cultural) y el Tribunal Constitucional (Sentencia STC 177/2016), Madrid ha sido la sede donde se definió el marco jurídico del espectáculo.',
      summaryEn: 'Nerve center of Spanish legislative and constitutional debates. From Carlos III\'s Council of Castile (1785 Pragmatic Sanction) to the Spanish Parliament (Law 18/2013 declaring bullfighting cultural heritage) and the Constitutional Court (Judgment STC 177/2016), Madrid was the forum establishing the legal status of tauromaquia.',
      image: 'assets/timeline/12-sentencia-tc-177-2016.png',
      imageCaptionEs: 'Pleno del Tribunal Constitucional en Madrid, sede de la Sentencia STC 177/2016.',
      imageCaptionEn: 'Plenary of the Spanish Constitutional Court in Madrid, seat of Judgment STC 177/2016.',
      timelineEventIndex: 11, // Hito 12: Sentencia STC 177/2016 (y vinculado a Hito 6 y 11)
      eventTitleEs: 'Hito 12: Sentencia STC 177/2016 del Tribunal Constitucional (20 Oct 2016)',
      eventTitleEn: 'Event 12: Judgment STC 177/2016 of the Constitutional Court (Oct 20, 2016)',
      sources: [
        {
          title: 'Sentencia del Tribunal Constitucional STC 177/2016 (BOE-A-2016-11197)',
          repo: 'Tribunal Constitucional de España / BOE',
          url: 'https://hj.tribunalconstitucional.es/es/Resolucion/Show/25134'
        }
      ]
    },
    {
      id: 'barcelona',
      coordinates: { lat: 41.3879, lng: 2.1699 },
      svgPos: { x: 754, y: 200 },
      cityEs: 'Barcelona',
      cityEn: 'Barcelona',
      regionEs: 'Barcelonès, Cataluña',
      regionEn: 'Barcelonès, Catalonia',
      eraEs: '2010 (vigor 2012) • Debate Autonómico',
      eraEn: '2010 (effective 2012) • Regional Debate',
      titleEs: 'Parlament de Catalunya & Plaza Monumental',
      titleEn: 'Parliament of Catalonia & Monumental Bullring',
      category: 'legal',
      summaryEs: 'Sede de la histórica votación del Parlament del 28 de julio de 2010 que aprobó la Ley 28/2010 prohibiendo las corridas de toros en Cataluña a raíz de la ILP ciudadana «Prou!». La plaza Monumental de Barcelona celebró su última corrida en septiembre de 2011, convirtiéndose en el epicentro del choque entre proteccionismo animal y competencias culturales del Estado.',
      summaryEn: 'Seat of the historic parliamentary vote of July 28, 2010 passing Law 28/2010 banning bullfights in Catalonia following the «Prou!» citizen initiative. Barcelona\'s Monumental bullring held its last corrida in September 2011, becoming the epicenter of the conflict between animal welfare and state cultural jurisdiction.',
      image: 'assets/timeline/10-cataluna-abolicion-2010.png',
      imageCaptionEs: 'Fachada del Parlament de Catalunya en el Parc de la Ciutadella de Barcelona.',
      imageCaptionEn: 'Facade of the Parliament of Catalonia in Ciutadella Park, Barcelona.',
      timelineEventIndex: 9, // Hito 10: Votación de abolición en Cataluña (2010)
      eventTitleEs: 'Hito 10: El Parlamento de Cataluña vota la abolición (2010 / vigor 2012)',
      eventTitleEn: 'Event 10: Parliament of Catalonia votes for abolition (2010 / 2012)',
      sources: [
        {
          title: 'Ley 28/2010, de 3 de agosto, de modificación de la ley animal catalana (BOE-A-2010-13838)',
          repo: 'Parlament de Catalunya / Generalitat de Catalunya / BOE',
          url: 'https://www.boe.es/eli/es-ct/l/2010/08/03/28'
        }
      ]
    },
    {
      id: 'canarias',
      coordinates: { lat: 28.4636, lng: -16.2518 },
      svgPos: { x: 130, y: 535 },
      isInset: true,
      cityEs: 'Santa Cruz de Tenerife / Las Palmas',
      cityEn: 'Santa Cruz de Tenerife / Las Palmas',
      regionEs: 'Islas Canarias',
      regionEn: 'Canary Islands',
      eraEs: '30 de abril de 1991 • Legislación Autonómica',
      eraEn: 'April 30, 1991 • Regional Legislation',
      titleEs: 'Parlamento de Canarias (Ley 8/1991)',
      titleEn: 'Parliament of the Canary Islands (Law 8/1991)',
      category: 'legal',
      summaryEs: 'El Parlamento de Canarias aprobó la pionera Ley 8/1991 de protección de los animales, cuyo artículo 5 prohibió espectáculos cruentos y peleas en el archipiélago. Al carecer las islas de festejos taurinos arraigados desde 1984, el veto se aprobó sin tensión social, pero mantuvo una excepción expresa para las tradicionales peleas de gallos.',
      summaryEn: 'The Canary Islands Parliament enacted the pioneering Animal Protection Law 8/1991, whose Article 5 banned blood spectacles and fights. Lacking active bullfighting events since 1984, the prohibition passed without social friction, though it explicitly protected traditional cockfighting.',
      image: 'assets/timeline/09-canarias-ley-1991.png',
      imageCaptionEs: 'Archipiélago Canario, sede de la primera ley autonómica que prohibió espectáculos con sangre (1991).',
      imageCaptionEn: 'Canary Islands archipelago, home of the first regional law banning blood spectacles (1991).',
      timelineEventIndex: 8, // Hito 9: Ley 8/1991 de Canarias
      eventTitleEs: 'Hito 9: Canarias aprueba la Ley 8/1991 de protección animal (1991)',
      eventTitleEn: 'Event 9: Canary Islands enacts Animal Protection Law 8/1991 (1991)',
      sources: [
        {
          title: 'Ley 8/1991, de 30 de abril, de protección de los animales (BOE-A-1991-12999)',
          repo: 'Parlamento de Canarias / BOE',
          url: 'https://www.boe.es/eli/es-cn/l/1991/04/30/8'
        }
      ]
    },
    {
      id: 'toledo',
      coordinates: { lat: 39.8628, lng: -4.0273 },
      svgPos: { x: 399, y: 282 },
      cityEs: 'Toledo',
      cityEn: 'Toledo',
      regionEs: 'Castilla-La Mancha / Reino de Castilla',
      regionEn: 'Castile-La Mancha / Kingdom of Castile',
      eraEs: 'Siglo XIII (1256–1265) • Edad Media',
      eraEn: '13th Century (1256–1265) • Middle Ages',
      titleEs: 'Sede Regia de Alfonso X el Sabio',
      titleEn: 'Royal Seat of Alfonso X the Wise',
      category: 'fundacional',
      summaryEs: 'En la corte toledana del Rey Sabio se redactó el magno código medieval de Las Siete Partidas. Su Partida VII reguló por vez primera la infamia legal de los hombres que lidiaban fieras por precio ante el pueblo, mientras eximía el alanceamiento nobiliario a caballo por gala y prueba de fortaleza militar.',
      summaryEn: 'In the Toledo court of King Alfonso X the Wise, the landmark medieval code Las Siete Partidas was compiled. Partida VII first codified the legal infamy of men who fought wild beasts for money, while exempting noble equestrian bull-spearing as honorable martial exercise.',
      image: 'assets/timeline/02-siete-partidas-alfonso-x.png',
      imageCaptionEs: 'Códice regio de Las Siete Partidas de Alfonso X redactado en la corte de Toledo.',
      imageCaptionEn: 'Royal codex of Las Siete Partidas of Alfonso X compiled at the court of Toledo.',
      timelineEventIndex: 1, // Hito 2: Las Siete Partidas de Alfonso X
      eventTitleEs: 'Hito 2: Las Siete Partidas de Alfonso X el Sabio (Siglo XIII)',
      eventTitleEn: 'Event 2: Las Siete Partidas of Alfonso X the Wise (13th Century)',
      sources: [
        {
          title: 'Las Siete Partidas, Partida VII, Tít. VI, Ley 4 (PUB-LH-1974-51)',
          repo: 'Biblioteca Jurídica Digital del BOE / BNE',
          url: 'https://www.boe.es/biblioteca_juridica/publicacion.php?id=PUB-LH-1974-51'
        }
      ]
    }
  ];

  // =========================================================================
  // 2. 🗺️ DEFINICIÓN GEOMÉTRICA CARTOGRÁFICA SVG (ESPACIO 960 x 620)
  // =========================================================================
  const SVG_CONFIG = {
    viewBox: '0 0 960 620',
    // Trazo de la Península Ibérica (España continental)
    mainlandPath: 
      "M 125,115 " +
      "C 130,95 160,85 190,82 " +
      "C 240,80 290,82 350,83 " +
      "C 410,84 460,86 495,110 " +
      "C 540,128 590,135 650,140 " +
      "C 710,142 770,145 810,142 " +
      "C 820,150 822,165 805,185 " +
      "C 785,215 765,245 745,280 " +
      "C 725,310 705,340 685,370 " +
      "C 670,395 655,425 640,450 " +
      "C 625,470 595,495 560,510 " +
      "C 520,520 470,522 420,522 " +
      "C 380,522 350,522 335,520 " +
      "C 315,510 295,490 275,465 " +
      "C 255,445 235,430 215,420 " +
      "C 210,380 205,340 200,300 " +
      "C 195,260 185,215 175,170 " +
      "C 160,170 140,165 125,150 " +
      "C 110,135 115,120 125,115 Z",
    // Trazo de Portugal (delineado geográfico de la fachada atlántica peninsular)
    portugalPath:
      "M 215,420 " +
      "C 190,425 160,430 145,425 " +
      "C 135,410 130,370 135,330 " +
      "C 138,300 135,260 140,220 " +
      "C 145,190 155,170 160,170 " +
      "C 175,170 185,215 195,260 " +
      "C 200,300 205,340 210,380 " +
      "C 215,400 215,410 215,420 Z",
    // Líneas divisorias de regiones / cuencas históricas
    regionalLines: [
      "M 215,420 C 260,420 310,430 360,435 C 410,440 460,445 520,455", // Sierra Morena / Andalucía
      "M 370,265 C 410,265 440,270 455,275 C 455,245 440,230 405,235 C 385,245 375,255 370,265", // Madrid
      "M 685,370 C 700,330 710,280 720,230 C 725,185 730,160 740,143", // Cataluña
      "M 330,285 C 370,280 400,282 430,278" // Valle del Tajo (Toledo - Talavera)
    ],
    // Islas Baleares
    balearics: [
      "M 795,355 C 815,345 835,355 830,375 C 820,385 800,380 790,365 Z", // Mallorca
      "M 845,330 C 855,325 865,330 860,340 C 850,345 840,340 845,330 Z", // Menorca
      "M 760,395 C 770,390 775,400 770,410 C 760,415 755,405 760,395 Z"  // Ibiza
    ],
    // Recuadro Inset Canarias (x: 35..255, y: 445..600)
    canaryInset: {
      x: 35, y: 445, width: 220, height: 155
    },
    // Islas Canarias individuales dentro del Inset
    canaryIslands: [
      "M 115,525 C 130,515 140,525 130,540 C 118,542 110,535 115,525 Z", // Tenerife
      "M 155,535 C 168,530 175,540 170,552 C 160,555 152,548 155,535 Z", // Gran Canaria
      "M 215,485 C 225,480 230,490 225,502 C 218,505 212,495 215,485 Z", // Lanzarote
      "M 198,505 C 210,495 215,520 208,540 C 200,542 195,525 198,505 Z", // Fuerteventura
      "M 75,505 C 83,500 88,510 85,520 C 78,522 72,515 75,505 Z",         // La Palma
      "M 90,535 C 98,532 102,540 98,547 C 92,548 88,542 90,535 Z",         // La Gomera
      "M 65,548 C 73,545 76,552 73,559 C 66,560 62,554 65,548 Z"          // El Hierro
    ]
  };

  // =========================================================================
  // 3. 🧠 ESTADO DEL MÓDULO DEL MAPA
  // =========================================================================
  let activeLocationId = null;
  let activeFilter = 'all';
  let currentLanguage = 'es';
  let isDossierOpen = false;
  let lastFocusedElement = null;

  // Referencias a elementos DOM
  let mapViewportEl = null;
  let locationsListEl = null;
  let dossierContainerEl = null;
  let filterButtons = [];
  let resetBtn = null;

  // =========================================================================
  // 4. 🎨 RENDERIZADO DEL MAPA VECTORIAL SVG
  // =========================================================================
  function renderSVGMap() {
    if (!mapViewportEl) return;
    const isEn = currentLanguage === 'en';

    const svgHTML = `
      <svg class="hist-svg-map" viewBox="${SVG_CONFIG.viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${isEn ? 'Interactive historical map of Spain' : 'Mapa histórico interactivo de España'}">
        <defs>
          <!-- Gradientes y Filtros Cartográficos -->
          <radialGradient id="hist-sea-gradient" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stop-color="#140606" />
            <stop offset="60%" stop-color="#0c0303" />
            <stop offset="100%" stop-color="#070202" />
          </radialGradient>

          <linearGradient id="hist-spain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2d0d0f" />
            <stop offset="45%" stop-color="#210809" />
            <stop offset="100%" stop-color="#180506" />
          </linearGradient>

          <linearGradient id="hist-portugal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a0607" />
            <stop offset="100%" stop-color="#120304" />
          </linearGradient>

          <filter id="hist-pin-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hist-inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.8" />
          </filter>
        </defs>

        <!-- Fondo del Océano / Mar Mediterráneo -->
        <rect width="960" height="620" fill="url(#hist-sea-gradient)" />

        <!-- Cuadrícula Náutica / Graticule sutil -->
        <g class="hist-map-gridlines" stroke="rgba(224, 179, 45, 0.07)" stroke-width="1" stroke-dasharray="3,5" aria-hidden="true">
          <line x1="80" y1="0" x2="80" y2="620" />
          <line x1="240" y1="0" x2="240" y2="620" />
          <line x1="400" y1="0" x2="400" y2="620" />
          <line x1="560" y1="0" x2="560" y2="620" />
          <line x1="720" y1="0" x2="720" y2="620" />
          <line x1="880" y1="0" x2="880" y2="620" />

          <line x1="0" y1="120" x2="960" y2="120" />
          <line x1="0" y1="240" x2="960" y2="240" />
          <line x1="0" y1="360" x2="960" y2="360" />
          <line x1="0" y1="480" x2="960" y2="480" />
        </g>

        <!-- Marruecos / Norte de África (silueta costera decorativa sur) -->
        <path d="M 270,580 C 330,560 380,560 450,575 C 510,590 560,610 600,620 L 270,620 Z" fill="#100304" opacity="0.6" stroke="rgba(224, 179, 45, 0.15)" stroke-width="1" aria-hidden="true" />

        <!-- Portugal (silueta delimitada en tono tenue) -->
        <path class="hist-map-portugal" d="${SVG_CONFIG.portugalPath}" fill="url(#hist-portugal-gradient)" stroke="rgba(224, 179, 45, 0.22)" stroke-width="1.2" stroke-dasharray="4,3" aria-hidden="true" />
        <text x="175" y="310" class="hist-map-country-label" fill="rgba(224, 179, 45, 0.25)" font-family="var(--font-serif-heading, serif)" font-size="11" letter-spacing="3" text-anchor="middle" aria-hidden="true">PORTUGAL</text>

        <!-- España Continental (Mainland) -->
        <path class="hist-map-landmass" d="${SVG_CONFIG.mainlandPath}" fill="url(#hist-spain-gradient)" stroke="rgba(224, 179, 45, 0.5)" stroke-width="1.8" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.7))" />

        <!-- Líneas divisorias de regiones / cuencas -->
        <g class="hist-map-regions" stroke="rgba(224, 179, 45, 0.18)" stroke-width="1" fill="none" stroke-dasharray="2,3" aria-hidden="true">
          ${SVG_CONFIG.regionalLines.map(line => `<path d="${line}" />`).join('')}
        </g>

        <!-- Islas Baleares -->
        <g class="hist-map-balearics" fill="url(#hist-spain-gradient)" stroke="rgba(224, 179, 45, 0.5)" stroke-width="1.4">
          ${SVG_CONFIG.balearics.map(bPath => `<path d="${bPath}" />`).join('')}
        </g>
        <text x="815" y="405" class="hist-map-country-label" fill="rgba(224, 179, 45, 0.4)" font-family="var(--font-sans, sans-serif)" font-size="9" letter-spacing="1.5" text-anchor="middle" aria-hidden="true">ILLES BALEARS</text>

        <!-- Rótulo del Mar Mediterráneo y Océano Atlántico -->
        <text x="760" y="470" fill="rgba(224, 179, 45, 0.2)" font-family="var(--font-serif-heading, serif)" font-size="12" font-style="italic" letter-spacing="4" aria-hidden="true">MAR MEDITERRÁNEO</text>
        <text x="110" y="70" fill="rgba(224, 179, 45, 0.2)" font-family="var(--font-serif-heading, serif)" font-size="11" font-style="italic" letter-spacing="3" aria-hidden="true">OCÉANO ATLÁNTICO</text>

        <!-- Rosa de los Vientos (Compass Rose) en esquina superior derecha -->
        <g class="hist-map-compass" transform="translate(870, 75)" aria-hidden="true">
          <circle r="32" fill="none" stroke="rgba(224, 179, 45, 0.25)" stroke-width="1" stroke-dasharray="2,2" />
          <circle r="22" fill="rgba(15, 4, 4, 0.6)" stroke="rgba(224, 179, 45, 0.35)" stroke-width="1" />
          <!-- Rayos cardinales -->
          <polygon points="0,-28 4,-7 0,0" fill="#e0b32d" />
          <polygon points="0,-28 -4,-7 0,0" fill="#917215" />
          <polygon points="0,28 4,7 0,0" fill="#917215" />
          <polygon points="0,28 -4,7 0,0" fill="#e0b32d" />
          <polygon points="28,0 7,4 0,0" fill="#e0b32d" />
          <polygon points="28,0 7,-4 0,0" fill="#917215" />
          <polygon points="-28,0 -7,4 0,0" fill="#917215" />
          <polygon points="-28,0 -7,-4 0,0" fill="#e0b32d" />
          <text x="0" y="-32" fill="#e0b32d" font-family="var(--font-serif-heading, serif)" font-size="9" font-weight="700" text-anchor="middle">N</text>
        </g>

        <!-- Escala Cartográfica (Barra de escala ~ 200 km) -->
        <g class="hist-map-scale" transform="translate(730, 580)" aria-hidden="true">
          <line x1="0" y1="0" x2="160" y2="0" stroke="var(--color-gold, #c99700)" stroke-width="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--color-gold, #c99700)" stroke-width="2" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="var(--color-gold, #c99700)" stroke-width="1.5" />
          <line x1="160" y1="-4" x2="160" y2="4" stroke="var(--color-gold, #c99700)" stroke-width="2" />
          <text x="0" y="14" fill="rgba(224, 179, 45, 0.7)" font-family="var(--font-sans, sans-serif)" font-size="8">0</text>
          <text x="80" y="14" fill="rgba(224, 179, 45, 0.7)" font-family="var(--font-sans, sans-serif)" font-size="8" text-anchor="middle">100</text>
          <text x="160" y="14" fill="rgba(224, 179, 45, 0.7)" font-family="var(--font-sans, sans-serif)" font-size="8" text-anchor="middle">200 km</text>
        </g>

        <!-- RECUADRO INSET: ISLAS CANARIAS (Fondo propio, marco de latón y archipiélago) -->
        <g class="hist-map-inset-group" transform="translate(0, 0)">
          <!-- Marco contenedor -->
          <rect x="${SVG_CONFIG.canaryInset.x}" y="${SVG_CONFIG.canaryInset.y}" width="${SVG_CONFIG.canaryInset.width}" height="${SVG_CONFIG.canaryInset.height}" rx="6" fill="#120404" stroke="rgba(224, 179, 45, 0.45)" stroke-width="1.5" filter="url(#hist-inset-shadow)" />
          
          <!-- Encabezado del Inset -->
          <rect x="${SVG_CONFIG.canaryInset.x}" y="${SVG_CONFIG.canaryInset.y}" width="${SVG_CONFIG.canaryInset.width}" height="22" rx="5" fill="rgba(80, 15, 20, 0.85)" />
          <text x="${SVG_CONFIG.canaryInset.x + SVG_CONFIG.canaryInset.width / 2}" y="${SVG_CONFIG.canaryInset.y + 15}" fill="var(--color-gold-light, #f3d068)" font-family="var(--font-sans, sans-serif)" font-size="9" font-weight="700" letter-spacing="1" text-anchor="middle">
            ${isEn ? 'CANARY ISLANDS (Law 8/1991)' : 'ISLAS CANARIAS (Ley 8/1991)'}
          </text>

          <!-- Islas Canarias vectoriales -->
          <g fill="url(#hist-spain-gradient)" stroke="rgba(224, 179, 45, 0.55)" stroke-width="1.2">
            ${SVG_CONFIG.canaryIslands.map(cPath => `<path d="${cPath}" />`).join('')}
          </g>

          <text x="123" y="555" fill="rgba(224, 179, 45, 0.35)" font-family="var(--font-sans, sans-serif)" font-size="7.5" text-anchor="middle" aria-hidden="true">Tenerife</text>
          <text x="168" y="566" fill="rgba(224, 179, 45, 0.35)" font-family="var(--font-sans, sans-serif)" font-size="7.5" text-anchor="middle" aria-hidden="true">Gran Canaria</text>
        </g>

        <!-- MARCADORES HISTÓRICOS INTERACTIVOS (Clickable SVG Pins) -->
        <g class="hist-map-markers-layer" role="group" aria-label="${isEn ? 'Historical landmark markers' : 'Marcadores de sedes históricas'}">
          ${renderSVGMarkers(isEn)}
        </g>
      </svg>
    `;

    mapViewportEl.innerHTML = svgHTML;
    attachMarkerListeners();
  }

  /**
   * Genera el marcado SVG para cada uno de los 7 marcadores de sedes.
   */
  function renderSVGMarkers(isEn) {
    return HISTORICAL_LOCATIONS.map(loc => {
      const isSelected = loc.id === activeLocationId;
      const isFilteredOut = activeFilter !== 'all' && loc.category !== activeFilter;
      const displayClass = isFilteredOut ? 'hist-marker-dimmed' : '';
      const selectedClass = isSelected ? 'hist-marker-selected' : '';

      // Icono según categoría
      let icon = '🏛️';
      if (loc.category === 'escuelas') icon = '🎭';
      else if (loc.category === 'tragedias') icon = '🥀';
      else if (loc.category === 'legal') icon = '⚖️';

      const cityName = isEn ? loc.cityEn : loc.cityEs;
      const labelX = loc.svgPos.x;
      const labelY = loc.svgPos.y - 14;

      return `
        <g class="hist-map-marker ${displayClass} ${selectedClass}" 
           id="hist-marker-${loc.id}" 
           data-location-id="${loc.id}"
           role="button" 
           tabindex="${isFilteredOut ? '-1' : '0'}"
           aria-pressed="${isSelected ? 'true' : 'false'}"
           aria-label="${cityName} — ${isEn ? loc.titleEn : loc.titleEs}">
          
          <!-- Anillo de pulso animado -->
          <circle class="hist-marker-pulse" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="16" />
          
          <!-- Halo exterior resplandeciente -->
          <circle class="hist-marker-aura" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="11" filter="url(#hist-pin-glow)" />
          
          <!-- Clavija central -->
          <circle class="hist-marker-pin" cx="${loc.svgPos.x}" cy="${loc.svgPos.y}" r="7" />
          
          <!-- Icono / Glifo del hito -->
          <text class="hist-marker-icon" x="${loc.svgPos.x}" y="${loc.svgPos.y + 3.5}" text-anchor="middle" font-size="7.5" aria-hidden="true">${icon}</text>

          <!-- Etiqueta de la ciudad -->
          <g class="hist-marker-tag" transform="translate(${labelX}, ${labelY})">
            <rect class="hist-marker-tag-bg" x="-34" y="-12" width="68" height="15" rx="3" />
            <text class="hist-marker-tag-text" x="0" y="-1" text-anchor="middle">${cityName}</text>
          </g>
        </g>
      `;
    }).join('');
  }

  /**
   * Asocia controladores de eventos accesibles a los marcadores SVG.
   */
  function attachMarkerListeners() {
    const markers = mapViewportEl.querySelectorAll('.hist-map-marker');
    markers.forEach(marker => {
      const locId = marker.getAttribute('data-location-id');

      // Click del ratón / toque
      marker.addEventListener('click', (e) => {
        e.preventDefault();
        selectLocation(locId, true);
      });

      // Navegación accesible por teclado (Enter / Space)
      marker.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLocation(locId, true);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          focusNextMarker(locId, 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          focusNextMarker(locId, -1);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDossier();
        }
      });
    });
  }

  /**
   * Permite ciclar entre marcadores usando las teclas de flecha.
   */
  function focusNextMarker(currentId, direction) {
    const visibleLocations = HISTORICAL_LOCATIONS.filter(l => activeFilter === 'all' || l.category === activeFilter);
    const currentIndex = visibleLocations.findIndex(l => l.id === currentId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = visibleLocations.length - 1;
    if (nextIndex >= visibleLocations.length) nextIndex = 0;

    const nextLoc = visibleLocations[nextIndex];
    const nextMarkerEl = document.getElementById(`hist-marker-${nextLoc.id}`);
    if (nextMarkerEl) {
      nextMarkerEl.focus();
    }
  }

  // =========================================================================
  // 5. 📋 RENDERIZADO DEL DIRECTORIO LATERAL ACCESIBLE
  // =========================================================================
  function renderLocationsList() {
    if (!locationsListEl) return;
    const isEn = currentLanguage === 'en';

    const visibleLocations = HISTORICAL_LOCATIONS.filter(loc => {
      if (activeFilter === 'all') return true;
      return loc.category === activeFilter;
    });

    // Actualizar contador
    const countEl = document.getElementById('hist-sidebar-count');
    if (countEl) {
      countEl.textContent = isEn 
        ? `${visibleLocations.length} locations` 
        : `${visibleLocations.length} sedes`;
    }

    if (visibleLocations.length === 0) {
      locationsListEl.innerHTML = `
        <div class="hist-empty-filter-state">
          <p>${isEn ? 'No historical sites in this category.' : 'No hay sedes en esta categoría.'}</p>
        </div>
      `;
      return;
    }

    locationsListEl.innerHTML = visibleLocations.map(loc => {
      const isSelected = loc.id === activeLocationId;
      const cityName = isEn ? loc.cityEn : loc.cityEs;
      const regionName = isEn ? loc.regionEn : loc.regionEs;
      const eraName = isEn ? loc.eraEn : loc.eraEs;
      const titleName = isEn ? loc.titleEn : loc.titleEs;
      const eventTitle = isEn ? loc.eventTitleEn : loc.eventTitleEs;

      let categoryBadgeClass = 'hist-badge-fundacional';
      let categoryLabel = isEn ? 'Foundational' : 'Fundacional';
      if (loc.category === 'escuelas') {
        categoryBadgeClass = 'hist-badge-escuelas';
        categoryLabel = isEn ? 'School & Style' : 'Escuelas y Estilo';
      } else if (loc.category === 'tragedias') {
        categoryBadgeClass = 'hist-badge-tragedias';
        categoryLabel = isEn ? 'Tragedy' : 'Tragedia Histórica';
      } else if (loc.category === 'legal') {
        categoryBadgeClass = 'hist-badge-legal';
        categoryLabel = isEn ? 'Constitutional Law' : 'Sede Jurídica';
      }

      return `
        <article class="hist-loc-card ${isSelected ? 'hist-loc-selected' : ''}" 
                 id="hist-loc-card-${loc.id}"
                 data-location-id="${loc.id}"
                 role="button"
                 tabindex="0"
                 aria-pressed="${isSelected ? 'true' : 'false'}"
                 aria-label="${cityName}: ${titleName}">
          
          <div class="hist-loc-card-header">
            <span class="hist-loc-category-badge ${categoryBadgeClass}">${categoryLabel}</span>
            <span class="hist-loc-era-badge">${eraName}</span>
          </div>

          <h4 class="hist-loc-card-title">${cityName} — ${titleName}</h4>
          
          <div class="hist-loc-card-region">
            <span aria-hidden="true">📍</span>
            <span>${regionName}</span>
          </div>

          <p class="hist-loc-card-snippet">${(isEn ? loc.summaryEn : loc.summaryEs).slice(0, 110)}...</p>

          <div class="hist-loc-card-footer">
            <span class="hist-loc-event-link">
              <span aria-hidden="true">🎯</span>
              <span>${eventTitle}</span>
            </span>
            <span class="hist-loc-arrow" aria-hidden="true">→</span>
          </div>
        </article>
      `;
    }).join('');

    // Listeners de clic y teclado en las tarjetas del directorio
    const cards = locationsListEl.querySelectorAll('.hist-loc-card');
    cards.forEach(card => {
      const locId = card.getAttribute('data-location-id');
      card.addEventListener('click', () => {
        selectLocation(locId, true);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLocation(locId, true);
        }
      });
    });
  }

  // =========================================================================
  // 6. 📜 DOSSIER DE DETALLE DE LA SEDE SELECCIONADA
  // =========================================================================
  function renderDossier(loc) {
    if (!dossierContainerEl) return;
    const isEn = currentLanguage === 'en';

    if (!loc) {
      dossierContainerEl.innerHTML = '';
      dossierContainerEl.setAttribute('aria-hidden', 'true');
      dossierContainerEl.classList.remove('hist-dossier-open');
      isDossierOpen = false;
      return;
    }

    const cityName = isEn ? loc.cityEn : loc.cityEs;
    const regionName = isEn ? loc.regionEn : loc.regionEs;
    const eraName = isEn ? loc.eraEn : loc.eraEs;
    const titleName = isEn ? loc.titleEn : loc.titleEs;
    const summaryText = isEn ? loc.summaryEn : loc.summaryEs;
    const eventTitle = isEn ? loc.eventTitleEn : loc.eventTitleEs;
    const imageCaption = isEn ? loc.imageCaptionEn : loc.imageCaptionEs;

    let categoryBadgeClass = 'hist-badge-fundacional';
    let categoryLabel = isEn ? 'Foundational Seat' : 'Sede Fundacional';
    if (loc.category === 'escuelas') {
      categoryBadgeClass = 'hist-badge-escuelas';
      categoryLabel = isEn ? 'School & Technique' : 'Escuelas y Estilo';
    } else if (loc.category === 'tragedias') {
      categoryBadgeClass = 'hist-badge-tragedias';
      categoryLabel = isEn ? 'Tragic Milestone' : 'Hito Trágico';
    } else if (loc.category === 'legal') {
      categoryBadgeClass = 'hist-badge-legal';
      categoryLabel = isEn ? 'Legal & Constitutional Seat' : 'Sede Jurídico-Constitucional';
    }

    dossierContainerEl.innerHTML = `
      <div class="hist-dossier-card">
        <!-- Barra Superior con Botón de Cierre -->
        <div class="hist-dossier-header">
          <div class="hist-dossier-badges">
            <span class="hist-loc-category-badge ${categoryBadgeClass}">${categoryLabel}</span>
            <span class="hist-dossier-era-badge">${eraName}</span>
          </div>

          <button type="button" class="hist-dossier-close-btn" id="hist-dossier-close-btn" aria-label="${isEn ? 'Close location dossier' : 'Cerrar ficha de la sede'}">
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div class="hist-dossier-body">
          
          <!-- Columna Izquierda: Imagen y Pie -->
          <div class="hist-dossier-media">
            <div class="hist-dossier-img-wrap">
              <img src="${loc.image}" alt="${cityName}: ${titleName}" class="hist-dossier-img" loading="lazy" />
            </div>
            <p class="hist-dossier-caption">${imageCaption}</p>
          </div>

          <!-- Columna Derecha: Contexto y Acreditación Histórica -->
          <div class="hist-dossier-info">
            <div class="hist-dossier-geo">
              <span class="hist-dossier-pin-icon" aria-hidden="true">📍</span>
              <span class="hist-dossier-region">${regionName}</span>
              <span class="hist-dossier-coords">(${loc.coordinates.lat.toFixed(4)}° N, ${Math.abs(loc.coordinates.lng).toFixed(4)}° ${loc.coordinates.lng < 0 ? 'O' : 'E'})</span>
            </div>

            <h3 class="hist-dossier-title" id="hist-dossier-title">${cityName}: ${titleName}</h3>

            <p class="hist-dossier-text">${summaryText}</p>

            <!-- Hito Vinculado en la Cronología -->
            <div class="hist-dossier-event-box">
              <span class="hist-dossier-event-kicker">
                <span aria-hidden="true">⏱️</span>
                <strong>${isEn ? 'Timeline Connection:' : 'Hito Vinculado en la Cronología:'}</strong>
              </span>
              <p class="hist-dossier-event-name">${eventTitle}</p>
            </div>

            <!-- Fuentes y Fondos Documentales Consultados -->
            ${loc.sources && loc.sources.length > 0 ? `
              <div class="hist-dossier-sources">
                <span class="hist-dossier-source-kicker">${isEn ? 'Authoritative Document & Repository:' : 'Fondo Documental Cotejado:'}</span>
                ${loc.sources.map(s => `
                  <div class="hist-dossier-source-item">
                    <span class="hist-dossier-source-title">«${s.title}»</span>
                    <span class="hist-dossier-source-repo">(${s.repo})</span>
                    ${s.url ? `
                      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hist-dossier-source-link" aria-label="${isEn ? 'Open verified source in new tab' : 'Abrir fuente contrastada en nueva pestaña'}">
                        <span>${isEn ? 'Consult Repository ↗' : 'Consultar Repositorio ↗'}</span>
                      </a>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Botonera de Acciones e Integración Bidireccional -->
            <div class="hist-dossier-actions">
              <!-- Botón 1: Saltar al hito en el scroll pinned timeline -->
              <button type="button" class="hist-btn-jump-timeline" id="hist-btn-jump-timeline" data-event-index="${loc.timelineEventIndex}">
                <span aria-hidden="true">🎯</span>
                <span class="hist-jump-btn-es">Saltar al Hito ${loc.timelineEventIndex + 1} en la Cronología</span>
                <span class="hist-jump-btn-en" style="display:none;">Jump to Milestone ${loc.timelineEventIndex + 1} in Timeline</span>
              </button>

              <!-- Botón 2: Abrir Cédula Documental Expandible -->
              <button type="button" class="hist-btn-open-exhibit" id="hist-btn-open-exhibit" data-event-index="${loc.timelineEventIndex}">
                <span aria-hidden="true">📜</span>
                <span class="hist-exhibit-btn-es">Abrir Cédula Documental</span>
                <span class="hist-exhibit-btn-en" style="display:none;">Open Historical Exhibit</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    `;

    dossierContainerEl.setAttribute('aria-hidden', 'false');
    dossierContainerEl.classList.add('hist-dossier-open');
    isDossierOpen = true;

    // Conectar botones del dossier
    const closeBtn = document.getElementById('hist-dossier-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDossier);
    }

    const jumpBtn = document.getElementById('hist-btn-jump-timeline');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const evtIdx = parseInt(jumpBtn.getAttribute('data-event-index'), 10);
        jumpToTimelineEvent(evtIdx);
      });
    }

    const exhibitBtn = document.getElementById('hist-btn-open-exhibit');
    if (exhibitBtn) {
      exhibitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const evtIdx = parseInt(exhibitBtn.getAttribute('data-event-index'), 10);
        openTimelineExhibit(evtIdx);
      });
    }

    // Llevar foco al botón de cerrar para accesibilidad
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 60);
    }
  }

  /**
   * Cierra el dossier de detalle y devuelve el foco.
   */
  function closeDossier() {
    if (!isDossierOpen) return;
    activeLocationId = null;

    // Desmarcar en SVG
    document.querySelectorAll('.hist-map-marker').forEach(m => {
      m.classList.remove('hist-marker-selected');
      m.setAttribute('aria-pressed', 'false');
    });

    // Desmarcar en tarjetas
    document.querySelectorAll('.hist-loc-card').forEach(c => {
      c.classList.remove('hist-loc-selected');
      c.setAttribute('aria-pressed', 'false');
    });

    renderDossier(null);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // =========================================================================
  // 7. 🎯 INTEGRACIÓN BIDIRECCIONAL CON EL TIMELINE Y ARCHIVO DIGITAL
  // =========================================================================
  function jumpToTimelineEvent(index) {
    if (window.historiaJourney && typeof window.historiaJourney.scrollToEvent === 'function') {
      window.historiaJourney.scrollToEvent(index);
    }

    const journeyContainer = document.getElementById('hist-journey-container');
    if (journeyContainer) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      journeyContainer.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }

  function openTimelineExhibit(index) {
    if (window.historiaJourney && typeof window.historiaJourney.openExhibit === 'function') {
      window.historiaJourney.openExhibit(index);
    }
  }

  // =========================================================================
  // 8. 🔍 SELECCIÓN Y FILTRADO DE SEDES HISTÓRICAS
  // =========================================================================
  function selectLocation(locId, shouldFocus) {
    lastFocusedElement = document.activeElement;
    activeLocationId = locId;
    const loc = HISTORICAL_LOCATIONS.find(l => l.id === locId);
    if (!loc) return;

    // Actualizar marcadores SVG
    document.querySelectorAll('.hist-map-marker').forEach(marker => {
      const mId = marker.getAttribute('data-location-id');
      const isCurrent = mId === locId;
      marker.classList.toggle('hist-marker-selected', isCurrent);
      marker.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    // Actualizar tarjetas de directorio
    document.querySelectorAll('.hist-loc-card').forEach(card => {
      const cId = card.getAttribute('data-location-id');
      const isCurrent = cId === locId;
      card.classList.toggle('hist-loc-selected', isCurrent);
      card.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      if (isCurrent && shouldFocus) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    renderDossier(loc);
  }

  function applyFilter(category) {
    activeFilter = category;

    // Actualizar botones de filtro
    filterButtons.forEach(btn => {
      const bCat = btn.getAttribute('data-filter');
      const isSelected = bCat === category;
      btn.classList.toggle('hist-filter-active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Re-renderizar marcadores y lista
    renderSVGMap();
    renderLocationsList();

    // Si la sede activa no pertenece a la categoría filtrada, cerrar dossier
    if (activeLocationId) {
      const currentLoc = HISTORICAL_LOCATIONS.find(l => l.id === activeLocationId);
      if (currentLoc && category !== 'all' && currentLoc.category !== category) {
        closeDossier();
      }
    }
  }

  // =========================================================================
  // 9. 🌐 BILINGÜISMO (ES / EN) Y EVENTOS DE SINCRONIZACIÓN
  // =========================================================================
  function setLanguage(lang) {
    currentLanguage = lang === 'en' ? 'en' : 'es';
    const isEn = currentLanguage === 'en';

    // Rótulos de encabezado
    document.querySelectorAll('.hist-map-title-es, .hist-map-desc-es, .hist-filter-es, .hist-hint-es, .hist-reset-es, .hist-sidebar-title-es').forEach(el => {
      el.style.display = isEn ? 'none' : 'inline';
    });
    document.querySelectorAll('.hist-map-title-en, .hist-map-desc-en, .hist-filter-en, .hist-hint-en, .hist-reset-en, .hist-sidebar-title-en').forEach(el => {
      el.style.display = isEn ? 'inline' : 'none';
    });

    // Re-renderizar mapa, lista y dossier si estuviera abierto
    renderSVGMap();
    renderLocationsList();
    if (activeLocationId) {
      const loc = HISTORICAL_LOCATIONS.find(l => l.id === activeLocationId);
      if (loc) renderDossier(loc);
    }
  }

  // =========================================================================
  // 10. 🚀 INICIALIZACIÓN DEL MÓDULO DEL MAPA
  // =========================================================================
  function initMap() {
    mapViewportEl = document.getElementById('hist-map-viewport');
    locationsListEl = document.getElementById('hist-locations-list');
    dossierContainerEl = document.getElementById('hist-location-dossier');
    resetBtn = document.getElementById('hist-map-reset-btn');
    filterButtons = Array.from(document.querySelectorAll('.hist-map-filter-btn'));

    if (!mapViewportEl || !locationsListEl) {
      return;
    }

    // Inicializar idioma sincronizado con journey.js si estuviera disponible
    if (window.historiaJourney && typeof window.historiaJourney.getLanguage === 'function') {
      currentLanguage = window.historiaJourney.getLanguage();
    }

    // Escuchar eventos globales de cambio de idioma
    window.addEventListener('historiaLanguageChange', (e) => {
      if (e.detail && e.detail.lang) {
        setLanguage(e.detail.lang);
      }
    });

    // Controladores de botones de filtro
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-filter');
        applyFilter(cat);
      });
    });

    // Botón de restablecer
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDossier();
        applyFilter('all');
      });
    }

    // Render inicial
    setLanguage(currentLanguage);

    // Exponer API del mapa para depuración y testing
    window.historiaMap = {
      getLocations: () => HISTORICAL_LOCATIONS,
      getActiveLocationId: () => activeLocationId,
      selectLocation: (id) => selectLocation(id, true),
      closeDossier: closeDossier,
      applyFilter: applyFilter,
      setLanguage: setLanguage,
      getLanguage: () => currentLanguage
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
