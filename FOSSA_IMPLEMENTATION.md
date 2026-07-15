# FOSSA Security & Legal Implementation Plan

This document outlines the implementation plan to integrate FOSSA security scanning, vulnerability management, compliance tracking, and AI-generated code IP guardrails into the **Creative Science** repository.

---

## 1. Project Context & Objectives
This project is a React/TypeScript Vite application. The implementation focuses on:
* **Vulnerability Scanning**: Continuous tracking and remediation of CVEs in open-source dependencies.
* **License Compliance**: Policy enforcement for React, TailwindCSS, Spline, and other frontend libraries.
* **SBOM Operations**: Generating and importing Software Bill of Materials (SPDX/CycloneDX).
* **Snippet Scanning**: Matching codebase files against open-source copy-paste signatures.
* **Vendored Dependencies**: Scanning custom or legacy local directories (e.g., `legacy/`, `dist/`).
* **AI IP & Legal Guardrails**: Managing ownership, code replication, and data leakage risks associated with using AI coding assistants like Antigravity.

---

## 2. Legal Landscape of AI-Generated Code

When building with AI tools like Antigravity, we manage IP risks across three distinct categories:

### A. Ownership of Generated Code (Who owns it?)
* **Policy Context**: Under Google Cloud/Vertex AI enterprise policies, you retain all ownership rights to the prompts (inputs) and the generated code (outputs). Google does not claim IP ownership over what the agent writes.
* **Copyright Authorship**: Purely AI-generated work without human intervention cannot be copyrighted under current global copyright guidelines.
* **Implementation Strategy**: Maintain a **Human-in-the-Loop (HITL)** programming model. Human developers direct the architecture, write core React components, review pull requests, and debug. The final product is a combined work of human authorship, legally protectable under copyright.

### B. Copyleft Licensing & Code Replication (Did the AI copy someone else?)
* **The Risk**: AI models may occasionally generate code blocks substantially identical to open-source libraries governed by strict copyleft licenses (e.g., GPL, AGPL). Merging this into a proprietary application could trigger copyleft obligations.
* **Implementation Strategy**: Deploy automated license-scanning and compliance checks in the CI/CD pipeline. FOSSA scans all committed dependencies and file signatures for copyleft matches before deployment.

### C. Data Leakage (Is proprietary code training public models?)
* **The Risk**: Uploading proprietary code, database schemas, or credentials into LLM contexts could expose secrets or feed them into public datasets.
* **Implementation Strategy**: Ensure workspace-level configuration blocks model training on interactions. Enterprise account data is strictly isolated and never used to train Google’s public foundation models.

---

## 3. Configuration Setup (`.fossa.yml`)

To support snippet scanning, vendored dependencies, and package manager exclusions, create a `.fossa.yml` configuration file in the project root.

```yaml
# .fossa.yml
version: 3
cli:
  # Scan targets definition
  targets:
    - name: creative-science-frontend
      type: npm
      path: .
      # Exclude build output and test directories from scanning
      exclude:
        - node_modules
        - dist
        - public

    # Target specifically for vendored dependencies (e.g., legacy code)
    - name: creative-science-vendored
      type: raw
      path: legacy
      # Tells FOSSA to treat all files in legacy/ as vendored source code
      options:
        scan-vendored: true

# Enable snippet scanning for the source directory to prevent code replication risk
snippets:
  enabled: true
  paths:
    - src/
```

---

## 4. CI/CD Workflow Integration

The GitHub Actions workflow runs FOSSA analysis and tests on push and PR to ensure no copyleft licenses or vulnerabilities slip into `main`.

### Enhanced `.github/workflows/fossa.yml`
```yaml
name: FOSSA Security & License Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  fossa-scan:
    name: FOSSA Security Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # Install dependencies to ensure lockfiles are accurate and modern package trees are resolved
      - name: Install Dependencies
        run: npm ci

      # Run FOSSA analysis (license compliance + vulnerabilities)
      - name: Run FOSSA Analyze
        uses: fossas/fossa-action@v1
        with:
          api-key: ${{ secrets.FOSSA_API_KEY }}

      # Enforce pass/fail based on your FOSSA Organization policies
      - name: Run FOSSA Test
        run: |
          curl -H "Cache-Control: no-cache" https://raw.githubusercontent.com/fossas/fossa-cli/master/install-latest.sh | bash
          fossa test --timeout 10m
        env:
          FOSSA_API_KEY: ${{ secrets.FOSSA_API_KEY }}
```

---

## 5. Key Actions & Implementation Steps

| Step | Action Item | Responsibility | Target |
| :--- | :--- | :--- | :--- |
| **1** | Commit `.fossa.yml` to the root folder | Development Team | Immediate |
| **2** | Add `FOSSA_API_KEY` to GitHub Secrets | DevOps / Repo Admin | Immediate |
| **3** | Update `.github/workflows/fossa.yml` | DevOps / Repo Admin | Immediate |
| **4** | Initialize First Scan in FOSSA Web Dashboard | Security Lead | Post-CI run |
| **5** | Set License Policy (e.g. block GPLv3, restrict copyleft) | Legal / Compliance | Week 1 |
| **6** | Configure Vulnerability Severity Rules (e.g. block Critical/High) | Security Lead | Week 1 |

---

## 6. References & Resources
* [FOSSA CLI Configuration Docs](https://github.com/fossas/fossa-cli/blob/master/docs/references/config.md)
* [FOSSA GitHub Action Integration](https://github.com/fossas/fossa-action)
* [Project Playbook](file:///Users/lynuelx/Documents/creative%20science/FOSSA_PLAYBOOK.md)
