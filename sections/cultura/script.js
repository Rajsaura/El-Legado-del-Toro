/**
 * ==========================================================================
 * SECCIÓN 3: LA CULTURA — DEL RUEDO A LA VIDA
 * Archivo: sections/cultura/script.js
 * Proyecto: El Legado del Toro — Revista Digital
 * 
 * Funcionalidades interactivas ampliadas:
 * 1. "Palabras del ruedo": Explorador de modismos y Modo Juego de Adivinanza interactivo.
 * 2. "Arte y símbolos": Galería de 6 tarjetas con modales/lightbox accesibles.
 * 3. "Descubre los detalles": Hotspots interactivos sobre la confección artesanal.
 * 4. "¿Sabías que...?": Rotador dinámico con transición suave y datos verificados.
 * 5. "Pon a prueba tus conocimientos": Cuestionario con medalla de explorador cultural.
 * 6. "Volver arriba": Control flotante con scroll suave.
 * 
 * Todo el código está encapsulado en una IIFE privada sin variables globales.
 * No utiliza localStorage ni dependencias externas.
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. BANCO DE DATOS: MODISMOS Y JUEGO DE ADIVINANZA
  // --------------------------------------------------------------------------
  const EXPRESIONES_TAURINAS = [
    {
      id: "cuernos",
      expresion: "Tomar el toro por los cuernos",
      categoria: "Decisión y Valentía",
      literal: "Afrontar directamente al animal sujetándolo por las astas, la parte más peligrosa pero decisiva para frenar su embestida.",
      figurado: "Enfrentarse a un problema, dilema o dificultad con determinación, valentía y sin rodeos.",
      ejemplo: "«En vez de retrasar la preparación del examen de español, decidí tomar el toro por los cuernos y estudiar todos los temas este fin de semana.»",
      fuenteNombre: "Real Academia Española — DLE (lema: toro)",
      fuenteUrl: "https://dle.rae.es/toro",
      // Opciones para el juego de adivinanza
      opcionesJuego: [
        "Comprar un animal peligroso en una subasta ganadera.",
        "Afrontar un problema difícil con valentía y determinación directa.",
        "Evitar una discusión marchándose de la habitación."
      ],
      correctaJuego: 1
    },
    {
      id: "barrera",
      expresion: "Ver los toros desde la barrera",
      categoria: "Prudencia y Distancia",
      literal: "Observar la lidia desde el callejón o la grada protegida por la barrera de madera, fuera de cualquier peligro físico del ruedo.",
      figurado: "Presenciar un conflicto o problema ajeno con comodidad, prudencia o pasividad, sin correr riesgos ni involucrarse.",
      ejemplo: "«Cuando comenzó la acalorada discusión entre los delegados, Javier prefirió ver los toros desde la barrera para evitar malentendidos.»",
      fuenteNombre: "Real Academia Española — DLE (lema: barrera)",
      fuenteUrl: "https://dle.rae.es/barrera",
      opcionesJuego: [
        "Observar un conflicto ajeno desde una posición segura sin implicarse.",
        "Comprar las entradas más caras en la primera fila del teatro.",
        "Construir una valla de madera para proteger el jardín."
      ],
      correctaJuego: 0
    },
    {
      id: "capote",
      expresion: "Echar un capote",
      categoria: "Solidaridad y Auxilio",
      literal: "Intervenir rápidamente con el capote de brega para llamar la atención del toro y salvar a un compañero caído o acorralado.",
      figurado: "Socorrer o ayudar oportunamente a una persona que se encuentra en apuros, en una situación comprometida o sin argumentos.",
      ejemplo: "«Durante mi exposición oral me quedé en blanco con una fecha histórica, pero mi compañero me echó un capote y continuó la explicación.»",
      fuenteNombre: "Real Academia Española — DLE (lema: capote)",
      fuenteUrl: "https://dle.rae.es/capote",
      opcionesJuego: [
        "Prestar una prenda de abrigo durante los días de invierno.",
        "Ayudar oportunamente a alguien en una situación difícil o comprometida.",
        "Desafiar a un adversario en una competición deportiva."
      ],
      correctaJuego: 1
    },
    {
      id: "quite",
      expresion: "Estar al quite",
      categoria: "Atención y Alerta",
      literal: "Posición de máxima concentración del diestro o subalterno para realizar un «quite» reglamentario si otro compañero sufre peligro.",
      figurado: "Estar muy atento, vigilante y preparado para intervenir en el momento exacto y evitar un percance o solucionar un contratiempo.",
      ejemplo: "«La profesora siempre está al quite cuando cometemos errores con los acentos para ayudarnos a corregir la redacción a tiempo.»",
      fuenteNombre: "Real Academia Española — DLE (lema: quite)",
      fuenteUrl: "https://dle.rae.es/quite",
      opcionesJuego: [
        "Descansar después de una larga jornada de trabajo.",
        "Abandonar una tarea antes de que termine el plazo fijado.",
        "Estar atento y listo para intervenir oportunamente y evitar un problema."
      ],
      correctaJuego: 2
    },
    {
      id: "tercio",
      expresion: "Cambiar de tercio",
      categoria: "Giro Temático",
      literal: "Paso de una fase reglamentaria a la siguiente en la lidia (tercio de varas, tercio de banderillas y tercio de muerte).",
      figurado: "Modificar de manera brusca o deliberada el tema de conversación o el rumbo de una actividad para hablar de algo distinto.",
      ejemplo: "«El debate sobre las notas se estaba volviendo tenso, así que decidimos cambiar de tercio y planificar la excursión cultural.»",
      fuenteNombre: "Real Academia Española — DLE (lema: tercio)",
      fuenteUrl: "https://dle.rae.es/tercio",
      opcionesJuego: [
        "Cambiar de tema de conversación o de actividad de manera deliberada.",
        "Dividir una cuenta entre tres personas equitativamente.",
        "Llegar en tercera posición en una carrera atlética."
      ],
      correctaJuego: 0
    }
  ];

  // --------------------------------------------------------------------------
  // 2. DETALLES DE LAS 6 TARJETAS DE LA GALERÍA "ARTE Y SÍMBOLOS"
  // --------------------------------------------------------------------------
  const DETALLES_ARTE = {
    traje: {
      titulo: "El Traje de Luces: Alta costura ceremonial y simbolismo",
      badge: "Indumentaria Tradicional",
      contenido: `
        <p>El traje de luces es una de las piezas más complejas de la sastrería artesanal española. Reglamentado a finales del siglo XVIII por Francisco Montes «Paquiro», está compuesto por chaquetilla, chaleco y taleguilla, confeccionados en seda resistente y adornados con canutillo de oro, plata o azabache.</p>
        <p>El traje puede pesar entre 4 y 5 kilogramos debido a la profusión de pedrería y alamares cosidos a mano. El proceso de vestirse en el hotel es un solemne ritual previo a la corrida, cargado de supersticiones y respeto escrupuloso hacia los colores tradicionales.</p>
        <p>En el diseño de moda contemporáneo, creadores internacionales como Giorgio Armani, Christian Lacroix o Dolce & Gabbana han homenajeado la estética del traje de luces en pasarelas de alta costura.</p>
      `,
      fuenteNombre: "Museo del Traje de Madrid (Ministerio de Cultura)",
      fuenteUrl: "https://www.cultura.gob.es/mtraje/"
    },
    carteles: {
      titulo: "Los Carteles Taurinos: Nacimiento del cartel publicitario moderno",
      badge: "Artes Gráficas y Litografía",
      contenido: `
        <p>Durante los siglos XIX y XX, el cartel taurino fue el gran precursor de la publicidad visual y las artes gráficas en España. Con la invención de la cromolitografía, imprentas de Valencia, Barcelona y Madrid comenzaron a encargar composiciones artísticas para anunciar las ferias de primavera.</p>
        <p>Maestros de la pintura como Carlos Ruano Llopis, Roberto Domingo y Mariano Benlliure convirtieron los carteles en lienzos de gran dinamismo. Su estilo se distingue por la audacia del color, el dramatismo del movimiento y una tipografía monumental que decoraba plazas y calles de toda la península.</p>
        <p>Hoy en día, las colecciones de carteles taurinos son custodiadas por instituciones como la Biblioteca Nacional de España como documentos de incalculable valor histórico y tipográfico.</p>
      `,
      fuenteNombre: "Biblioteca Nacional de España — Fondos de Dibujos y Grabados",
      fuenteUrl: "https://www.bne.es"
    },
    plaza: {
      titulo: "La Plaza de Toros: Del ágora urbana a la arquitectura neomudéjar",
      badge: "Arquitectura y Espacio Social",
      contenido: `
        <p>Antes de la construcción de plazas fijas a mediados del siglo XVIII, las corridas se celebraban cerrando con carros y tablados las plazas mayores de ciudades como Madrid, Salamanca o Valladolid.</p>
        <p>La necesidad de seguridad y visibilidad dio origen al coso circular permanente, destacando la Plaza de Ronda (1785) y la Real Maestranza de Sevilla (iniciada en 1761). Con el cambio de siglo, triunfó el estilo neomudéjar (como en Las Ventas de Madrid, inaugurada en 1931), que recuperó el ladrillo visto, arcos de herradura y cerámica vidriada policromada como homenaje a la identidad artística hispanomusulmana.</p>
        <p>Históricamente, la plaza actuó como un espacio democrático y transversal donde convergían todas las clases sociales para dialogar y celebrar de forma colectiva.</p>
      `,
      fuenteNombre: "Comunidad de Madrid — Patrimonio Cultural Las Ventas",
      fuenteUrl: "https://www.comunidad.madrid"
    },
    arte_plastico: {
      titulo: "El Toro en el Arte Plástico: De Goya y Picasso a la vanguardia",
      badge: "Pintura y Escultura",
      contenido: `
        <p>Pocos motivos iconográficos han ejercido tanta atracción sobre los grandes maestros de la pintura española como el toro. Francisco de Goya publicó en 1816 su célebre serie de 33 aguafuertes titulada <em>La Tauromaquia</em>, en la que reflejó con maestría el choque primitivo entre hombre y bestia y la estética popular de su época.</p>
        <p>En el siglo XX, Pablo Picasso reinterpretó el toro a través del cubismo y el grabado clásico, convirtiéndolo en un símbolo universal de la tragedia, la fuerza vital mediterránea y el dolor del pueblo español, como atestigua su obra maestra el <em>Guernica</em> (1937).</p>
        <p>Escultores contemporános y pintores como Ignacio Zuloaga o José Gutiérrez Solana continuaron explorando este mito como un enigma visual de la identidad ibérica.</p>
      `,
      fuenteNombre: "Museo Nacional del Prado — Colección Goya",
      fuenteUrl: "https://www.museodelprado.es"
    },
    musica: {
      titulo: "La Música y el Pasodoble: El latido festivo de la banda sonora hispana",
      badge: "Música Popular y Orquestal",
      contenido: `
        <p>El pasodoble español es indiscutiblemente la banda sonora que acompaña tanto a la liturgia del ruedo como a las fiestas patronales de toda la geografía española. Derivado de las marchas militares del siglo XVIII, se consolidó en el siglo XIX como un género de compás binario lleno de brío y dramatismo.</p>
        <p>Obras maestras como «España Cañí» (Pascual Marquina, 1925), «Suspiros de España» (Antonio Álvarez Alonso, 1902) o «Amparito Roca» (Jaime Teixidor, 1925) son interpretadas en directo por las bandas municipales de música durante el paseíllo inicial y las faenas destacadas.</p>
        <p>Esta música ha trascendido fronteras hasta convertirse en un referente universal del baile de salón internacional y de las celebraciones populares.</p>
      `,
      fuenteNombre: "Biblioteca Nacional de España — Archivo Musical",
      fuenteUrl: "https://www.bne.es"
    },
    literatura: {
      titulo: "La Literatura y la Poesía: Tragedia, duelo y verso en Lorca",
      badge: "Poesía y Letras Universales",
      contenido: `
        <p>La fascinación intelectual por la tauromaquia floreció con particular esplendor en la Generación del 27. Poetas como Rafael Alberti, Gerardo Diego y, muy singularmente, Federico García Lorca encontraron en el coso una tragedia clásica viva, donde el destino y el valor humano se confrontan sin artificios.</p>
        <p>La elegía lorquiana <em>Llanto por Ignacio Sánchez Mejías</em> (1935), con su célebre verso recurrente «a las cinco de la tarde», es considerada unánimemente una de las cumbres poéticas del siglo XX en lengua española.</p>
        <p>Asimismo, autores internacionales como Ernest Hemingway plasmaron en <em>Muerte en la tarde</em> (1932) y <em>Fiesta</em> (1926) su deslumbramiento ante la autenticidad ritual y el sentido trágico de la fiesta española.</p>
      `,
      fuenteNombre: "Centro Virtual Cervantes — Monográficos de Literatura",
      fuenteUrl: "https://cvc.cervantes.es"
    }
  };

  // --------------------------------------------------------------------------
  // 3. DETALLES DE LOS HOTSPOTS: "DESCUBRE LOS DETALLES"
  // --------------------------------------------------------------------------
  const HOTSPOTS_INFO = [
    {
      id: 1,
      titulo: "Alamares y Hombreras de Oro",
      descripcion: "Las hombreras abombadas están rematadas con alamares y flecos de oro macizo en cordonería espiral. No solo tienen una función ornamental suntuosa, sino que añaden prestancia al porte del torero y aportan rigidez a los hombros durante los lances con el capote.",
      fuente: "Museo del Traje de Madrid"
    },
    {
      id: 2,
      titulo: "Bordados Centrales y Filigranas",
      descripcion: "La pechera y solapas presentan bordados vegetales confeccionados con canutillo de oro, hilo torzal y lentejuelas sobre seda carmesí. Tradicionalmente, se eluden los forros de color amarillo por una arraigada superstición gremial en el toreo español.",
      fuente: "Real Maestranza de Sevilla"
    },
    {
      id: 3,
      titulo: "Chaleco y Taleguilla Ceñida",
      descripcion: "El chaleco y la taleguilla (pantalón ajustado) están forrados interiormente con lienzo de algodón de alta resistencia para evitar rozaduras y dotar de máxima libertad de flexión a la cadera y las piernas durante la faena.",
      fuente: "Sastrería Taurina Fermín (Madrid)"
    },
    {
      id: 4,
      titulo: "Seda Artesanal de Alta Densidad",
      descripcion: "El tejido base es seda natural tejida con alto gramaje, capaz de soportar el peso de hasta 5 kilos de pedrería y el polvo abrasivo del albero de la plaza de toros sin desgarrarse.",
      fuente: "Centro de Investigación del Patrimonio Etnológico"
    }
  ];

  // --------------------------------------------------------------------------
  // 4. BANCO DE DATOS CULTURALES: "¿SABÍAS QUE...?"
  // --------------------------------------------------------------------------
  const DATOS_CULTURALES = [
    {
      texto: "El Diccionario de la Real Academia Española (DLE) recoge más de 30 locuciones y expresiones idiomáticas de origen taurino de uso cotidiano en el castellano habitual de España e Hispanoamérica.",
      fuenteNombre: "Real Academia Española (RAE)",
      fuenteUrl: "https://www.rae.es"
    },
    {
      texto: "El célebre pasodoble «España Cañí», compuesto en 1925 por Pascual Marquina Narro, se concibió durante un trayecto en tren y es hoy una de las piezas musicales más interpretadas en fiestas y desfiles de todo el mundo.",
      fuenteNombre: "Biblioteca Nacional de España (BNE)",
      fuenteUrl: "https://datos.bne.es/obra/XX2063858.html"
    },
    {
      texto: "Un auténtico traje de luces requiere entre 40 y 60 días de trabajo manual exclusivo de sastres especializados y puede pesar cerca de 5 kilogramos debido a los bordados de canutillo de oro, plata y pedrería.",
      fuenteNombre: "Museo del Traje de Madrid",
      fuenteUrl: "https://www.cultura.gob.es/mtraje/"
    },
    {
      texto: "Francisco de Goya plasmó su visión apasionada y crítica de la fiesta en la serie de 33 grabados «La Tauromaquia» (1816), considerada una cumbre histórica del arte gráfico universal.",
      fuenteNombre: "Museo Nacional del Prado",
      fuenteUrl: "https://www.museodelprado.es"
    },
    {
      texto: "La Real Maestranza de Caballería de Sevilla tardó más de 120 años en completarse (1761-1881), razón por la cual su ruedo no describe una circunferencia perfecta sino un trazado elíptico irregular.",
      fuenteNombre: "Real Maestranza de Caballería de Sevilla",
      fuenteUrl: "https://www.realmaestranza.com"
    }
  ];

  // --------------------------------------------------------------------------
  // 5. PREGUNTAS DEL CUESTIONARIO CULTURAL Y LINGÜÍSTICO
  // --------------------------------------------------------------------------
  const PREGUNTAS_QUIZ = [
    {
      id: 1,
      pregunta: "¿Qué significa en el habla cotidiana la expresión popular española «ver los toros desde la barrera»?",
      opciones: [
        "Comprar las entradas más baratas en las gradas altas.",
        "Observar un problema o conflicto ajeno con tranquilidad y sin comprometerse ni correr riesgos.",
        "Trabajar como voluntario en la organización de una feria popular.",
        "Ignorar las normas de tráfico en una ciudad."
      ],
      correcta: 1,
      explicacion: "Alude a quien contempla la corrida resguardado tras las maderas de la barrera, a salvo de peligro, y por extensión describe a quien no se involucra en una dificultad ajena.",
      fuente: "Diccionario de la Lengua Española (RAE)"
    },
    {
      id: 2,
      pregunta: "¿Por qué recibe el nombre de «traje de luces» la indumentaria ceremonial del torero?",
      opciones: [
        "Por los destellos y reflejos producidos por las lentejuelas y los hilos de oro y plata bajo la luz del sol.",
        "Porque incorpora pequeñas bombillas eléctricas en las hombreras.",
        "Porque solo se utiliza en festejos nocturnos especialmente iluminados.",
        "Por el color marfil de la camisa interior."
      ],
      correcta: 0,
      explicacion: "El brillo característico de los bordados de canutillo de oro, plata y lentejuelas produce destellos luminosos sobre la arena del ruedo.",
      fuente: "Museo del Traje de Madrid"
    },
    {
      id: 3,
      pregunta: "¿Qué poeta de la Generación del 27 escribió la célebre elegía «Llanto por Ignacio Sánchez Mejías»?",
      opciones: [
        "Antonio Machado.",
        "Federico García Lorca.",
        "Miguel de Cervantes.",
        "Gustavo Adolfo Bécquer."
      ],
      correcta: 1,
      explicacion: "Federico García Lorca compuso en 1935 esta obra cumbre en homenaje a su amigo torero y escritor fallecido a consecuencia de una cornada.",
      fuente: "Centro Virtual Cervantes"
    },
    {
      id: 4,
      pregunta: "¿Qué estilo arquitectónico historicista caracteriza a la Plaza de Toros de Las Ventas en Madrid?",
      opciones: [
        "Estilo neomudéjar, con arcos de herradura y decoración en ladrillo visto y cerámica vidriada.",
        "Gótico flamígero con arbotantes y vidrieras francesas.",
        "Barroco colonial hispanoamericano.",
        "Brutalismo geométrico de hormigón armado contemporáneo."
      ],
      correcta: 0,
      explicacion: "Las Ventas (1931) es el máximo exponente del neomudéjar taurino, un estilo que recrea la estética hispanomusulmana de la Edad Media.",
      fuente: "Comunidad de Madrid — Patrimonio Cultural"
    },
    {
      id: 5,
      pregunta: "En una conversación diaria en España, si alguien te dice «te voy a echar un capote», ¿qué te está ofreciendo?",
      opciones: [
        "Te está prestando una chaqueta para protegerte del frío.",
        "Te está retando a una discusión acalorada.",
        "Te está ofreciendo ayuda o auxilio oportuno en una situación difícil.",
        "Te está pidiendo dinero prestado."
      ],
      correcta: 2,
      explicacion: "Procede del acto en el que un compañero interviene con el capote para distraer al toro y auxiliar al diestro en apuros.",
      fuente: "Diccionario de la Lengua Española (RAE)"
    }
  ];

  // --------------------------------------------------------------------------
  // INICIALIZACIÓN PRINCIPAL AL CARGAR EL DOM
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initHeroScroll();
    initPalabrasRuedo();
    initModalesArte();
    initDescubreDetalles();
    initSabiasQue();
    initQuizInteractivo();
    initBackToTop();
  });

  // --------------------------------------------------------------------------
  // 1. SCROLL SUAVE DEL HERO Y NAVEGACIÓN INTERNA
  // --------------------------------------------------------------------------
  function initHeroScroll() {
    const scrollBtn = document.getElementById('cultura-hero-scroll-btn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById('cultura-quick-nav') || document.getElementById('cultura-palabras');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Resaltado de enlaces en el navegador rápido interno al hacer scroll
    const quickLinks = document.querySelectorAll('.cultura-quick-link');
    if (quickLinks.length > 0) {
      window.addEventListener('scroll', function () {
        const fromTop = window.scrollY + 140;
        quickLinks.forEach(link => {
          const sectionId = link.getAttribute('href');
          if (!sectionId || !sectionId.startsWith('#')) return;
          const section = document.querySelector(sectionId);
          if (section) {
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          }
        });
      }, { passive: true });
    }
  }

  // --------------------------------------------------------------------------
  // 2. CONTROLADOR DE "PALABRAS DEL RUEDO" (EXPLORADOR Y JUEGO)
  // --------------------------------------------------------------------------
  function initPalabrasRuedo() {
    const tabsContainer = document.getElementById('cultura-modismos-tabs');
    const cardEl = document.getElementById('cultura-modismo-card');
    const titleEl = document.getElementById('cultura-modismo-titulo');
    const badgeEl = document.getElementById('cultura-modismo-badge');
    const literalEl = document.getElementById('cultura-modismo-literal');
    const figuradoEl = document.getElementById('cultura-modismo-figurado');
    const ejemploEl = document.getElementById('cultura-modismo-ejemplo');
    const sourceEl = document.getElementById('cultura-modismo-fuente');

    // Conmutadores de modo
    const btnModoExplorar = document.getElementById('cultura-btn-modo-explorar');
    const btnModoJuego = document.getElementById('cultura-btn-modo-juego');
    const explorerWrap = document.getElementById('cultura-explorer-wrap');
    const juegoWrap = document.getElementById('cultura-juego-wrap');

    if (!tabsContainer || !cardEl) return;

    // Lógica del conmutador de modo
    if (btnModoExplorar && btnModoJuego && explorerWrap && juegoWrap) {
      btnModoExplorar.addEventListener('click', function () {
        btnModoExplorar.classList.add('is-active');
        btnModoJuego.classList.remove('is-active');
        explorerWrap.style.display = 'block';
        juegoWrap.classList.remove('is-visible');
      });

      btnModoJuego.addEventListener('click', function () {
        btnModoJuego.classList.add('is-active');
        btnModoExplorar.classList.remove('is-active');
        explorerWrap.style.display = 'none';
        juegoWrap.classList.add('is-visible');
        iniciarJuegoModismos();
      });
    }

    function renderizarModismo(id) {
      const item = EXPRESIONES_TAURINAS.find(m => m.id === id) || EXPRESIONES_TAURINAS[0];

      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateY(6px)';

      setTimeout(() => {
        titleEl.textContent = `«${item.expresion}»`;
        badgeEl.textContent = item.categoria;
        literalEl.textContent = item.literal;
        figuradoEl.textContent = item.figurado;
        ejemploEl.textContent = item.ejemplo;
        sourceEl.innerHTML = `Fuente lexicográfica: <a href="${item.fuenteUrl}" target="_blank" rel="noopener noreferrer">${item.fuenteNombre}</a>`;

        cardEl.style.opacity = '1';
        cardEl.style.transform = 'translateY(0)';
      }, 150);

      const botones = tabsContainer.querySelectorAll('.cultura-tab-btn');
      botones.forEach(btn => {
        const esActivo = btn.getAttribute('data-id') === item.id;
        btn.classList.toggle('is-active', esActivo);
        btn.setAttribute('aria-selected', esActivo ? 'true' : 'false');
      });
    }

    tabsContainer.innerHTML = '';
    EXPRESIONES_TAURINAS.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cultura-tab-btn ${index === 0 ? 'is-active' : ''}`;
      btn.setAttribute('data-id', item.id);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.textContent = item.expresion;

      btn.addEventListener('click', function () {
        renderizarModismo(item.id);
      });

      tabsContainer.appendChild(btn);
    });

    renderizarModismo(EXPRESIONES_TAURINAS[0].id);
  }

  // Lógica del Juego de Adivinanza de Modismos
  function iniciarJuegoModismos() {
    const rondaEl = document.getElementById('cultura-juego-ronda');
    const scoreBadge = document.getElementById('cultura-juego-score');
    const targetExprEl = document.getElementById('cultura-juego-target-expr');
    const optionsContainer = document.getElementById('cultura-juego-options');
    const feedbackBox = document.getElementById('cultura-juego-feedback');
    const nextBtn = document.getElementById('cultura-btn-next-expr');

    if (!rondaEl || !targetExprEl || !optionsContainer || !nextBtn) return;

    let rondaActual = 0;
    let aciertos = 0;
    let respondido = false;

    function cargarRonda(indice) {
      respondido = false;
      feedbackBox.className = 'cultura-juego-feedback';
      feedbackBox.style.display = 'none';
      nextBtn.style.display = 'none';

      if (indice >= EXPRESIONES_TAURINAS.length) {
        // Fin del juego
        rondaEl.textContent = '¡Juego completado!';
        targetExprEl.textContent = `Tu puntuación final: ${aciertos} de ${EXPRESIONES_TAURINAS.length}`;
        optionsContainer.innerHTML = `
          <p style="text-align: center; color: var(--color-text-secondary); margin: var(--space-md) 0;">
            ${aciertos === 5 ? '¡Perfecto! Dominas a la perfección los modismos taurinos en el habla cotidiana.' : '¡Buen intento! Puedes volver a jugar para afianzar tus conocimientos.'}
          </p>
        `;
        nextBtn.textContent = 'Volver a jugar';
        nextBtn.style.display = 'inline-flex';
        nextBtn.onclick = function () {
          iniciarJuegoModismos();
        };
        return;
      }

      const item = EXPRESIONES_TAURINAS[indice];
      rondaEl.textContent = `Expresión ${indice + 1} de ${EXPRESIONES_TAURINAS.length}`;
      scoreBadge.textContent = `Aciertos: ${aciertos} / ${EXPRESIONES_TAURINAS.length}`;
      targetExprEl.textContent = `¿Qué significa «${item.expresion}»?`;

      optionsContainer.innerHTML = '';
      item.opcionesJuego.forEach((opcionTexto, opcIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cultura-juego-btn';
        btn.textContent = opcionTexto;

        btn.addEventListener('click', function () {
          if (respondido) return;
          respondido = true;

          const esCorrecta = opcIdx === item.correctaJuego;
          if (esCorrecta) {
            aciertos++;
            btn.classList.add('correct');
          } else {
            btn.classList.add('incorrect');
          }

          scoreBadge.textContent = `Aciertos: ${aciertos} / ${EXPRESIONES_TAURINAS.length}`;

          const allBtns = optionsContainer.querySelectorAll('.cultura-juego-btn');
          allBtns.forEach((b, idx) => {
            b.disabled = true;
            if (idx === item.correctaJuego) {
              b.classList.add('correct');
            }
          });

          feedbackBox.className = `cultura-juego-feedback is-visible ${esCorrecta ? 'correct' : 'incorrect'}`;
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <strong>${esCorrecta ? '¡Correcto!' : 'Respuesta incorrecta.'}</strong> ${item.figurado}
            <div style="margin-top: 6px; font-style: italic;">Ejemplo: ${item.ejemplo}</div>
          `;

          nextBtn.textContent = (indice + 1 < EXPRESIONES_TAURINAS.length) ? 'Siguiente expresión' : 'Ver resultado';
          nextBtn.style.display = 'inline-flex';
          nextBtn.onclick = function () {
            rondaActual++;
            cargarRonda(rondaActual);
          };
        });

        optionsContainer.appendChild(btn);
      });
    }

    cargarRonda(0);
  }

  // --------------------------------------------------------------------------
  // 3. CONTROLADOR DE MODALES DE "ARTE Y SÍMBOLOS" (6 TARJETAS)
  // --------------------------------------------------------------------------
  function initModalesArte() {
    const backdrop = document.getElementById('cultura-modal');
    const closeBtn = document.getElementById('cultura-modal-close');
    const modalBadge = document.getElementById('cultura-modal-badge');
    const modalTitle = document.getElementById('cultura-modal-title');
    const modalBody = document.getElementById('cultura-modal-body');
    const modalSource = document.getElementById('cultura-modal-source');
    const triggerButtons = document.querySelectorAll('.cultura-btn-descubrir');

    if (!backdrop || !closeBtn || !modalTitle || !modalBody) return;

    let ultimoElementoFoco = null;

    function abrirModal(clave) {
      const datos = DETALLES_ARTE[clave];
      if (!datos) return;

      ultimoElementoFoco = document.activeElement;

      modalBadge.textContent = datos.badge;
      modalTitle.textContent = datos.titulo;
      modalBody.innerHTML = datos.contenido;
      modalSource.innerHTML = `Fuente consultada: <a href="${datos.fuenteUrl}" target="_blank" rel="noopener noreferrer">${datos.fuenteNombre}</a>`;

      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function cerrarModal() {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (ultimoElementoFoco && typeof ultimoElementoFoco.focus === 'function') {
        ultimoElementoFoco.focus();
      }
    }

    triggerButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const clave = this.getAttribute('data-target');
        abrirModal(clave);
      });
    });

    closeBtn.addEventListener('click', cerrarModal);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        cerrarModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        cerrarModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. EXPERIENCIA INTERACTIVA: "DESCUBRE LOS DETALLES" (HOTSPOTS)
  // --------------------------------------------------------------------------
  function initDescubreDetalles() {
    const navButtons = document.querySelectorAll('.cultura-btn-hotspot-nav');
    const infoTitleEl = document.getElementById('cultura-hotspot-title');
    const infoTextEl = document.getElementById('cultura-hotspot-text');
    const infoCiteEl = document.getElementById('cultura-hotspot-cite');

    if (!navButtons.length || !infoTitleEl || !infoTextEl) return;

    function activarHotspot(id) {
      const datos = HOTSPOTS_INFO.find(h => h.id === Number(id)) || HOTSPOTS_INFO[0];

      infoTitleEl.textContent = datos.titulo;
      infoTextEl.textContent = datos.descripcion;
      infoCiteEl.innerHTML = `Documentación técnica: <strong>${datos.fuente}</strong>`;

      navButtons.forEach(btn => {
        const esActivo = Number(btn.getAttribute('data-hotspot')) === datos.id;
        btn.classList.toggle('is-active', esActivo);
        btn.setAttribute('aria-selected', esActivo ? 'true' : 'false');
      });
    }

    navButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-hotspot');
        activarHotspot(id);
      });
    });

    // Activar el primer hotspot inicialmente
    activarHotspot(1);
  }

  // --------------------------------------------------------------------------
  // 5. ROTADOR INTERACTIVO: "¿SABÍAS QUE...?"
  // --------------------------------------------------------------------------
  function initSabiasQue() {
    const factTextEl = document.getElementById('cultura-fact-text');
    const factCounterEl = document.getElementById('cultura-fact-counter');
    const factSourceEl = document.getElementById('cultura-fact-source');
    const nextBtn = document.getElementById('cultura-next-fact-btn');

    if (!factTextEl || !factCounterEl || !factSourceEl || !nextBtn) return;

    let indiceActual = 0;
    const totalDatos = DATOS_CULTURALES.length;

    function mostrarDato(indice) {
      const dato = DATOS_CULTURALES[indice];
      if (!dato) return;

      factTextEl.style.opacity = '0';
      factTextEl.style.transform = 'translateY(6px)';

      setTimeout(() => {
        factCounterEl.textContent = `Dato cultural ${indice + 1} de ${totalDatos}`;
        factTextEl.textContent = `“${dato.texto}”`;
        factSourceEl.innerHTML = `Fuente verificada: <a href="${dato.fuenteUrl}" target="_blank" rel="noopener noreferrer">${dato.fuenteNombre}</a>`;

        factTextEl.style.opacity = '1';
        factTextEl.style.transform = 'translateY(0)';
      }, 150);
    }

    nextBtn.addEventListener('click', function () {
      indiceActual = (indiceActual + 1) % totalDatos;
      mostrarDato(indiceActual);
    });

    mostrarDato(indiceActual);
  }

  // --------------------------------------------------------------------------
  // 6. CONTROLADOR DEL CUESTIONARIO CULTURAL (QUIZ CON MEDALLA)
  // --------------------------------------------------------------------------
  function initQuizInteractivo() {
    const quizContainer = document.getElementById('cultura-quiz-container');
    const scoreBadge = document.getElementById('cultura-score-badge');
    const resultCard = document.getElementById('cultura-quiz-result');
    const finalScoreEl = document.getElementById('cultura-final-score');
    const finalMsgEl = document.getElementById('cultura-final-msg');
    const honorBadgeEl = document.getElementById('cultura-badge-honor');
    const resetBtn = document.getElementById('cultura-quiz-reset-btn');

    if (!quizContainer || !scoreBadge || !resultCard) return;

    let puntuacion = 0;
    let preguntasRespondidas = 0;
    const totalPreguntas = PREGUNTAS_QUIZ.length;
    const estadoRespuestas = {};

    function renderizarQuiz() {
      puntuacion = 0;
      preguntasRespondidas = 0;
      scoreBadge.textContent = `Puntuación: 0 / ${totalPreguntas}`;
      resultCard.classList.remove('is-visible');

      quizContainer.innerHTML = '';

      PREGUNTAS_QUIZ.forEach((item, index) => {
        estadoRespuestas[item.id] = false;

        const questionEl = document.createElement('article');
        questionEl.className = 'cultura-quiz-item';
        questionEl.id = `cultura-pregunta-${item.id}`;
        questionEl.setAttribute('aria-labelledby', `cultura-q-title-${item.id}`);

        const numSpan = document.createElement('div');
        numSpan.className = 'cultura-question-num';
        numSpan.textContent = `Pregunta ${index + 1} de ${totalPreguntas}`;

        const titleEl = document.createElement('h3');
        titleEl.className = 'cultura-question-title';
        titleEl.id = `cultura-q-title-${item.id}`;
        titleEl.textContent = item.pregunta;

        const optionsWrap = document.createElement('div');
        optionsWrap.className = 'cultura-options-list';
        optionsWrap.setAttribute('role', 'group');
        optionsWrap.setAttribute('aria-label', `Opciones para la pregunta ${index + 1}`);

        item.opciones.forEach((opcionTexto, opcIndex) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'cultura-option-btn';
          btn.id = `cultura-opt-${item.id}-${opcIndex}`;
          btn.setAttribute('data-qid', item.id);
          btn.setAttribute('data-oid', opcIndex);

          btn.innerHTML = `
            <span>${opcionTexto}</span>
            <span class="cultura-option-mark" aria-hidden="true"></span>
          `;

          btn.addEventListener('click', function () {
            manejarRespuesta(item.id, opcIndex);
          });

          optionsWrap.appendChild(btn);
        });

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'cultura-feedback-box';
        feedbackBox.id = `cultura-feedback-${item.id}`;
        feedbackBox.setAttribute('aria-live', 'polite');

        questionEl.appendChild(numSpan);
        questionEl.appendChild(titleEl);
        questionEl.appendChild(optionsWrap);
        questionEl.appendChild(feedbackBox);

        quizContainer.appendChild(questionEl);
      });
    }

    function manejarRespuesta(preguntaId, opcionSeleccionada) {
      if (estadoRespuestas[preguntaId]) return;
      estadoRespuestas[preguntaId] = true;

      const datosPregunta = PREGUNTAS_QUIZ.find(q => q.id === preguntaId);
      if (!datosPregunta) return;

      const questionEl = document.getElementById(`cultura-pregunta-${preguntaId}`);
      const feedbackBox = document.getElementById(`cultura-feedback-${preguntaId}`);
      const botones = questionEl.querySelectorAll('.cultura-option-btn');

      const esCorrecta = opcionSeleccionada === datosPregunta.correcta;

      if (esCorrecta) {
        puntuacion++;
      }
      preguntasRespondidas++;

      scoreBadge.textContent = `Puntuación: ${puntuacion} / ${totalPreguntas}`;
      questionEl.classList.add('is-answered');

      botones.forEach((btn, idx) => {
        btn.disabled = true;
        const mark = btn.querySelector('.cultura-option-mark');

        if (idx === datosPregunta.correcta) {
          btn.classList.add('is-correct');
          if (mark) mark.textContent = '✓ Correcto';
        } else if (idx === opcionSeleccionada && !esCorrecta) {
          btn.classList.add('is-incorrect');
          if (mark) mark.textContent = '✗ Incorrecto';
        } else {
          btn.classList.add('is-dimmed');
        }
      });

      feedbackBox.className = `cultura-feedback-box is-visible ${esCorrecta ? 'correct' : 'incorrect'}`;
      feedbackBox.innerHTML = `
        <strong>${esCorrecta ? '¡Muy bien!' : 'Respuesta incorrecta.'}</strong> ${datosPregunta.explicacion}
        <div class="cultura-feedback-cite">Fuente verificada: ${datosPregunta.fuente}</div>
      `;

      if (preguntasRespondidas === totalPreguntas) {
        mostrarResultadoFinal();
      }
    }

    function mostrarResultadoFinal() {
      finalScoreEl.textContent = `${puntuacion} / ${totalPreguntas}`;

      let mensaje = '';
      let insignia = '';

      if (puntuacion === 5) {
        insignia = '🎖️ Medalla de Oro: Maestro de la Cultura Hispánica';
        mensaje = '¡Sobresaliente! Comprendes con exactitud cómo la tauromaquia se ha transformado en lenguaje, literatura y arte en España.';
      } else if (puntuacion >= 3) {
        insignia = '🥈 Distinción de Plata: Aficionado Ilustrado';
        mensaje = '¡Muy buen trabajo! Tienes un sólido conocimiento sobre las huellas del toreo en las expresiones idiomáticas y las artes.';
      } else {
        insignia = '🥉 Iniciado en la Cultura Popular';
        mensaje = 'Has completado el cuestionario. Te invitamos a repasar «Palabras del ruedo» y la sección de música y literatura para reforzar los conceptos.';
      }

      if (honorBadgeEl) honorBadgeEl.textContent = insignia;
      finalMsgEl.textContent = mensaje;
      resultCard.classList.add('is-visible');
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    resetBtn.addEventListener('click', function () {
      renderizarQuiz();
      quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    renderizarQuiz();
  }

  // --------------------------------------------------------------------------
  // 7. BOTÓN "VOLVER ARRIBA" (BACK TO TOP)
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const backBtn = document.getElementById('cultura-back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 450) {
        backBtn.classList.add('is-visible');
      } else {
        backBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
