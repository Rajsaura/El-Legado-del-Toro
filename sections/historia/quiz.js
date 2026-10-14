/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/quiz.js
 * 
 * FASE 6: CUESTIONARIO HISTÓRICO INTERACTIVO (AUTOEVALUACIÓN BILINGÜE)
 * Módulo de evaluación de conocimientos históricos adquiridos en la cronología
 * y el mapa geográfico de la tauromaquia.
 * 
 * Características:
 * - 5 preguntas históricas rigurosas con 4 opciones contrastadas.
 * - Basadas en las fuentes primarias de la cronología y mapa.
 * - Bilingüismo sincrónico total (ES / EN) vía evento 'historiaLanguageChange'.
 * - Feedback inmediato con explicación histórica y cotejo documental.
 * - Bloqueo de cambio de respuesta tras la selección.
 * - Pantalla de resultados con puntuación, porcentaje, mensaje pedagógico
 *   y revisión detallada de respuestas.
 * - Navegación accesible (teclado Tab, Enter, Espacio, flechas, aria-live).
 * - Enlaces directos para reanudar el viaje en la cronología o en el mapa.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. 📚 BANCO DE PREGUNTAS HISTÓRICAS RIGUROSAS (5 TEMAS BILINGÜES)
  // =========================================================================
  const QUIZ_QUESTIONS = [
    {
      id: 'siete-partidas',
      timelineEventIndex: 1, // Hito 2: Las Siete Partidas (Siglo XIII)
      categoryEs: 'Derecho Medieval & Corona de Castilla',
      categoryEn: 'Medieval Law & Crown of Castile',
      questionEs: '¿Cómo reguló el código medieval de Las Siete Partidas de Alfonso X el Sabio la lidia de fieras a cambio de precio o recompensa económica?',
      questionEn: 'How did King Alfonso X the Wise’s medieval legal code, Las Siete Partidas, regulate fighting wild beasts for monetary reward?',
      options: [
        {
          id: 0,
          textEs: 'Prohibió de forma absoluta toda lidia de toros en Castilla y León bajo pena de excomunión eclesiástica.',
          textEn: 'It enacted a blanket prohibition of all bull spectacles across Castile and León under penalty of excommunication.'
        },
        {
          id: 1,
          textEs: 'Calificó de infames a quienes lidiaban fieras por precio, mientras eximía el alanceamiento a caballo practicado por nobles como prueba de valor militar.',
          textEn: 'It branded men who fought beasts for money with legal infamy, while exempting noble equestrian spearing as an honorable display of martial valor.'
        },
        {
          id: 2,
          textEs: 'Creó el primer gremio oficial de toreros asalariados y fijó las normas obligatorias de protección para peones de a pie.',
          textEn: 'It established the first official guild of salaried toreros and mandated safety regulations for foot assistants.'
        },
        {
          id: 3,
          textEs: 'Permitió la lidia remunerada únicamente a miembros consagrados de órdenes militares y caballeros cruzados.',
          textEn: 'It permitted paid bullfighting exclusively to consecrated members of military orders and crusader knights.'
        }
      ],
      correctIndex: 1,
      explanationEs: 'En la Partida VII, Título VI, Ley 4, Alfonso X el Sabio consagró la «infamia de derecho» para los hombres que arriesgaban su vida ante fieras por precio ante el pueblo, inhabilitándolos procesalmente como testigos, jueces o abogados. En contraposición, eximió expresamente a los caballeros que alanceaban toros a caballo «por probar sus fuerzas y gentileza» sin mediar dinero.',
      explanationEn: 'In Partida VII, Title VI, Law 4, Alfonso X decreed legal infamy for men risking their lives against wild beasts for pay, stripping them of courtroom rights as witnesses, judges, or advocates. Conversely, he explicitly exempted knights spearing bulls on horseback "to test their strength and noble chivalry" without monetary exchange.',
      sourceEs: 'Las Siete Partidas, Partida VII, Tít. VI, Ley 4 (PUB-LH-1974-51, BOE / BNE)',
      sourceEn: 'Las Siete Partidas, Partida VII, Tit. VI, Law 4 (PUB-LH-1974-51, BOE / BNE)'
    },
    {
      id: 'transicion-a-pie',
      timelineEventIndex: 4, // Hito 5: Real Maestranza de Ronda (1785)
      categoryEs: 'Siglo XVIII • Ilustración y Profesionalización',
      categoryEn: '18th Century • Enlightenment & Professionalization',
      questionEs: '¿Qué factores determinaron la transición del toreo caballeresco a caballo a la tauromaquia profesional a pie durante el siglo XVIII?',
      questionEn: 'What key factors drove the transition from aristocratic mounted bullfighting to professional bullfighting on foot in the 18th century?',
      options: [
        {
          id: 0,
          textEs: 'El desinterés y restricción borbónica del toreo ecuestre nobiliario, permitiendo que peones y lidiadores populares profesionalizaran la lidia a pie en plazas monumentales.',
          textEn: 'Bourbon discouragement and restrictions on aristocratic mounted jousts, enabling plebeian assistants to professionalize foot-based bullfighting in monumental arenas.'
        },
        {
          id: 1,
          textEs: 'Una ordenanza de las Cortes de Cádiz que obligó a todos los lidiadores a desmontar del caballo por razones de orden público.',
          textEn: 'An ordinance issued by the Cortes of Cádiz ordering all fighters to dismount from horses for public safety reasons.'
        },
        {
          id: 2,
          textEs: 'La sustitución generalizada del ganado bravo por reses mansas de tiro y labor en todos los festejos patronales.',
          textEn: 'The widespread substitution of fighting bulls with tame oxen and draft cattle across all municipal festivals.'
        },
        {
          id: 3,
          textEs: 'Un decreto de la Inquisición española que declaró herejía montar a caballo en festejos taurinos públicos.',
          textEn: 'A decree by the Spanish Inquisition declaring mounted riding during public bull spectacles to be an act of heresy.'
        }
      ],
      correctIndex: 0,
      explanationEs: 'Con la dinastía de los Borbones y la Real Pragmática de 1785 de Carlos III, la alta nobleza abandonó progresivamente la lidia ecuestre. Los peones populares que antes asistían a los caballeros asumieron el protagonismo en el ruedo, construyéndose plazas cerradas como la Real Maestranza de Ronda (1785) y consagrando a figuras como Pedro Romero, quien codificó la muleta y la estocada a pie.',
      explanationEn: 'With the arrival of the Bourbon dynasty and Carlos III’s 1785 Pragmatic Sanction, high aristocracy gradually withdrew from mounted spearing. Plebeian foot assistants took center stage in dedicated arenas such as Ronda’s Real Maestranza (1785), elevating masters like Pedro Romero who standardized footwork, the muleta, and swordplay.',
      sourceEs: 'Libro de Actas de la Real Maestranza de Ronda (1785) y Tratado de Pepe-Hillo (1796, BNE R/12423)',
      sourceEn: 'Ronda Real Maestranza Minutes (1785) & Pepe-Hillo’s Treatise (1796, BNE R/12423)'
    },
    {
      id: 'juan-belmonte',
      timelineEventIndex: 6, // Hito 7: Temple Estético de Belmonte (1914)
      categoryEs: 'Edad de Oro • Revolución Estética',
      categoryEn: 'Golden Age • Aesthetic Revolution',
      questionEs: '¿Cuál fue la principal revolución estética y técnica introducida por Juan Belmonte en el toreo a principios del siglo XX?',
      questionEn: 'What was the primary aesthetic and technical revolution introduced by Juan Belmonte in early 20th-century bullfighting?',
      options: [
        {
          id: 0,
          textEs: 'Recuperar el rejoneo a caballo como suerte principal antes de entrar a matar.',
          textEn: 'Reviving mounted rejoneo as the primary phase before the final sword thrust.'
        },
        {
          id: 1,
          textEs: 'Sustituir el toreo de piernas y huida por la quietud geométrica («parar, templar y mandar»), toreando en el terreno del toro con temple rítmico.',
          textEn: 'Replacing evasive footwork and retreat with geometric stillness («stop, temper, command»), citing the bull within its own ground with rhythmic deceleration.'
        },
        {
          id: 2,
          textEs: 'Sustituir el estoque de acero tradicional por varas de madera acolchadas sin muerte del animal.',
          textEn: 'Replacing the traditional steel sword with padded wooden batons to spare the animal’s life.'
        },
        {
          id: 3,
          textEs: 'Suprimir definitivamente la figura de los picadores y el tercio de varas en todas las plazas de primera categoría.',
          textEn: 'Abolishing picadores and the lance phase permanently across all first-category arenas.'
        }
      ],
      correctIndex: 1,
      explanationEs: 'Juan Belmonte demolió el axioma tradicional decimonónico («o te quitas tú o te quita el toro»). Demostró que, permaneciendo inmóvil en el albero e imponiendo el ritmo del engaño («parar, templar y mandar»), era posible torear dentro de los terrenos naturales del toro, transformando la lidia de ejercicio atlético de esquiva en una obra plástica y escultórica.',
      explanationEn: 'Juan Belmonte shattered the traditional 19th-century axiom ("either you move away or the bull removes you"). He demonstrated that by planting his feet motionless in the sand and dictating the tempo of the pass ("parar, templar y mandar"), one could fight inside the bull’s natural territory, transforming tauromaquia from an evasive athletic duel into sculptural art.',
      sourceEs: 'Manuel Chaves Nogales: «Juan Belmonte, matador de toros» (1934, Alianza Editorial)',
      sourceEn: 'Manuel Chaves Nogales: "Juan Belmonte, Matador de Toros" (1934, Alianza Editorial)'
    },
    {
      id: 'cataluna-2010',
      timelineEventIndex: 9, // Hito 10: Parlamento de Cataluña (2010 / 2012)
      categoryEs: 'Debate Contemporáneo • ILP Ciudadana',
      categoryEn: 'Contemporary Debate • Citizen ILP',
      questionEs: '¿Cuál fue el cauce legislativo y el origen de la votación parlamentaria de 2010 que aprobó la prohibición de las corridas de toros en Cataluña?',
      questionEn: 'What was the legislative channel and origin of the 2010 parliamentary vote that enacted the ban on bullfighting in Catalonia?',
      options: [
        {
          id: 0,
          textEs: 'Un decreto-ley de urgencia promulgado directamente por el Consejo de Ministros del Gobierno de España.',
          textEn: 'An emergency executive decree enacted directly by the Council of Ministers of the Government of Spain.'
        },
        {
          id: 1,
          textEs: 'Una Iniciativa Legislativa Popular (ILP) ciudadana promovida por la plataforma «Prou!», que culminó en la Ley catalana 28/2010.',
          textEn: 'A citizen-backed Popular Legislative Initiative (ILP) promoted by the «Prou!» platform, resulting in Catalan Law 28/2010.'
        },
        {
          id: 2,
          textEs: 'Una sentencia judicial del Tribunal Europeo de Derechos Humanos (TEDH) que ordenó clausurar la plaza Monumental de Barcelona.',
          textEn: 'A judicial verdict by the European Court of Human Rights (ECHR) ordering the closure of Barcelona’s Monumental bullring.'
        },
        {
          id: 3,
          textEs: 'Una directiva comunitaria vinculante del Parlamento Europeo que prohibió la tauromaquia en todos los Estados miembros de la UE.',
          textEn: 'A binding directive from the European Parliament banning bullfighting across all member states of the European Union.'
        }
      ],
      correctIndex: 1,
      explanationEs: 'La abolición catalana de 2010 fue fruto de la Iniciativa Legislativa Popular (ILP) ciudadana «Prou!», respaldada por 180.000 firmas acreditadas. El Parlament debatió y aprobó la Ley 28/2010 el 28 de julio de 2010, que suprimió la excepción taurina de la ley de protección animal con efectos a 1 de enero de 2012. La plaza Monumental de Barcelona celebró su última corrida el 25 de septiembre de 2011.',
      explanationEn: 'The 2010 Catalan ban was sparked by the citizen Popular Legislative Initiative (ILP) «Prou!», endorsed by 180,000 certified signatures. The Parliament of Catalonia debated and enacted Law 28/2010 on July 28, 2010, repealing the bullfighting exception in regional animal welfare legislation effective January 1, 2012. Barcelona’s Monumental held its final corrida on September 25, 2011.',
      sourceEs: 'Ley 28/2010, de 3 de agosto, de modificación de la ley animal catalana (BOE-A-2010-13838)',
      sourceEn: 'Catalan Law 28/2010 amending animal protection statutes (BOE-A-2010-13838)'
    },
    {
      id: 'stc-177-2016',
      timelineEventIndex: 11, // Hito 12: Sentencia STC 177/2016 (20 Oct 2016)
      categoryEs: 'Jurisprudencia Constitucional • Competencias',
      categoryEn: 'Constitutional Jurisprudence • Jurisdictions',
      questionEs: '¿Qué doctrina jurídica vinculante estableció el Tribunal Constitucional en su Sentencia STC 177/2016 respecto a la Ley estatal 18/2013 y la prohibición catalana?',
      questionEn: 'What binding legal doctrine did the Spanish Constitutional Court establish in Judgment STC 177/2016 concerning state Law 18/2013 and the Catalan ban?',
      options: [
        {
          id: 0,
          textEs: 'Declaró inconstitucional la prohibición total autonómica, dictaminando que la competencia regional en bienestar animal no puede anular una manifestación declarada patrimonio cultural por el Estado.',
          textEn: 'It declared the blanket regional ban unconstitutional, ruling that regional animal welfare powers cannot extinguish a manifestation designated as cultural heritage by the State.'
        },
        {
          id: 1,
          textEs: 'Avaló plenamente la prohibición catalana y anuló la Ley estatal 18/2013 por vulnerar las competencias exclusivas de la Generalitat.',
          textEn: 'It fully upheld the Catalan prohibition and nullified state Law 18/2013 for infringing upon exclusive regional competences.'
        },
        {
          id: 2,
          textEs: 'Declaró que la tauromaquia es un derecho fundamental humano protegido expresamente por el artículo 15 de la Constitución Española.',
          textEn: 'It declared bullfighting to be an individual fundamental human right explicitly protected under Article 15 of the Spanish Constitution.'
        },
        {
          id: 3,
          textEs: 'Obligó a todas las Comunidades Autónomas a financiar con presupuestos públicos obligatorios un mínimo de diez festejos anuales.',
          textEn: 'It mandated all Autonomous Communities to fund a minimum of ten annual bullfighting events with mandatory public budgets.'
        }
      ],
      correctIndex: 0,
      explanationEs: 'El Pleno del Tribunal Constitucional sentenció que, si bien las Comunidades Autónomas ostentan competencias sobre espectáculos públicos y protección de animales, no pueden ejercerlas hasta el extremo de prohibir de forma absoluta una tradición que el legislador estatal ha regulado y protegido como patrimonio cultural inmaterial común en virtud de los artículos 149.1.28 y 149.2 de la Constitución (Ley 18/2013).',
      explanationEn: 'The Constitutional Court Plenary held that although Autonomous Communities hold powers over public spectacles and animal welfare, they cannot exercise them to the point of completely banning a cultural tradition that state legislation (Law 18/2013) has recognized and protected as common intangible cultural heritage pursuant to Articles 149.1.28 and 149.2 of the Spanish Constitution.',
      sourceEs: 'Sentencia del Tribunal Constitucional STC 177/2016 (BOE-A-2016-11197, 20 Oct 2016)',
      sourceEn: 'Constitutional Court Judgment STC 177/2016 (BOE-A-2016-11197, Oct 20, 2016)'
    }
  ];

  // =========================================================================
  // 2. 🎯 ESTADO INTERNO DEL CUESTIONARIO
  // =========================================================================
  let currentLanguage = 'es';
  let currentView = 'intro'; // 'intro' | 'play' | 'results'
  let currentQuestionIndex = 0;
  let userAnswers = [null, null, null, null, null];
  let isAnswerLocked = false;

  // Referencias a contenedores del DOM
  let quizContainerEl = null;

  // =========================================================================
  // 3. 🎨 TEXTOS BILINGÜES DE LA INTERFAZ
  // =========================================================================
  const UI_TEXTS = {
    badge: {
      es: 'Autoevaluación Histórica • 5 Preguntas',
      en: 'Historical Self-Assessment • 5 Questions'
    },
    mainTitle: {
      es: 'Cuestionario Histórico: El Legado del Toro',
      en: 'Historical Quiz: El Legado del Toro'
    },
    introLead: {
      es: 'Ponga a prueba sus conocimientos sobre las transformaciones jurídicas, estéticas y sociales de la tauromaquia a través de cinco preguntas extraídas de las fuentes primarias de nuestra cronología y mapa.',
      en: 'Test your understanding of the legal, aesthetic, and social transformations of tauromaquia through five questions derived from our primary sources and historical map.'
    },
    introTopicsHeading: {
      es: 'Ejes temáticos evaluados:',
      en: 'Assessed thematic areas:'
    },
    topics: [
      {
        icon: '⚖️',
        es: 'La infamia legal del toreo remunerado en Las Siete Partidas de Alfonso X.',
        en: 'Legal infamy of commercial fighting in Alfonso X’s Las Siete Partidas.'
      },
      {
        icon: '🏛️',
        es: 'La transición borbónica del rejoneo aristocrático al toreo a pie en Ronda.',
        en: 'The Bourbon shift from aristocratic mounted spearing to foot lidia in Ronda.'
      },
      {
        icon: '🎭',
        es: 'La revolución estética de Juan Belmonte: quietud, temple y terrenos.',
        en: 'Juan Belmonte’s aesthetic revolution: stillness, rhythm, and ground.'
      },
      {
        icon: '📜',
        es: 'El debate parlamentario catalán de 2010 y la ILP ciudadana «Prou!».',
        en: 'The 2010 Catalan parliamentary debate and the «Prou!» citizen initiative.'
      },
      {
        icon: '🏛️',
        es: 'El conflicto competencial: Ley 18/2013 y Sentencia del Tribunal Constitucional STC 177/2016.',
        en: 'Jurisdictional conflict: State Law 18/2013 and Constitutional Judgment STC 177/2016.'
      }
    ],
    btnStart: {
      es: 'Comenzar Cuestionario ➔',
      en: 'Start Quiz ➔'
    },
    questionCounter: {
      es: (cur, total) => `Pregunta ${cur} de ${total}`,
      en: (cur, total) => `Question ${cur} of ${total}`
    },
    scoreLive: {
      es: (score, answered) => `Aciertos: ${score} / ${answered}`,
      en: (score, answered) => `Score: ${score} / ${answered}`
    },
    optionLabel: {
      es: (letter) => `Opción ${letter}`,
      en: (letter) => `Option ${letter}`
    },
    feedbackCorrect: {
      es: '✓ ¡Respuesta Correcta!',
      en: '✓ Correct Answer!'
    },
    feedbackIncorrect: {
      es: '✗ Respuesta Incorrecta',
      en: '✗ Incorrect Answer'
    },
    timelineRefPrefix: {
      es: 'Hito vinculado en la cronología:',
      en: 'Linked timeline milestone:'
    },
    sourcePrefix: {
      es: 'Fuente documental contrastada:',
      en: 'Verified primary source:'
    },
    btnNext: {
      es: 'Siguiente Pregunta ➔',
      en: 'Next Question ➔'
    },
    btnFinish: {
      es: 'Ver Resultados Finales ➔',
      en: 'View Final Results ➔'
    },
    resultsTitle: {
      es: 'Balance de la Autoevaluación',
      en: 'Self-Assessment Results'
    },
    scoreSummary: {
      es: (score, total, pct) => `Has acertado ${score} de ${total} preguntas (${pct}%)`,
      en: (score, total, pct) => `You answered ${score} out of ${total} correctly (${pct}%)`
    },
    performanceTiers: [
      {
        minScore: 5,
        badgeEs: '🏆 Dominio Historiográfico Sobresaliente',
        badgeEn: '🏆 Outstanding Historical Mastery',
        msgEs: '¡Magno rigor! Demuestras una comprensión profunda y exhaustiva del marco legal, la evolución estética y los complejos debates constitucionales de la tauromaquia.',
        msgEn: 'Exceptional rigor! You demonstrate a profound and exhaustive grasp of the legal framework, aesthetic evolution, and complex constitutional debates of tauromaquia.'
      },
      {
        minScore: 3,
        badgeEs: '🎖️ Conocimiento Histórico Sólido',
        badgeEn: '🎖️ Solid Historical Understanding',
        msgEs: '¡Muy buen trabajo! Has asimilado los principales hitos y controversias documentadas en la revista, distinguiendo con claridad las fuentes históricas.',
        msgEn: 'Great job! You have assimilated the major milestones and documented controversies in our digital magazine, clearly distinguishing historical sources.'
      },
      {
        minScore: 0,
        badgeEs: '📖 Recorrido en Aprendizaje',
        badgeEn: '📖 Developing Knowledge',
        msgEs: 'Has completado la autoevaluación. Te animamos a revisar con mayor detalle las cédulas documentales de la cronología y las sedes del mapa interactivo.',
        msgEn: 'You have completed the self-assessment. We encourage you to revisit the documentary records in the timeline and interactive map for deeper insights.'
      }
    ],
    reviewHeading: {
      es: 'Revisión Detallada de Preguntas y Respuestas:',
      en: 'Detailed Review of Questions & Answers:'
    },
    userSelection: {
      es: 'Tu respuesta:',
      en: 'Your answer:'
    },
    correctSelection: {
      es: 'Respuesta canónica correcta:',
      en: 'Correct canonical answer:'
    },
    btnRetry: {
      es: '↺ Reiniciar Cuestionario',
      en: '↺ Retake Quiz'
    },
    btnJumpTimeline: {
      es: '⏱️ Volver a la Cronología',
      en: '⏱️ Return to Timeline'
    },
    btnJumpMap: {
      es: '🗺️ Explorar Mapa de Sedes',
      en: '🗺️ Explore Historical Map'
    }
  };

  // =========================================================================
  // 4. 🚀 RENDERIZADO DE LAS TRES VISTAS DEL CUESTIONARIO
  // =========================================================================

  function renderQuiz() {
    if (!quizContainerEl) return;
    const isEn = currentLanguage === 'en';

    if (currentView === 'intro') {
      renderIntroView(isEn);
    } else if (currentView === 'play') {
      renderPlayView(isEn);
    } else if (currentView === 'results') {
      renderResultsView(isEn);
    }
  }

  // -------------------------------------------------------------------------
  // 4A. VISTA DE INTRODUCCIÓN
  // -------------------------------------------------------------------------
  function renderIntroView(isEn) {
    const texts = UI_TEXTS;

    quizContainerEl.innerHTML = `
      <div class="hist-quiz-card hist-quiz-intro-card" role="region" aria-label="${isEn ? 'Quiz introduction' : 'Introducción del cuestionario'}">
        <div class="hist-quiz-header-banner">
          <span class="hist-quiz-category-badge">${isEn ? texts.badge.en : texts.badge.es}</span>
          <h2 class="hist-quiz-main-heading" id="hist-quiz-main-heading">
            <span class="hist-quiz-heading-icon" aria-hidden="true">📜</span>
            <span>${isEn ? texts.mainTitle.en : texts.mainTitle.es}</span>
          </h2>
          <p class="hist-quiz-intro-lead">
            ${isEn ? texts.introLead.en : texts.introLead.es}
          </p>
        </div>

        <div class="hist-quiz-intro-topics-wrap">
          <h3 class="hist-quiz-topics-subheading">${isEn ? texts.introTopicsHeading.en : texts.introTopicsHeading.es}</h3>
          <ul class="hist-quiz-topics-list">
            ${texts.topics.map(t => `
              <li class="hist-quiz-topic-item">
                <span class="hist-quiz-topic-icon" aria-hidden="true">${t.icon}</span>
                <span>${isEn ? t.en : t.es}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="hist-quiz-intro-footer">
          <div class="hist-quiz-intro-meta" aria-hidden="true">
            <span class="hist-quiz-meta-pill">⏱️ ~3 min</span>
            <span class="hist-quiz-meta-pill">🎯 5 ${isEn ? 'Milestones' : 'Hitos'}</span>
            <span class="hist-quiz-meta-pill">🏛️ ${isEn ? 'Primary Sources' : 'Fuentes BOE / BNE'}</span>
          </div>

          <button type="button" class="hist-quiz-btn-primary" id="hist-quiz-btn-start" aria-label="${isEn ? 'Start historical quiz' : 'Comenzar cuestionario histórico'}">
            <span>${isEn ? texts.btnStart.en : texts.btnStart.es}</span>
          </button>
        </div>
      </div>
    `;

    const startBtn = document.getElementById('hist-quiz-btn-start');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        startQuiz();
      });
    }
  }

  // -------------------------------------------------------------------------
  // 4B. VISTA DE PREGUNTA ACTIVA
  // -------------------------------------------------------------------------
  function renderPlayView(isEn) {
    const texts = UI_TEXTS;
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const totalQuestions = QUIZ_QUESTIONS.length;
    const currentNumber = currentQuestionIndex + 1;
    const progressPercent = Math.round((currentNumber / totalQuestions) * 100);

    const answeredCount = userAnswers.filter(a => a !== null).length;
    const currentScore = userAnswers.reduce((acc, ans, idx) => {
      return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
    }, 0);

    const currentSelection = userAnswers[currentQuestionIndex];
    const isAnswered = currentSelection !== null;
    const isCorrect = isAnswered && currentSelection === q.correctIndex;

    const letters = ['A', 'B', 'C', 'D'];

    quizContainerEl.innerHTML = `
      <div class="hist-quiz-card hist-quiz-play-card" role="region" aria-labelledby="hist-quiz-q-title">
        
        <!-- Barra de progreso superior -->
        <div class="hist-quiz-topbar">
          <div class="hist-quiz-progress-info">
            <span class="hist-quiz-step-count" id="hist-quiz-step-count">
              ${texts.questionCounter[isEn ? 'en' : 'es'](currentNumber, totalQuestions)}
            </span>
            <span class="hist-quiz-score-badge" aria-live="polite">
              ${texts.scoreLive[isEn ? 'en' : 'es'](currentScore, answeredCount)}
            </span>
          </div>

          <!-- Barra de progreso visual -->
          <div class="hist-quiz-progress-bar-wrap" role="progressbar" 
               aria-valuenow="${currentNumber}" aria-valuemin="1" aria-valuemax="${totalQuestions}" 
               aria-label="${isEn ? 'Quiz progress' : 'Progreso del cuestionario'}"
               style="--quiz-progress: ${progressPercent}%;">
            <div class="hist-quiz-progress-bar-fill"></div>
          </div>

          <!-- Indicadores circulares (5 dots) -->
          <div class="hist-quiz-dots-wrap" aria-hidden="true">
            ${QUIZ_QUESTIONS.map((item, idx) => {
              let dotClass = '';
              if (idx < currentQuestionIndex) {
                dotClass = userAnswers[idx] === item.correctIndex ? 'hist-dot-correct' : 'hist-dot-incorrect';
              } else if (idx === currentQuestionIndex) {
                dotClass = 'hist-dot-active';
              }
              return `<span class="hist-quiz-step-dot ${dotClass}"></span>`;
            }).join('')}
          </div>
        </div>

        <!-- Encabezado de la pregunta -->
        <div class="hist-quiz-q-header">
          <span class="hist-quiz-q-category">
            ${isEn ? q.categoryEn : q.categoryEs}
          </span>
          <h3 class="hist-quiz-q-title" id="hist-quiz-q-title">
            ${isEn ? q.questionEn : q.questionEs}
          </h3>
        </div>

        <!-- Grupo de 4 opciones -->
        <div class="hist-quiz-options-group" role="group" aria-label="${isEn ? 'Answer choices' : 'Opciones de respuesta'}">
          ${q.options.map((opt, optIdx) => {
            const letter = letters[optIdx];
            let optionStateClass = '';
            let statusIcon = '';
            let ariaPressed = 'false';

            if (isAnswered) {
              if (optIdx === q.correctIndex) {
                optionStateClass = 'hist-option-correct';
                statusIcon = '<span class="hist-option-status-icon hist-status-correct" aria-hidden="true">✓</span>';
              } else if (optIdx === currentSelection) {
                optionStateClass = 'hist-option-incorrect';
                statusIcon = '<span class="hist-option-status-icon hist-status-incorrect" aria-hidden="true">✗</span>';
              } else {
                optionStateClass = 'hist-option-dimmed';
              }
              if (optIdx === currentSelection) {
                ariaPressed = 'true';
              }
            }

            return `
              <button type="button" 
                      class="hist-quiz-option-btn ${optionStateClass}" 
                      id="hist-quiz-opt-${optIdx}"
                      data-option-index="${optIdx}"
                      role="button"
                      ${isAnswered ? 'disabled' : ''}
                      aria-pressed="${ariaPressed}"
                      aria-label="${letter}: ${isEn ? opt.textEn : opt.textEs}">
                <span class="hist-option-letter" aria-hidden="true">${letter}</span>
                <span class="hist-option-text">${isEn ? opt.textEn : opt.textEs}</span>
                ${statusIcon}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Panel de Feedback Inmediato (Revelado tras seleccionar opción) -->
        <div class="hist-quiz-feedback-box ${isAnswered ? 'hist-feedback-visible' : ''} ${isCorrect ? 'hist-feedback-success' : 'hist-feedback-error'}" 
             id="hist-quiz-feedback-box" 
             aria-live="polite" 
             ${isAnswered ? '' : 'aria-hidden="true"'}>
          ${isAnswered ? `
            <div class="hist-feedback-header">
              <span class="hist-feedback-title">
                ${isCorrect ? (isEn ? texts.feedbackCorrect.en : texts.feedbackCorrect.es) : (isEn ? texts.feedbackIncorrect.en : texts.feedbackIncorrect.es)}
              </span>
              <span class="hist-feedback-h-link">
                ⏱️ ${isEn ? texts.timelineRefPrefix.en : texts.timelineRefPrefix.es} 
                <strong>Hito ${q.timelineEventIndex + 1}</strong>
              </span>
            </div>

            <p class="hist-feedback-explanation">
              ${isEn ? q.explanationEn : q.explanationEs}
            </p>

            <div class="hist-feedback-source">
              <span class="hist-feedback-source-tag">📜 ${isEn ? texts.sourcePrefix.en : texts.sourcePrefix.es}</span>
              <span class="hist-feedback-source-text">«${isEn ? q.sourceEn : q.sourceEs}»</span>
            </div>
          ` : ''}
        </div>

        <!-- Barra de pie con botón siguiente -->
        <div class="hist-quiz-action-footer">
          ${isAnswered ? `
            <button type="button" 
                    class="hist-quiz-btn-primary hist-btn-next-step" 
                    id="hist-quiz-btn-next" 
                    aria-label="${currentNumber === totalQuestions ? (isEn ? texts.btnFinish.en : texts.btnFinish.es) : (isEn ? texts.btnNext.en : texts.btnNext.es)}">
              <span>${currentNumber === totalQuestions ? (isEn ? texts.btnFinish.en : texts.btnFinish.es) : (isEn ? texts.btnNext.en : texts.btnNext.es)}</span>
            </button>
          ` : `
            <p class="hist-quiz-hint-text">
              <span aria-hidden="true">💡</span>
              <span>${isEn ? 'Select an answer to reveal the documentary verification.' : 'Selecciona una respuesta para contrastar con la documentación histórica.'}</span>
            </p>
          `}
        </div>

      </div>
    `;

    // Asignar listeners
    if (!isAnswered) {
      const optionButtons = quizContainerEl.querySelectorAll('.hist-quiz-option-btn');
      optionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const optIdx = parseInt(btn.getAttribute('data-option-index'), 10);
          if (!isNaN(optIdx)) {
            selectOption(optIdx);
          }
        });
      });
    } else {
      const nextBtn = document.getElementById('hist-quiz-btn-next');
      if (nextBtn) {
        nextBtn.focus();
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          nextQuestion();
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // 4C. VISTA DE RESULTADOS Y REVISIÓN CANÓNICA
  // -------------------------------------------------------------------------
  function renderResultsView(isEn) {
    const texts = UI_TEXTS;
    const totalQuestions = QUIZ_QUESTIONS.length;
    const finalScore = userAnswers.reduce((acc, ans, idx) => {
      return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    // Determinar nivel de logro
    let tier = texts.performanceTiers[2];
    for (const t of texts.performanceTiers) {
      if (finalScore >= t.minScore) {
        tier = t;
        break;
      }
    }

    const letters = ['A', 'B', 'C', 'D'];

    quizContainerEl.innerHTML = `
      <div class="hist-quiz-card hist-quiz-results-card" role="region" aria-labelledby="hist-quiz-results-heading">
        
        <!-- Cabecera de resultados -->
        <div class="hist-results-summary-box">
          <span class="hist-results-badge">${isEn ? tier.badgeEn : tier.badgeEs}</span>
          
          <h2 class="hist-results-heading" id="hist-quiz-results-heading">
            ${isEn ? texts.resultsTitle.en : texts.resultsTitle.es}
          </h2>

          <div class="hist-results-score-circle" aria-label="${isEn ? `Final score: ${finalScore} out of ${totalQuestions}` : `Puntuación final: ${finalScore} de ${totalQuestions}`}">
            <div class="hist-score-number">${finalScore} <span class="hist-score-total">/ ${totalQuestions}</span></div>
            <div class="hist-score-pct">${percentage}%</div>
          </div>

          <p class="hist-results-lead-desc">
            ${texts.scoreSummary[isEn ? 'en' : 'es'](finalScore, totalQuestions, percentage)}
          </p>

          <p class="hist-results-eval-msg">
            ${isEn ? tier.msgEn : tier.msgEs}
          </p>
        </div>

        <!-- Revisión de las 5 preguntas -->
        <div class="hist-quiz-review-section">
          <h3 class="hist-review-subheading">
            <span aria-hidden="true">📋</span>
            <span>${isEn ? texts.reviewHeading.en : texts.reviewHeading.es}</span>
          </h3>

          <div class="hist-review-list">
            ${QUIZ_QUESTIONS.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.correctIndex;
              const userOptText = uAns !== null ? (isEn ? q.options[uAns].textEn : q.options[uAns].textEs) : '—';
              const correctOptText = isEn ? q.options[q.correctIndex].textEn : q.options[q.correctIndex].textEs;

              return `
                <article class="hist-review-item ${isCorrect ? 'hist-review-correct' : 'hist-review-wrong'}">
                  <div class="hist-review-item-header">
                    <span class="hist-review-status-pill ${isCorrect ? 'pill-correct' : 'pill-wrong'}">
                      ${isCorrect ? (isEn ? '✓ Correct' : '✓ Correcto') : (isEn ? '✗ Incorrect' : '✗ Incorrecto')}
                    </span>
                    <span class="hist-review-q-num">${isEn ? `Question ${idx + 1}` : `Pregunta ${idx + 1}`}</span>
                    <span class="hist-review-h-ref">⏱️ Hito ${q.timelineEventIndex + 1}</span>
                  </div>

                  <h4 class="hist-review-q-title">${isEn ? q.questionEn : q.questionEs}</h4>

                  <div class="hist-review-answers-box">
                    <div class="hist-review-ans-row ${isCorrect ? 'text-correct' : 'text-wrong'}">
                      <strong>${isEn ? texts.userSelection.en : texts.userSelection.es}</strong>
                      <span>${userOptText}</span>
                    </div>

                    ${!isCorrect ? `
                      <div class="hist-review-ans-row text-canonical">
                        <strong>${isEn ? texts.correctSelection.en : texts.correctSelection.es}</strong>
                        <span>(${letters[q.correctIndex]}) ${correctOptText}</span>
                      </div>
                    ` : ''}
                  </div>

                  <p class="hist-review-explanation">
                    <strong>💡 ${isEn ? 'Historical Record:' : 'Cédula Histórica:'}</strong>
                    ${isEn ? q.explanationEn : q.explanationEs}
                  </p>
                </article>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Acciones finales -->
        <div class="hist-results-actions-toolbar">
          <button type="button" class="hist-quiz-btn-primary" id="hist-quiz-btn-retry">
            <span>${isEn ? texts.btnRetry.en : texts.btnRetry.es}</span>
          </button>

          <button type="button" class="hist-quiz-btn-secondary" id="hist-quiz-btn-timeline">
            <span>${isEn ? texts.btnJumpTimeline.en : texts.btnJumpTimeline.es}</span>
          </button>

          <button type="button" class="hist-quiz-btn-secondary" id="hist-quiz-btn-map">
            <span>${isEn ? texts.btnJumpMap.en : texts.btnJumpMap.es}</span>
          </button>
        </div>

      </div>
    `;

    // Asignar listeners de acciones finales
    const retryBtn = document.getElementById('hist-quiz-btn-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetQuiz();
      });
    }

    const timelineBtn = document.getElementById('hist-quiz-btn-timeline');
    if (timelineBtn) {
      timelineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const tlSec = document.getElementById('historia-timeline') || document.getElementById('journey-container');
        if (tlSec) {
          tlSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    const mapBtn = document.getElementById('hist-quiz-btn-map');
    if (mapBtn) {
      mapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const mapSec = document.getElementById('hist-map-section');
        if (mapSec) {
          mapSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // =========================================================================
  // 5. 🕹️ MÉTODOS DE CONTROL Y FLUJO DE INTERACCIÓN
  // =========================================================================

  function startQuiz() {
    currentView = 'play';
    currentQuestionIndex = 0;
    userAnswers = [null, null, null, null, null];
    isAnswerLocked = false;
    renderQuiz();

    // Llevar foco a la primera opción
    setTimeout(() => {
      const firstOpt = document.getElementById('hist-quiz-opt-0');
      if (firstOpt) firstOpt.focus();
    }, 80);
  }

  function selectOption(optionIndex) {
    if (isAnswerLocked || userAnswers[currentQuestionIndex] !== null) return;

    userAnswers[currentQuestionIndex] = optionIndex;
    isAnswerLocked = true;

    // Re-renderizar pregunta para mostrar feedback y deshabilitar opciones
    renderQuiz();

    // Enfocar botón siguiente tras responder para accesibilidad fluida con teclado
    setTimeout(() => {
      const nextBtn = document.getElementById('hist-quiz-btn-next');
      if (nextBtn) nextBtn.focus();
    }, 60);
  }

  function nextQuestion() {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      currentQuestionIndex++;
      isAnswerLocked = false;
      renderQuiz();

      // Enfocar primera opción de la nueva pregunta
      setTimeout(() => {
        const firstOpt = document.getElementById('hist-quiz-opt-0');
        if (firstOpt) firstOpt.focus();
      }, 60);
    } else {
      // Fin del cuestionario -> Mostrar resultados
      currentView = 'results';
      renderQuiz();

      // Desplazar suavemente a la cabecera de resultados si es necesario
      if (quizContainerEl) {
        quizContainerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  function resetQuiz() {
    currentView = 'intro';
    currentQuestionIndex = 0;
    userAnswers = [null, null, null, null, null];
    isAnswerLocked = false;
    renderQuiz();

    // Enfocar botón de inicio
    setTimeout(() => {
      const startBtn = document.getElementById('hist-quiz-btn-start');
      if (startBtn) startBtn.focus();
    }, 60);
  }

  function setLanguage(lang) {
    currentLanguage = lang === 'en' ? 'en' : 'es';
    renderQuiz();
  }

  // =========================================================================
  // 6. 🔌 INICIALIZACIÓN Y VINCULACIÓN CON LA PÁGINA
  // =========================================================================
  function initQuiz() {
    quizContainerEl = document.getElementById('hist-quiz-container');

    if (!quizContainerEl) {
      // Si el contenedor específico no existe todavía, buscar la sección general
      const quizSection = document.getElementById('hist-quiz-section');
      if (quizSection) {
        // Envolver o inyectar contenedor
        let container = quizSection.querySelector('.site-container');
        if (!container) {
          container = document.createElement('div');
          container.className = 'site-container';
          quizSection.appendChild(container);
        }
        let appDiv = document.getElementById('hist-quiz-container');
        if (!appDiv) {
          appDiv = document.createElement('div');
          appDiv.id = 'hist-quiz-container';
          appDiv.className = 'hist-quiz-container';
          container.appendChild(appDiv);
        }
        quizContainerEl = appDiv;
      }
    }

    if (!quizContainerEl) return;

    // Obtener idioma activo de la cronología si está disponible
    if (window.historiaJourney && typeof window.historiaJourney.getLanguage === 'function') {
      currentLanguage = window.historiaJourney.getLanguage();
    } else if (window.historiaMap && typeof window.historiaMap.getLanguage === 'function') {
      currentLanguage = window.historiaMap.getLanguage();
    }

    // Escuchar sincronización bilingüe de la cabecera / cronología
    window.addEventListener('historiaLanguageChange', (e) => {
      if (e.detail && e.detail.lang) {
        setLanguage(e.detail.lang);
      }
    });

    // Renderizar vista inicial
    renderQuiz();

    // Exponer API pública en window.historiaQuiz
    window.historiaQuiz = {
      startQuiz: startQuiz,
      selectOption: selectOption,
      nextQuestion: nextQuestion,
      resetQuiz: resetQuiz,
      setLanguage: setLanguage,
      getLanguage: () => currentLanguage,
      getQuestions: () => QUIZ_QUESTIONS,
      getState: () => ({
        view: currentView,
        questionIndex: currentQuestionIndex,
        userAnswers: [...userAnswers],
        isLocked: isAnswerLocked,
        score: userAnswers.reduce((acc, ans, idx) => ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc, 0)
      })
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
  } else {
    initQuiz();
  }
})();
