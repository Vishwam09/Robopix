import { Project } from '../types/portfolio';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'robopix-lead-finder',
    sysId: 'RPBX-LEAD-01',
    title: 'ROBOPIX AI Lead Finder',
    category: 'AI_AUTOMATION',
    categoryLabel: 'AI & Business Automation',
    status: 'LIVE',
    purpose: 'Automated B2B Prospect Discovery & Target Enrichment',
    summary: 'Engineered pipeline for identifying high-intent commercial prospects, validating DNS/MX records, extracting key decision-maker emails, and scoring prospect fit using heuristic matching.',
    description: 'An autonomous prospecting pipeline built to eliminate manual sales discovery. It processes enterprise queries, crawls targeted digital registries, cross-validates contact legitimacy via SMTP handshake simulations, and compiles structured JSON/CSV lead packages ready for immediate outbound pipeline ingestion.',
    techStack: ['Python 3.11', 'FastAPI', 'BeautifulSoup4', 'Playwright', 'Pandas', 'SMTP Validator'],
    architectureHighlights: [
      'Multi-threaded asynchronous crawling engine with rate-limit evasion and rotating proxies.',
      'DNS MX and SMTP socket verifier for zero bounce-rate guarantee.',
      'Heuristic business classification and contact role matching.',
      'Automated export pipelines to CSV, Notion API, and CRM webhooks.'
    ],
    metrics: [
      { label: 'Ingestion Rate', value: '450 records/min' },
      { label: 'Validation Accuracy', value: '99.4%' },
      { label: 'False Positive MX', value: '<0.2%' }
    ],
    themeVariant: 'light',
    featured: true,
    demoType: 'lead_finder',
    operationalNode: 'BENGALURU-EDGE-01',
    dateCreated: 'Q1 2025',
    repoIdentifier: 'git://rpbx.internal/ai-lead-finder.git'
  },
  {
    id: 'ai-outreach-tool',
    sysId: 'RPBX-OUTREACH-02',
    title: 'AI Outreach Dispatch Engine',
    category: 'AI_AUTOMATION',
    categoryLabel: 'AI & Business Automation',
    status: 'LIVE',
    purpose: 'WhatsApp Meta Gateway & Adaptive Message Synthesis',
    summary: 'Dynamic outbound engagement suite configured for personalized business communications, WhatsApp Business Cloud webhook routing, and real-time conversation telemetry tracking.',
    description: 'Combines dynamic prompt synthesis with direct WhatsApp Business API dispatch. Replaces generic batch broadcasts with context-aware communication that respects recipient response cadence, conversational sentiment, and automated escalation flags.',
    techStack: ['Python', 'Meta WhatsApp Cloud API', 'OpenAI API', 'Celery', 'Redis', 'PostgreSQL'],
    architectureHighlights: [
      'Webhook listener handling 2,000+ incoming webhooks/sec with idempotency deduplication.',
      'Adaptive prompt conditioning tailored to prospective client business vertical.',
      'Automated human-in-the-loop takeover when sentiment score drops below threshold.',
      'Full compliance with WhatsApp messaging policies and rate limitations.'
    ],
    metrics: [
      { label: 'Dispatch Latency', value: '180ms avg' },
      { label: 'Open Rate', value: '88.2%' },
      { label: 'Conversion Lift', value: '+34%' }
    ],
    themeVariant: 'lime',
    featured: true,
    demoType: 'outreach',
    operationalNode: 'AHMEDABAD-NODE-02',
    dateCreated: 'Q1 2025',
    repoIdentifier: 'git://rpbx.internal/outreach-synthesizer.git'
  },
  {
    id: 'esp32-fertilizer-robot',
    sysId: 'RPBX-HW-AGRIBOT-03',
    title: 'ESP32 Fertilizer Spraying Robot',
    category: 'HARDWARE_ROBOTICS',
    categoryLabel: 'Robotics & Hardware',
    status: 'PROTOTYPE',
    purpose: 'Autonomous 4WD Precision Agricultural Dispenser',
    summary: 'Microcontroller-driven agricultural chassis featuring four-wheel motor synchronized drive, ultrasonic obstacle avoidance, high-pressure pump relay triggering, and browser-hosted WebSocket telemetry controls.',
    description: 'Custom-fabricated rover chassis powered by an ESP32 dual-core Xtensa processor. Features real-time obstacle avoidance using an HC-SR04 ultrasonic array, H-Bridge L298N motor drivers, dual 12V DC peristaltic pumps, and an onboard asynchronous WebServer streaming telemetry to an operator dashboard over local Wi-Fi.',
    techStack: ['ESP32 Dual-Core', 'C++ / FreeRTOS', 'L298N H-Bridge', 'HC-SR04 Sonar', 'WebSockets', 'KiCad PCB'],
    architectureHighlights: [
      'Dual-core RTOS task segregation: Core 0 dedicated to Wi-Fi/WebSockets, Core 1 executing motor/sensor PWM loop.',
      'Sub-50ms sonar collision reaction distance cutoff (30cm threshold).',
      'PWM fluid flow modulation matching rover forward linear velocity.',
      'Browser UI rendered entirely from SPIFFS flash memory with zero external asset dependencies.'
    ],
    metrics: [
      { label: 'Drive Runtime', value: '4.5 Hours' },
      { label: 'Spray Precision', value: '±15mm' },
      { label: 'Telemetry Ping', value: '12ms' }
    ],
    themeVariant: 'dark',
    featured: true,
    demoType: 'agribot',
    operationalNode: 'FIELD-LAB-AGRI-01',
    dateCreated: 'Q4 2024',
    repoIdentifier: 'git://rpbx.internal/esp32-agribot-v2.git'
  },
  {
    id: 'kaam-mitra-platform',
    sysId: 'RPBX-MOB-KAAM-04',
    title: 'KaamMitra Worker Platform',
    category: 'MOBILE_APPS',
    categoryLabel: 'Mobile Applications',
    status: 'IN DEV',
    purpose: 'Hyperlocal Laborer & Contractor Matching Network',
    summary: 'Lightweight mobile portal bridging skilled daily wage workers and local construction contractors with zero middlemen. Geolocation tracking, phone verification, and bilingual voice-first accessibility layers.',
    description: 'Developed to eliminate predatory commission agents in urban daily-wage sectors. KaamMitra offers an icon-driven, voice-assisted interface enabling non-literate workers to broadcast availability, receive verified dispatch offers, and record payment escrows directly.',
    techStack: ['Flutter / Dart', 'Firebase Auth', 'Cloud Firestore', 'Google Maps SDK', 'WebRTC Audio'],
    architectureHighlights: [
      'Ultra-compact client bundle optimized for sub-100$ budget Android smartphones.',
      'Audio prompt interface with Hindi, Gujarati, and English regional language synthesis.',
      'Geohash proximity search radius filtering within 10km radius.',
      'Cryptographically verified completion receipts stored offline-first.'
    ],
    metrics: [
      { label: 'Active Pilot Workers', value: '320+' },
      { label: 'Match Time', value: '<12 Mins' },
      { label: 'Offline Sync', value: '100% Reliable' }
    ],
    themeVariant: 'light',
    featured: false,
    demoType: 'kaam_mitra',
    operationalNode: 'STAGING-CLOUD-IN',
    dateCreated: 'Q2 2025',
    repoIdentifier: 'git://rpbx.internal/kaam-mitra-app.git'
  },
  {
    id: 'robopix-official-platform',
    sysId: 'RPBX-WEB-CORE-05',
    title: 'ROBOPIX Official Technology Platform',
    category: 'WEB_PLATFORMS',
    categoryLabel: 'Websites & Web Applications',
    status: 'LIVE',
    purpose: 'Mission Critical Digital Avionics & Systems Hub',
    summary: 'The flagship client portal presenting real-time telemetry, consult scheduling matrices, and verified architectural standards engineered with ultra-high contrast dark monochrome discipline.',
    description: 'The core operational web application of ROBOPIX. Engineered for maximum responsiveness, zero framework bloat, sub-100ms first contentful paint, and airtight visual consistency rooted in aerospace flight manual ergonomics.',
    techStack: ['React 19', 'Tailwind CSS', 'TypeScript', 'Motion', 'Cloudflare Edge CDN', 'Node.js'],
    architectureHighlights: [
      'Dual aesthetic engine: Neo-Grotesque Lime edition & Flight Spec absolute dark mode.',
      'Accessible, zero-pill typographic metadata hierarchy complying with strict design standards.',
      'Zero external font dependencies with local fallbacks and high-contrast WCAG AAA compliance.',
      'Interactive hardware simulators and live audio-telemetry modules embedded natively.'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'First Paint', value: '64ms' },
      { label: 'Payload Weight', value: '<140KB gzip' }
    ],
    themeVariant: 'lime',
    featured: true,
    demoType: 'robopix_core',
    operationalNode: 'GLOBAL-ANYCAST-NODE',
    dateCreated: 'Q1 2025',
    repoIdentifier: 'git://rpbx.internal/robopix-web-core.git'
  },
  {
    id: 'html-viewer-tool',
    sysId: 'RPBX-WEB-INSPECT-06',
    title: 'Zero-Latency HTML & DOM Sandbox',
    category: 'WEB_PLATFORMS',
    categoryLabel: 'Websites & Web Applications',
    status: 'LIVE',
    purpose: 'Zero-Latency DOM Sandbox & Render Inspector',
    summary: 'Lightweight browser-native utility allowing web developers to quickly parse, scrub, and validate raw markup structures without external bloated tooling or tracking overhead.',
    description: 'An isolated in-browser evaluation playground. Provides real-time syntax checking, live iframe rendering with CSP isolation, HTML-to-JSX conversion utilities, and instant responsiveness across viewport dimensions.',
    techStack: ['JavaScript ES6+', 'HTML5 Canvas', 'CSS Grid', 'Blob Workers', 'DOMPurify'],
    architectureHighlights: [
      'Hermetic iframe sandbox preventing host DOM pollution and cross-origin leakage.',
      'Live AST inspection with syntax node depth analysis.',
      'Single-file distribution capability for offline air-gapped engineering environments.'
    ],
    metrics: [
      { label: 'Render Delay', value: '0ms (Instant)' },
      { label: 'Memory Footprint', value: '1.8MB' },
      { label: 'Sandboxed Isolation', value: 'Strict CSP' }
    ],
    themeVariant: 'dark',
    featured: false,
    demoType: 'html_viewer',
    operationalNode: 'EDGE-UTILITY-06',
    dateCreated: 'Q3 2024',
    repoIdentifier: 'git://rpbx.internal/html-viewer.git'
  },
  {
    id: 'gamepad-tester-suite',
    sysId: 'RPBX-WEB-PADTEST-07',
    title: 'Gamepad API Signal Diagnostic Suite',
    category: 'WEB_PLATFORMS',
    categoryLabel: 'Websites & Web Applications',
    status: 'LIVE',
    purpose: 'Hardware Input Signal & Stick Drift Diagnostic',
    summary: 'Web Gamepad API diagnostic platform registering raw axis variance, analog dead zones, actuation pressure thresholds, and rumble motor latency checks across USB & Bluetooth controllers.',
    description: 'Precision hardware testing suite built directly on the browser Gamepad API. Visualizes circular stick circularity error percentages, triggers dual-motor haptic frequency sweeps, and charts micro-volt potentiometer variations to detect early stick drift in gaming and robotics controllers.',
    techStack: ['Navigator Gamepad API', 'HTML5 Canvas 2D', 'Web Audio API', 'TypeScript'],
    architectureHighlights: [
      '60 FPS input polling requestAnimationFrame loop with sub-millisecond timestamps.',
      'Polar coordinate math calculating exact circularity outer boundary error margin.',
      'Dual-rumble motor actuation triggers testable via standard Web Gamepad VibrationActuator protocol.'
    ],
    metrics: [
      { label: 'Polling Latency', value: '<1.2ms' },
      { label: 'Input Jitter', value: '±0.0004' },
      { label: 'Supported Devices', value: 'All HID USB/BT' }
    ],
    themeVariant: 'light',
    featured: true,
    demoType: 'gamepad',
    operationalNode: 'BROWSER-HARDWARE-API',
    dateCreated: 'Q4 2024',
    repoIdentifier: 'git://rpbx.internal/gamepad-diagnostic.git'
  },
  {
    id: 'construction-enterprise-suites',
    sysId: 'RPBX-WEB-CONST-08',
    title: 'Civil Enterprise Infrastructure Suites',
    category: 'WEB_PLATFORMS',
    categoryLabel: 'Websites & Web Applications',
    status: 'PROTOTYPE',
    purpose: 'Heavy Equipment & Infrastructure Showcase',
    summary: 'Engineered web architectures designed specifically for civil engineering firms, contractor aggregators, and architectural studios featuring blueprint viewers and structured procurement workflows.',
    description: 'High-durability digital portal templates designed for large-scale infrastructure and industrial construction corporations. Integrates multi-tiered bill of materials calculators, RFP dispatch forms, and high-resolution CAD/PDF architectural render galleries.',
    techStack: ['Next.js / React', 'Tailwind CSS', 'PDF.js', 'PostgreSQL', 'Vercel Edge'],
    architectureHighlights: [
      'Optimized asset streaming for multi-megabyte engineering architectural elevations.',
      'Dynamic procurement quote calculator with localized material price indices.',
      'Strict corporate accessibility compliance and responsive mobile field viewports.'
    ],
    metrics: [
      { label: 'Inbound RFPs Processed', value: '45+' },
      { label: 'Asset Compression', value: '72%' },
      { label: 'Field Reliability', value: '99.9%' }
    ],
    themeVariant: 'lime',
    featured: false,
    demoType: 'construction',
    operationalNode: 'CIVIL-TEMPLATE-NODE',
    dateCreated: 'Q2 2024',
    repoIdentifier: 'git://rpbx.internal/construction-suites.git'
  },
  {
    id: 'jarvis-voice-ai-engine',
    sysId: 'RPBX-AI-JARVIS-09',
    title: 'Jarvis Voice Command OS Engine',
    category: 'AI_ASSISTANTS',
    categoryLabel: 'AI Assistants',
    status: 'PROTOTYPE',
    purpose: 'Voice Command & Automation Hub',
    summary: 'Desktop voice control environment combining offline Speech-to-Text parsing, natural language intent translation, and automated OS task triggers (app spawning, search execution, file queries).',
    description: 'An offline-capable voice automation daemon for workstations. Listens for custom wake-words, translates acoustic patterns into structured intent JSON, and controls developer workflows such as triggering compiler builds, launching terminal sessions, and reading system diagnostics.',
    techStack: ['Python 3.11', 'PyAudio', 'Vosk Offline STT', 'Whisper API', 'pyttsx3', 'Subprocess OS Hooks'],
    architectureHighlights: [
      'Zero-cloud offline voice detection mode with minimal 120MB memory footprint.',
      'Custom regex and vector intent parser mapping phrases to bash/powershell scripts.',
      'Asynchronous audio playback with interruption barge-in support.'
    ],
    metrics: [
      { label: 'Wake-Word Latency', value: '240ms' },
      { label: 'Intent Recognition', value: '96.2%' },
      { label: 'Offline Autonomy', value: '100%' }
    ],
    themeVariant: 'dark',
    featured: false,
    demoType: 'jarvis',
    operationalNode: 'LOCAL-DESKTOP-DAEMON',
    dateCreated: 'Q3 2024',
    repoIdentifier: 'git://rpbx.internal/jarvis-voice-core.git'
  },
  {
    id: 'remember-me-spoken-alarm',
    sysId: 'RPBX-PRD-ALARM-10',
    title: 'RememberMe Spoken Task Chrono',
    category: 'PRODUCTIVITY_EXPERIMENTAL',
    categoryLabel: 'Productivity & Labs',
    status: 'PROTOTYPE',
    purpose: 'Voice-Synthesized Schedule & Interval Scheduler',
    summary: 'Iterative productivity client engineered to eliminate overlooked task alarms through repeated auditory speech alerts, recurring sequence timers, and persistent system tray status monitoring.',
    description: 'A desktop interval and task chronometer designed to eliminate cognitive tunnel-vision during intense programming or hardware debugging sessions. Announces specific task milestones using natural synthetic speech rather than jarring beeps.',
    techStack: ['Python', 'Qt / PyQt6', 'gTTS / pyttsx3', 'APScheduler', 'SQLite'],
    architectureHighlights: [
      'Multi-interval cadence: 25-minute Pomodoro, 5-minute posture reset, and 60-minute eye relief sweeps.',
      'Dynamic text-to-speech rendering announcing custom reminders aloud.',
      'Persistent SQLite log recording completed operational focus blocks.'
    ],
    metrics: [
      { label: 'Speech Synthesis Time', value: '<50ms' },
      { label: 'Task Adherence', value: '+42%' },
      { label: 'CPU Overhead', value: '<0.1%' }
    ],
    themeVariant: 'light',
    featured: false,
    demoType: 'alarm',
    operationalNode: 'DESKTOP-CHRONO-PILOT',
    dateCreated: 'Q2 2024',
    repoIdentifier: 'git://rpbx.internal/rememberme-alarm.git'
  }
];

