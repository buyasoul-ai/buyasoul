// src/services/omniroute-bridge.ts
// OmniRoute Gateway Bridge — The Heart of GSK
// Connects to OmniRoute at localhost:20128 or spawns it

const OMNIROUTE_URL = process.env.OMNIROUTE_URL || "http://localhost:20128";
const OMNIROUTE_API_KEY = process.env.NINE_ROUTER_API_KEY || process.env.OMNIROUTE_API_KEY || "";

export interface OmniRouteResponse {
  success: boolean;
  text: string;
  provider: string;
  model: string;
  tokens_used: number;
  cost: number; // Always 0 for free tier
}

export async function queryOmniRoute(
  systemPrompt: string,
  userMessage: string,
  options: { model?: string; maxTokens?: number; temperature?: number } = {}
): Promise<OmniRouteResponse> {
  const body = {
    model: options.model || "auto", // OmniRoute auto-selects best free model
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    max_tokens: options.maxTokens || 1000,
    temperature: options.temperature || 0.7,
    stream: false
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (OMNIROUTE_API_KEY) {
    headers["Authorization"] = `Bearer ${OMNIROUTE_API_KEY}`;
  }

  try {
    const res = await fetch(`${OMNIROUTE_URL}/v1/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`OmniRoute returned ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    return {
      success: true,
      text: data.choices?.[0]?.message?.content || "",
      provider: data.provider || "omniroute",
      model: data.model || "auto",
      tokens_used: data.usage?.total_tokens || 0,
      cost: 0 // Free tier
    };
  } catch (err: any) {
    return {
      success: false,
      text: "",
      provider: "omniroute",
      model: "auto",
      tokens_used: 0,
      cost: 0
    };
  }
}

export async function checkOmniRouteHealth(): Promise<{ online: boolean; url: string }> {
  try {
    const res = await fetch(`${OMNIROUTE_URL}/health`, { method: "GET" });
    return { online: res.ok, url: OMNIROUTE_URL };
  } catch {
    return { online: false, url: OMNIROUTE_URL };
  }
}
