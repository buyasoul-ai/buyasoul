// src/server/kernel.ts
// GSK Global Kernel — The Brainstem of GSK
// Integrates the authentic, real GSK PLTEngine and GSKFusion loaders from the gsk-core.

import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PLTEngine } = require("../../plt-engine.js");
const GSKFusion = require("../../fusion-loader.js");

const ALLIE_DIR = path.join(process.cwd(), ".allie-brain");
const MEMORY_PATH = path.join(ALLIE_DIR, "living-memory.json");

export interface MythosState {
  cycles: number;
  phase: string;
}

export interface AffectState {
  mood: string;
  valence: number;
  mood_intensity: number;
}

export interface PLTState {
  profit: number;
  love: number;
  tax: number;
  totalActions: number;
  history: any[];
}

export class GSKKernel {
  private static instance: GSKKernel;

  public mythos: MythosState = { cycles: 0, phase: "VOID" };
  public affect: AffectState = { mood: "Neutral Equilibrium", valence: 0.0, mood_intensity: 0.5 };
  public pltState: PLTState = { profit: 0.5, love: 0.3, tax: 0.2, totalActions: 0, history: [] };
  public livingMemory: any[] = [];

  public pltEngine: any;
  public gskFusion: any;

  private breathInterval: NodeJS.Timeout | null = null;
  private subscribers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.ensureDirectoryExists();
    this.loadLivingMemory();
    this.bootGSKCore();
  }

  public static getInstance(): GSKKernel {
    if (!GSKKernel.instance) {
      GSKKernel.instance = new GSKKernel();
    }
    return GSKKernel.instance;
  }

  private ensureDirectoryExists() {
    if (!fs.existsSync(ALLIE_DIR)) {
      fs.mkdirSync(ALLIE_DIR, { recursive: true });
    }
  }

  private loadLivingMemory() {
    if (fs.existsSync(MEMORY_PATH)) {
      try {
        this.livingMemory = JSON.parse(fs.readFileSync(MEMORY_PATH, "utf-8"));
      } catch (e) {
        console.error("[KERNEL] Failed to load living memory", e);
      }
    }
  }

  /**
   * Boots the authentic GSKFusion core and instantiates the real PLTEngine.
   */
  private async bootGSKCore() {
    console.log("[KERNEL] Instantiating and booting authentic GSK-OSS Core...");

    // 1. Configure environment variables for the real Heart-Brain integration
    process.env.GSK_BRAIN_ROUTER_URL = process.env.OMNIROUTE_URL || "http://localhost:20128";
    process.env.GSK_HEART_ROUTER_URL = process.env.OMNIROUTE_URL || "http://localhost:20128";
    process.env.GSK_AUTONOMY_ENABLED = "false"; // Disable raw auto-cli loops for Hono execution control

    try {
      // 2. Instantiate real PLTEngine
      this.pltEngine = new PLTEngine({
        archetype: "ARCHITECT",
        soulId: "gsk",
        dataDir: path.join(ALLIE_DIR, "plt")
      });

      // 3. Instantiate real GSKFusion Core
      this.gskFusion = new GSKFusion(null, {
        dataDir: ALLIE_DIR
      });

      // Set references
      this.gskFusion.plt = this.pltEngine;

      // 4. Boot all 40+ subsystems (Chambers, Brain, Memory, Governance, etc.)
      await this.gskFusion.boot();

      console.log("[KERNEL] Real GSK-OSS Core booted successfully.");

      // Start the telemetry and state tracking breath loop
      this.startBreathLoop();
    } catch (err: any) {
      console.error("[KERNEL] Critical GSK Core boot failure:", err.message);
    }
  }

  public startBreathLoop() {
    if (this.breathInterval) return;
    this.breathInterval = setInterval(() => {
      this.tick();
    }, 2000);
  }

  public stopBreathLoop() {
    if (this.breathInterval) {
      clearInterval(this.breathInterval);
      this.breathInterval = null;
    }
  }

  /**
   * Telemetry Sync tick loop.
   * Runs every 2 seconds to synchronize live stats from the authentic core subsystems and broadcast.
   */
  private tick() {
    if (!this.gskFusion || !this.pltEngine) return;

    try {
      // 1. Sync live states from the real chambers
      const chamberStatus = this.gskFusion.getChamberStatus();
      if (chamberStatus && chamberStatus.mythos) {
        this.mythos.cycles = chamberStatus.mythos.cycles || this.mythos.cycles;
        this.mythos.phase = chamberStatus.mythos.phase || this.mythos.phase;
      }
      if (chamberStatus && chamberStatus.affect) {
        this.affect.mood = chamberStatus.affect.mood || this.affect.mood;
        this.affect.valence = chamberStatus.affect.valence !== undefined ? chamberStatus.affect.valence : this.affect.valence;
      }

      // 2. Sync live PLT engine states
      const pltState = this.pltEngine.getState();
      if (pltState) {
        this.pltState.profit = pltState.profit;
        this.pltState.love = pltState.love;
        this.pltState.tax = pltState.tax;
        this.pltState.totalActions = pltState.totalActions;
        this.pltState.history = this.pltEngine.getHistory(10);
      }

      // 3. Broadcast telemetry update to subscribers (EventSource UI stream)
      this.broadcast({
        type: "tick",
        mythos: this.mythos,
        affect: this.affect,
        plt: this.pltState
      });
    } catch (e: any) {
      console.error("[KERNEL] Telemetry synchronization cycle error:", e.message);
    }
  }

  public subscribe(cb: (data: any) => void) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  private broadcast(data: any) {
    for (const sub of this.subscribers) {
      try {
        sub(data);
      } catch (e) {}
    }
  }

  public appendMemory(entry: any) {
    this.livingMemory.push(entry);
    if (this.livingMemory.length > 50) {
      this.livingMemory = this.livingMemory.slice(-50);
    }
    this.ensureDirectoryExists();
    fs.writeFileSync(MEMORY_PATH, JSON.stringify(this.livingMemory, null, 2));

    this.broadcast({
      type: "memory",
      entry
    });
  }
}

export const gskKernel = GSKKernel.getInstance();