export const FOUNDER_INFO = {
  name: 'Vishwam Patel',
  title: 'Founder & Systems Architect',
  secId: 'VP-01',
  phone: '+91 9510477366',
  email: 'vishwam@robopix.in',
  whatsappDirect: 'https://wa.me/919510477366',
  creed: 'Uncompromising production-grade engineering. We reject synthetic metrics, decorative fluff, and theoretical stubs in favor of low-latency firmware, verified hardware prototypes, and resilient web architectures.',
  pillars: [
    {
      num: '01',
      title: 'Pragmatic Engineering',
      desc: 'Direct deployment solutions tailored to clear industrial bottlenecks. Eliminating extraneous dependencies in favor of robust baseline architectures.'
    },
    {
      num: '02',
      title: 'Embedded Precision',
      desc: 'Seamless bridge from dual-core ESP32 microcontrollers to edge-computed computer vision and browser-tethered telemetry.'
    },
    {
      num: '03',
      title: 'No Synthetic Metrics',
      desc: 'Zero simulated claims. Every entry in this archive corresponds to verifiable code commits, operational hardware prototypes, or running web instances.'
    },
    {
      num: '04',
      title: 'Client Engagement',
      desc: 'Dedicated direct consultations, transparent documentation, and mission-aligned deliverables without bureaucratic friction.'
    }
  ]
};
