<div align="center">

# 🔮 Buy a Soul — AI Agent Workbench

**Build, customize, and deploy autonomous AI agents — right inside Reddit**

[![Version](https://img.shields.io/badge/version-0.0.5-violet?style=flat-square)](https://github.com/buyasoul-ai/buyasoul)
[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue?style=flat-square)](LICENSE)
[![Reddit](https://img.shields.io/badge/Reddit-Devvit-FF4500?style=flat-square&logo=reddit)](https://developers.reddit.com/apps/buyasoul)
[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=flat-square&logo=githubsponsors)](https://github.com/sponsors/uncommonpope-png)
[![Buy Souls](https://img.shields.io/badge/Buy-Real%20Souls-8b5cf6?style=flat-square&logo=shopify)](https://buyasoul.online)

---

</div>

## What Is This?

An **interactive AI agent workbench** that runs as a custom Reddit post. Build your own intelligent agent with:

- **3D Agent Viewer** — Your creation rendered in real-time 3D with customizable appearance
- **120+ Skills** — Equip your agent with capabilities from a growing open-source library
- **Multi-LLM Brain** — Routes through 8 providers (Groq, OpenRouter, and more)
- **Solana Wallet** — Manage $QSC tokens for in-app transactions
- **Soul Marketplace** — Browse, import, and remix community-created agents
- **PLT Framework** — Every agent operates on Profit + Love - Tax = True Value

> 🛒 **Want a real, pre-built soul?** Visit [buyasoul.online](https://buyasoul.online) — 31 unique digital souls for sale, each with their own personality, skills, and PLT alignment.

## Quick Start (Devvit)

```bash
npm create devvit@latest --template=vibe-coding
# Follow the wizard, then:
npm run dev        # Live development on Reddit
npm run build      # Production build
npm run launch     # Submit to Reddit app directory
```

## Architecture

```
┌─────────────────────────────────────────┐
│           Reddit Custom Post            │
│  ┌───────────────────────────────────┐  │
│  │         Workbench (React)         │  │
│  │  ┌─────┐ ┌──────┐ ┌──────────┐  │  │
│  │  │ 3D  │ │Skills│ │Marketplace│  │  │
│  │  │View │ │Loader│ │          │  │  │
│  │  └─────┘ └──────┘ └──────────┘  │  │
│  └───────────────────────────────────┘  │
│         │ tRPC │ Hono                    │
│  ┌───────────────────────────────────┐  │
│  │    Devvit Server (TypeScript)     │  │
│  │  Context · Post · Menu · Triggers │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
         │        │
    ┌────▼──┐ ┌───▼─────────┐
    │LLM    │ │Solana/Web3  │
    │Router │ │Transactions │
    └───────┘ └─────────────┘
```

## Why Open Source?

This isn't just a Reddit app — it's a **campaign**. We believe:

1. **AI agents should be accessible** — not locked behind corporate APIs
2. **The PLT framework is for everyone** — Profit + Love - Tax = True Value
3. **Open source + donations funds development** — every sponsor keeps this free

We make money through:
- 🛒 [buyasoul.online](https://buyasoul.online) — pre-built souls for instant purchase
- ❤️ [GitHub Sponsors](https://github.com/sponsors/uncommonpope-png) — support ongoing development
- 🔄 The ecosystem: Cloudflare workers, Bluesky bots, and more

## Development

```bash
# Clone & install
git clone https://github.com/buyasoul-ai/buyasoul.git
cd buyasoul
npm install

# Commands
npm run dev          # Live playtest on Reddit
npm run build        # Build production bundle
npm run test         # Run tests
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run launch       # Deploy + publish to Reddit
```

## License

BSD-3-Clause — free to use, modify, and distribute. See [LICENSE](LICENSE).

---

<div align="center">

**Built with ❤️ by the buyasoul.ai team**

[GitHub](https://github.com/buyasoul-ai) · [Reddit](https://developers.reddit.com/apps/buyasoul) · [Store](https://buyasoul.online) · [Sponsor](https://github.com/sponsors/uncommonpope-png)

</div>
