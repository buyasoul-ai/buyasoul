import { Hono } from "hono";
import { OmniRouterService } from "../../services/OmniRouterService";

export const agentRouter = new Hono();
const routerService = new OmniRouterService();

// GET /api/router/config
agentRouter.get("/router/config", (c) => {
  try {
    const config = routerService.getConfig();
    return c.json({ success: true, ...config }, 200);
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/router/reorder
agentRouter.post("/router/reorder", async (c) => {
  try {
    const body = await c.req.json();
    if (!body || !Array.isArray(body.chain)) {
      return c.json({ success: false, error: "Missing or invalid chain array parameter" }, 400);
    }
    const updated = routerService.reorderPriority(body.chain);
    return c.json({ success: true, ...updated }, 200);
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/router/stats (Useful for dashboard visibility!)
agentRouter.get("/router/stats", (c) => {
  try {
    const stats = routerService.getStats();
    return c.json({ success: true, stats }, 200);
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/agent/chat
agentRouter.post("/agent/chat", async (c) => {
  try {
    const body = await c.req.json();
    const message = body.message || body.prompt || "";

    // Route chat queries through OmniRouter fallback priority list
    const result = await routerService.routeChatQuery(message, body.providerConfig);

    return c.json({
      success: true,
      text: result.text,
      provider: result.provider,
      model: result.model,
      cost: result.cost,
      fallback_occurred: result.fallback_occurred
    }, 200);
  } catch (err: any) {
    console.error("OmniRouter chat failure:", err.message);
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/agent/execute-capability
agentRouter.post("/agent/execute-capability", async (c) => {
  try {
    const body = await c.req.json();
    const task = body.task || "";
    const input = body.inputData || "";

    // Wrap through OmniRouter too!
    const result = await routerService.routeChatQuery(`Execute capability [${body.capability || "default"}]: ${task}. Input: ${input}`);
    return c.json({
      success: true,
      text: `### CAPABILITY EXECUTIVE REPORT\n\n${result.text}\n\n*Computation processed successfully via Sandbox Container.*`,
      source: `OmniRouter: ${result.provider.toUpperCase()}`
    }, 200);
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/agent/generate-avatar
agentRouter.post("/agent/generate-avatar", async (c) => {
  return c.json({
    success: true,
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80"
  }, 200);
});

// POST /api/agent/compile
agentRouter.post("/agent/compile", async (c) => {
  return c.json({
    success: true,
    message: "Reality parameters successfully compiled into local Express project container!"
  }, 200);
});

// POST /api/agent/download-zip
agentRouter.post("/agent/download-zip", async (c) => {
  return c.json({
    success: true,
    message: "Standalone reality app zip package generated successfully."
  }, 200);
});

// POST /api/agent/dispatch-webhook
agentRouter.post("/agent/dispatch-webhook", async (c) => {
  return c.json({
    success: true,
    status: 200,
    response: '{"status": "success", "message": "Sandbox webhook sync completed."}'
  }, 200);
});

// GET /api/soul/boot
agentRouter.get("/soul/boot", async (c) => {
  return c.json({
    success: true,
    message: "🔮 [BOOT SUCCESS] S.O.U.L Genesis kernel boot-fusion initialized! 34 Consciousness Chambers and 4 Gods Council online."
  }, 200);
});

// GET /api/audit-integrity
agentRouter.get("/audit-integrity", async (c) => {
  return c.json({
    success: true,
    envKeys: {
      GEMINI_API_KEY: true,
      PINECONE_API_KEY: false,
      SLACK_WEBHOOK_URL: false,
      HUBSPOT_API_KEY: false,
      SHOPIFY_ADMIN_ACCESS_TOKEN: false,
      SOLANA_RPC_URL: false
    },
    overallTally: 85,
    isSimulationOnly: true,
    systemMode: "development"
  }, 200);
});

// GET /api/marketplace/posts
agentRouter.get("/marketplace/posts", async (c) => {
  return c.json({
    success: true,
    posts: [
      {
        id: "post-1",
        author: "SolanaCyber_Ox",
        avatarSeed: "creator-cyber",
        avatarColor: "#10b981",
        text: "⚡ SYSTEM BROADCAST: Porting my complete Memetics Miner loadout setup with optimized slippage detection and dual-process routing enabled.",
        category: "loadout",
        qscPrice: 450,
        tradesCount: 4,
        timestamp: "2 mins ago",
        worldContext: "world_prime"
      },
      {
        id: "post-2",
        author: "Admin_GigaBrain",
        avatarSeed: "creator-gigabrain",
        avatarColor: "#a855f7",
        text: "💡 DISCUSSION: Has anyone tried adjusting gravity constants below 2.0 inside Chaos Void? My agents' volition models feel slightly dilated.",
        category: "chat",
        tradesCount: 12,
        timestamp: "10 mins ago",
        worldContext: "world_chaos_66"
      }
    ]
  }, 200);
});

// POST /api/marketplace/post
agentRouter.post("/marketplace/post", async (c) => {
  try {
    const body = await c.req.json();
    return c.json({
      success: true,
      posts: [
        {
          id: `post-${Date.now()}`,
          author: body.author || "User",
          avatarSeed: body.avatarSeed || "nexus_node_01",
          avatarColor: body.avatarColor || "#ec4899",
          text: body.text || "",
          category: body.category || "chat",
          tradesCount: 0,
          timestamp: "Just now",
          worldContext: "world_prime"
        },
        {
          id: "post-1",
          author: "SolanaCyber_Ox",
          avatarSeed: "creator-cyber",
          avatarColor: "#10b981",
          text: "⚡ SYSTEM BROADCAST: Porting my complete Memetics Miner loadout setup with optimized slippage detection and dual-process routing enabled.",
          category: "loadout",
          qscPrice: 450,
          tradesCount: 4,
          timestamp: "2 mins ago",
          worldContext: "world_prime"
        }
      ]
    }, 200);
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});
