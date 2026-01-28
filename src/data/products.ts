import cuasImage from "@/assets/products/l-02-cuas.jpg";
import c2Image from "@/assets/products/l-04-c2.jpg";
import radarImage from "@/assets/products/n-01-radar.jpg";
import aesaImage from "@/assets/products/a-01-aesa.jpg";
import ewImage from "@/assets/products/a-03-ew.jpg";
import hmdImage from "@/assets/products/a-04-hmd.jpg";

export type ProductCategory = "Land" | "Sea" | "Air";
export type Language = "en" | "ko" | "zh-CN" | "zh-TW" | "ja" | "de" | "fr" | "es" | "ru";

export interface ProductOption {
  id: string;
  nameKo: string;
  nameEn: string;
  price?: number;
}

export interface ProductTranslations {
  name: Record<Language, string>;
  description: Record<Language, string>;
  fullDescription: Record<Language, string>;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  description: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
  specs: string[];
  translations: ProductTranslations;
  options: ProductOption[];
}

export const products: Product[] = [
  {
    id: "1",
    code: "L-02",
    name: "Integrated C-UAS Vehicle System",
    category: "Land",
    description: "Counter-drone system with jamming and hard-kill capabilities (laser/net) for base protection.",
    fullDescription: "The L-02 Integrated Counter-Unmanned Aircraft System (C-UAS) represents the pinnacle of mobile base defense technology. This vehicle-mounted platform combines advanced radar detection, RF jamming capabilities, and kinetic interceptors to neutralize hostile drone threats at ranges up to 10km. The system features real-time threat assessment AI, automatic target tracking, and seamless integration with existing base defense networks.",
    price: 4850000,
    imageUrl: cuasImage,
    specs: [
      "Detection Range: 15km",
      "Engagement Range: 10km",
      "Simultaneous Tracks: 200+",
      "Reaction Time: <2 seconds",
      "360° Coverage"
    ],
    options: [
      { id: "l02-opt1", nameKo: "EO/IR 고해상도 카메라", nameEn: "EO/IR High-Resolution Camera", price: 580000 },
      { id: "l02-opt2", nameKo: "안티-드론 전용 기관포", nameEn: "Anti-Drone Dedicated Machine Gun", price: 720000 },
      { id: "l02-opt3", nameKo: "GNSS 스푸핑", nameEn: "GNSS Spoofing", price: 350000 },
      { id: "l02-opt4", nameKo: "차량용 원격 무장 스테이션", nameEn: "Vehicle Remote Weapon Station", price: 680000 },
      { id: "l02-opt5", nameKo: "고효율 액체 냉각 유닛", nameEn: "High-Efficiency Liquid Cooling Unit", price: 220000 },
      { id: "l02-opt6", nameKo: "다중 대역 레이더 소프트웨어 업데이트", nameEn: "Multi-Band Radar Software Update", price: 480000 },
      { id: "l02-opt7", nameKo: "제빙 히팅 엘리먼트", nameEn: "De-Icing Heating Element", price: 150000 }
    ],
    translations: {
      name: {
        "en": "Integrated C-UAS Vehicle System",
        "ko": "통합 대드론 차량 시스템",
        "zh-CN": "综合反无人机车辆系统",
        "zh-TW": "綜合反無人機車輛系統",
        "ja": "統合対ドローン車両システム",
        "de": "Integriertes C-UAS-Fahrzeugsystem",
        "fr": "Système de véhicule C-UAS intégré",
        "es": "Sistema de vehículo C-UAS integrado",
        "ru": "Интегрированная противодроновая система"
      },
      description: {
        "en": "Counter-drone system with jamming and hard-kill capabilities (laser/net) for base protection.",
        "ko": "기지 방어를 위한 전파 교란 및 하드킬 능력(레이저/그물)을 갖춘 대드론 시스템.",
        "zh-CN": "用于基地保护的反无人机系统，具有干扰和硬杀伤能力（激光/网）。",
        "zh-TW": "用於基地保護的反無人機系統，具有干擾和硬殺傷能力（激光/網）。",
        "ja": "基地防護のためのジャミングとハードキル機能（レーザー/ネット）を備えた対ドローンシステム。",
        "de": "Drohnenabwehrsystem mit Störungs- und Hard-Kill-Fähigkeiten (Laser/Netz) zum Schutz von Stützpunkten.",
        "fr": "Système anti-drone avec capacités de brouillage et d'élimination physique (laser/filet) pour la protection de base.",
        "es": "Sistema antidrón con capacidades de interferencia y eliminación física (láser/red) para protección de base.",
        "ru": "Противодроновая система с возможностями подавления и физического уничтожения (лазер/сеть) для защиты базы."
      },
      fullDescription: {
        "en": "The L-02 Integrated Counter-Unmanned Aircraft System (C-UAS) represents the pinnacle of mobile base defense technology. This vehicle-mounted platform combines advanced radar detection, RF jamming capabilities, and kinetic interceptors to neutralize hostile drone threats at ranges up to 10km. The system features real-time threat assessment AI, automatic target tracking, and seamless integration with existing base defense networks.",
        "ko": "L-02 통합 대무인항공기 시스템(C-UAS)은 이동식 기지 방어 기술의 정점을 나타냅니다. 이 차량 탑재 플랫폼은 고급 레이더 탐지, RF 전파 교란 능력, 운동 에너지 요격기를 결합하여 최대 10km 범위에서 적대적인 드론 위협을 무력화합니다. 이 시스템은 실시간 위협 평가 AI, 자동 표적 추적, 기존 기지 방어 네트워크와의 원활한 통합을 특징으로 합니다.",
        "zh-CN": "L-02综合反无人机系统（C-UAS）代表了移动基地防御技术的巅峰。这个车载平台结合了先进的雷达探测、射频干扰能力和动能拦截器，可在10公里范围内消除敌对无人机威胁。该系统具有实时威胁评估AI、自动目标跟踪以及与现有基地防御网络的无缝集成。",
        "zh-TW": "L-02綜合反無人機系統（C-UAS）代表了移動基地防禦技術的巔峰。這個車載平台結合了先進的雷達探測、射頻干擾能力和動能攔截器，可在10公里範圍內消除敵對無人機威脅。該系統具有實時威脅評估AI、自動目標跟踪以及與現有基地防禦網絡的無縫集成。",
        "ja": "L-02統合対無人航空機システム（C-UAS）は、移動式基地防衛技術の頂点を表しています。この車両搭載プラットフォームは、高度なレーダー検出、RF妨害機能、運動エネルギー迎撃装置を組み合わせて、最大10kmの範囲で敵対的なドローンの脅威を無力化します。このシステムは、リアルタイムの脅威評価AI、自動目標追跡、既存の基地防衛ネットワークとのシームレスな統合を特徴としています。",
        "de": "Das L-02 Integrierte Counter-Unmanned Aircraft System (C-UAS) stellt den Höhepunkt der mobilen Stützpunktverteidigungstechnologie dar. Diese fahrzeugmontierte Plattform kombiniert fortschrittliche Radarerkennung, HF-Störfähigkeiten und kinetische Abfangjäger, um feindliche Drohnenbedrohungen in Reichweiten bis zu 10 km zu neutralisieren. Das System verfügt über KI zur Echtzeit-Bedrohungsbewertung, automatische Zielverfolgung und nahtlose Integration in bestehende Stützpunktverteidigungsnetzwerke.",
        "fr": "Le système L-02 intégré de contre-aéronefs sans pilote (C-UAS) représente le summum de la technologie de défense de base mobile. Cette plateforme montée sur véhicule combine la détection radar avancée, les capacités de brouillage RF et les intercepteurs cinétiques pour neutraliser les menaces de drones hostiles à des portées allant jusqu'à 10 km. Le système dispose d'une IA d'évaluation des menaces en temps réel, d'un suivi automatique des cibles et d'une intégration transparente avec les réseaux de défense de base existants.",
        "es": "El sistema L-02 integrado de contraaeronaves no tripuladas (C-UAS) representa la cúspide de la tecnología de defensa de base móvil. Esta plataforma montada en vehículo combina detección de radar avanzada, capacidades de interferencia RF e interceptores cinéticos para neutralizar amenazas de drones hostiles a rangos de hasta 10 km. El sistema cuenta con IA de evaluación de amenazas en tiempo real, seguimiento automático de objetivos e integración perfecta con las redes de defensa de base existentes.",
        "ru": "Интегрированная система противодействия беспилотным летательным аппаратам L-02 (C-UAS) представляет собой вершину технологии мобильной защиты баз. Эта платформа, установленная на транспортном средстве, сочетает в себе передовое радиолокационное обнаружение, возможности радиочастотного подавления и кинетические перехватчики для нейтрализации враждебных дронов на расстоянии до 10 км. Система оснащена ИИ для оценки угроз в реальном времени, автоматическим отслеживанием целей и бесшовной интеграцией с существующими сетями защиты базы."
      }
    }
  },
  {
    id: "2",
    code: "L-04",
    name: "Tactical AI C2 Platform",
    category: "Land",
    description: "Real-time battlefield analysis software with tactical data link integration for optimal deployment.",
    fullDescription: "The L-04 Tactical AI Command & Control Platform revolutionizes battlefield decision-making through advanced machine learning algorithms and multi-domain data fusion. This software suite processes intelligence from ground sensors, aerial assets, and satellite feeds to provide commanders with actionable insights in real-time. Features include predictive threat modeling, automated resource allocation, and secure coalition data sharing.",
    price: 12500000,
    imageUrl: c2Image,
    specs: [
      "Processing: 10M data points/sec",
      "AI Decision Latency: <50ms",
      "Data Links: Link-16, JREAP, VMF",
      "Classification: TS/SCI Compatible",
      "Coalition Interoperability"
    ],
    options: [
      { id: "l04-opt1", nameKo: "Edge AI 하드웨어 가속기", nameEn: "Edge AI Hardware Accelerator", price: 1850000 },
      { id: "l04-opt2", nameKo: "OSINT 통합 엔진", nameEn: "OSINT Integration Engine", price: 980000 },
      { id: "l04-opt3", nameKo: "디지털 트윈 시뮬레이터", nameEn: "Digital Twin Simulator", price: 1250000 },
      { id: "l04-opt4", nameKo: "고효율 액체 냉각 유닛", nameEn: "High-Efficiency Liquid Cooling Unit", price: 320000 },
      { id: "l04-opt5", nameKo: "모바일 메쉬 네트워크 노드", nameEn: "Mobile Mesh Network Node", price: 750000 }
    ],
    translations: {
      name: {
        "en": "Tactical AI C2 Platform",
        "ko": "전술 AI 지휘통제 플랫폼",
        "zh-CN": "战术AI指挥控制平台",
        "zh-TW": "戰術AI指揮控制平台",
        "ja": "戦術AI指揮統制プラットフォーム",
        "de": "Taktische KI-C2-Plattform",
        "fr": "Plateforme de commandement et contrôle IA tactique",
        "es": "Plataforma de C2 de IA táctica",
        "ru": "Тактическая платформа управления и контроля на базе ИИ"
      },
      description: {
        "en": "Real-time battlefield analysis software with tactical data link integration for optimal deployment.",
        "ko": "최적 배치를 위한 전술 데이터 링크 통합이 가능한 실시간 전장 분석 소프트웨어.",
        "zh-CN": "具有战术数据链路集成的实时战场分析软件，实现最佳部署。",
        "zh-TW": "具有戰術數據鏈路集成的實時戰場分析軟件，實現最佳部署。",
        "ja": "最適な展開のための戦術データリンク統合を備えたリアルタイム戦場分析ソフトウェア。",
        "de": "Echtzeit-Schlachtfeldanalysesoftware mit taktischer Datenlinkintegration für optimale Bereitstellung.",
        "fr": "Logiciel d'analyse du champ de bataille en temps réel avec intégration de liaison de données tactique pour un déploiement optimal.",
        "es": "Software de análisis de campo de batalla en tiempo real con integración de enlace de datos táctico para despliegue óptimo.",
        "ru": "Программное обеспечение для анализа поля боя в реальном времени с интеграцией тактических каналов данных для оптимального развертывания."
      },
      fullDescription: {
        "en": "The L-04 Tactical AI Command & Control Platform revolutionizes battlefield decision-making through advanced machine learning algorithms and multi-domain data fusion. This software suite processes intelligence from ground sensors, aerial assets, and satellite feeds to provide commanders with actionable insights in real-time. Features include predictive threat modeling, automated resource allocation, and secure coalition data sharing.",
        "ko": "L-04 전술 AI 지휘통제 플랫폼은 고급 머신러닝 알고리즘과 다영역 데이터 융합을 통해 전장 의사결정을 혁신합니다. 이 소프트웨어 제품군은 지상 센서, 공중 자산, 위성 피드의 정보를 처리하여 지휘관에게 실시간으로 실행 가능한 통찰력을 제공합니다. 예측 위협 모델링, 자동화된 자원 할당, 안전한 연합 데이터 공유 기능을 포함합니다.",
        "zh-CN": "L-04战术AI指挥控制平台通过先进的机器学习算法和多域数据融合革新了战场决策。该软件套件处理来自地面传感器、空中资产和卫星馈送的情报，为指挥官提供实时可操作的见解。功能包括预测性威胁建模、自动资源分配和安全的联盟数据共享。",
        "zh-TW": "L-04戰術AI指揮控制平台通過先進的機器學習算法和多域數據融合革新了戰場決策。該軟件套件處理來自地面傳感器、空中資產和衛星饋送的情報，為指揮官提供實時可操作的見解。功能包括預測性威脅建模、自動資源分配和安全的聯盟數據共享。",
        "ja": "L-04戦術AI指揮統制プラットフォームは、高度な機械学習アルゴリズムと多領域データ融合を通じて戦場での意思決定を革新します。このソフトウェアスイートは、地上センサー、航空資産、衛星フィードからのインテリジェンスを処理し、指揮官にリアルタイムで実用的な洞察を提供します。機能には、予測的な脅威モデリング、自動リソース割り当て、安全な連合データ共有が含まれます。",
        "de": "Die L-04 Taktische KI-Kommando- und Kontrollplattform revolutioniert die Entscheidungsfindung auf dem Schlachtfeld durch fortschrittliche Machine-Learning-Algorithmen und domänenübergreifende Datenfusion. Diese Softwaresuite verarbeitet Informationen von Bodensensoren, Luftfahrzeugen und Satelliten-Feeds, um Kommandeuren in Echtzeit verwertbare Erkenntnisse zu liefern. Zu den Funktionen gehören prädiktive Bedrohungsmodellierung, automatisierte Ressourcenzuweisung und sichere Koalitionsdatenfreigabe.",
        "fr": "La plateforme de commandement et contrôle IA tactique L-04 révolutionne la prise de décision sur le champ de bataille grâce à des algorithmes d'apprentissage automatique avancés et à la fusion de données multi-domaines. Cette suite logicielle traite les renseignements provenant de capteurs terrestres, d'actifs aériens et de flux satellites pour fournir aux commandants des informations exploitables en temps réel. Les fonctionnalités incluent la modélisation prédictive des menaces, l'allocation automatisée des ressources et le partage sécurisé de données de coalition.",
        "es": "La plataforma de comando y control de IA táctica L-04 revoluciona la toma de decisiones en el campo de batalla a través de algoritmos avanzados de aprendizaje automático y fusión de datos multidominio. Este conjunto de software procesa inteligencia de sensores terrestres, activos aéreos y feeds satelitales para proporcionar a los comandantes información procesable en tiempo real. Las características incluyen modelado predictivo de amenazas, asignación automatizada de recursos y compartición segura de datos de coalición.",
        "ru": "Тактическая платформа управления и контроля на базе ИИ L-04 революционизирует принятие решений на поле боя благодаря передовым алгоритмам машинного обучения и многодоменному слиянию данных. Этот программный пакет обрабатывает разведданные с наземных датчиков, воздушных активов и спутниковых каналов, предоставляя командирам практические сведения в реальном времени. Функции включают прогнозное моделирование угроз, автоматизированное распределение ресурсов и безопасный обмен данными коалиции."
      }
    }
  },
  {
    id: "3",
    code: "N-01",
    name: "Long-Range Naval Air Search Radar",
    category: "Sea",
    description: "S-Band/X-Band integrated radar to supplement Aegis-class destroyers for fleet air defense.",
    fullDescription: "The N-01 Long-Range Naval Air Search Radar system delivers unprecedented situational awareness for surface combatants. This dual-band (S/X) phased array radar integrates seamlessly with Aegis Combat System architecture, extending detection ranges against low-observable threats and hypersonic missiles. Advanced ECCM capabilities ensure reliable tracking in contested electromagnetic environments.",
    price: 78000000,
    imageUrl: radarImage,
    specs: [
      "Detection Range: 400+ km",
      "Track Capacity: 1000+ targets",
      "Bands: S-Band + X-Band",
      "ECCM: Advanced Suite",
      "Aegis Integration Ready"
    ],
    options: [
      { id: "n01-opt1", nameKo: "PCL 센서", nameEn: "PCL Sensor", price: 8500000 },
      { id: "n01-opt2", nameKo: "극초음속 표적 추적 알고리즘", nameEn: "Hypersonic Target Tracking Algorithm", price: 12800000 },
      { id: "n01-opt3", nameKo: "CBM+상태 기반 정비 시스템", nameEn: "CBM+ Condition-Based Maintenance System", price: 4200000 },
      { id: "n01-opt4", nameKo: "부식 방지 특수 코팅", nameEn: "Anti-Corrosion Special Coating", price: 2800000 },
      { id: "n01-opt5", nameKo: "제빙 히팅 엘리먼트", nameEn: "De-Icing Heating Element", price: 950000 }
    ],
    translations: {
      name: {
        "en": "Long-Range Naval Air Search Radar",
        "ko": "장거리 해군 대공 탐색 레이더",
        "zh-CN": "远程海军空中搜索雷达",
        "zh-TW": "遠程海軍空中搜索雷達",
        "ja": "長距離海軍航空捜索レーダー",
        "de": "Marine-Langstrecken-Luftsuchradar",
        "fr": "Radar de recherche aérienne navale à longue portée",
        "es": "Radar de búsqueda aérea naval de largo alcance",
        "ru": "Морской дальнобойный радар воздушного поиска"
      },
      description: {
        "en": "S-Band/X-Band integrated radar to supplement Aegis-class destroyers for fleet air defense.",
        "ko": "함대 대공 방어를 위한 이지스급 구축함 보완용 S밴드/X밴드 통합 레이더.",
        "zh-CN": "S波段/X波段集成雷达，用于补充宙斯盾级驱逐舰的舰队防空。",
        "zh-TW": "S波段/X波段集成雷達，用於補充宙斯盾級驅逐艦的艦隊防空。",
        "ja": "艦隊防空のためのイージス級駆逐艦を補完するSバンド/Xバンド統合レーダー。",
        "de": "S-Band/X-Band-integriertes Radar zur Ergänzung von Aegis-Klasse-Zerstörern für die Flottenluftverteidigung.",
        "fr": "Radar intégré bande S/bande X pour compléter les destroyers de classe Aegis pour la défense aérienne de la flotte.",
        "es": "Radar integrado de banda S/banda X para complementar destructores clase Aegis para defensa aérea de flota.",
        "ru": "Интегрированный радар S-диапазона/X-диапазона для дополнения эсминцев класса Aegis в системе противовоздушной обороны флота."
      },
      fullDescription: {
        "en": "The N-01 Long-Range Naval Air Search Radar system delivers unprecedented situational awareness for surface combatants. This dual-band (S/X) phased array radar integrates seamlessly with Aegis Combat System architecture, extending detection ranges against low-observable threats and hypersonic missiles. Advanced ECCM capabilities ensure reliable tracking in contested electromagnetic environments.",
        "ko": "N-01 장거리 해군 대공 탐색 레이더 시스템은 수상 전투함에 전례 없는 상황 인식을 제공합니다. 이 이중 대역(S/X) 위상 배열 레이더는 이지스 전투 시스템 아키텍처와 원활하게 통합되어 저피탐 위협과 극초음속 미사일에 대한 탐지 범위를 확장합니다. 고급 ECCM 기능은 경쟁이 치열한 전자기 환경에서 안정적인 추적을 보장합니다.",
        "zh-CN": "N-01远程海军空中搜索雷达系统为水面战斗舰提供前所未有的态势感知。这种双波段（S/X）相控阵雷达与宙斯盾战斗系统架构无缝集成，扩展了对低可观测威胁和高超音速导弹的探测范围。先进的ECCM能力确保在复杂电磁环境中可靠跟踪。",
        "zh-TW": "N-01遠程海軍空中搜索雷達系統為水面戰鬥艦提供前所未有的態勢感知。這種雙波段（S/X）相控陣雷達與宙斯盾戰鬥系統架構無縫集成，擴展了對低可觀測威脅和高超音速導彈的探測範圍。先進的ECCM能力確保在複雜電磁環境中可靠跟踪。",
        "ja": "N-01長距離海軍航空捜索レーダーシステムは、水上戦闘艦に前例のない状況認識を提供します。この二重帯域（S/X）フェーズドアレイレーダーは、イージス戦闘システムアーキテクチャとシームレスに統合され、低観測性の脅威や極超音速ミサイルに対する探知範囲を拡大します。高度なECCM機能により、競合する電磁環境での確実な追跡が保証されます。",
        "de": "Das N-01 Marine-Langstrecken-Luftsuchradarsystem bietet beispielloses Lagebewusstsein für Überwasserkampfschiffe. Dieses Dual-Band-Phasenarray-Radar (S/X) integriert sich nahtlos in die Aegis-Kampfsystemarchitektur und erweitert die Erkennungsreichweite gegen schwer beobachtbare Bedrohungen und Hyperschallraketen. Fortgeschrittene ECCM-Fähigkeiten gewährleisten zuverlässiges Tracking in umkämpften elektromagnetischen Umgebungen.",
        "fr": "Le système radar de recherche aérienne navale à longue portée N-01 offre une conscience situationnelle sans précédent aux combattants de surface. Ce radar à réseau phasé à double bande (S/X) s'intègre parfaitement à l'architecture du système de combat Aegis, étendant les portées de détection contre les menaces peu observables et les missiles hypersoniques. Les capacités ECCM avancées assurent un suivi fiable dans des environnements électromagnétiques contestés.",
        "es": "El sistema de radar de búsqueda aérea naval de largo alcance N-01 ofrece una conciencia situacional sin precedentes para los combatientes de superficie. Este radar de matriz en fase de doble banda (S/X) se integra perfectamente con la arquitectura del Sistema de Combate Aegis, extendiendo los rangos de detección contra amenazas de baja observabilidad y misiles hipersónicos. Las capacidades ECCM avanzadas garantizan un seguimiento confiable en entornos electromagnéticos disputados.",
        "ru": "Система морского дальнобойного радара воздушного поиска N-01 обеспечивает беспрецедентную ситуационную осведомленность для надводных кораблей. Этот двухдиапазонный (S/X) фазированный антенный радар бесшовно интегрируется с архитектурой боевой системы Aegis, расширяя дальность обнаружения малозаметных угроз и гиперзвуковых ракет. Передовые возможности ECCM обеспечивают надежное отслеживание в спорных электромагнитных средах."
      }
    }
  },
  {
    id: "4",
    code: "A-01",
    name: "5th Gen AESA Radar Module",
    category: "Air",
    description: "Active Electronically Scanned Array transceiver module to upgrade detection ranges of fighters like F-16.",
    fullDescription: "The A-01 5th Generation AESA Radar Module delivers transformational air-to-air and air-to-ground sensing capabilities for legacy 4th generation fighter platforms. This drop-in upgrade features 1,200+ T/R modules with GaN technology, providing 40% greater detection range and simultaneous multi-function operation. Fully compatible with F-16, F-15, and F/A-18 aircraft.",
    price: 8750000,
    imageUrl: aesaImage,
    specs: [
      "T/R Modules: 1,200+",
      "Technology: GaN",
      "Range Improvement: +40%",
      "Modes: SAR, GMTI, A2A, A2G",
      "Weight: 165 kg"
    ],
    options: [
      { id: "a01-opt1", nameKo: "EA 소프트웨어 패키지", nameEn: "EA Software Package", price: 780000 },
      { id: "a01-opt2", nameKo: "LPI 모드 강화", nameEn: "LPI Mode Enhancement", price: 920000 },
      { id: "a01-opt3", nameKo: "초고해상도 SAR 이미지 생성기", nameEn: "Ultra-High Resolution SAR Image Generator", price: 1350000 },
      { id: "a01-opt4", nameKo: "먼지 흡입 방지 필터 및 강화 실링", nameEn: "Dust Ingestion Prevention Filter & Enhanced Sealing", price: 180000 },
      { id: "a01-opt5", nameKo: "GMTI 강화 모드", nameEn: "GMTI Enhancement Mode", price: 680000 }
    ],
    translations: {
      name: {
        "en": "5th Gen AESA Radar Module",
        "ko": "5세대 AESA 레이더 모듈",
        "zh-CN": "第5代AESA雷达模块",
        "zh-TW": "第5代AESA雷達模組",
        "ja": "第5世代AESAレーダーモジュール",
        "de": "AESA-Radarmodul der 5. Generation",
        "fr": "Module radar AESA de 5ème génération",
        "es": "Módulo de radar AESA de 5ª generación",
        "ru": "Радарный модуль AESA 5-го поколения"
      },
      description: {
        "en": "Active Electronically Scanned Array transceiver module to upgrade detection ranges of fighters like F-16.",
        "ko": "F-16과 같은 전투기의 탐지 범위를 업그레이드하기 위한 능동 전자 주사 배열 송수신 모듈.",
        "zh-CN": "主动电子扫描阵列收发模块，用于升级F-16等战斗机的探测范围。",
        "zh-TW": "主動電子掃描陣列收發模組，用於升級F-16等戰鬥機的探測範圍。",
        "ja": "F-16などの戦闘機の探知範囲をアップグレードするためのアクティブ電子走査アレイ送受信モジュール。",
        "de": "Active Electronically Scanned Array Transceiver-Modul zum Upgrade der Erfassungsreichweite von Kampfflugzeugen wie F-16.",
        "fr": "Module émetteur-récepteur à réseau à balayage électronique actif pour améliorer les portées de détection de chasseurs comme le F-16.",
        "es": "Módulo transceptor de matriz de exploración electrónica activa para mejorar los rangos de detección de cazas como el F-16.",
        "ru": "Модуль приемопередатчика с активной электронной сканирующей решеткой для модернизации дальности обнаружения истребителей типа F-16."
      },
      fullDescription: {
        "en": "The A-01 5th Generation AESA Radar Module delivers transformational air-to-air and air-to-ground sensing capabilities for legacy 4th generation fighter platforms. This drop-in upgrade features 1,200+ T/R modules with GaN technology, providing 40% greater detection range and simultaneous multi-function operation. Fully compatible with F-16, F-15, and F/A-18 aircraft.",
        "ko": "A-01 5세대 AESA 레이더 모듈은 기존 4세대 전투기 플랫폼에 혁신적인 공대공 및 공대지 감지 능력을 제공합니다. 이 드롭인 업그레이드는 GaN 기술을 사용한 1,200개 이상의 T/R 모듈을 갖추고 있으며, 40% 더 큰 탐지 범위와 동시 다기능 작동을 제공합니다. F-16, F-15, F/A-18 항공기와 완전히 호환됩니다.",
        "zh-CN": "A-01第5代AESA雷达模块为传统的第4代战斗机平台提供革命性的空对空和空对地传感能力。这种插入式升级配备了1,200多个采用GaN技术的T/R模块，提供40%更大的探测范围和同时多功能操作。完全兼容F-16、F-15和F/A-18飞机。",
        "zh-TW": "A-01第5代AESA雷達模組為傳統的第4代戰鬥機平台提供革命性的空對空和空對地傳感能力。這種插入式升級配備了1,200多個採用GaN技術的T/R模組，提供40%更大的探測範圍和同時多功能操作。完全兼容F-16、F-15和F/A-18飛機。",
        "ja": "A-01第5世代AESAレーダーモジュールは、従来の第4世代戦闘機プラットフォームに革新的な空対空および空対地センシング能力を提供します。このドロップインアップグレードは、GaN技術を使用した1,200以上のT/Rモジュールを特徴とし、40%大きな探知範囲と同時マルチファンクション操作を提供します。F-16、F-15、F/A-18航空機と完全に互換性があります。",
        "de": "Das AESA-Radarmodul der 5. Generation A-01 bietet transformative Luft-Luft- und Luft-Boden-Erfassungsfähigkeiten für Legacy-Kampfflugzeugplattformen der 4. Generation. Dieses Drop-In-Upgrade verfügt über 1.200+ T/R-Module mit GaN-Technologie und bietet 40% größere Erfassungsreichweite und gleichzeitige Multifunktionsbetrieb. Vollständig kompatibel mit F-16-, F-15- und F/A-18-Flugzeugen.",
        "fr": "Le module radar AESA de 5ème génération A-01 offre des capacités de détection air-air et air-sol transformationnelles pour les plateformes de chasseurs de 4ème génération existantes. Cette mise à niveau plug-and-play comprend plus de 1 200 modules T/R avec technologie GaN, offrant une portée de détection 40% supérieure et un fonctionnement multifonction simultané. Entièrement compatible avec les avions F-16, F-15 et F/A-18.",
        "es": "El módulo de radar AESA de 5ª generación A-01 ofrece capacidades de detección aire-aire y aire-tierra transformacionales para plataformas de cazas de 4ª generación heredadas. Esta actualización de instalación directa cuenta con más de 1,200 módulos T/R con tecnología GaN, proporcionando un 40% más de alcance de detección y operación multifunción simultánea. Totalmente compatible con aviones F-16, F-15 y F/A-18.",
        "ru": "Радарный модуль AESA 5-го поколения A-01 обеспечивает трансформационные возможности обнаружения воздух-воздух и воздух-земля для устаревших истребительных платформ 4-го поколения. Это обновление plug-and-play включает более 1200 модулей T/R с технологией GaN, обеспечивая на 40% большую дальность обнаружения и одновременную многофункциональную работу. Полностью совместим с самолетами F-16, F-15 и F/A-18."
      }
    }
  },
  {
    id: "5",
    code: "A-03",
    name: "Advanced Integrated EW Pod",
    category: "Air",
    description: "Electronic Warfare pod to neutralize enemy radar/comms and ensure aircraft survivability.",
    fullDescription: "The A-03 Advanced Integrated Electronic Warfare Pod represents next-generation aircraft self-protection technology. Combining wide-band digital receivers, cognitive jamming algorithms, and fiber-optic towed decoys, this system provides comprehensive protection against modern integrated air defense systems. The AI-driven threat response system automatically selects optimal countermeasure techniques.",
    price: 6200000,
    imageUrl: ewImage,
    specs: [
      "Frequency Coverage: 0.5-40 GHz",
      "Jamming Modes: 16 simultaneous",
      "AI Threat Response: <10ms",
      "Decoy: Fiber-Optic Towed",
      "Compatible: NATO fighters"
    ],
    options: [
      { id: "a03-opt1", nameKo: "Cognitive Jamming", nameEn: "Cognitive Jamming", price: 850000 },
      { id: "a03-opt2", nameKo: "멀티-플랫폼 협동 EW", nameEn: "Multi-Platform Cooperative EW", price: 620000 },
      { id: "a03-opt3", nameKo: "소형 소모형 재머 발사기", nameEn: "Small Expendable Jammer Launcher", price: 480000 },
      { id: "a03-opt4", nameKo: "먼지 흡입 방지 필터 및 강화 실링", nameEn: "Dust Ingestion Prevention Filter & Enhanced Sealing", price: 150000 },
      { id: "a03-opt5", nameKo: "지형 추적(Terrain Following) 연동 기능", nameEn: "Terrain Following Integration", price: 390000 }
    ],
    translations: {
      name: {
        "en": "Advanced Integrated EW Pod",
        "ko": "고급 통합 전자전 포드",
        "zh-CN": "先进集成电子战吊舱",
        "zh-TW": "先進集成電子戰吊艙",
        "ja": "高度統合電子戦ポッド",
        "de": "Fortgeschrittener integrierter EW-Pod",
        "fr": "Nacelle de guerre électronique intégrée avancée",
        "es": "Pod de guerra electrónica integrado avanzado",
        "ru": "Передовой интегрированный контейнер РЭБ"
      },
      description: {
        "en": "Electronic Warfare pod to neutralize enemy radar/comms and ensure aircraft survivability.",
        "ko": "적 레이더/통신을 무력화하고 항공기 생존성을 보장하는 전자전 포드.",
        "zh-CN": "电子战吊舱，用于压制敌方雷达/通信并确保飞机生存能力。",
        "zh-TW": "電子戰吊艙，用於壓制敵方雷達/通信並確保飛機生存能力。",
        "ja": "敵レーダー/通信を無力化し、航空機の生存性を確保するための電子戦ポッド。",
        "de": "Elektronischer Kriegsführungs-Pod zur Neutralisierung feindlicher Radar-/Kommunikationssysteme und Gewährleistung der Flugzeugüberlebensfähigkeit.",
        "fr": "Nacelle de guerre électronique pour neutraliser le radar/les communications ennemis et assurer la survivabilité de l'avion.",
        "es": "Pod de guerra electrónica para neutralizar el radar/comunicaciones enemigas y garantizar la supervivencia de la aeronave.",
        "ru": "Контейнер радиоэлектронной борьбы для подавления вражеских радаров/связи и обеспечения выживаемости самолета."
      },
      fullDescription: {
        "en": "The A-03 Advanced Integrated Electronic Warfare Pod represents next-generation aircraft self-protection technology. Combining wide-band digital receivers, cognitive jamming algorithms, and fiber-optic towed decoys, this system provides comprehensive protection against modern integrated air defense systems. The AI-driven threat response system automatically selects optimal countermeasure techniques.",
        "ko": "A-03 고급 통합 전자전 포드는 차세대 항공기 자체 보호 기술을 나타냅니다. 광대역 디지털 수신기, 인지형 재밍 알고리즘, 광섬유 예인 디코이를 결합하여 현대 통합 방공 시스템에 대한 포괄적인 보호를 제공합니다. AI 기반 위협 대응 시스템이 자동으로 최적의 대응 기술을 선택합니다.",
        "zh-CN": "A-03先进集成电子战吊舱代表了下一代飞机自我保护技术。该系统结合了宽带数字接收器、认知干扰算法和光纤拖曳诱饵，为现代综合防空系统提供全面保护。AI驱动的威胁响应系统自动选择最优对抗技术。",
        "zh-TW": "A-03先進集成電子戰吊艙代表了下一代飛機自我保護技術。該系統結合了寬帶數字接收器、認知干擾算法和光纖拖曳誘餌，為現代綜合防空系統提供全面保護。AI驅動的威脅響應系統自動選擇最優對抗技術。",
        "ja": "A-03高度統合電子戦ポッドは、次世代航空機自己防護技術を表しています。広帯域デジタル受信機、認知型妨害アルゴリズム、光ファイバー曳航デコイを組み合わせることで、現代の統合防空システムに対する包括的な保護を提供します。AI駆動の脅威対応システムが最適な対抗手段技術を自動的に選択します。",
        "de": "Der A-03 Fortgeschrittene Integrierte Elektronische Kriegsführungs-Pod repräsentiert die nächste Generation der Flugzeugselbstschutztechnologie. Durch die Kombination von Breitband-Digitalempfängern, kognitiven Störalgorithmen und faseroptischen geschleppten Täuschkörpern bietet dieses System umfassenden Schutz gegen moderne integrierte Luftverteidigungssysteme. Das KI-gesteuerte Bedrohungsreaktionssystem wählt automatisch optimale Gegenmaßnahmentechniken aus.",
        "fr": "La nacelle de guerre électronique intégrée avancée A-03 représente la technologie d'autoprotection d'aéronef de nouvelle génération. En combinant des récepteurs numériques à large bande, des algorithmes de brouillage cognitif et des leurres tractés à fibre optique, ce système offre une protection complète contre les systèmes de défense aérienne intégrés modernes. Le système de réponse aux menaces piloté par l'IA sélectionne automatiquement les techniques de contre-mesure optimales.",
        "es": "El pod de guerra electrónica integrado avanzado A-03 representa la tecnología de autoprotección de aeronaves de próxima generación. Al combinar receptores digitales de banda ancha, algoritmos de interferencia cognitiva y señuelos remolcados de fibra óptica, este sistema proporciona protección integral contra los sistemas modernos de defensa aérea integrados. El sistema de respuesta a amenazas impulsado por IA selecciona automáticamente las técnicas óptimas de contramedidas.",
        "ru": "Передовой интегрированный контейнер радиоэлектронной борьбы A-03 представляет собой технологию самозащиты самолетов следующего поколения. Сочетая широкополосные цифровые приемники, когнитивные алгоритмы подавления и буксируемые оптоволоконные ложные цели, эта система обеспечивает всестороннюю защиту от современных интегрированных систем противовоздушной обороны. Управляемая ИИ система реагирования на угрозы автоматически выбирает оптимальные методы противодействия."
      }
    }
  },
  {
    id: "6",
    code: "A-04",
    name: "Next-Gen HMD System",
    category: "Air",
    description: "High-res Helmet Mounted Display overlaying flight and target data for enhanced pilot situational awareness.",
    fullDescription: "The A-04 Next-Generation Helmet Mounted Display System delivers unparalleled situational awareness to combat pilots. Featuring 4K resolution micro-displays, eye-tracking weapons cueing, night vision integration, and augmented reality overlays, this system enables pilots to engage targets simply by looking at them. Advanced head tracking provides seamless transition between cockpit displays and external visuals.",
    price: 920000,
    imageUrl: hmdImage,
    specs: [
      "Resolution: 4K per eye",
      "FOV: 100° x 40°",
      "Head Tracking: Sub-milliradian",
      "Night Vision: Integrated",
      "Weight: 1.8 kg"
    ],
    options: [
      { id: "a04-opt1", nameKo: "Pilot Vital Sensing", nameEn: "Pilot Vital Sensing", price: 120000 },
      { id: "a04-opt2", nameKo: "AI 가상 윙맨 인터페이스", nameEn: "AI Virtual Wingman Interface", price: 180000 },
      { id: "a04-opt3", nameKo: "3D 입체 음향 경고 시스템", nameEn: "3D Spatial Audio Warning System", price: 95000 },
      { id: "a04-opt4", nameKo: "안티-포그 및 항균 패드", nameEn: "Anti-Fog & Antibacterial Pad", price: 28000 },
      { id: "a04-opt5", nameKo: "저온 특화 배터리 팩", nameEn: "Low-Temperature Specialized Battery Pack", price: 65000 }
    ],
    translations: {
      name: {
        "en": "Next-Gen HMD System",
        "ko": "차세대 HMD 시스템",
        "zh-CN": "下一代HMD系统",
        "zh-TW": "下一代HMD系統",
        "ja": "次世代HMDシステム",
        "de": "HMD-System der nächsten Generation",
        "fr": "Système HMD de nouvelle génération",
        "es": "Sistema HMD de próxima generación",
        "ru": "Система HMD следующего поколения"
      },
      description: {
        "en": "High-res Helmet Mounted Display overlaying flight and target data for enhanced pilot situational awareness.",
        "ko": "조종사의 상황 인식 향상을 위한 비행 및 표적 데이터를 오버레이하는 고해상도 헬멧 장착 디스플레이.",
        "zh-CN": "高分辨率头盔显示器，叠加飞行和目标数据，增强飞行员态势感知。",
        "zh-TW": "高分辨率頭盔顯示器，疊加飛行和目標數據，增強飛行員態勢感知。",
        "ja": "飛行とターゲットデータをオーバーレイし、パイロットの状況認識を強化する高解像度ヘルメット搭載ディスプレイ。",
        "de": "Hochauflösendes Helmvisier mit Überlagerung von Flug- und Zieldaten für verbesserte Pilotenlageerkennung.",
        "fr": "Affichage monté sur casque haute résolution superposant les données de vol et de cible pour une meilleure conscience situationnelle du pilote.",
        "es": "Pantalla montada en casco de alta resolución que superpone datos de vuelo y objetivos para mejorar la conciencia situacional del piloto.",
        "ru": "Высокоразрешающий дисплей на шлеме с наложением данных полета и целей для улучшения ситуационной осведомленности пилота."
      },
      fullDescription: {
        "en": "The A-04 Next-Generation Helmet Mounted Display System delivers unparalleled situational awareness to combat pilots. Featuring 4K resolution micro-displays, eye-tracking weapons cueing, night vision integration, and augmented reality overlays, this system enables pilots to engage targets simply by looking at them. Advanced head tracking provides seamless transition between cockpit displays and external visuals.",
        "ko": "A-04 차세대 헬멧 장착 디스플레이 시스템은 전투 조종사에게 비교할 수 없는 상황 인식을 제공합니다. 4K 해상도 마이크로 디스플레이, 시선 추적 무기 큐잉, 야간 투시경 통합, 증강 현실 오버레이를 갖추고 있어 조종사가 단순히 목표물을 바라보는 것만으로도 교전할 수 있습니다. 고급 헤드 트래킹은 조종석 디스플레이와 외부 시야 간의 원활한 전환을 제공합니다.",
        "zh-CN": "A-04下一代头盔显示系统为战斗飞行员提供无与伦比的态势感知。该系统配备4K分辨率微显示器、眼动追踪武器提示、夜视集成和增强现实叠加，使飞行员只需看一眼就能锁定目标。先进的头部追踪提供驾驶舱显示器和外部视觉之间的无缝转换。",
        "zh-TW": "A-04下一代頭盔顯示系統為戰鬥飛行員提供無與倫比的態勢感知。該系統配備4K分辨率微顯示器、眼動追踪武器提示、夜視集成和增強現實疊加，使飛行員只需看一眼就能鎖定目標。先進的頭部追踪提供駕駛艙顯示器和外部視覺之間的無縫轉換。",
        "ja": "A-04次世代ヘルメット搭載ディスプレイシステムは、戦闘パイロットに比類のない状況認識を提供します。4K解像度のマイクロディスプレイ、視線追跡兵器キューイング、暗視装置統合、拡張現実オーバーレイを備え、パイロットは単に見るだけでターゲットに交戦できます。高度なヘッドトラッキングにより、コックピットディスプレイと外部ビジュアルのシームレスな移行が可能です。",
        "de": "Das A-04 HMD-System der nächsten Generation bietet Kampfpiloten ein beispielloses Lagebewusstsein. Mit 4K-Auflösungs-Mikrodisplays, Augenverfolgungs-Waffenausrichtung, Nachtsichtintegration und Augmented-Reality-Overlays ermöglicht dieses System Piloten, Ziele einfach durch Ansehen anzugreifen. Fortschrittliches Head-Tracking bietet einen nahtlosen Übergang zwischen Cockpit-Displays und externen Visualisierungen.",
        "fr": "Le système d'affichage monté sur casque de nouvelle génération A-04 offre une conscience situationnelle inégalée aux pilotes de combat. Doté de micro-écrans 4K, de guidage d'armes par suivi oculaire, d'intégration de vision nocturne et de superpositions de réalité augmentée, ce système permet aux pilotes d'engager des cibles simplement en les regardant. Le suivi avancé de la tête assure une transition transparente entre les affichages du cockpit et les visuels externes.",
        "es": "El sistema de pantalla montada en casco de próxima generación A-04 ofrece una conciencia situacional sin igual a los pilotos de combate. Con micropantallas de resolución 4K, orientación de armas por seguimiento ocular, integración de visión nocturna y superposiciones de realidad aumentada, este sistema permite a los pilotos atacar objetivos simplemente mirándolos. El seguimiento avanzado de la cabeza proporciona una transición perfecta entre las pantallas de la cabina y las visuales externas.",
        "ru": "Система дисплея на шлеме следующего поколения A-04 обеспечивает непревзойденную ситуационную осведомленность боевым пилотам. Благодаря микродисплеям с разрешением 4K, наведению оружия с отслеживанием взгляда, интеграции ночного видения и наложениям дополненной реальности эта система позволяет пилотам атаковать цели просто глядя на них. Продвинутое отслеживание головы обеспечивает бесшовный переход между дисплеями кабины и внешними изображениями."
      }
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};

export const getLocalizedProductName = (product: Product, language: Language): string => {
  return product.translations.name[language] || product.name;
};

export const getLocalizedProductDescription = (product: Product, language: Language): string => {
  return product.translations.description[language] || product.description;
};

export const getLocalizedProductFullDescription = (product: Product, language: Language): string => {
  return product.translations.fullDescription[language] || product.fullDescription;
};
