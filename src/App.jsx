import { useEffect, useMemo, useState } from 'react'
import UtilityBar from './components/UtilityBar.jsx'
import DepartmentHeader from './components/DepartmentHeader.jsx'
import MainNav from './components/MainNav.jsx'
import NewsTicker from './components/NewsTicker.jsx'
import LeftSidebar from './components/LeftSidebar.jsx'
import MonitoringHero from './components/MonitoringHero.jsx'
import WaterQualityTable from './components/WaterQualityTable.jsx'
import WaterQualityChart from './components/WaterQualityChart.jsx'
import PurificationProcess from './components/PurificationProcess.jsx'
import SensorStatus from './components/SensorStatus.jsx'
import StripTestLog from './components/StripTestLog.jsx'
import MaintenanceStatus from './components/MaintenanceStatus.jsx'
import ProductionStats from './components/ProductionStats.jsx'
import AboutSystem from './components/AboutSystem.jsx'
import ReportsSection from './components/ReportsSection.jsx'
import { WhatsNew, Alerts, SafetyStatus } from './components/RightSidebar.jsx'
import MonitoringSitesMap from './components/MonitoringSitesMap.jsx'
import Footer from './components/Footer.jsx'

import {
  newsTickerItems,
  importantLinks,
  sites,
  DEFAULT_SITE_ID,
  whatsNew,
  alerts,
  aboutSystem,
  reports,
  footerData,
  translations,
} from './data/mockData.js'
import { analyze, quickStatusFor, productionFor } from './logic/decisionEngine.js'

const MIN_FONT = 13
const MAX_FONT = 19
const BASE_FONT = 15

export default function App({ initialSiteId = DEFAULT_SITE_ID }) {
  const [lang, setLang] = useState('en')
  const [fontSize, setFontSize] = useState(BASE_FONT)
  const [highContrast, setHighContrast] = useState(false)
  const [siteId, setSiteId] = useState(initialSiteId)

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`)
  }, [fontSize])

  const handleFontChange = (delta) => {
    if (delta === 0) {
      setFontSize(BASE_FONT)
    } else {
      setFontSize((f) => Math.min(MAX_FONT, Math.max(MIN_FONT, f + delta)))
    }
  }

  const site = sites.find((s) => s.id === siteId) ?? sites[0]
  const analysis = useMemo(() => analyze(site), [site])
  const quickStatus = useMemo(() => quickStatusFor(site, analysis), [site, analysis])
  const production = useMemo(() => productionFor(site), [site])

  const t = translations[lang]

  return (
    <div className={`site-shell${highContrast ? ' high-contrast' : ''}`}>
      <a href="#main-content" className="skip-link">Skip to Main Content</a>

      <UtilityBar
        lang={lang}
        setLang={setLang}
        onFontChange={handleFontChange}
        onToggleContrast={() => setHighContrast((c) => !c)}
        highContrast={highContrast}
      />

      <DepartmentHeader title={t.siteTitle} subtitle={t.siteSubtitle} />

      <MainNav key={lang} items={t.nav} />

      <NewsTicker items={newsTickerItems} />

      <main id="main-content" className="main-grid">
        <LeftSidebar links={importantLinks} quickStatus={quickStatus} siteName={site.name} />

        <div className="center-col">
          <MonitoringHero sites={sites} site={site} analysis={analysis} onSelect={setSiteId} />
          <WaterQualityTable analysis={analysis} />
          <WaterQualityChart site={site} analysis={analysis} />
          <PurificationProcess analysis={analysis} />
          <SensorStatus site={site} />
          <StripTestLog site={site} />
          <MaintenanceStatus site={site} />
          <ProductionStats rows={production} />
          <AboutSystem about={aboutSystem} />
          <ReportsSection reports={reports} />
        </div>

        <div className="right-col">
          <WhatsNew items={whatsNew} />
          <Alerts alerts={alerts} />
          <SafetyStatus site={site} analysis={analysis} />
          <MonitoringSitesMap sites={sites} selectedId={site.id} onSelect={setSiteId} analysis={analysis} />
        </div>
      </main>

      <Footer data={footerData} />
    </div>
  )
}
