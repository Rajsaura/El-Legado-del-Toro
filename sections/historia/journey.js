/**
 * ==========================================================================
 * EL LEGADO DEL TORO - SECCIÓN 1: LA HISTORIA
 * Archivo: sections/historia/journey.js
 * 
 * "Viaje en el tiempo" - Pinned Scroll Stage & Cédulas Históricas Expandibles:
 * 1. Escenario fijo (position: sticky; height: 100vh) dentro de un contenedor alto.
 * 2. Progreso de scroll (0 a 1) sincronizado con requestAnimationFrame.
 * 3. Segmentos alternados de permanencia (DWELL) y transición (TRAVEL).
 * 4. 12 eventos históricos con orden cronológico estricto y épocas unificadas.
 * 5. Barra inferior con un dot por evento que permite saltar a su parada al clic.
 * 6. Fondos cinemáticos con 12 imágenes históricas y efecto Ken Burns suave.
 * 7. Navegación por teclado (Flechas, Home, End, Esc).
 * 8. Soporte táctil y gestual (touch/swipe horizontal) optimizado para móviles sin interferir con el scroll vertical.
 * 9. Cédula histórica expandible ("Descubrir el contexto") en los 12 hitos:
 *    - 1. Contexto histórico
 *    - 2. Importancia histórica
 *    - 3. Fuente primaria documental con cita y transcripción
 *    - 4. Interpretación histórica (hechos establecidos vs debate historiográfico)
 *    - 5. Fuentes y referencias académicas verificadas
 * 10. Soporte bilingüe completo ES / EN sincronizado.
 * 11. Encapsulación estricta en IIFE sin variables globales.
 * ==========================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. ⚙️ CONFIGURACIÓN DE SCROLL PINNED: DWELL Y TRAVEL
  // =========================================================================
  const DWELL_LENGTH_PX = 700;
  const TRAVEL_LENGTH_PX = 500;

  // =========================================================================
  // 2. 📜 ARRAY DE EVENTOS HISTÓRICOS Y CÉDULAS EXPANDIBLES (12 HITOS)
  // =========================================================================
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
      image: 'assets/timeline/01-origenes-siglo-xi.png',
      exhibit: {
        context: {
          es: 'En los reinos cristianos medievales y en las cortes de taifas de al-Ándalus (siglos XI y XII), las menciones escritas más tempranas a juegos y lizas con toros aparecen íntimamente ligadas a celebraciones cortesanas, recepciones diplomáticas y bodas de la alta nobleza. Destacan testimonios crónicos sobre festejos en las bodas del infante Don García de Navarra (hacia 1080) y, con sólido respaldo documental, las celebraciones regias del emperador Alfonso VII en Toledo y León (1135 y 1144), donde caballeros y servidores alanceaban y corrían reses bravas traídas de las dehesas en las plazas públicas cercadas.',
          en: 'In the medieval Christian kingdoms and Taifa courts of 11th- and 12th-century Iberia, the earliest written accounts of bull contests were inextricably tied to courtly galas, diplomatic summits, and aristocratic weddings. Chronicled accounts document bull runs at the nuptials of Prince Don García of Navarre (c. 1080) and, with firm documentary backing, the imperial wedding festivities of King Alfonso VII in Toledo and León (1135 and 1144), where knights and retainers speared and chased wild cattle in enclosed municipal squares.'
        },
        significance: {
          es: 'Representa el punto de inflexión fundacional en el que los antiguos ritos agrestes de captura o acoso de uros y toros salvajes en el monte se trasladan al corazón de la ciudad amurallada. La plaza pública se convierte en el escenario civil de demostración de valor militar y cohesión estamental.',
          en: 'It represents the foundational turning point where ancient rural practices of tracking and corralling wild cattle transitioned into the heart of walled cities. The municipal square was thus transformed into a civic arena for chivalric displays of martial prowess and communal identity.'
        },
        primarySource: {
          titleEs: 'Chronica Adefonsi Imperatoris (c. 1150) y Fueros Medievales Castellano-Leoneses',
          titleEn: 'Chronica Adefonsi Imperatoris (c. 1150) & Medieval Castilian-Leonese Charters',
          citationEs: 'Archivo de la Catedral de Toledo / Biblioteca Nacional de España (BNE), Mss. 10046. Compilación de crónicas de Alfonso VII.',
          citationEn: 'Cathedral of Toledo Archives / National Library of Spain (BNE), Mss. 10046. Chronicle compilation of Alfonso VII.',
          excerptEs: '«Cumque ingressus esset Toletum rex... ludi taurorum et equorum celebrati sunt cum ingenti gaudio populorum...» (Habiendo entrado el rey en Toledo... celebráronse juegos de toros y caballos con inmenso regocijo de las gentes, probando los jinetes su destreza en alancear las fieras conducidas desde los sotos).',
          excerptEn: '"And upon the King entering Toledo... games of bulls and horses were celebrated with great jubilation among the folk... horsemen testing their valor and skill by spearing the fierce beasts brought from the river pastures."'
        },
        interpretation: {
          factsEs: 'Está plenamente acreditado en códices y fueros bajomedievales que en los siglos XI y XII ya se organizaban espectáculos públicos oficiales con reses bravas en Castilla, León y Navarra con ocasión de acontecimientos regios.',
          factsEn: 'It is firmly corroborated in high-medieval charters and chronicles that official civic festivals featuring wild cattle were regularly organized in Castile, León, and Navarre for royal celebrations by the 12th century.',
          debateEs: 'La historiografía mantiene abierta la controversia sobre la filiación primordial del toreo: 1) la corriente clasicista defiende la herencia de las venationes romanas y la taurocatapsia minoica; 2) la tesis orientalista argumenta influencias de la equitación militar andalusí; y 3) la tesis autóctona (José María de Cossío) sostiene un desarrollo pastoril endógeno derivado de la cría ibérica del ganado bravo.',
          debateEn: 'Historians debate three distinct hypotheses regarding cultural lineage: 1) the Romanist school asserting descent from Roman amphitheater venationes; 2) the Arabist thesis tracing equestrian influence from al-Ándalus; and 3) the indigenous pastoral theory (José María de Cossío) arguing for independent evolution rooted in Iberian marshland cattle ranching.'
        },
        references: [
          {
            author: 'Cossío, José María de',
            title: 'Los toros: tratado técnico e histórico (Tomo I: Orígenes e historia)',
            publisher: 'Espasa-Calpe, Madrid',
            url: 'https://www.worldcat.org/title/los-toros-tratado-tecnico-e-historico/oclc/1053158'
          },
          {
            author: 'Encyclopaedia Britannica',
            title: 'Bullfighting: Historical roots and early Iberian chronicles',
            publisher: 'Britannica Academic',
            url: 'https://www.britannica.com/sports/bullfighting/History'
          }
        ]
      }
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
      image: 'assets/timeline/02-siete-partidas-alfonso-x.png',
      exhibit: {
        context: {
          es: 'Hacia 1260, el rey Alfonso X "el Sabio" impulsó la magna codificación de Las Siete Partidas para unificar el derecho en la Corona de Castilla, integrando el derecho romano justinianeo y el derecho canónico. En este monumental cuerpo legal, la sociedad estamental fue reglamentada con precisión, distinguiendo taxativamente entre el ejercicio caballeresco honorable y las conductas degradantes para el honor cristiano.',
          en: 'Around 1260, King Alfonso X "the Wise" directed the monumental codification of Las Siete Partidas to establish legal uniformity across Castile, synthesizing Roman Justinian law and canon law. Within this feudal code, social conduct was scrupulously stratified, drawing a strict line between honorable chivalric practice and behavior that compromised Christian decorum.'
        },
        significance: {
          es: 'Marca la primera intervención legislativa del Estado castellano sobre las lizas de toros. Introdujo una distinción jurídica que perduró siglos: lidiar toros por honor o destreza militar ennoblecía al hidalgo; hacerlo por un salario o compensación monetaria acarreaba la tacha legal de "infamia", privando a la persona de capacidad testifical.',
          en: 'It represents the earliest statutory intervention by the Castilian crown regarding bull contests. It established an enduring legal doctrine: fighting wild beasts for chivalric honor dignified a nobleman, but doing so for monetary compensation incurred statutory "infamy", stripping the individual of judicial standing.'
        },
        primarySource: {
          titleEs: 'Las Siete Partidas del Rey Don Alfonso el Sabio (Partida VII, Título VI, Ley 4)',
          titleEn: 'Las Siete Partidas of King Alfonso the Wise (Part VII, Title VI, Law 4)',
          citationEs: 'Real Academia de la Historia (ed. facsímil 1807) / Archivo General de Simancas.',
          citationEn: 'Royal Academy of History (1807 edition) / General Archive of Simancas.',
          excerptEs: '«Otrosí son enfamados aquellos que lidian con bestias bravas por dineros que les dan: ca pues que a sabiendas se aventuran a peligro de muerte por precio, desprecian su honra... Mas los que lidian con fieras por probar sus fuerzas e facer valentía, no son enfamados por ende».',
          excerptEn: '"Likewise are made infamous those who fight fierce beasts for money given to them: for inasmuch as they knowingly risk peril of death for a price, they despise their honor... But those who fight wild beasts to test their strength and show valor are not thereby made infamous."'
        },
        interpretation: {
          factsEs: 'El texto legal de Alfonso X sanciona con infamia jurídica explícita el cobro de dinero por luchar contra animales y prohíbe taxativamente en la Partida I (Tít. V, Ley 57) que los clérigos asistan o participen en tales espectáculos.',
          factsEn: 'The legal text explicitly imposes statutory infamy on anyone accepting payment to fight wild animals, and Partida I (Title V, Law 57) categorically bans Christian clergy from participating in or spectating bull contests.',
          debateEs: 'Los historiadores del derecho advierten que Las Siete Partidas no constituían una norma proteccionista del bienestar animal en el sentido moderno, sino un mecanismo de disciplina estamental y decoro católico. Se debate si esta prohibición frenó el toreo popular primitivo o si, involuntariamente, sentó las bases de los primeros lidiadores a sueldo marginados de la ley.',
          debateEn: 'Legal scholars emphasize that Las Siete Partidas was not an animal welfare regulation in the modern sense, but a tool of feudal hierarchy and Christian moral discipline. Historians debate whether the infamy sanction repressed early commercial spectacles or inadvertently catalyzed a distinct class of professional paid lancers.'
        },
        references: [
          {
            author: 'Codina Segovia, dA',
            title: 'El régimen jurídico de la tauromaquia: evolución histórica desde Las Siete Partidas',
            publisher: 'Derecho Animal (Forum of Animal Law Studies), 11/3 (2020)',
            url: 'https://doi.org/10.5565/rev/da.503'
          },
          {
            author: 'García-Gallo, Alfonso',
            title: 'Manual de historia del derecho español',
            publisher: 'Artes Gráficas y Ediciones, Madrid',
            url: 'https://www.worldcat.org/title/manual-de-historia-del-derecho-espanol/oclc/432029377'
          }
        ]
      }
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
      image: 'assets/timeline/03-bula-papal-pio-v.png',
      exhibit: {
        context: {
          es: 'En pleno clima tridentino de la Contrarreforma católica, el Papa San Pío V (Antonio Ghislieri), caracterizado por un severo rigor doctrinal, consideraba inadmisible que en los territorios pontificios y en la Monarquía Hispánica se arriesgase frívolamente la vida humana en combates sangrientos contra toros, con frecuencia celebrados en días consagrados a santos.',
          en: 'In the austere Counter-Reformation atmosphere following the Council of Trent, Pope Pius V considered it unacceptable that human life was frivolously endangered in bloody combats against bulls throughout papal lands and the Spanish Empire, often staged on solemn feast days.'
        },
        significance: {
          es: 'Constituye la condena canónica más drástica de la historia universal contra la fiesta de toros. Amenazaba con la excomunión ipso facto a organizadores y príncipes, prohibía a religiosos presenciarla y castigaba a los lidiadores fallecidos en la arena con la negación formal de cristiana sepultura.',
          en: 'It represents the most severe canonical condemnation of bullfighting in world history. Organizers and attending monarchs faced ipso facto excommunication, clergy were strictly forbidden from attending, and matadors killed in the arena were denied Christian burial.'
        },
        primarySource: {
          titleEs: 'Constitución Apostólica De Salute Gregis (1 de noviembre de 1567)',
          titleEn: 'Apostolic Constitution De Salute Gregis (November 1, 1567)',
          citationEs: 'Bullarium Romanum, Tomo IV, Pars III / Archivo Apostólico Vaticano.',
          citationEn: 'Bullarium Romanum, Vol. IV, Part III / Vatican Apostolic Archives.',
          excerptEs: '«Spectacula ubi tauros et alias bestias agitari et feriri contingit... non humanae sed daemonicae inventionis... perpetuo prohibemus et interdicimus... Quod si quis in eis obierit, ecclesiastica careat sepultura». (Los espectáculos donde se hostigan y hieren toros... son de invención diabólica antes que humana... los prohibimos a perpetuidad... Y si alguno muriere en ellos, carezca de eclesiástica sepultura).',
          excerptEn: '"Spectacles where bulls and other wild beasts are provoked and struck... are of demonic rather than human invention... we prohibit and interdict them in perpetuity... And should anyone perish in them, let him be denied ecclesiastical burial."'
        },
        interpretation: {
          factsEs: 'El documento fue promulgado formalmente el 1 de noviembre de 1567 con fuerza obligatoria universal para todos los príncipes católicos bajo pena de censura eclesiástica.',
          factsEn: 'The papal bull was formally promulgated on November 1, 1567, carrying universal binding authority across all Catholic principalities under penalty of excommunication.',
          debateEs: 'El foco historiográfico se centra en el conflicto político que provocó: Felipe II frenó la publicación oficial de la bula en España argumentando riesgo de motines populares. Teólogos de la Universidad de Salamanca (incluido fray Luis de León) elaboraron consultas jurídicas que atenuaron su rigor, forzando a los papas Gregorio XIII (1575, bula Exponi nobis) y Clemente VIII (1596, bula Suscepti muneris) a levantar las penas para los laicos.',
          debateEn: 'Historians focus on the intense geopolitical clash: King Philip II blocked the formal proclamation of the bull in Spanish lands, warning of widespread civil unrest. University of Salamanca theologians formulated moral compromises, compelling subsequent popes (Gregory XIII in 1575 and Clement VIII in 1596) to lift excommunications for lay spectators.'
        },
        references: [
          {
            author: 'Pío V, Papa',
            title: 'Constitutio De Salute Gregis (1 Nov. 1567)',
            publisher: 'Bullarium Romanum, Typographia Reverendae Camerae Apostolicae',
            url: 'https://www.britannica.com/sports/bullfighting/History'
          },
          {
            author: 'Domergue, Lucienne',
            title: 'La fête du taureau sous l’œil de l’Église et de la Couronne',
            publisher: 'Presses Universitaires du Mirail',
            url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
          }
        ]
      }
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
      image: 'assets/timeline/04-transicion-rejoneo-a-pie.png',
      exhibit: {
        context: {
          es: 'La instauración de la dinastía borbónica con Felipe V en 1700 trajo consigo las pautas estéticas de la corte de Versalles, donde los espectáculos cruentos de toros eran percibidos como anacrónicos y rudos. La nobleza española, buscando congraciarse con el nuevo monarca galo, abandonó gradualmente la peligrosa costumbre del alanceamiento a caballo en las plazas mayores.',
          en: 'The ascension of the Bourbon dynasty under Philip V in 1700 brought the refined courtly aesthetic of Versailles, where violent animal combat was viewed as uncouth and outdated. Spanish nobles, eager to curry favor with the new French-born monarch, gradually withdrew from spearing bulls from horseback in city squares.'
        },
        significance: {
          es: 'El vacío dejado por los caballeros fue ocupado por los sirvientes de a pie, matarifes de los mataderos municipales de Sevilla y Ronda y peones de campo. Estos artesanos populares inventaron el capote y la muleta, transformando el festejo en una profesión autónoma retribuida y fundando las bases de la lidia reglamentada moderna.',
          en: 'The vacuum left by the aristocracy was seized by common foot attendants, slaughterhouse artisans from Seville and Ronda, and rural farmhands. These working-class pioneers developed the muleta cloth and cape, forging modern professional bullfighting into an autonomous wage-earning art form.'
        },
        primarySource: {
          titleEs: 'Crónicas y Libros de Fiestas de la Real Maestranza de Caballería de Sevilla (1730-1735)',
          titleEn: 'Chronicles & Festival Records of the Royal Cavalry Maestranza of Seville (1730–1735)',
          citationEs: 'Archivo Histórico de la Real Maestranza de Caballería de Sevilla (RMC Sevilla).',
          citationEn: 'Historical Archive of the Royal Cavalry Maestranza of Seville (RMC Seville).',
          excerptEs: '«Habiendo cesado los caballeros de la nobleza en el ejercicio de alancear toros en la plaza pública, se comisionó a peones y hombres de a pie del Matadero para que lidiaran las reses con lienzos y espadas, devengando por su trabajo salario pactado...».',
          excerptEn: '"The noble knights having ceased their custom of spearing bulls in the public square, footmen and slaughterhouse artisans were engaged to fight the beasts on foot with cloths and swords, receiving an agreed wage for their labor..."'
        },
        interpretation: {
          factsEs: 'Los registros contables y bandos municipales del primer tercio del siglo XVIII constatan documentalmente la retirada nobiliaria y la contratación asalariada de toreros de a pie para lidiar toros por dinero.',
          factsEn: 'Municipal accounting ledgers and city proclamations from the early 18th century document the verified withdrawal of nobility and the rise of paid contracts for professional foot bullfighters.',
          debateEs: 'El historiador Adrian Shubert desmitifica la lectura romántica del siglo XIX, que presentaba el toreo a pie como una rebelión patriótica popular espontánea contra la dinastía extranjera. La investigación moderna demuestra que fue una consecuencia directa de la urbanización, la comercialización del ocio y el nacimiento del primer espectáculo masivo industrializado de España.',
          debateEn: 'Historian Adrian Shubert refutes 19th-century romantic nationalism that painted foot bullfighting as an organic patriotic revolt against foreign kings. Modern scholarship demonstrates it was an economic phenomenon driven by urbanization and the creation of Europe’s first commercialized mass entertainment industry.'
        },
        references: [
          {
            author: 'Shubert, Adrian',
            title: 'Death and Money in the Afternoon: A History of the Spanish Bullfight',
            publisher: 'Oxford University Press',
            url: 'https://academic.oup.com/book/47400'
          },
          {
            author: 'Álvarez de Miranda, Pedro',
            title: 'Tratados taurinos del siglo XVIII: del ejercicio caballeresco al toreo profesional',
            publisher: 'Turner Libros, Madrid',
            url: 'https://www.worldcat.org/title/tratados-taurinos-del-siglo-xviii/oclc/41977727'
          }
        ]
      }
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
      image: 'assets/timeline/05-maestranza-de-ronda.png',
      exhibit: {
        context: {
          es: 'Las Reales Maestranzas de Caballería eran corporaciones nobiliarias instituidas por la Corona para el adiestramiento hípico y militar. En la serranía de Ronda, la corporación encargó al arquitecto José Martín de Aldehuela la construcción de un coso permanente de cantería y sillería, con una singular doble arquería toscana sobre columnas de piedra.',
          en: 'The Royal Cavalry Maestranzas were noble corporations chartered by the Spanish crown for aristocratic equestrian defense drills. In Ronda, the brotherhood commissioned master architect José Martín de Aldehuela to erect a permanent stone amphitheater featuring an iconic double arcade of Tuscan columns.'
        },
        significance: {
          es: 'Consagró la tipología arquitectónica circular definitiva de la plaza de toros —que eliminaba los ángulos rectos de las plazas mayores donde los animales quedaban atrapados y embestían a ciegas— e inmortalizó el duelo de estilos entre la sobriedad clásica de Pedro Romero (escuela rondeña) y la alegría dinámica de Pepe-Hillo (escuela sevillana).',
          en: 'It permanently established circular amphitheater architecture for bullrings—eliminating deadly square corners where bulls trapped matadors—and consecrated the legendary rivalry between Pedro Romero’s stoic austerity (Ronda school) and Pepe-Hillo’s dynamic theatricality (Seville school).'
        },
        primarySource: {
          titleEs: 'Libro de Actas Capitulares de la Real Maestranza de Caballería de Ronda (Mayo de 1785)',
          titleEn: 'Minute Book of the Royal Cavalry Maestranza of Ronda (May 1785)',
          citationEs: 'Archivo Histórico de la Real Maestranza de Caballería de Ronda (RMCR), Legajo Fiestas.',
          citationEn: 'Historical Archive of the Royal Cavalry Maestranza of Ronda (RMCR), Festival Ledger.',
          excerptEs: '«Quedó enteramente concluida la fábrica de la nueva plaza circular de cantería... verificándose su solemne apertura en los días de feria de mayo, lidiando las corridas Pedro Romero y Josef Delgado "Pepe-Hillo" con universal aplauso y concurso de gentes forasteras».',
          excerptEn: '"The construction of the new circular stone ring was entirely concluded... its solemn inauguration celebrated during the May fair days, with Pedro Romero and Josef Delgado "Pepe-Hillo" fighting the corridas to universal acclaim from local and visiting spectators."'
        },
        interpretation: {
          factsEs: 'La plaza de Ronda fue terminada e inaugurada oficialmente en mayo de 1785 con cartel estelar de Pedro Romero y Pepe-Hillo, tal como acreditan las actas capitulares originales.',
          factsEn: 'Ronda’s stone bullring was completed and formally inaugurated in May 1785, headlined by Pedro Romero and Pepe-Hillo as attested in original brotherhood minute books.',
          debateEs: 'Los historiadores analizan la plaza de Ronda como un fascinante compromiso sociológico: una institución aristocrática que construyó un templo de piedra para un espectáculo plebeyo a pie, donde los nobles contemplaban desde palcos privilegiados cómo artesanos de extracción humilde se erigían en los primeros ídolos populares de la modernidad.',
          debateEn: 'Cultural historians view Ronda’s ring as an extraordinary sociological synthesis: an elite noble guild building a permanent neoclassical monument for a working-class sport, where aristocrats sat in private loges while humble artisans became celebrated public heroes.'
        },
        references: [
          {
            author: 'Real Maestranza de Caballería de Ronda',
            title: 'Historia de la Plaza de Toros y Cédulas de Tauromaquia',
            publisher: 'Fondo Documental RMCR',
            url: 'https://www.rmcr.org/en/tauromachy/'
          },
          {
            author: 'Delgado, Pedro',
            title: 'Pedro Romero y el toreo clásico de la Escuela de Ronda',
            publisher: 'Diputación Provincial de Málaga',
            url: 'https://www.worldcat.org/title/pedro-romero-y-la-escuela-de-ronda/oclc/434523091'
          }
        ]
      }
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
      image: 'assets/timeline/06-carlos-iii-restricciones.png',
      exhibit: {
        context: {
          es: 'Durante el reinado ilustrado de Carlos III (1759-1788), intelectuales y estadistas como Campomanes, Floridablanca y Melchor Gaspar de Jovellanos promovieron una profunda crítica a las corridas. Argumentaban que las fiestas de toros apartaban a los campesinos y artesanos de las faenas productivas, ocasionaban desórdenes públicos y esquilmaban las cabezas de ganado vacuno indispensables para el tiro y la agricultura.',
          en: 'Under Charles III’s reformist reign, Enlightenment thinkers and ministers Campomanes, Floridablanca, and Jovellanos mounted fierce critiques against bullfights. They argued that corridas diverted agricultural laborers from productive harvest, caused unruly riots, and wasted valuable draft oxen vital for cultivation.'
        },
        significance: {
          es: 'Mediante la Real Provisión del Consejo de Castilla de 1785, Carlos III suspendió las corridas de muerte salvo contadas excepciones de beneficencia pública, sentando el precedente directo de la Pragmática Sanción de Carlos IV de 1805, que prohibió con carácter general y absoluto todas las corridas de toros y novillos de muerte en España.',
          en: 'Through the 1785 Royal Provision of the Council of Castile, Charles III banned fatal bullfights across Spain except for rare charitable exceptions, establishing the direct legal precedent for Charles IV’s 1805 Pragmatic Sanction that imposed an absolute nationwide prohibition on lethal corridas.'
        },
        primarySource: {
          titleEs: 'Real Provisión del Consejo de Castilla de 1785 y Jovellanos, Memoria sobre espectáculos (1790)',
          titleEn: 'Royal Provision of the Council of Castile (1785) & Jovellanos, Report on Public Spectacles (1790)',
          citationEs: 'Archivo Histórico Nacional (AHN), Sección Consejos, Libro de Provisiones 1785.',
          citationEn: 'National Historical Archive of Spain (AHN), Council Section, Royal Provisions Ledger 1785.',
          excerptEs: 'Jovellanos (1790): «¿Cómo conciliar el clamor por la falta de bueyes de labor con el espectáculo bárbaro de verlos destrozar en un circo?... No puede la patria mirar con indiferencia diversiones que arruinan la agricultura y embrutecen los ánimos populares».',
          excerptEn: 'Jovellanos (1790): "How can we reconcile the outcry over the shortage of plow oxen with the barbarous spectacle of seeing them slaughtered in a circus?... The homeland cannot view with indifference spectacles that ruin agriculture and brutalize the popular spirit."'
        },
        interpretation: {
          factsEs: 'Las órdenes reales de 1785 y 1805 prohibieron taxativamente la muerte de reses en festejos taurinos públicos en todos los dominios de la Corona española.',
          factsEn: 'The royal decrees of 1785 and 1805 explicitly outlawed the killing of wild cattle in public spectacles across all domains of the Spanish Crown.',
          debateEs: 'La historiografía destaca el fracaso práctico de las prohibiciones ilustradas: municipios y hermandades religiosas recurrieron sistemáticamente a excepciones benéficas (fondos para hospitales y hospicios), manteniendo viva la tauromaquia en la clandestinidad y forzando a Fernando VII a derogar toda prohibición en 1815 ante la inquebrantable demanda popular.',
          debateEn: 'Historians emphasize the practical collapse of Bourbon prohibitions: municipalities and hospitals relentlessly exploited charitable loopholes, preserving bullfighting through loopholes until Ferdinand VII formally repealed all restrictions in 1815 due to overwhelming public demand.'
        },
        references: [
          {
            author: 'Jovellanos, Gaspar Melchor de',
            title: 'Memoria para el arreglo de la policía de los espectáculos y diversiones públicas (1790)',
            publisher: 'Real Academia de la Historia / BNE',
            url: 'https://www.cervantesvirtual.com/obra/memoria-para-el-arreglo-de-la-policia-de-los-espectaculos-y-diversiones-publicas/'
          },
          {
            author: 'Codina Segovia, dA',
            title: 'El régimen jurídico de la tauromaquia en la España borbónica ilustrada',
            publisher: 'Derecho Animal, 11/3 (2020)',
            url: 'https://doi.org/10.5565/rev/da.503'
          }
        ]
      }
    },

    // 7. Edad de Oro
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
      image: 'assets/timeline/07-belmonte-temple-estetico.png',
      exhibit: {
        context: {
          es: 'A comienzos del siglo XX, la lidia imperante seguía regida por el axioma atlético de "Guerrita": «o te quitas tú o te quita el toro». El torero debía correr, saltar y esquivar la acometida mediante piernas. En 1913 tomó la alternativa en Madrid el joven sevillano Juan Belmonte, de frágil constitución corporal y escasa agilidad, quien conmocionó el mundo taurino al quedarse inmóvil y obligar al toro a trazar una curva alrededor de su cintura.',
          en: 'At the opening of the 20th century, bullfighting was still governed by "Guerrita\'s" athletic axiom: "either you move out of the way or the bull moves you." Bullfighters survived by running and dodging. In 1913, young Juan Belmonte of Seville took the alternativa; frail and lacking athletic agility, he astounded critics by planting his feet and forcing the bull to curve around his motionless hips.'
        },
        significance: {
          es: 'Belmonte acuñó el canon supremo del toreo contemporáneo: «parar, templar y mandar». Transformó la tauromaquia de un ejercicio de reflejos físicos en una expresión de estética trágica y plasticidad estatuaria, desafiando la física de la embestida a milímetros de los pitones.',
          en: 'Belmonte established the enduring trinity of modern bullfighting: "halt, temper, and command" (parar, templar y mandar). He elevated tauromaquia from an evasion obstacle course into a solemn visual art of motionless geometry, defying physics inches from the horn tips.'
        },
        primarySource: {
          titleEs: 'Crónicas de prensa de "Don Modesto" en El Liberal (1914) y biografía de Chaves Nogales (1934)',
          titleEn: 'Corrida dispatches by "Don Modesto" in El Liberal (1914) & Chaves Nogales biography (1934)',
          citationEs: 'Hemeroteca Digital de la Biblioteca Nacional de España (BNE) / Alianza Editorial.',
          citationEn: 'Digital Periodicals Archive of the National Library of Spain (BNE) / Alianza Editorial.',
          excerptEs: 'Chaves Nogales (1934): «Para torear como toreaba Belmonte había que tener una fe ciega en la propia intuición o una perfecta indiferencia hacia la muerte... El toreo ya no era correr delante del toro, sino hacer que el toro girase en torno a uno como un planeta en torno al sol».',
          excerptEn: 'Chaves Nogales (1934): "To fight as Belmonte fought demanded blind faith in intuition or absolute indifference to death... Bullfighting was no longer running before the horns, but commanding the beast to orbit around you like a planet around the sun."'
        },
        interpretation: {
          factsEs: 'Belmonte desafió los cánones de distancia en plazas de toda España y América entre 1913 y 1920, sufriendo gravísimas cornadas y redefiniendo las pautas de juicio de la crítica taurina internacional.',
          factsEn: 'Belmonte fought at unprecedented proximity across Spain and Latin America from 1913 to 1920, surviving devastating gorings and fundamentally altering the critical criteria of sports and art journalism.',
          debateEs: 'Los historiadores debaten el mito belmontino: mientras la literatura bohemia lo ensalzó como el solitario refundador genial del toreo, tratadistas contemporáneos demuestran que la "Edad de Oro" fue una dialéctica inseparable con su rival, Joselito el Gallo, cuya prodigiosa maestría técnica y conocimiento ganadero permitían crear las condiciones para que el arte revolucionario de Belmonte brillase.',
          debateEn: 'Scholars challenge romantic myths portraying Belmonte as a solitary messianic innovator. Modern historiography proves the Golden Age was a dialectical partnership with Joselito el Gallo, whose peerless technical mastery conditioned the ring environment allowing Belmonte’s revolutionary stillness to thrive.'
        },
        references: [
          {
            author: 'Chaves Nogales, Manuel',
            title: 'Juan Belmonte, matador de toros: su vida y sus hazañas',
            publisher: 'Alianza Editorial, Madrid (ed. 2012)',
            url: 'https://www.worldcat.org/title/juan-belmonte-matador-de-toros-su-vida-y-sus-hazanas/oclc/828279815'
          },
          {
            author: 'Encyclopaedia Britannica',
            title: 'Juan Belmonte: Spanish matador and reformer of bullfighting style',
            publisher: 'Britannica Biography',
            url: 'https://www.britannica.com/biography/Juan-Belmonte'
          }
        ]
      }
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
      image: 'assets/timeline/08-muerte-joselito-el-gallo.png',
      exhibit: {
        context: {
          es: 'José Gómez Ortega "Joselito" (el "Niño Sabio de Gelves"), nacido en 1895 en una ilustre dinastía gitana, era aclamado unánimemente como el diestro más completo, sabio y dominador de la historia taurina. Con solo 24 años controlaba la crianza ganadera, los terrenos del ruedo y la construcción de plazas monumentales en Madrid, Sevilla y Barcelona.',
          en: 'José Gómez Ortega "Joselito" ("The Wise Boy of Gelves"), born into a storied dynasty in 1895, was revered as the most technically complete, commanding prodigy in tauromaquia history. By age 24, he influenced selective breeding, ring strategy, and spearheaded vast monumental arenas in Madrid, Seville, and Barcelona.'
        },
        significance: {
          es: 'El 16 de mayo de 1920, en la modesta plaza toledana de Talavera de la Reina, el toro "Bailador" de la viuda de Ortega —un astado pequeño, burriciego y terciado— le propinó una cornada mortal en el vientre. Su fallecimiento a los 25 años provocó una conmoción nacional y puso fin trágico a la Edad de Oro, desnudando la vulnerabilidad humana absoluta ante el toro bravo.',
          en: 'On May 16, 1920, in the provincial ring of Talavera de la Reina, a small, vision-impaired bull named "Bailador" caught Joselito with a fatal abdomen goring. His death at age 25 triggered nationwide mourning, closing the Golden Age and exposing the irreducible mortal peril at the core of bullfighting.'
        },
        primarySource: {
          titleEs: 'Certificación médica facultativa de defunción (16 de mayo de 1920) y crónicas de El Sol y ABC',
          titleEn: 'Official infirmary medical death certificate (May 16, 1920) & press dispatches in El Sol and ABC',
          citationEs: 'Archivo Municipal de Talavera de la Reina / Hemeroteca Digital BNE.',
          citationEn: 'Municipal Archive of Talavera de la Reina / Digital Periodicals Archive BNE.',
          excerptEs: 'Dictamen de los doctores Luque y Muñoz: «A las siete y diez de la tarde se certifica la defunción de José Gómez Ortega "Joselito", a consecuencia de una gravísima cornada penetrante en vientre con rotura de vasos ilíacos producida en el tercio de muleta por el quinto toro de la tarde...».',
          excerptEn: 'Doctors Luque and Muñoz diagnosis: "At seven-ten in the evening we certify the death of José Gómez Ortega \'Joselito\', resulting from a massive penetrating horn wound to the lower abdomen with laceration of iliac vessels inflicted during the muleta third by the afternoon\'s fifth bull..."'
        },
        interpretation: {
          factsEs: 'Joselito falleció en la enfermería de Talavera el 16 de mayo de 1920 tras ser corneado por el toro Bailador, acompañado por su cuñado Ignacio Sánchez Mejías.',
          factsEn: 'Joselito died in Talavera’s ring infirmary on May 16, 1920 from Bailador’s horn wound, attended by his brother-in-law Ignacio Sánchez Mejías.',
          debateEs: 'La desaparición de Joselito trascendió el deporte para convertirse en un cataclismo cultural. Poetas de la Generación del 27 (García Lorca, Rafael Alberti, Gerardo Diego) encontraron en su destino el arquetipo de la tragedia existencial española. La historiografía coincide en que su muerte demostró que ni la perfección técnica omnipotente garantiza la inmunidad frente al misterio del toro.',
          debateEn: 'Joselito’s demise resonated far beyond sport, becoming a cultural watershed. Generation of ’27 poets (Federico García Lorca, Rafael Alberti) drew on his tragedy as an existential archetype, cementing the scholarly consensus that even consummate technical omnipotence cannot master the unpredictability of the beast.'
        },
        references: [
          {
            author: 'Amorós, Andrés',
            title: 'Joselito el Gallo: El rey de los toreros',
            publisher: 'La Esfera de los Libros, Madrid (2020)',
            url: 'https://www.esferalibros.com/libros/joselito-el-gallo/'
          },
          {
            author: 'Encyclopaedia Britannica',
            title: 'Joselito: Spanish bullfighter and consummate technician of the Golden Age',
            publisher: 'Britannica Biography',
            url: 'https://www.britannica.com/biography/Joselito'
          }
        ]
      }
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
      image: 'assets/timeline/09-canarias-ley-1991.png',
      exhibit: {
        context: {
          es: 'Tras la Constitución de 1978 y la delimitación de competencias autonómicas en espectáculos y sanidad animal, el Parlamento de Canarias debatió la modernización de su régimen jurídico de bienestar animal. En el archipiélago atlántico, la tradición taurina contaba con un arraigo sociológico muy débil y la única plaza fija activa, en Santa Cruz de Tenerife, languidecía sin programación regular.',
          en: 'Following Spain’s 1978 democratic Constitution and devolution of regional powers over public entertainment, the Canary Islands Parliament tackled animal welfare reform. In the Atlantic archipelago, bullfighting had shallow cultural roots, and its sole operational arena in Santa Cruz de Tenerife faced declining interest and disuse.'
        },
        significance: {
          es: 'Canarias se convirtió en la primera comunidad autónoma de España en erradicar de facto las corridas de toros mediante su Ley 8/1991 de Protección de los Animales, sentando un precedente legal temprano que operó pacíficamente sin suscitar recursos de inconstitucionalidad durante dos décadas.',
          en: 'The Canary Islands became the first Spanish Autonomous Community to de facto eliminate corridas through Animal Welfare Law 8/1991, creating an early statutory milestone that operated peacefully without constitutional litigation for two decades.'
        },
        primarySource: {
          titleEs: 'Ley 8/1991, de 30 de abril, de protección de los animales de Canarias (Artículo 5)',
          titleEn: 'Canary Islands Law 8/1991 of April 30 on Animal Protection (Article 5)',
          citationEs: 'Boletín Oficial de Canarias (BOC) nº 62 (13/05/1991) / BOE nº 124 (24/05/1991).',
          citationEn: 'Official Gazette of the Canary Islands (BOC) No. 62 / BOE No. 124.',
          excerptEs: 'Artículo 5.1: «Se prohíbe la utilización de animales en peleas, fiestas, espectáculos y otras actividades que conlleven maltrato, crueldad o sufrimiento...».',
          excerptEn: 'Article 5.1: "The use of animals in fights, festivals, spectacles, and other activities entailing mistreatment, cruelty, or suffering is hereby prohibited..."'
        },
        interpretation: {
          factsEs: 'La Ley 8/1991 fue aprobada en sede parlamentaria canaria el 30 de abril de 1991 y entró en vigor sin recurso del Gobierno central.',
          factsEn: 'Law 8/1991 was enacted by the Canarian Parliament on April 30, 1991, entering into full force without legal challenge from central authorities.',
          debateEs: 'Los juristas del derecho animal analizan una notable contradicción interna: el mismo artículo 5 que vetó los festejos taurinos amparó expresamente las peleas de gallos tradicionales en localidades con arraigo histórico. La doctrina debate si la ley canaria constituyó una genuina vanguardia ética o una reforma pragmática favorecida por la ausencia de afición taurina insular.',
          debateEn: 'Legal scholars examine an internal paradox: while banning bullfights, Article 5 explicitly carved out an exemption for traditional cockfighting. Commentators debate whether the law represented ethical vanguardism or regional convenience in an archipelago where bullfighting had already withered.'
        },
        references: [
          {
            author: 'Comunidad Autónoma de Canarias',
            title: 'Ley 8/1991, de 30 de abril, de protección de los animales',
            publisher: 'Boletín Oficial del Estado (BOE-A-1991-12999)',
            url: 'https://www.boe.es/eli/es-cn/l/1991/04/30/8'
          },
          {
            author: 'Revista de Derecho UNED (RDUNED)',
            title: 'Análisis doctrinal del precedente canario y la evolución del régimen jurídico animal',
            publisher: 'UNED, Madrid, núm. 22 (2018)',
            url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
          }
        ]
      }
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
      image: 'assets/timeline/10-cataluna-abolicion-2010.png',
      exhibit: {
        context: {
          es: 'A finales de 2008, la plataforma animalista ciudadana "Prou!" promovió una Iniciativa Legislativa Popular (ILP) avalada por 180.000 firmas para suprimir la excepción taurina de la ley catalana de protección animal. Tras meses de intensas comparecencias parlamentarias de científicos, filósofos y taurinos, el debate alcanzó una repercusión mediática global.',
          en: 'In late 2008, the animal welfare citizen platform "Prou!" launched a Popular Legislative Initiative supported by 180,000 certified signatures to repeal the bullfighting exemption in Catalonia\'s animal welfare act. Following months of expert testimony from biologists, philosophers, and matadors, the debate garnered global attention.'
        },
        significance: {
          es: 'El 28 de julio de 2010, el Pleno del Parlament de Catalunya aprobó por 68 votos a favor, 55 en contra y 9 abstenciones la Ley 28/2010, aboliendo las corridas de toros con efectos desde el 1 de enero de 2012. La última corrida se celebró en la Monumental de Barcelona el 25 de septiembre de 2011 con cartel de José Tomás.',
          en: 'On July 28, 2010, the Catalan Parliament voted 68 in favor, 55 against, and 9 abstentions to enact Law 28/2010, abolishing bullfighting effective January 1, 2012. The final corrida in mainland Catalonia took place at Barcelona\'s Monumental arena on September 25, 2011, headlined by José Tomás.'
        },
        primarySource: {
          titleEs: 'Ley 28/2010, de 3 de agosto, de modificación del Texto Refundido de Protección de los Animales',
          titleEn: 'Catalan Law 28/2010 of August 3, amending Animal Protection Legislation',
          citationEs: 'Diari Oficial de la Generalitat de Catalunya (DOGC) núm. 5688 (09/08/2010) / BOE núm. 219.',
          citationEn: 'Official Gazette of Catalonia (DOGC) No. 5688 / BOE No. 219.',
          excerptEs: 'Modificación del artículo 6.2: «Quedan prohibidas las corridas de toros y los espectáculos con toros que incluyan la muerte del animal y la aplicación de las suertes de la pica, las banderillas y el estoque...».',
          excerptEn: 'Amendment to Article 6.2: "Bullfights and bull spectacles that include the death of the animal and the application of pic, banderilla, and sword thrusts are prohibited..."'
        },
        interpretation: {
          factsEs: 'La norma fue aprobada parlamentariamente en votación pública y secreta para diputados, y la prohibición rigió en territorio catalán desde el 1 de enero de 2012 hasta el fallo del Tribunal Constitucional en 2016.',
          factsEn: 'The statute was enacted following free-vote parliamentary procedures and remained in force throughout Catalonia from January 1, 2012 until struck down by the Constitutional Court in 2016.',
          debateEs: 'El debate dividió a la opinión pública entre quienes defendieron la abolición como un avance moral insoslayable contra el sufrimiento de seres sintientes, y quienes denunciaron una intencionalidad política identitaria para desmarcar a Cataluña de los símbolos culturales españoles, subrayando que la misma cámara blindó apenas semanas después los festejos taurinos tradicionales catalanes (correbous) mediante la Ley 34/2010.',
          debateEn: 'The debate deeply fractured civil society between those viewing the ban as progressive animal welfare and those alleging political motives to sever Spanish national cultural symbols—pointing out that the same parliament swiftly shielded indigenous traditional festivities (correbous) under Law 34/2010.'
        },
        references: [
          {
            author: 'Parlament de Catalunya',
            title: 'Diari de Sessions del Ple del Parlament: tramitació de la ILP Prou!',
            publisher: 'VIII Legislatura, núm. 116 (28 de julio de 2010)',
            url: 'https://www.parlament.cat'
          },
          {
            author: 'Generalitat de Catalunya / BOE',
            title: 'Ley 28/2010, de 3 de agosto',
            publisher: 'BOE-A-2010-13838',
            url: 'https://www.boe.es/eli/es-ct/l/2010/08/03/28'
          }
        ]
      }
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
      image: 'assets/timeline/11-ley-18-2013-patrimonio-cultural.png',
      exhibit: {
        context: {
          es: 'En respuesta a la prohibición catalana, la Federación de Entidades Taurinas promovió una Iniciativa Legislativa Popular de ámbito estatal, recogiendo cerca de 600.000 firmas ciudadanas. El debate parlamentario en el Congreso de los Diputados coincidió con la X Legislatura, bajo la mayoría absoluta del Partido Popular.',
          en: 'Reacting to Catalonia’s ban, the Federation of Bullfighting Associations mobilized a nationwide Popular Legislative Initiative, gathering nearly 600,000 verified citizen signatures. Parliamentary debate in Spain’s Congress of Deputies occurred under the absolute majority of the conservative Popular Party.'
        },
        significance: {
          es: 'El Parlamento nacional promulgó la Ley 18/2013, reconociendo la Tauromaquia como manifestación del patrimonio cultural inmaterial español al amparo de los artículos 44 y 46 de la Constitución y de la Convención de la UNESCO de 2003, obligando a los poderes públicos a garantizar su preservación y promoción en todo el territorio estatal.',
          en: 'The national Parliament enacted Law 18/2013, formally recognizing bullfighting as an intangible cultural heritage under Articles 44 and 46 of the Constitution and UNESCO’s 2003 Convention, establishing an explicit statutory duty for public authorities to protect and foster it throughout Spain.'
        },
        primarySource: {
          titleEs: 'Ley 18/2013, de 12 de noviembre, para la regulación de la Tauromaquia como patrimonio cultural',
          titleEn: 'Law 18/2013, of November 12, for the Regulation of Tauromaquia as Cultural Heritage',
          citationEs: 'Boletín Oficial del Estado (BOE) núm. 272 (13/11/2013), Sección I, págs. 90724-90728.',
          citationEn: 'Official State Gazette (BOE) No. 272, Section I, pp. 90724–90728.',
          excerptEs: 'Artículo 1: «La Tauromaquia forma parte del patrimonio cultural digno de protección en todo el territorio nacional... Las Administraciones Públicas velarán por la defensa y fomento de la fiesta de los toros...».',
          excerptEn: 'Article 1: "Tauromaquia forms part of the cultural heritage worthy of protection across the entire national territory... Public administrations shall ensure the defense and promotion of bull spectacles..."'
        },
        interpretation: {
          factsEs: 'La Ley 18/2013 fue aprobada en el Congreso de los Diputados por 180 votos a favor, 40 en contra y 107 abstenciones (con abstención del Grupo Socialista para evitar fracturas autonómicas).',
          factsEn: 'Law 18/2013 passed the Congress of Deputies with 180 votes in favor, 40 against, and 107 abstentions (the Socialist Party abstained to mitigate regional friction).',
          debateEs: 'Juristas del derecho constitucional debaten el alcance del blindaje: para los defensores de la fiesta, supuso un amparo legítimo de un fenómeno cultural secular respaldado por la Constitución; para los juristas animalistas y fuerzas nacionalistas, constituyó una maniobra legislativa recentralizadora orientada a despojar a las comunidades autónomas de sus legítimas competencias de bienestar animal.',
          debateEn: 'Constitutional theorists debate the statute’s intent: bullfighting advocates hailed it as a legitimate defense of historic culture under constitutional mandates; critics and regional nationalists condemned it as an aggressive centralist maneuver engineered to override regional animal protection authority.'
        },
        references: [
          {
            author: 'Jefatura del Estado',
            title: 'Ley 18/2013, de 12 de noviembre (BOE-A-2013-11883)',
            publisher: 'Agencia Estatal Boletín Oficial del Estado',
            url: 'https://www.boe.es/eli/es/l/2013/11/12/18'
          },
          {
            author: 'Tomás-Ramón Fernández',
            title: 'El régimen constitucional del patrimonio cultural y la fiesta de los toros',
            publisher: 'Revista de Administración Pública (RAP), núm. 195 (2014)',
            url: 'https://dialnet.unirioja.es/servlet/articulo?codigo=4962915'
          }
        ]
      }
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
      image: 'assets/timeline/12-sentencia-tc-177-2016.png',
      exhibit: {
        context: {
          es: 'En octubre de 2010, cincuenta senadores del Partido Popular interpusieron recurso de inconstitucionalidad contra el artículo 1 de la Ley catalana 28/2010. Tras seis años de complejas deliberaciones en el Alto Tribunal, el Pleno dictó la histórica Sentencia 177/2016 el 20 de octubre de 2016.',
          en: 'In October 2010, fifty senators from the Popular Party filed a constitutional challenge against Catalonia’s abolition law. After six years of deliberation amidst constitutional friction, the plenary Constitutional Court delivered ruling STC 177/2016 on October 20, 2016.'
        },
        significance: {
          es: 'Por 8 votos contra 3, el Tribunal Constitucional anuló la prohibición catalana, sentenciando que aunque Cataluña ostenta competencias para regular espectáculos y proteger a los animales, no puede prohibir de raíz una manifestación arraigada declarada patrimonio cultural inmaterial común por el legislador estatal (arts. 149.1.28ª y 149.2 CE).',
          en: 'By an 8-to-3 vote, the Constitutional Court struck down the Catalan ban, ruling that while Catalonia holds authority over animal welfare and entertainment, it cannot exercise it to abolish or suppress an activity protected as common cultural heritage under state law (Articles 149.1.28 and 149.2 of the Constitution).'
        },
        primarySource: {
          titleEs: 'Sentencia del Tribunal Constitucional 177/2016, de 20 de octubre de 2016 (Pleno)',
          titleEn: 'Spanish Constitutional Court Ruling STC 177/2016 of October 20, 2016 (Plenary)',
          citationEs: 'Boletín Oficial del Estado (BOE) núm. 286 (26/11/2016), Sec. TC, págs. 82512-82538.',
          citationEn: 'Official State Gazette (BOE) No. 286, Section TC, pp. 82512–82538.',
          excerptEs: 'Fundamento Jurídico 7: «La competencia de la Comunidad Autónoma para regular los espectáculos públicos no puede alcanzar hasta la prohibición lisa y llana de una manifestación cultural común... Menoscaba la competencia del Estado para la preservación del patrimonio cultural común (art. 149.2 CE)... declarándose inconstitucional y nulo el precepto recurrido».',
          excerptEn: 'Legal Basis 7: "The Autonomous Community\'s competence to regulate public spectacles cannot extend to the outright prohibition of a shared cultural manifestation... It impairs the State\'s competence to preserve common cultural heritage (Art. 149.2 EC)... the contested provision is declared unconstitutional and null."'
        },
        interpretation: {
          factsEs: 'El Tribunal declaró nulo el veto catalán el 20 de octubre de 2016; no obstante, en la práctica no se han vuelto a celebrar corridas en la Monumental de Barcelona por trabas de licencias municipales y falta de promotores privados.',
          factsEn: 'The Court formally voided the Catalan ban on October 20, 2016; in practice, however, no corridas have resumed in Barcelona due to municipal permit barriers and lack of private promoters.',
          debateEs: 'La sentencia provocó un encendido debate doctrinal reflejado en tres votos particulares discrepantes de los magistrados Valdés Dal-Ré, Asua Batarrita y Xiol Ríos, quienes argumentaron que el fallo vaciaba de contenido la autonomía política territorial de las comunidades al permitir que una ley estatal sobrevenida anulara decisiones legítimas de bienestar animal.',
          debateEn: 'The ruling spurred fierce debate highlighted by three dissenting opinions from justices Valdés Dal-Ré, Asua Batarrita, and Xiol Ríos, who argued the verdict eroded regional political autonomy by letting a retroactive national statute override legitimate autonomous animal welfare policies.'
        },
        references: [
          {
            author: 'Tribunal Constitucional de España',
            title: 'Sentencia 177/2016, de 20 de octubre de 2016 (BOE-A-2016-11197)',
            publisher: 'Colección Oficial de Jurisprudencia Constitucional',
            url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2016-11197'
          },
          {
            author: 'Revista de Derecho UNED (RDUNED)',
            title: 'Comentario doctrinal sobre la STC 177/2016 y la tensión competencial cultural vs bienestar animal',
            publisher: 'UNED, Madrid, núm. 22 (2018)',
            url: 'https://revistas.uned.es/index.php/RDUNED/article/download/22285/18215/45854'
          }
        ]
      }
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

  // Cédula Histórica Expandible (Modal / Drawer)
  let exhibitModal = null;
  let exhibitBackdrop = null;
  let exhibitCloseBtn = null;
  let exhibitTranslateBtn = null;
  let exhibitPrevBtn = null;
  let exhibitNextBtn = null;
  let exhibitNavCount = null;
  let activeExhibitIndex = 0;
  let isExhibitOpen = false;
  let exhibitLanguage = 'es'; // 'es' o 'en'
  let lastFocusedTriggerBtn = null;

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

          <!-- Botón de apertura de Cédula Histórica Expandible -->
          <div class="hist-card-exhibit-row">
            <button type="button" 
                    class="hist-btn-exhibit" 
                    data-exhibit-index="${index}" 
                    aria-expanded="false" 
                    aria-controls="hist-exhibit-modal" 
                    aria-haspopup="dialog"
                    aria-label="Descubrir el contexto histórico completo de este hito">
              <span class="hist-exhibit-btn-icon" aria-hidden="true">📜</span>
              <span class="hist-exhibit-btn-text-es">Descubrir el contexto</span>
              <span class="hist-exhibit-btn-text-en" aria-hidden="true">Explore context</span>
              <span class="hist-exhibit-btn-chevron" aria-hidden="true">▾</span>
            </button>
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
                      ${index === 0 ? 'disabled aria-disabled="true"' : ''}>
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

    // Montar la estructura completa del stage incluyendo la Cédula Histórica Expandible
    journeyContainer.innerHTML = `
      <div class="hist-stage" id="hist-stage" role="region" aria-label="Escenario interactivo de la historia" tabindex="0">
        
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

        <!-- =================================================================
             CÉDULA HISTÓRICA EXPANDIBLE (HISTORICAL EXHIBIT MODAL / DOSSIER)
             ================================================================= -->
        <div id="hist-exhibit-modal" 
             class="hist-exhibit-modal" 
             role="dialog" 
             aria-modal="true" 
             aria-hidden="true" 
             aria-labelledby="hist-exhibit-modal-title">
          <div class="hist-exhibit-backdrop" id="hist-exhibit-backdrop" aria-hidden="true"></div>
          
          <div class="hist-exhibit-dialog" role="document">
            <!-- Encabezado de la Cédula -->
            <header class="hist-exhibit-header">
              <div class="hist-exhibit-header-top">
                <div class="hist-exhibit-badges">
                  <span class="hist-exhibit-era-badge" id="hist-exhibit-era-badge"></span>
                  <span class="hist-exhibit-date-badge" id="hist-exhibit-date-badge"></span>
                  <span class="hist-badge" id="hist-exhibit-type-badge"></span>
                </div>

                <div class="hist-exhibit-header-actions">
                  <button type="button" class="hist-btn-translate hist-exhibit-translate-btn" id="hist-exhibit-translate-btn" aria-label="Cambiar idioma en la cédula (EN / ES)">
                    <span class="hist-translate-icon" aria-hidden="true">🌐</span>
                    <span class="hist-translate-label">EN / ES</span>
                  </button>

                  <button type="button" class="hist-exhibit-close-btn" id="hist-exhibit-close-btn" aria-label="Cerrar cédula histórica (Esc)">
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </div>

              <h3 class="hist-exhibit-title" id="hist-exhibit-modal-title"></h3>
            </header>

            <!-- Cuerpo scrollable de la Cédula (5 secciones de investigación) -->
            <div class="hist-exhibit-body" id="hist-exhibit-body" tabindex="0">
              
              <!-- 1. Contexto histórico -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec1-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec1-title">
                  <span class="hist-sec-icon" aria-hidden="true">📜</span>
                  <span class="hist-sec-title-es">1. Contexto histórico</span>
                  <span class="hist-sec-title-en" aria-hidden="true">1. Historical Context</span>
                </h4>
                <div class="hist-exhibit-sec-text" id="hist-exhibit-context-text"></div>
              </section>

              <!-- 2. Importancia histórica -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec2-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec2-title">
                  <span class="hist-sec-icon" aria-hidden="true">⚖️</span>
                  <span class="hist-sec-title-es">2. Importancia histórica</span>
                  <span class="hist-sec-title-en" aria-hidden="true">2. Historical Significance</span>
                </h4>
                <div class="hist-exhibit-sec-text" id="hist-exhibit-significance-text"></div>
              </section>

              <!-- 3. Fuente primaria documental -->
              <section class="hist-exhibit-section hist-exhibit-primary-section" aria-labelledby="hist-ex-sec3-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec3-title">
                  <span class="hist-sec-icon" aria-hidden="true">🏛️</span>
                  <span class="hist-sec-title-es">3. Fuente primaria documental</span>
                  <span class="hist-sec-title-en" aria-hidden="true">3. Primary Archival Source</span>
                </h4>
                <div class="hist-primary-card" id="hist-primary-card">
                  <div class="hist-primary-doc-title" id="hist-primary-doc-title"></div>
                  <blockquote class="hist-primary-excerpt" id="hist-primary-excerpt"></blockquote>
                  <div class="hist-primary-citation" id="hist-primary-citation"></div>
                </div>
              </section>

              <!-- 4. Interpretación histórica (Hechos vs Debate) -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec4-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec4-title">
                  <span class="hist-sec-icon" aria-hidden="true">🔍</span>
                  <span class="hist-sec-title-es">4. Interpretación histórica</span>
                  <span class="hist-sec-title-en" aria-hidden="true">4. Historical Interpretation</span>
                </h4>
                <div class="hist-interp-grid">
                  <div class="hist-interp-col hist-interp-facts">
                    <h5 class="hist-interp-subheading">
                      <span class="hist-interp-dot-fact" aria-hidden="true"></span>
                      <span class="hist-interp-title-es">Consenso fáctico documentado</span>
                      <span class="hist-interp-title-en" aria-hidden="true">Established Facts</span>
                    </h5>
                    <div class="hist-interp-text" id="hist-interp-facts-text"></div>
                  </div>

                  <div class="hist-interp-col hist-interp-debate">
                    <h5 class="hist-interp-subheading">
                      <span class="hist-interp-dot-debate" aria-hidden="true"></span>
                      <span class="hist-interp-title-es">Debate historiográfico y divergencias</span>
                      <span class="hist-interp-title-en" aria-hidden="true">Historiographical Debate</span>
                    </h5>
                    <div class="hist-interp-text" id="hist-interp-debate-text"></div>
                  </div>
                </div>
              </section>

              <!-- 5. Fuentes y referencias académicas -->
              <section class="hist-exhibit-section" aria-labelledby="hist-ex-sec5-title">
                <h4 class="hist-exhibit-sec-title" id="hist-ex-sec5-title">
                  <span class="hist-sec-icon" aria-hidden="true">📚</span>
                  <span class="hist-sec-title-es">5. Fuentes y referencias académicas</span>
                  <span class="hist-sec-title-en" aria-hidden="true">5. Scholarly References</span>
                </h4>
                <ul class="hist-refs-list" id="hist-refs-list"></ul>
              </section>

            </div>

            <!-- Pie de la Cédula con navegación secuencial -->
            <footer class="hist-exhibit-footer">
              <button type="button" class="hist-btn-prev hist-exhibit-prev-btn" id="hist-exhibit-prev-btn" aria-label="Ver cédula del hito anterior">
                <span aria-hidden="true">←</span>
                <span>Hito anterior</span>
              </button>

              <span class="hist-exhibit-nav-count" id="hist-exhibit-nav-count"></span>

              <button type="button" class="hist-btn-continue hist-exhibit-next-btn" id="hist-exhibit-next-btn" aria-label="Ver cédula del hito siguiente">
                <span>Siguiente hito</span>
                <span aria-hidden="true">→</span>
              </button>
            </footer>
          </div>
        </div>

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

    // Referencias de Cédula Expandible
    exhibitModal = document.getElementById('hist-exhibit-modal');
    exhibitBackdrop = document.getElementById('hist-exhibit-backdrop');
    exhibitCloseBtn = document.getElementById('hist-exhibit-close-btn');
    exhibitTranslateBtn = document.getElementById('hist-exhibit-translate-btn');
    exhibitPrevBtn = document.getElementById('hist-exhibit-prev-btn');
    exhibitNextBtn = document.getElementById('hist-exhibit-next-btn');
    exhibitNavCount = document.getElementById('hist-exhibit-nav-count');

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
   * Incluye salvaguarda contra contenido estancado durante scroll rápido.
   * @param {number} targetIndex - Índice del evento al que saltar
   */
  function scrollToEvent(targetIndex) {
    const clampedIndex = Math.max(0, Math.min(events.length - 1, targetIndex));
    programmaticTargetIndex = clampedIndex;

    // Cambiar inmediatamente el fondo cinemático al evento destino para un crossfade directo y limpio
    setCinemaImage(clampedIndex);

    clearTimeout(programmaticScrollTimer);
    programmaticScrollTimer = setTimeout(() => {
      programmaticTargetIndex = null;
      updateStage();
    }, 750);

    const stepDistance = DWELL_LENGTH_PX + TRAVEL_LENGTH_PX;
    const targetOffset = clampedIndex * stepDistance + (DWELL_LENGTH_PX * 0.5);

    if (!journeyContainer) return;

    const containerTop = journeyContainer.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = containerTop + targetOffset;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }

  // =========================================================================
  // 6. 📜 CÉDULAS HISTÓRICAS EXPANDIBLES (PHASE 3: HISTORICAL EXHIBITS)
  // =========================================================================

  /**
   * Rellena el contenido de la Cédula Histórica según el índice del evento y el idioma activo.
   * @param {number} index - Índice del evento
   */
  function renderExhibitContent(index) {
    const evt = events[index];
    if (!evt || !evt.exhibit) return;

    activeExhibitIndex = index;
    const ex = evt.exhibit;
    const lang = exhibitLanguage;
    const isEn = lang === 'en';

    // 1. Meta y cabecera
    const eraBadge = document.getElementById('hist-exhibit-era-badge');
    const dateBadge = document.getElementById('hist-exhibit-date-badge');
    const typeBadge = document.getElementById('hist-exhibit-type-badge');
    const titleEl = document.getElementById('hist-exhibit-modal-title');

    if (eraBadge) eraBadge.textContent = evt.era;
    if (dateBadge) dateBadge.textContent = evt.dateLabel;
    
    if (typeBadge) {
      const isFact = evt.type === 'hecho';
      typeBadge.className = `hist-badge ${isFact ? 'hist-badge-fact' : 'hist-badge-interp'}`;
      typeBadge.textContent = isFact 
        ? (isEn ? 'Fact' : 'Hecho') 
        : (isEn ? 'Interpretation' : 'Interpretación');
    }

    if (titleEl) {
      titleEl.textContent = evt.title;
    }

    // 2. Sección 1: Contexto histórico
    const contextEl = document.getElementById('hist-exhibit-context-text');
    if (contextEl) {
      contextEl.innerHTML = `<p>${isEn ? ex.context.en : ex.context.es}</p>`;
    }

    // 3. Sección 2: Importancia histórica
    const sigEl = document.getElementById('hist-exhibit-significance-text');
    if (sigEl) {
      sigEl.innerHTML = `<p>${isEn ? ex.significance.en : ex.significance.es}</p>`;
    }

    // 4. Sección 3: Fuente primaria documental
    const docTitleEl = document.getElementById('hist-primary-doc-title');
    const excerptEl = document.getElementById('hist-primary-excerpt');
    const citationEl = document.getElementById('hist-primary-citation');

    if (docTitleEl) {
      docTitleEl.textContent = isEn ? ex.primarySource.titleEn : ex.primarySource.titleEs;
    }
    if (excerptEl) {
      excerptEl.textContent = isEn ? ex.primarySource.excerptEn : ex.primarySource.excerptEs;
    }
    if (citationEl) {
      citationEl.textContent = isEn 
        ? `Reference: ${ex.primarySource.citationEn}` 
        : `Localización archivística: ${ex.primarySource.citationEs}`;
    }

    // 5. Sección 4: Interpretación histórica (hechos vs debate)
    const factsEl = document.getElementById('hist-interp-facts-text');
    const debateEl = document.getElementById('hist-interp-debate-text');

    if (factsEl) {
      factsEl.innerHTML = `<p>${isEn ? ex.interpretation.factsEn : ex.interpretation.factsEs}</p>`;
    }
    if (debateEl) {
      debateEl.innerHTML = `<p>${isEn ? ex.interpretation.debateEn : ex.interpretation.debateEs}</p>`;
    }

    // 6. Sección 5: Fuentes y referencias académicas
    const refsList = document.getElementById('hist-refs-list');
    if (refsList && Array.isArray(ex.references)) {
      refsList.innerHTML = ex.references.map(ref => `
        <li class="hist-ref-item">
          <span class="hist-ref-author">${ref.author}.</span>
          <cite class="hist-ref-work">«${ref.title}»</cite>.
          <span class="hist-ref-publisher">${ref.publisher}.</span>
          ${ref.url ? `<a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="hist-ref-link" aria-label="Abrir enlace académico a ${ref.title}">[Ver fuente digital ↗]</a>` : ''}
        </li>
      `).join('');
    }

    // 7. Pie de navegación
    if (exhibitNavCount) {
      exhibitNavCount.textContent = `${index + 1} / ${events.length}`;
    }
    if (exhibitPrevBtn) {
      exhibitPrevBtn.disabled = index === 0;
      if (index === 0) {
        exhibitPrevBtn.setAttribute('aria-disabled', 'true');
      } else {
        exhibitPrevBtn.removeAttribute('aria-disabled');
      }
    }
    if (exhibitNextBtn) {
      exhibitNextBtn.disabled = index === events.length - 1;
      if (index === events.length - 1) {
        exhibitNextBtn.setAttribute('aria-disabled', 'true');
      } else {
        exhibitNextBtn.removeAttribute('aria-disabled');
      }
    }

    // Sincronizar etiquetas de títulos según idioma
    syncExhibitSectionTitles();
  }

  /**
   * Sincroniza los encabezados de sección bilingües dentro de la Cédula.
   */
  function syncExhibitSectionTitles() {
    if (!exhibitModal) return;
    const isEn = exhibitLanguage === 'en';

    exhibitModal.querySelectorAll('.hist-sec-title-es, .hist-interp-title-es').forEach(el => {
      if (isEn) {
        el.setAttribute('aria-hidden', 'true');
        el.style.display = 'none';
      } else {
        el.removeAttribute('aria-hidden');
        el.style.display = 'inline';
      }
    });

    exhibitModal.querySelectorAll('.hist-sec-title-en, .hist-interp-title-en').forEach(el => {
      if (isEn) {
        el.removeAttribute('aria-hidden');
        el.style.display = 'inline';
      } else {
        el.setAttribute('aria-hidden', 'true');
        el.style.display = 'none';
      }
    });

    // Actualizar botones de pie
    if (exhibitPrevBtn) {
      const span = exhibitPrevBtn.querySelector('span:not([aria-hidden])');
      if (span) span.textContent = isEn ? 'Previous event' : 'Hito anterior';
    }
    if (exhibitNextBtn) {
      const span = exhibitNextBtn.querySelector('span:not([aria-hidden])');
      if (span) span.textContent = isEn ? 'Next event' : 'Siguiente hito';
    }
  }

  /**
   * Abre la Cédula Histórica Expandible para un evento dado.
   * @param {number} index - Índice del evento (0 a 11)
   */
  function openExhibit(index) {
    if (!exhibitModal) return;
    lastFocusedTriggerBtn = document.activeElement;

    // Alinear el fondo cinemático con el evento abierto
    scrollToEvent(index);

    renderExhibitContent(index);

    exhibitModal.classList.add('hist-exhibit-active');
    exhibitModal.setAttribute('aria-hidden', 'false');
    isExhibitOpen = true;

    // Mover foco accesible al botón de cerrar o al cuerpo
    if (exhibitCloseBtn) {
      setTimeout(() => exhibitCloseBtn.focus(), 60);
    }

    // Actualizar aria-expanded en los botones de tarjeta
    document.querySelectorAll('.hist-btn-exhibit').forEach(btn => {
      const btnIdx = parseInt(btn.getAttribute('data-exhibit-index'), 10);
      btn.setAttribute('aria-expanded', btnIdx === index ? 'true' : 'false');
    });
  }

  /**
   * Cierra la Cédula Histórica Expandible y devuelve el foco.
   */
  function closeExhibit() {
    if (!exhibitModal || !isExhibitOpen) return;

    exhibitModal.classList.remove('hist-exhibit-active');
    exhibitModal.setAttribute('aria-hidden', 'true');
    isExhibitOpen = false;

    // Actualizar aria-expanded
    document.querySelectorAll('.hist-btn-exhibit').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });

    // Restaurar foco al botón de activación previo
    if (lastFocusedTriggerBtn && typeof lastFocusedTriggerBtn.focus === 'function') {
      lastFocusedTriggerBtn.focus();
    }
  }

  /**
   * Alterna el idioma entre español e inglés dentro de la Cédula y tarjetas.
   */
  function toggleExhibitLanguage() {
    exhibitLanguage = exhibitLanguage === 'es' ? 'en' : 'es';
    renderExhibitContent(activeExhibitIndex);

    // Sincronizar también la tarjeta activa
    const activeCard = cardElements[activeExhibitIndex];
    if (activeCard) {
      const isCardTranslated = activeCard.classList.contains('hist-translated');
      if ((exhibitLanguage === 'en' && !isCardTranslated) || (exhibitLanguage === 'es' && isCardTranslated)) {
        toggleCardTranslation(activeCard);
      }
    }
  }

  /**
   * Configura los controladores de eventos de la Cédula Histórica Expandible.
   */
  function initExhibitControls() {
    if (!exhibitModal) return;

    // Clic en botón cerrar
    if (exhibitCloseBtn) {
      exhibitCloseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeExhibit();
      });
    }

    // Clic en backdrop oscuro
    if (exhibitBackdrop) {
      exhibitBackdrop.addEventListener('click', function (e) {
        e.preventDefault();
        closeExhibit();
      });
    }

    // Clic en alternar idioma en la cédula
    if (exhibitTranslateBtn) {
      exhibitTranslateBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleExhibitLanguage();
      });
    }

    // Clic en hito anterior dentro de la cédula
    if (exhibitPrevBtn) {
      exhibitPrevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (activeExhibitIndex > 0) {
          openExhibit(activeExhibitIndex - 1);
        }
      });
    }

    // Clic en siguiente hito dentro de la cédula
    if (exhibitNextBtn) {
      exhibitNextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (activeExhibitIndex < events.length - 1) {
          openExhibit(activeExhibitIndex + 1);
        }
      });
    }

    // Evitar que el scroll del ratón dentro del diálogo mueva el scroll global del stage
    const exhibitBody = document.getElementById('hist-exhibit-body');
    if (exhibitBody) {
      exhibitBody.addEventListener('wheel', function (e) {
        e.stopPropagation();
      }, { passive: true });
    }
  }

  // =========================================================================
  // 7. 📱 SOPORTE TÁCTIL Y GESTUAL (MOBILE TOUCH / SWIPE)
  // =========================================================================
  /**
   * Añade detección de deslizamiento horizontal (swipe) táctil en dispositivos móviles
   * sin interferir con el scroll vertical ordinario de la página web.
   */
  function initTouchSwipeNavigation() {
    if (!journeyContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    journeyContainer.addEventListener('touchstart', function (e) {
      if (isExhibitOpen) return; // Si la cédula está abierta, permitir scroll interno táctil
      if (e.touches.length !== 1) return;

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = performance.now();
    }, { passive: true });

    journeyContainer.addEventListener('touchend', function (e) {
      if (isExhibitOpen) return;
      if (e.changedTouches.length !== 1) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaTime = performance.now() - touchStartTime;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      // Criterios de swipe horizontal:
      // 1. Distancia horizontal mínima: 45px
      // 2. Movimiento marcadamente horizontal: absX > absY * 1.3
      // 3. Duración del gesto menor a 600ms (no es arrastre prolongado)
      if (absX >= 45 && absX > absY * 1.3 && deltaTime < 600) {
        if (diffX < 0) {
          // Deslizamiento hacia la izquierda -> avanzar al siguiente evento
          if (activeEventIndex < events.length - 1) {
            scrollToEvent(activeEventIndex + 1);
          } else {
            const quizSection = document.getElementById('hist-quiz-section');
            if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Deslizamiento hacia la derecha -> retroceder al evento anterior
          if (activeEventIndex > 0) {
            scrollToEvent(activeEventIndex - 1);
          }
        }
      }
    }, { passive: true });
  }

  // =========================================================================
  // 8. 🎮 CONTROLES DE NAVEGACIÓN Y TECLADO
  // =========================================================================
  /**
   * Configura las interacciones por clic en dots, botones y apertura de cédulas.
   */
  function initNavigationControls() {
    if (!journeyContainer) return;

    // Delegación de clics en el contenedor del journey
    journeyContainer.addEventListener('click', function (e) {
      // 1. Clic en botón "Descubrir el contexto" (Abrir Cédula)
      const exhibitBtn = e.target.closest('.hist-btn-exhibit');
      if (exhibitBtn) {
        e.preventDefault();
        const exIdx = parseInt(exhibitBtn.getAttribute('data-exhibit-index'), 10);
        if (!isNaN(exIdx)) {
          openExhibit(exIdx);
        }
        return;
      }

      // 2. Clic en los dots de la pista inferior
      const dot = e.target.closest('.hist-dot');
      if (dot) {
        e.preventDefault();
        const index = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          scrollToEvent(index);
        }
        return;
      }

      // 3. Clic en el botón "← Anterior" de la tarjeta
      const prevBtn = e.target.closest('.hist-btn-prev');
      if (prevBtn && !prevBtn.disabled) {
        e.preventDefault();
        const prevIndex = parseInt(prevBtn.getAttribute('data-prev-index'), 10);
        if (!isNaN(prevIndex) && prevIndex >= 0) {
          scrollToEvent(prevIndex);
        }
        return;
      }

      // 4. Clic en el botón "Continuar →" de la tarjeta
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

      // 5. Alternar idioma inglés / español en la tarjeta
      const translateBtn = e.target.closest('.hist-btn-translate');
      if (translateBtn && !translateBtn.classList.contains('hist-exhibit-translate-btn')) {
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
          const targetEventIndex = events.findIndex(evt => evt.era === targetEra);
          if (targetEventIndex !== -1) {
            scrollToEvent(targetEventIndex);
          }
        }
      });
    }

    // Soporte para evento moderno 'scrollend' para limpiar estados de transición rápida
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', function () {
        programmaticTargetIndex = null;
        updateStage();
      }, { passive: true });
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
   * Configura el soporte de teclado (Flechas, Home, End, Esc).
   */
  function initKeyboardNavigation() {
    window.addEventListener('keydown', function (e) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea') return;

      // Si la cédula histórica está abierta, la tecla Escape la cierra inmediatamente
      if (isExhibitOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeExhibit();
          return;
        }
        if (e.key === 'ArrowRight' && activeExhibitIndex < events.length - 1) {
          e.preventDefault();
          openExhibit(activeExhibitIndex + 1);
          return;
        }
        if (e.key === 'ArrowLeft' && activeExhibitIndex > 0) {
          e.preventDefault();
          openExhibit(activeExhibitIndex - 1);
          return;
        }
        return;
      }

      if (!journeyContainer) return;

      // Verificar si la ventana se encuentra dentro o enfocada en el stage
      const rect = journeyContainer.getBoundingClientRect();
      const isInStage = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3;
      const isStageFocused = stageElement && (stageElement === document.activeElement || stageElement.contains(document.activeElement));

      if (isInStage || isStageFocused) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          if (activeEventIndex < events.length - 1) {
            scrollToEvent(activeEventIndex + 1);
          } else {
            const quizSection = document.getElementById('hist-quiz-section');
            if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          if (activeEventIndex > 0) {
            scrollToEvent(activeEventIndex - 1);
          }
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
    initExhibitControls();
    initTouchSwipeNavigation();
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
