# Jal Suraksha — Water Quality Monitoring & Purification Portal
LIVE WEBSITIE LINK:https://jal-suraksha-portal.vercel.app/

Hackathon prototype for SIH Problem Statement ID 26040 — "Smart Water
Purification and Quality Monitoring System for Rural and Mining-Affected
Areas" (Government of Jharkhand, Department of Higher & Technical Education).
Team: Ampora26.

Built with React + Vite. All readings, alerts, and stats shown are
mock/demo data — nothing here is a real sensor feed.

## Run locally

npm install
npm run dev

Open the localhost URL it prints (usually http://localhost:5173).

## Build for production

npm run build
npm run preview

## What the demo shows

Pick a site from the "Monitoring Site" dropdown (or click a map marker).
The dashboard mirrors the ESP32 logic from the idea presentation:

- Five sensors: pH, turbidity, TDS, temperature, ORP
- All readings within limits -> Light Path (UV-C only)
- Any reading out of limits -> Full Treatment Path: sediment filter,
  pH neutralization, activated carbon, iron removal, then the region modules
  installed at that site (fluoride / heavy-metal), then UF, or RO if TDS is high
- UV-C on every path, then post-treatment verification (pass, or re-treat alert)
- Manual Fe / F- / As strip-test log, sensor health, filter maintenance

Try: Dhanbad (acidic water, full path + UF), Bokaro (high TDS, RO engaged),
Ranchi (light path), Giridih (fluoride module), Ramgarh (post-treatment
check fails), Hazaribagh (offline).

## Structure

- src/data/mockData.js — all mock data (sites, sensors, alerts, ...)
- src/logic/decisionEngine.js — routing rules, limits, stage states
- src/components/ — one component per portal section
- src/App.jsx — wires everything together
- src/index.css — all styling / color palette

## Disclaimer

All water quality readings, alerts, and statistics are simulated
demo data and do not represent official measurements.
