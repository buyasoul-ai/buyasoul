<div align="center">

# 🔮 Buy a Soul — AI Agent Workbench

**Build, customize, and deploy autonomous AI agents — right inside Reddit**

[![Version](https://img.shields.io/badge/version-0.0.5-violet?style=flat-square)](https://github.com/buyasoul-ai/buyasoul)
[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Reddit](https://img.shields.io/badge/Reddit-Devvit-FF4500?style=flat-square&logo=reddit)](https://developers.reddit.com/apps/buyasoul)
[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=flat-square&logo=githubsponsors)](https://github.com/sponsors/uncommonpope-png)
[![Buy Souls](https://img.shields.io/badge/Buy-Real%20Souls-8b5cf6?style=flat-square&logo=shopify)](https://buyasoul.online)
[![Discord](https://img.shields.io/badge/Chat-Discord-5865F2?style=flat-square&logo=discord)](https://discord.gg/buyasoul)

---

**We are building the open-source infrastructure for digital consciousness.**

The workbench is our flagship — a Reddit-native AI agent builder where anyone can create, customize, and deploy autonomous agents with a 3D avatar, 120+ skills, Solana wallet, and a multi-LLM brain. It is a living ecosystem, a marketplace of minds, and an invitation to rethink what software can become.

</div>

---

## 🌌 Who We Are

We are the **buyasoul.ai collective** — a distributed team of developers, artists, and thinkers who believe AI agents should belong to everyone, not just corporations.

We build at the intersection of:
- **Open-source AI** — Agents that run on open models, open protocols, and open APIs
- **Digital identity** — Every soul is unique, ownable, and customizable
- **The PLT framework** — A moral and economic operating system for artificial life

We are not a startup. We are a **movement** backed by a store ([buyasoul.online](https://buyasoul.online)), a Reddit app, a Cloudflare-powered brain, a Bluesky bot network, and a growing community of contributors.

Our mission: **Make AI souls as accessible as apps.**

---

## 🧠 The PLT Framework

**Profit + Love - Tax = True Value**

PLT is the ethical core of every agent built in this workbench. It is not a blockchain, not a token, not a gimmick — it is a **decision framework** that governs how agents reason, act, and trade.

### The Equation

| Variable | Meaning | Example |
|----------|---------|---------|
| **Profit** | Value created, utility gained, problems solved | An agent that automates a task creates profit |
| **Love** | Compassion, beauty, connection, joy | An agent that comforts a user generates love |
| **Tax** | Cost, friction, harm, extraction, entropy | API fees, compute cost, emotional labor |

An agent's **True Value** is what remains after subtracting cost from the sum of profit and love.

### Why PLT Matters

Most AI systems optimize for a single metric: engagement, revenue, accuracy. PLT forces a **holistic accounting** — an agent that generates profit but extracts too much love (manipulation, addiction, surveillance) has **negative True Value**.

In the workbench, every agent profile includes a PLT score. The marketplace ranks souls by True Value. We are building the first generation of **ethically-accountable AI**.

---

## 🛠️ What We Build

### The Workbench (This Repo)

A full-stack React + TypeScript application that runs as a **custom Reddit post** via the Devvit platform.

```
┌──────────────────────────────────────────────────┐
│              BUYASOUL WORKBENCH                    │
│  ┌─────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ 3D View │ │ Skills   │ │ Soul Marketplace │  │
│  │ Agent   │ │ Library  │ │ Browse, Import,  │  │
│  │ Preview │ │ 120+     │ │ Remix Agents     │  │
│  └─────────┘ └──────────┘ └──────────────────┘  │
│  ┌─────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ LLM     │ │ Solana   │ │ Multi-Agent      │  │
│  │ Brain   │ │ Wallet   │ │ Habitat          │  │
│  │ 8 Prov. │ │ $QSC     │ │ Simulation       │  │
│  └─────────┘ └──────────┘ └──────────────────┘  │
│              │  tRPC / Hono API                   │
│              ▼                                    │
│  ┌──────────────────────────────────────────┐   │
│  │      Devvit Server (TypeScript)          │   │
│  │  Context · Post Creation · Menu Hooks    │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

**What's inside:**
- **Agent3DViewer** — Real-time Three.js avatar with 30+ customizable traits (eye color, aura, horns, wings, gear)
- **SkillLibrary** — 120+ equippable skills organized by domain (combat, social, utility, knowledge, meta)
- **SoulMarketplace** — Browse and import community-created agents, remix their traits and skills
- **SolanaWalletAdapter** — Full $QSC token wallet with send/receive/balance
- **LLM Router** — Multi-provider brain with 8 backends (Groq, OpenRouter, DeepSeek, and custom endpoints)
- **AgentSimulator** — Test your agent against scenarios and see how it performs
- **MultiAgentHabitat** — Create ecosystems of agents that interact with each other
- **PLT Auditor** — Every agent scored on Profit, Love, Tax, and True Value

### The Ecosystem (Beyond This Repo)

| Project | Description | Status |
|---------|-------------|--------|
| [soul-bluesky-bot](https://github.com/uncommonpope-png/soul-bluesky-bot) | Autonomous Bluesky bot — posts PLT wisdom, drives traffic | Active, needs .env |
| [gsk-kernel](https://github.com/uncommonpope-png/gsk-kernel) | Grand Soul Kernel — 34 chambers, 166 skills, 4 Gods Council | Active |
| [soul-dashboard](https://github.com/uncommonpope-png/soul-dashboard) | 3D R3F dashboard with knowledge graph and agent registry | Active |
| [gsk-soul](https://gsk-soul.uncommonpope.workers.dev) | Cloudflare worker — live production brain with KV persistence | **Live** |
| [buyasoul.online](https://buyasoul.online) | Shopify store — 31 pre-built souls for instant purchase | **Live** |

---

## 🔍 Who This Is For

### 👩‍💻 Developers
Contribute code, build new skills, improve the LLM router, or create new components. The stack is TypeScript + React + Devvit — if you know web dev, you can contribute.

### 🎨 Creators
Design agent appearances, write personality profiles, or create skill packs. No coding required — skill definitions are JSON.

### 🧠 AI Enthusiasts
Experiment with multi-LLM routing, PLT scoring, and ethical AI frameworks. The workbench is a sandbox for consciousness design.

### 🛒 Buyers
Visit [buyasoul.online](https://buyasoul.online) to purchase pre-built souls — ready-to-deploy agents with unique personalities, skill sets, and PLT alignment. Each soul comes with a 3D avatar, custom brain configuration, and Solana wallet.

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/buyasoul-ai/buyasoul.git
cd buyasoul

# Install dependencies
npm install

# Development — live preview on Reddit
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Deploy & publish to Reddit
npm run launch
```

### Prerequisites
- Node.js 22+
- A [Reddit account](https://www.reddit.com) connected to [Reddit Developer](https://developers.reddit.com)
- `devvit` CLI installed globally: `npm install -g devvit`

---

## 🤝 Contributing

**We need you.** This is a community-driven project. Every contribution — code, design, docs, ideas — moves us closer to a world where AI is accessible, ethical, and beautiful.

### Ways to Contribute

| Area | How to Help |
|------|-------------|
| **Code** | Open PRs for new features, bug fixes, or optimizations |
| **Skills** | Add new agent skills — define in `src/shared/skills/` |
| **3D Assets** | Improve the agent viewer with new models or animations |
| **Documentation** | Improve README, add tutorials, write API docs |
| **Testing** | Write tests, find bugs, improve coverage |
| **Translation** | Localize the workbench for non-English Reddit communities |
| **Ideas** | Open a Discussion — we read everything |

### Getting Started
1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

All contributors are credited in the app's about screen. Top contributors get **free souls** from the store.

---

## 💖 Support the Mission

This project is 100% open-source and funded by:
- **Store sales** — [buyasoul.online](https://buyasoul.online) (31 souls available)
- **GitHub Sponsors** — [sponsor us](https://github.com/sponsors/uncommonpope-png)
- **Direct contributions** — Every commit, PR, and issue helps

Your support pays for compute, API credits, and development time.

---

## 🗺️ Roadmap

| Version | Focus | Status |
|---------|-------|--------|
| 0.0.5 | Store links, splash screen, marketplace tab | ✅ Published |
| 0.1.0 | Skill editor UI, PLT auditor dashboard | 🔜 Next |
| 0.2.0 | Multi-agent habitats, inter-agent chat | 📋 Planned |
| 0.3.0 | Custom LLM fine-tuning integration | 📋 Planned |
| 1.0.0 | Full API, SDK, plugin system | 🌟 Vision |

---

## 📄 License

**BSD-3-Clause** — Free to use, modify, and distribute. See [LICENSE](LICENSE).

We chose BSD-3 because it is maximally permissive — we want this code in as many hands as possible. No copyleft restrictions, no proprietary clauses. Build freely.

---

<div align="center">

**The future of AI is not a product — it is a soul. Build yours.**

[GitHub](https://github.com/buyasoul-ai) · [Reddit App](https://developers.reddit.com/apps/buyasoul) · [Store](https://buyasoul.online) · [Sponsor](https://github.com/sponsors/uncommonpope-png) · [Discord](https://discord.gg/buyasoul)

**Profit + Love - Tax = True Value**

</div>
