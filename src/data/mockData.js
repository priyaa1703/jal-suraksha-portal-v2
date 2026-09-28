// All values in this file are MOCK / DEMO DATA for the Jal Suraksha hackathon
// prototype (SIH PS 26040, Team Ampora26). Nothing here is a real sensor
// reading or an official Government of Jharkhand measurement.
//
// Site profiles, treatment modules and sensor set follow the team's SIH idea
// presentation: ESP32 + pH / turbidity / TDS / temperature / ORP sensors,
// adaptive Light Path vs Full Treatment Path, region-specific fluoride and
// heavy-metal modules, selective UF / RO, UV-C as the final stage, and
// periodic Fe / F- / As strip-test verification.

export const newsTickerItems = [
  'Smart Water Quality Monitoring System — Demo Monitoring Portal',
  'ESP32 decision engine selects Light Path or Full Treatment Path from live sensor readings',
  'UV-C disinfection is the final stage on every treatment path',
  'Prototype demonstration data',
]

export const navItems = [
  'HOME',
  'ABOUT US',
  'MONITORING',
  'WATER QUALITY',
  'PURIFICATION',
  'REPORTS',
  'ALERTS',
  'CITIZEN SERVICES',
  'HELP',
  'CONTACT US',
  'LINKS',
]

export const importantLinks = [
  'Dashboard',
  'Water Quality Monitoring',
  'Treatment Path & Purification',
  'Monitoring Sites',
  'Sensor Status',
  'Alerts & Notifications',
  'Daily Reports',
  'Weekly Reports',
  'Water Safety Status',
  'Manual Verification (Strip Tests)',
  'Filter & System Maintenance',
  'Citizen Feedback',
  'Help & Support',
]

