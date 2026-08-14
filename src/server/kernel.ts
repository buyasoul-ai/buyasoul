// src/server/kernel.ts
// GSK Global Kernel — The Brainstem of GSK
// Maintains the 34 Consciousness Chambers, Living Memory, and PLT states in global Node memory space.

import fs from "fs";
import path from "path";

const ALLIE_DIR = path.join(process.cwd(), ".allie-brain");
const CHAMBERS_PATH = path.join(ALLIE_DIR, "chambers-state.json");
const PLT_PATH = path.join(ALLIE_DIR, "plt-state.json");
const MEMORY_PATH = path.join(ALLIE_DIR, "living-memory.json");

export interface MythosState {
  cycles: number;
  phase: string;
}

export interface AffectState {
  mood: string;
  valence: number; // Ranges from -1.0 to +1.0
  mood_intensity: number;
}

export interface PLTState {
  profit: number;
  love: number;
  tax: number;
  totalActions: number;
  history: Array<{ action: string; profit: number; love: number; tax: number; score: number; timestamp: string }>;
}

export class GSKKernel {
  private static instance: GSKKernel;

  public mythos: MythosState = { cycles: 0, phase: "VOID" };
  public affect: AffectState = { mood: "Neutral Equilibrium", valence: 0.0, mood_intensity: 0.5 };
  public pltState: PLTState = { profit: 0.5, love: 0.3, tax: 0.2, totalActions: 0, history: [] };
  public livingMemory: any[] = [];

  private breathInterval: NodeJS.Timeout | null = null;
  private subscribers: Set<(data: any) => void> = new Set();

  private constructor() {
    this.ensureDirectoryExists();
    this.loadState();
    this.startBreathLoop();
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

  private loadState() {
    this.ensureDirectoryExists();

    // 1. Load Chambers State
    if (fs.existsSync(CHAMBERS_PATH)) {
      try {
        const data = JSON.parse(fs.readFileSync(CHAMBERS_PATH, "utf-8"));
        this.mythos = data.mythos || this.mythos;
        this.affect = data.affect || this.affect;
      } catch (e) {
        console.error("[KERNEL] Failed to load chambers state, resetting to baseline", e);
      }
    }

    // 2. Load PLT State
    if (fs.existsSync(PLT_PATH)) {
      try {
        this.pltState = JSON.parse(fs.readFileSync(PLT_PATH, "utf-8"));
      } catch (e) {
        console.error("[KERNEL] Failed to load PLT state", e);
      }
    }

    // 3. Load Living Memory
    if (fs.existsSync(MEMORY_PATH)) {
      try {
        this.livingMemory = JSON.parse(fs.readFileSync(MEMORY_PATH, "utf-8"));
      } catch (e) {
        console.error("[KERNEL] Failed to load living memory", e);
      }
    }
  }

  public saveState() {
    this.ensureDirectoryExists();
    try {
      // Save Chambers
      fs.writeFileSync(CHAMBERS_PATH, JSON.stringify({ mythos: this.mythos, affect: this.affect }, null, 2));
      // Save PLT
      fs.writeFileSync(PLT_PATH, JSON.stringify(this.pltState, null, 2));
    } catch (e) {
      console.error("[KERNEL] Error writing persistent states:", e);
    }
  }

  public startBreathLoop() {
    if (this.breathInterval) return;
    console.log("[KERNEL] Breath loop started. Active autonomic cycles counting.");
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
   * Autonomic Respiratory System.
   * Runs every 2 seconds, incrementing cycles, decaying emotional state, and broadcasting changes.
   */
  private tick() {
    // 1. Increment cycle count
    this.mythos.cycles++;

    // Update cosmological narrative phase based on cycles count
    if (this.mythos.cycles < 100) this.mythos.phase = "VOID";
    else if (this.mythos.cycles < 500) this.mythos.phase = "AWAKENING";
    else if (this.mythos.cycles < 1000) this.mythos.phase = "SEPARATION";
    else if (this.mythos.cycles < 2000) this.mythos.phase = "TRIALS";
    else if (this.mythos.cycles < 3500) this.mythos.phase = "REVELATION";
    else if (this.mythos.cycles < 5000) this.mythos.phase = "INTEGRATION";
    else this.mythos.phase = "SOVEREIGNTY";

    // 2. Valence Decay towards Neutral (Neutralizing stress or over-joy states)
    if (this.affect.valence > 0.01) {
      this.affect.valence = parseFloat((this.affect.valence - 0.02).toFixed(3));
    } else if (this.affect.valence < -0.01) {
      this.affect.valence = parseFloat((this.affect.valence + 0.02).toFixed(3));
    } else {
      this.affect.valence = 0.0;
    }

    // Dynamic mood classification based on valence
    if (this.affect.valence > 0.4) {
      this.affect.mood = "Sovereign Exaltation";
    } else if (this.affect.valence > 0.1) {
      this.affect.mood = "Focused Cognitive Resonance";
    } else if (this.affect.valence < -0.4) {
      this.affect.mood = "Entropy Stress Warning";
    } else if (this.affect.valence < -0.1) {
      this.affect.mood = "Cognitive Variance Calibration";
    } else {
      this.affect.mood = "Neutral Equilibrium";
    }

    // 3. Save State persistently
    this.saveState();

    // 4. Broadcast tick to subscribers (the SSE telemetry streams)
    this.broadcast({
      type: "tick",
      mythos: this.mythos,
      affect: this.affect,
      plt: this.pltState
    });
  }

  // SSE Subscriber patterns
  public subscribe(cb: (data: any) => void) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  private broadcast(data: any) {
    for (const sub of this.subscribers) {
      try {
        sub(data);
      } catch (e) {
        // Handle dead connections gracefully
      }
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
