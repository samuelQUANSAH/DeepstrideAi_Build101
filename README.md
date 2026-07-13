# BlindLabs.Dev — Agentic Systems for the Physical Frontier

Welcome to the official repository for **BlindLabs.Dev**. This project hosts the client-ready, ultra-modern, cinematic web platform for BlindLabs.Dev—showcasing advanced agentic intelligence systems that move from digital reasoning into physical-world execution, with future-facing research into quantum-inspired computing.

---

## Technical Stack

This application is built with a modern, high-performance web development stack:

* **Framework**: React + Vite + TypeScript (SPA)
* **Styling**: Tailwind CSS v4 (incorporating custom design tokens and SpaceX-inspired dark luxury theme)
* **Animations**: Framer Motion
* **Architecture Diagrams**: React Flow (`@xyflow/react` v12) for dynamic multi-agent pipeline rendering
* **Icons**: Lucide React

---

## Directory Structure

```text
/
├── .agents/                    <- Agent customization and local skills definition
│   └── skills/
│       └── deepstride-ai-website-builder/ <- Custom site builder directives
├── legacy/                     <- Archive of the legacy e-commerce codebase
├── public/                     <- Static assets (icons, SVGs, favicon)
├── src/
│   ├── App.tsx                 <- Main application component (state client-side routing)
│   ├── main.tsx                <- App bootstrap entry point
│   ├── index.css               <- Tailwind CSS v4 directives and theme variables
│   ├── components/
│   │   ├── layout/             <- Navbar and Footer layout shells
│   │   └── sections/           <- Homepage components (Hero, React Flow architecture, forms)
│   ├── data/
│   │   └── siteContent.ts      <- Centralized copy config for easy modification
│   ├── pages/                  <- Tab-routed screens (Home, Systems, Research, About, Contact)
│   └── orchestrator.py         <- Python orchestrator using Google Antigravity SDK
├── package.json                <- Project manifest and dependency declarations
├── vite.config.ts              <- Vite config with Tailwind CSS v4 plugin
└── tsconfig.json               <- TypeScript compilation specifications
```

---

## Quick Start & Execution

### 1. Install Dependencies
Make sure you have Node.js 18+ installed on your system. Run:
```bash
npm install
```

### 2. Start Local Development Server
Boot up the fast Vite dev server locally:
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to inspect the application, test nav routing, and view interactive dashboard logs.

### 3. Production Compilation
Verify build integrity and compile production assets:
```bash
npm run build
```

---

## Security & Governance Guardrails

The website demonstrates BlindLabs.Dev's core architectural guidelines:
* **Control before Autonomy**: No critical action executes without operator validation.
* **Least Privilege**: Key environment details are kept isolated from direct LLM contexts.
* **Human-in-the-Loop**: Interactive contact waitlists, visual approval flow gates, and safe execution boundaries are highlighted on the live portal page.