// Monitoring sites. `modules` = region-specific modules installed after the
// initial site survey. `raw` = inlet (sensor) readings, `treated` = outlet
// readings used for post-treatment verification. Light-path sites only get
// UV-C, so treated readings equal raw readings there.
export const sites = [
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    district: 'Dhanbad',
    block: 'Govindpur',
    unit: 'Mining-Affected Community Water Treatment Unit',
    profile: 'Coal belt (acid mine drainage prone)',
    modules: ['heavyMetal'],
    status: 'online',
    x: 62,
    y: 46,
    lastUpdated: '27 September 2026 | 04:55 PM',
    raw: { pH: 5.82, turbidity: 7.6, tds: 486, temperature: 27.6, orp: 118 },
    treated: { pH: 7.21, turbidity: 1.3, tds: 452, temperature: 27.6, orp: 312 },
    strips: {
      date: '26 Sep 2026',
      fe: { raw: 1.6, treated: 0.1 },
      f: { raw: 0.6, treated: 0.4 },
      as: { raw: 0, treated: 0 },
    },
    tankLevel: 78,
    safetyScore: 94,
    production: { raw: 1840, purified: 1710, people: 126, uptime: 98.7 },
  },
  {
    id: 'bokaro',
    name: 'Bokaro',
    district: 'Bokaro',
    block: 'Chas',
    unit: 'Community Water Treatment Unit',
    profile: 'Coal belt',
    modules: ['heavyMetal'],
    status: 'online',
    x: 50,
    y: 50,
    lastUpdated: '27 September 2026 | 04:40 PM',
    raw: { pH: 6.9, turbidity: 4.1, tds: 1180, temperature: 28.1, orp: 240 },
    treated: { pH: 7.3, turbidity: 0.9, tds: 258, temperature: 28.1, orp: 330 },
    strips: {
      date: '26 Sep 2026',
      fe: { raw: 0.9, treated: 0.1 },
      f: { raw: 0.8, treated: 0.5 },
      as: { raw: 0, treated: 0 },
    },
    tankLevel: 64,
    safetyScore: 91,
    production: { raw: 2200, purified: 1540, people: 168, uptime: 97.9 },
  },
  {
    id: 'ranchi',
    name: 'Ranchi',
    district: 'Ranchi',
    block: 'Namkum',
    unit: 'Community Water Treatment Unit',
    profile: 'General (core platform only)',
    modules: [],
    status: 'online',
    x: 38,
    y: 58,
    lastUpdated: '27 September 2026 | 04:50 PM',
    raw: { pH: 7.22, turbidity: 2.1, tds: 340, temperature: 26.9, orp: 310 },
    treated: { pH: 7.22, turbidity: 2.1, tds: 340, temperature: 26.9, orp: 310 },
    strips: {
      date: '25 Sep 2026',
      fe: { raw: 0.2, treated: 0.2 },
      f: { raw: 0.3, treated: 0.3 },
      as: { raw: 0, treated: 0 },
    },
    tankLevel: 82,
    safetyScore: 96,
    production: { raw: 1600, purified: 1600, people: 142, uptime: 99.2 },
  },
  {
    id: 'ramgarh',
    name: 'Ramgarh',
    district: 'Ramgarh',
    block: 'Patratu',
    unit: 'Community Water Treatment Unit',
    profile: 'Coal belt',
    modules: ['heavyMetal'],
    status: 'warning',
    x: 44,
    y: 44,
    lastUpdated: '27 September 2026 | 04:32 PM',
    raw: { pH: 7.0, turbidity: 9.4, tds: 420, temperature: 28.4, orp: 205 },
    treated: { pH: 7.1, turbidity: 5.6, tds: 401, temperature: 28.4, orp: 258 },
    strips: {
      date: '26 Sep 2026',
      fe: { raw: 1.9, treated: 0.6 },
      f: { raw: 0.5, treated: 0.4 },
      as: { raw: 0, treated: 0 },
    },
    tankLevel: 41,
    safetyScore: 68,
    production: { raw: 1500, purified: 1350, people: 98, uptime: 93.4 },
  },
  {
    id: 'giridih',
    name: 'Giridih',
    district: 'Giridih',
    block: 'Dumri',
    unit: 'Community Water Treatment Unit',
    profile: 'Mica belt (fluoride prone)',
    modules: ['fluoride'],
    status: 'online',
    x: 58,
    y: 32,
    lastUpdated: '27 September 2026 | 04:47 PM',
    raw: { pH: 7.5, turbidity: 5.8, tds: 410, temperature: 26.2, orp: 255 },
    treated: { pH: 7.4, turbidity: 1.0, tds: 372, temperature: 26.2, orp: 300 },
    strips: {
      date: '26 Sep 2026',
      fe: { raw: 0.4, treated: 0.1 },
      f: { raw: 2.1, treated: 0.8 },
      as: { raw: 0, treated: 0 },
    },
    tankLevel: 70,
    safetyScore: 93,
    production: { raw: 1320, purified: 1235, people: 87, uptime: 98.1 },
  },
  {
    id: 'west-singhbhum',
    name: 'West Singhbhum',
    district: 'West Singhbhum',
    block: 'Chakradharpur',
    unit: 'Community Water Treatment Unit',
    profile: 'General (core platform only)',
    modules: [],
    status: 'online',
    x: 30,
    y: 78,
    lastUpdated: '27 September 2026 | 04:50 PM',
    raw: { pH: 7.1, turbidity: 2.6, tds: 360, temperature: 27.4, orp: 285 },
    treated: { pH: 7.1, turbidity: 2.6, tds: 360, temperature: 27.4, orp: 285 },
    strips: {
      date: '25 Sep 2026',
      fe: { raw: 0.1, treated: 0.1 },
      f: { raw: 0.3, treated: 0.3 },
      as: { raw: 0, treated: 0 },
    },
    tankLevel: 75,
    safetyScore: 97,
    production: { raw: 1400, purified: 1400, people: 115, uptime: 99.0 },
  },
  {
    id: 'hazaribagh',
    name: 'Hazaribagh',
    district: 'Hazaribagh',
    block: 'Katkamsandi',
    unit: 'Community Water Treatment Unit',
    profile: 'Coal belt',
    modules: ['heavyMetal'],
    status: 'offline',
    x: 40,
    y: 30,
    lastUpdated: '27 September 2026 | 01:12 PM',
    raw: null,
    treated: null,
    strips: null,
    tankLevel: null,
    safetyScore: null,
    production: null,
  },
]

export const DEFAULT_SITE_ID = 'dhanbad'

// Sensor array (site-independent health / calibration info)
export const sensors = [
  { key: 'pH', name: 'pH Sensor', health: 98, calibrationDays: 21 },
  { key: 'turbidity', name: 'Turbidity Sensor', health: 96, calibrationDays: 14 },
  { key: 'tds', name: 'TDS Sensor', health: 99, calibrationDays: 30 },
  { key: 'temperature', name: 'Temperature Sensor', health: 100, calibrationDays: 60 },
  { key: 'orp', name: 'ORP Sensor', health: 94, calibrationDays: 7 },
]

