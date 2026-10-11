/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/intro.js
 * 
 * Lógica interactiva para la introducción animada:
 * 1. Control del ciclo de galope con 8 cuadros reales (bull-1.png a bull-8.png).
 * 2. Velocidad de frames configurable fácilmente mediante FRAME_DURATION_MS (80 a 100 ms).
 * 3. Movimiento de izquierda a derecha con aceleración suave y micro-cabeceo (bob) con la zancada.
 * 4. Precarga de todos los cuadros para garantizar reproducción instantánea sin parpadeos.
 * 5. Emisión de partículas de polvo albero en las pezuñas cada 2do y 3er frame.
 * 6. Sincronización del recorrido del toro con el revelado progresivo letra a letra.
 * 7. Gestión accesible del foco (inert, ARIA modal, atajos de teclado y focus trap).
 * 8. Detección y salto automático ante 'prefers-reduced-motion: reduce'.
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * ==========================================================================
   * ⚡ CONFIGURACIÓN DE VELOCIDAD Y TIEMPOS (CAMBIAR FRAME RATE AQUÍ)
   * ==========================================================================
   * FRAME_DURATION_MS:
   *   Duración de cada frame individual del toro en milisegundos.
   *   - 80 ms  : Galope rápido y ágil (~12.5 fps)
   *   - 90 ms  : Galope equilibrado y natural (~11 fps) [PREDETERMINADO]
   *   - 100 ms : Galope pausado y cinematográfico (~10 fps)
   */
  const FRAME_DURATION_MS = 90; // <-- EDITAR AQUÍ PARA AJUSTAR LA VELOCIDAD DE LOS FRAMES (80 - 100 ms)

  const TOTAL_FRAMES = 8;
  const GALLOP_CYCLE_MS = FRAME_DURATION_MS * TOTAL_FRAMES; // Duración de un ciclo completo (ej. 720ms)

  // Número de zancadas completas para cruzar horizontalmente la pantalla (8 ciclos)
  const STRIDES_ACROSS_SCREEN = 8;
  const INTRO_DURATION_MS = GALLOP_CYCLE_MS * STRIDES_ACROSS_SCREEN; // ~5.76s (sincronizado con la zancada)

  /**
   * Desplazamiento vertical sutil (bob en px) para cada frame, simulando la elevación
   * corporal durante la suspensión aérea y el asentamiento en el impacto.
   */
  const BOB_OFFSETS = [0, -2, -5, -8, 3, 4, 1, -1];

  /**
   * Rutas relativas a los 8 frames del toro para precarga en memoria.
   */
  const FRAME_SOURCES = [
    'images/bull/bull-1.png',
    'images/bull/bull-2.png',
    'images/bull/bull-3.png',
    'images/bull/bull-4.png',
    'images/bull/bull-5.png',
    'images/bull/bull-6.png',
    'images/bull/bull-7.png',
    'images/bull/bull-8.png'
  ];

  // Referencias a los elementos del DOM de la introducción
  let introScreen = null;
  let introRunner = null;
  let bullSpriteContainer = null;
  let introDustContainer = null;
  let btnSkip = null;
  let btnEnter = null;
  let btnReplay = null;
  let charElements = [];
  let frameElements = [];

  // Variables de control de bucles y temporizadores
  let animationFrameId = null;
  let introTimeoutId = null;
  let gallopStartTime = 0;
  let currentFrameIndex = -1;
  let isIntroActive = false;
  let isIntroFinished = false;

  // Elementos de la página principal a aislar del teclado mientras la intro está activa
  const backgroundElementsToInert = [
    '#site-nav-container',
    '#main-content',
    '#site-footer'
  ];

  /**
   * Pre-carga de imágenes en memoria del navegador para garantizar cero parpadeos (flicker-free).
   */
  function preloadFrameImages() {
    FRAME_SOURCES.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  /**
   * Divide el texto de cada contenedor en caracteres individuales (span)
   * para permitir el efecto de revelado progresivo letra a letra.
   */
  function prepareTextLetters() {
    const containers = document.querySelectorAll('.intro-letters-container');
    charElements = [];

    containers.forEach(container => {
      const text = container.getAttribute('data-text') || '';
      container.innerHTML = '';

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'intro-char';

        if (char === ' ') {
          span.classList.add('char-space');
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }

        container.appendChild(span);
        charElements.push(span);
      }
    });
  }

  /**
   * Localiza y cachea los 8 elementos <img> de los cuadros del toro en el DOM.
   */
  function cacheFrameElements() {
    frameElements = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const el = document.getElementById(`bull-frame-${i}`);
      if (el) {
        frameElements.push(el);
      }
    }
  }

  /**
   * Activa un cuadro específico (0 a 7), desactiva los restantes y aplica el micro-bob.
   * @param {number} newIndex - Índice del nuevo frame a proyectar
   */
  function setBullFrame(newIndex) {
    if (newIndex === currentFrameIndex) return;

    // Retirar clase activa del cuadro previo
    if (currentFrameIndex >= 0 && frameElements[currentFrameIndex]) {
      frameElements[currentFrameIndex].classList.remove('is-active');
    }

    // Activar el nuevo cuadro
    if (frameElements[newIndex]) {
      frameElements[newIndex].classList.add('is-active');
    }

    // Aplicar cabeceo vertical (bob) en tiempo con la zancada
    if (bullSpriteContainer) {
      const bobY = BOB_OFFSETS[newIndex] || 0;
      bullSpriteContainer.style.transform = `translateY(${bobY}px)`;
    }

    currentFrameIndex = newIndex;

    // Verificar si esta pose emite polvo en el suelo
    handleHoofGroundImpact(newIndex);
  }

  /**
   * Genera ráfagas de polvo de albero en las patas cada 2do o 3er cuadro
   * en los momentos de impacto contra el suelo:
   * - Cuadro 2 (bull-3): Impacto y extensión de manos delanteras
   * - Cuadro 4 (bull-5): Aterrizaje de pata trasera tras la fase aérea
   * - Cuadro 6 (bull-7): Empuje explosivo de cuartos traseros
   * @param {number} frameIndex - Índice del cuadro activo (0 a 7)
   */
  function handleHoofGroundImpact(frameIndex) {
    if (!introRunner || !introDustContainer || isIntroFinished) return;

    // Emitir cada segundo o tercer cuadro al contactar el suelo
    if (frameIndex !== 2 && frameIndex !== 4 && frameIndex !== 6) return;

    const runnerRect = introRunner.getBoundingClientRect();

    // Solo emitir si el toro se encuentra dentro de la pantalla
    if (runnerRect.right < 0 || runnerRect.left > window.innerWidth) return;

    // Posición X proporcional según el pie que impacta
    let hoofXRatio = 0.5;
    if (frameIndex === 2) {
      hoofXRatio = 0.68; // Pezuñas delanteras
    } else if (frameIndex === 4) {
      hoofXRatio = 0.32; // Pezuña trasera de aterrizaje
    } else if (frameIndex === 6) {
      hoofXRatio = 0.24; // Pezuña trasera de empuje
    }

    const hoofX = runnerRect.left + runnerRect.width * hoofXRatio;
    const hoofY = runnerRect.bottom - 10;
    spawnDustBurst(hoofX, hoofY, 2);
  }

  /**
   * Crea una ráfaga de partículas de polvo albero en coordenadas exactas de contacto.
   * @param {number} x - Coordenada X del impacto
   * @param {number} y - Coordenada Y del impacto
   * @param {number} count - Número de partículas en la bocanada
   */
  function spawnDustBurst(x, y, count = 2) {
    if (!introDustContainer) return;

    for (let i = 0; i < count; i++) {
      const dust = document.createElement('span');
      dust.className = 'intro-dust-particle';

      const size = Math.floor(Math.random() * 14) + 12; // 12px a 26px
      const offsetX = (Math.random() - 0.5) * 16;
      const offsetY = (Math.random() - 0.5) * 8;

      dust.style.width = `${size}px`;
      dust.style.height = `${size}px`;
      dust.style.left = `${x + offsetX}px`;
      dust.style.top = `${y + offsetY}px`;

      introDustContainer.appendChild(dust);

      // Eliminación automática al terminar la animación CSS (850ms)
      setTimeout(() => {
        if (dust.parentNode) {
          dust.remove();
        }
      }, 860);
    }
  }

  /**
   * Bucle maestro sincronizado por requestAnimationFrame:
   * 1. Calcula el tiempo transcurrido y alterna los 8 cuadros en loop ordenado.
   * 2. Sincroniza el revelado de letras con el morro del toro.
   */
  function animationLoop(timestamp) {
    if (!isIntroActive || isIntroFinished) return;

    const elapsed = timestamp - gallopStartTime;

    // Calcular el cuadro correspondiente dentro del ciclo cíclico de galope
    const cycleProgressMs = elapsed % GALLOP_CYCLE_MS;
    const frameIndex = Math.floor(cycleProgressMs / FRAME_DURATION_MS) % TOTAL_FRAMES;
    setBullFrame(frameIndex);

    // Sincronizar el revelado de letras con el avance del toro
    if (introRunner) {
      const runnerRect = introRunner.getBoundingClientRect();
      // El frente del toro (morro y puntas de los pitones)
      const bullFrontX = runnerRect.right - (runnerRect.width * 0.12);

      for (let i = 0; i < charElements.length; i++) {
        const span = charElements[i];
        if (!span.classList.contains('is-revealed')) {
          const charRect = span.getBoundingClientRect();
          if (bullFrontX >= charRect.left) {
            span.classList.add('is-revealed');
          }
        }
      }
    }

    animationFrameId = requestAnimationFrame(animationLoop);
  }

  /**
   * Aisla el contenido de fondo para lectores de pantalla y navegación con tabulador.
   */
  function setBackgroundInert(inertState) {
    backgroundElementsToInert.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        if (inertState) {
          el.setAttribute('inert', '');
          el.setAttribute('aria-hidden', 'true');
        } else {
          el.removeAttribute('inert');
          el.removeAttribute('aria-hidden');
        }
      }
    });
  }

  /**
   * Se ejecuta al completarse la travesía horizontal del toro:
   * Detiene el bucle de cuadros, asegura el revelado completo de letras
   * y hace visible el botón "Entrar ↓".
   */
  function onBullRunFinished() {
    if (isIntroFinished) return;
    isIntroFinished = true;

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    // Asegurar que todas las letras queden reveladas
    charElements.forEach(span => span.classList.add('is-revealed'));

    // Activar estado final en el contenedor para el fundido del botón "Entrar"
    if (introScreen) {
      introScreen.classList.remove('is-playing');
      introScreen.classList.add('is-finished');
    }

    // Enfocar automáticamente el botón "Entrar" para facilitar la navegación
    if (btnEnter) {
      btnEnter.setAttribute('tabindex', '0');
      btnEnter.focus();
    }
  }

  /**
   * Descarta la introducción deslizando la cortina hacia arriba
   * y devolviendo el foco accesible a la página principal.
   * @param {boolean} immediate - Si es true, se descarta instantáneamente.
   */
  function dismissIntro(immediate = false) {
    if (!isIntroActive) return;
    isIntroActive = false;
    isIntroFinished = true;

    // Cancelar bucles activos
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (introTimeoutId) clearTimeout(introTimeoutId);

    // Revelar todas las letras inmediatamente
    charElements.forEach(span => span.classList.add('is-revealed'));

    if (introScreen) {
      introScreen.classList.remove('is-playing');
      introScreen.classList.add('is-dismissed');
      introScreen.classList.remove('is-active');

      if (immediate) {
        introScreen.style.display = 'none';
      } else {
        // Al terminar el desplazamiento de cortina (850ms), retirar del renderizado
        setTimeout(() => {
          if (!isIntroActive && introScreen) {
            introScreen.style.display = 'none';
          }
        }, 860);
      }
    }

    // Restaurar el acceso por teclado al contenido principal
    setBackgroundInert(false);

    // Devolver el foco al título principal de la sección
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      pageTitle.setAttribute('tabindex', '-1');
      pageTitle.focus();
    }
  }

  /**
   * Inicia o reinicia la animación de la introducción desde el principio.
   */
  function playIntro() {
    if (!introScreen) return;

    isIntroActive = true;
    isIntroFinished = false;
    currentFrameIndex = -1;

    // Cancelar animaciones previas
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (introTimeoutId) clearTimeout(introTimeoutId);

    // Limpiar partículas residuales
    if (introDustContainer) {
      introDustContainer.innerHTML = '';
    }

    // Reiniciar visibilidad de caracteres
    charElements.forEach(span => span.classList.remove('is-revealed'));

    // Configurar la duración dinámica en segundos en la variable CSS del contenedor
    const durationSec = (INTRO_DURATION_MS / 1000).toFixed(2) + 's';
    introScreen.style.setProperty('--intro-duration', durationSec);

    // Restablecer estado visual de la superposición
    introScreen.style.display = 'flex';
    introScreen.classList.remove('is-dismissed', 'is-finished');
    introScreen.classList.add('is-active');

    // Forzar reflow para reiniciar keyframes CSS
    void introScreen.offsetWidth;

    // Disparar animación transversal del corredor y progreso
    introScreen.classList.add('is-playing');

    if (btnEnter) {
      btnEnter.setAttribute('tabindex', '-1');
    }

    // Bloquear el contenido de fondo
    setBackgroundInert(true);

    // Enfocar el botón "Saltar intro" accesible
    if (btnSkip) {
      btnSkip.focus();
    }

    // Colocar el primer cuadro
    setBullFrame(0);

    // Registrar tiempo inicial y arrancar bucle de animación
    gallopStartTime = performance.now();
    animationFrameId = requestAnimationFrame(animationLoop);

    // Programar la conclusión del recorrido sincronizado con la zancada
    introTimeoutId = setTimeout(onBullRunFinished, INTRO_DURATION_MS);
  }

  /**
   * Vuelve a reproducir la introducción completa desde el botón de la página principal.
   */
  function replayIntro() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playIntro();
  }

  /**
   * Manejador de eventos de teclado para atajos y accesibilidad modal.
   */
  function handleKeyDown(event) {
    if (!isIntroActive) return;

    // Tecla Escape: Salta la introducción en cualquier momento
    if (event.key === 'Escape') {
      event.preventDefault();
      dismissIntro();
      return;
    }

    // Tecla Enter o Espacio
    if (event.key === 'Enter' || event.key === ' ') {
      if (isIntroFinished || document.activeElement === btnEnter) {
        event.preventDefault();
        dismissIntro();
        return;
      }
    }

    // Trampa de foco (Focus Trap) dentro de la introducción
    if (event.key === 'Tab') {
      const focusableElements = [btnSkip];
      if (isIntroFinished && btnEnter) {
        focusableElements.push(btnEnter);
      }

      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
  }

  /**
   * Inicialización global al cargar el documento.
   */
  function init() {
    introScreen = document.getElementById('intro-screen');
    introRunner = document.getElementById('intro-bull-runner');
    bullSpriteContainer = document.getElementById('bull-sprite-container');
    introDustContainer = document.getElementById('intro-dust-container');
    btnSkip = document.getElementById('btn-skip-intro');
    btnEnter = document.getElementById('btn-enter-site');
    btnReplay = document.getElementById('btn-replay-intro');

    if (!introScreen) return;

    // Precargar todos los cuadros en memoria para evitar parpadeos
    preloadFrameImages();

    // Preparar texto dividido en caracteres individuales
    prepareTextLetters();

    // Cachear los 8 elementos <img> de los cuadros del toro
    cacheFrameElements();

    // Asignar escuchadores de eventos a los botones
    if (btnSkip) {
      btnSkip.addEventListener('click', () => dismissIntro());
    }

    if (btnEnter) {
      btnEnter.addEventListener('click', () => dismissIntro());
    }

    if (btnReplay) {
      btnReplay.addEventListener('click', replayIntro);
    }

    // Escuchar atajos globales de teclado
    document.addEventListener('keydown', handleKeyDown);

    // Comprobación de preferencia de accesibilidad para reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      dismissIntro(true);
      return;
    }

    // Iniciar la animación al cargar la página
    playIntro();
  }

  // Ejecución segura tras la carga completa del DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