// Filter / media / lamp condition (site-independent demo values)
export const maintenance = [
  { name: 'Sediment Filter', condition: 82, days: 14 },
  { name: 'pH Neutralization Media (limestone / calcite)', condition: 76, days: 21 },
  { name: 'Activated Carbon', condition: 88, days: 21 },
  { name: 'Iron-Removal Media', condition: 71, days: 9 },
  { name: 'Activated Alumina (fluoride module)', condition: 90, days: 45, module: 'fluoride' },
  { name: 'Ion-Exchange Resin (heavy-metal module)', condition: 87, days: 40, module: 'heavyMetal' },
  { name: 'UF Membrane', condition: 93, days: 60 },
  { name: 'RO Membrane', condition: 89, days: 36 },
  { name: 'UV-C Lamp', condition: 92, days: 120 },
]

export const whatsNew = [
  'ORP sensor added to the monitoring array',
  'Region modules configured per site survey',
  'Post-treatment verification active on all paths',
  'Manual strip-test (Fe / F- / As) log updated',
  'Sensor calibration scheduled',
]

export const alerts = [
  {
    title: 'AMD DETECTED — pH NEUTRALIZATION ACTIVE',
    location: 'Dhanbad Unit, Govindpur',
    value: 'pH 5.82',
    severity: 'warning',
    label: 'WARNING',
  },
  {
    title: 'HIGH TDS — RO ENGAGED',
    location: 'Bokaro Unit',
    value: '1,180 mg/L',
    severity: 'warning',
    label: 'WARNING',
  },
  {
    title: 'FLUORIDE MODULE ACTIVE',
    location: 'Giridih Unit',
    value: 'Strip test F- 2.1 mg/L',
    severity: 'info',
    label: 'INFO',
  },
  {
    title: 'POST-TREATMENT CHECK FAILED — RE-TREAT',
    location: 'Ramgarh Unit',
    value: 'Turbidity 5.6 NTU',
    severity: 'danger',
    label: 'CRITICAL',
  },
  {
    title: 'UNIT OFFLINE — NO SENSOR DATA',
    location: 'Hazaribagh Unit',
    value: 'Last seen 01:12 PM',
    severity: 'offline',
    label: 'OFFLINE',
  },
]

export const aboutSystem = {
  heading: 'ABOUT JAL SURAKSHA',
  body: 'Jal Suraksha is a proposed smart, modular water purification and quality monitoring system for rural and mining-affected regions of Jharkhand. It monitors incoming water in real time, automatically selects the treatment path the water needs, adds region-specific treatment modules where local geology requires them, and verifies the treated water before it is delivered.',
  pillars: [
    {
      title: 'ADAPTIVE TREATMENT',
      text: 'ESP32 reads pH, turbidity, TDS, temperature and ORP and selects a Light Path or Full Treatment Path.',
    },
    {
      title: 'REGION-SPECIFIC MODULES',
      text: 'Fluoride and heavy-metal modules are added per site survey; UF or RO is chosen by TDS.',
    },
    {
      title: 'UV-C + IoT VERIFICATION',
      text: 'UV-C is the final stage on every path, followed by post-treatment checks, alerts and a strip-test log.',
    },
  ],
}

export const reports = [
  'Daily Water Quality Report',
  'Weekly Purification Report',
  'Sensor Health Report',
  'Alert History',
  'Site Performance Report',
  'Manual Verification (Strip Test) Log',
]

export const footerData = {
  about: ['Jal Suraksha', 'Smart Water Quality Monitoring'],
  links: ['Dashboard', 'Water Quality', 'Reports', 'Alerts'],
  contact: ['Department of Higher & Technical Education', 'Government of Jharkhand'],
  help: ['Accessibility', 'Contact', 'Feedback'],
  psLine: 'Problem Statement ID: 26040 | Team: Ampora26',
  disclaimer:
    'Prototype Demonstration — All displayed readings are simulated/mock data and do not represent official Government of Jharkhand measurements.',
}

// Minimal bilingual labels used to demonstrate the Hindi / English toggle.
export const translations = {
  en: {
    siteTitle: 'WATER QUALITY MONITORING & PURIFICATION',
    siteSubtitle: 'Government of Jharkhand, India',
    nav: navItems,
  },
  hi: {
    siteTitle: 'जल गुणवत्ता निगरानी एवं शुद्धिकरण',
    siteSubtitle: 'झारखंड सरकार, भारत',
    nav: [
      'होम',
      'हमारे बारे में',
      'निगरानी',
      'जल गुणवत्ता',
      'शुद्धिकरण',
      'रिपोर्ट',
      'अलर्ट',
      'नागरिक सेवाएं',
      'सहायता',
      'संपर्क करें',
      'लिंक',
    ],
  },
}
