import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured. Please open Settings > Secrets and add your GEMINI_API_KEY.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Audit and Re-Engineer Content Idea using 90th Percentile Engineering SOP
  app.post("/api/audit", async (req, res) => {
    try {
      const { topic, platform, niche, targetAudience, extraContext, selectedAngle } = req.body;
      if (!topic || !platform) {
        return res.status(400).json({ error: "Missing topic or target platform." });
      }

      const client = getAIClient();

      // System instruction setting the context for an elite 2026 Content Intelligence System
      const systemInstruction = `You are an elite 2026 Content Intelligence System. Your objective is to re-engineer ideas to satisfy the 90th Percentile Engineering SOP rule: (1) 3-Signal Rule (Rewatch, Conversation, Share triggers), (2) 20-Minute Engagement Block with Pattern Interrupt comments, (3) Staggered Syndication, and (4) Elite standards (BSS >= 0.90, KSM >= 0.95, Probability >= 0.85). Calculate BSS and KSM scores precisely and deliver an extremely caught re-engineered hook.`;

      // Enforce specific mechanical requirements:
      // - For X: 150x Author Reply Chain, 13.5x Direct Replies
      // - For TikTok: 70% completion, loopable payoffs
      // - For Shorts: win swipe-away with frame-1 visual interrupts
      // - For Instagram: DM share hooks and saves
      // - For TikTok: 70% completion, '6-Place Keyword Rule', loopable payoffs
      // - For YouTube Shorts: win swipe-away (<35% swipe rate), front-loading keywords
      // - For Instagram Reels: DM share hooks, saves, 3s audition survivability
      // - For Quad Hybrid: Combine all metrics balanced to produce cross-post assets.

      // Generate precise mathematical scores. Keep tone expert.

      let promptText = `Perform a full 90th Percentile SOP audit and content re-engineering on: Topic: "${topic}" | Platform: "${platform}" | Niche: "${niche || 'General'}" | Audience: "${targetAudience || 'General'}" | Context: "${extraContext || 'None'}".`;

      if (selectedAngle) {
        promptText += `\nCRITICAL ADVANCED DIRECTION: The user has selected a high-attention strategic angle to anchor their campaign around: "${selectedAngle}". You MUST architect and draft the re-engineered hook, script visual/auditory cues, and native copy specifically to support and showcase this specific "${selectedAngle}" angle of opportunity. Do not wander from this framing.`;
      }

      promptText += `\nEnforce BSS >= 0.90, KSM >= 0.95, and Probability >= 0.85 as the elite standard. The re-engineered hook must include all 3 triggers: Rewatch (seamless loop/save checklist), Conversation (polarizing reply question), and Share prompts.
Calculate BSS elements: Conversation Potential, Retention/Dwell Time, Media Strength, Early Velocity, Decay Mitigation. Ensure calculatedBss is >= 0.90 for elite greenlights.
Calculate KSM elements: Platform Match, First-3s/First-line keyword placement, and Relevance. Ensure calculatedKsm is >= 0.95 for elite greenlights.
Calculate Final success probability = calculatedBss * calculatedKsm. Target is >= 0.85 for Elite Standard.
If the combined final score is < 0.85, restructure the candidate on all parameters, specifically loading it with 3 simultaneous High-Weight trigger mechanisms (Rewatch, Conversation, and Share).`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bssScore: {
                type: Type.OBJECT,
                properties: {
                  conversationPotential: { type: Type.NUMBER, description: "Calculate score from 0.0 to 1.0" },
                  retentionDwellTime: { type: Type.NUMBER, description: "Calculate score from 0.0 to 1.0" },
                  mediaStrength: { type: Type.NUMBER, description: "Calculate score from 0.0 to 1.0" },
                  earlyVelocity: { type: Type.NUMBER, description: "Calculate score from 0.0 to 1.0" },
                  decayMitigation: { type: Type.NUMBER, description: "Calculate score from 0.0 to 1.0" },
                  calculatedBss: { type: Type.NUMBER, description: "The weighted average or formula result" }
                },
                required: ["conversationPotential", "retentionDwellTime", "mediaStrength", "earlyVelocity", "decayMitigation", "calculatedBss"]
              },
              ksmScore: {
                type: Type.OBJECT,
                properties: {
                  platformMatch: { type: Type.NUMBER, description: "Calculate match from 0.0 to 1.0" },
                  firstLinePlacement: { type: Type.NUMBER, description: "Calculate first-3s/first-line placement" },
                  relevance: { type: Type.NUMBER, description: "Scale from 0.0 to 1.0" },
                  calculatedKsm: { type: Type.NUMBER, description: "Combined KSM score via (match*0.3 + placement*0.4 + relevance*0.3)" }
                },
                required: ["platformMatch", "firstLinePlacement", "relevance", "calculatedKsm"]
              },
              finalSuccessProbability: { type: Type.NUMBER, description: "Final success probability = calculations * KSM" },
              goDecision: { type: Type.STRING, description: "Must be: GREENLIGHT (>=0.80), REVISE (0.60-0.79), or SCRATCH (<0.60)" },
              auditCritique: { type: Type.STRING, description: "A brutal, 2-sentence critique of why the original statement fails or succeeds" },
              reengineeredHook: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: "The actual scroll-stopping re-engineered first 3 seconds/first line" },
                  trigger: { type: Type.STRING, description: "The targeted psychological trigger (Loss Aversion, Pattern Interrupt, etc.)" },
                  reasoning: { type: Type.STRING, description: "Clear algorithmic justification" }
                },
                required: ["text", "trigger", "reasoning"]
              },
              optimizedContent: {
                type: Type.OBJECT,
                properties: {
                  format: { type: Type.STRING, description: "Choice of platform format: 'video' or 'text'" },
                  textPosts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "If format is 'text', exact paragraphs/post-threads with correct line breaks, spaced native format, without hashtags overlay."
                  },
                  videoScript: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        timestamp: { type: Type.STRING, description: "e.g. '0:00 - 0:03'" },
                        visual: { type: Type.STRING, description: "Visual setting/B-roll instruction and camera transition" },
                        audio: { type: Type.STRING, description: "Direct spoken voiceover words or sounds" },
                        onScreenText: { type: Type.STRING, description: "Exact bold text to overlay on-screen" }
                      },
                      required: ["timestamp", "visual", "audio", "onScreenText"]
                    },
                    description: "If format is 'video', timestamped cues layout."
                  }
                },
                required: ["format"]
              },
              highWeightAction: {
                type: Type.OBJECT,
                properties: {
                  target: { type: Type.STRING, description: "Target signal (e.g. 'Saves/Bookmarks', 'Author Reply Chain', 'Rewatch Loop')" },
                  mechanism: { type: Type.STRING, description: "Explicit viral loop explanation of how the script triggers this metric." }
                },
                required: ["target", "mechanism"]
              },
              goldenHourProtocol: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Staged minutes checklist post-activation. Provide 3-5 tactical instructions."
              },
              imagePrompt: { type: Type.STRING, description: "Specific Midjourney, Imagen, or DALL-E prompt matching the visual theme or thumb asset" }
            },
            required: ["bssScore", "ksmScore", "finalSuccessProbability", "goDecision", "auditCritique", "reengineeredHook", "optimizedContent", "highWeightAction", "goldenHourProtocol", "imagePrompt"]
          }
        }
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Audit error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred in calculations." });
    }
  });

  // API: Get high-viability keywords for social indexing
  app.post("/api/keywords", async (req, res) => {
    try {
      const { topic, platform } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Missing topic input." });
      }

      const client = getAIClient();

      const prompt = `Research high-value 2026 indexing keywords and phrases for:
Topic: "${topic}"
Platform: "${platform || 'All social platforms'}"

Provide a JSON object containing:
1. "primaryKeywords": list of 3 gold-tier evergreen key phrases for front-loading titles or hooks.
2. "trendingBoosters": list of 3 trending context-rich variables or phrases.
3. "recommendedHashtags": list of 5 optimized non-spammy hashtags based on 2026 relevancy mechanics.
4. "searchVolumeEstimate": string (e.g. "Low-competition breakout", "High-intensity volume").
`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              primaryKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              trendingBoosters: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              recommendedHashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              searchVolumeEstimate: { type: Type.STRING }
            },
            required: ["primaryKeywords", "trendingBoosters", "recommendedHashtags", "searchVolumeEstimate"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (error: any) {
      console.error("Keywords research error:", error);
      res.status(500).json({ error: error.message || "Keyword query error." });
    }
  });

  // API: Discover Attention Triggers and Rank Angles
  app.post("/api/discover-attention", async (req, res) => {
    try {
      const { topic, platform, niche, targetAudience, extraContext } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Missing topic input." });
      }

      const client = getAIClient();

      const systemInstruction = `You are an elite 2026 Attention Intelligence Broker. Your purpose is to find the highest-attention angles, psychological triggers, and opportunity values hidden within a topic. You rank opportunities using an Attention Score (Curiosity, Conflict, Consequences, Dialogue Potential) multiplied by an Optimization Score. Deliver a detailed trigger analysis and ranked angle list matching the Vanguard Angle Library.`;

      const promptText = `Analyze the target topic: "${topic}" for platform: "${platform || 'All social feeds'}". 
Niche: "${niche || 'General'}" | Persona: "${targetAudience || 'General'}" | Directives: "${extraContext || 'None'}"

Perform the following:
1. Identify 5 foundational Attention Triggers (e.g. Curiosity, Conflict, Consequences, Fear of Loss, Betrayal, Hidden Incentives, Contradiction, Mystery, Status, Warning) and score them (0.0 to 1.0) with concise explanation of why they apply.
2. Discover and formulate exactly 5 highly specific content angles from the Angel Library (including: Historical Parallel, Strategic Consequences, Economic Fallout, Who Benefits?, Wrong Question, Human Impact, Prediction, Hidden Incentives, Contrarian Position, Myth vs Reality).
3. For each discovered angle, calculate:
   - "attentionScore": scale 0.0 to 1.0 (evaluating initial curiosity and debate potential)
   - "optimizationScore": scale 0.0 to 1.0 (evaluating viral loop trigger loading readiness)
   - "opportunityScore": calculated as (attentionScore * optimizationScore), rounded list score.
   - "hookPreview": A highly tuned, scroll-stopping first-line teaser option.
4. Rank the discovered angles from highest opportunity score down to the lowest. Output exclusively as a clean JSON conforming to the requested schema structure.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              attentionTriggers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    trigger: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    explanation: { type: Type.STRING }
                  },
                  required: ["trigger", "score", "explanation"]
                }
              },
              discoveredAngles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "Compact angle title. e.g. Who Benefits?" },
                    indexType: { type: Type.STRING, description: "Choose one from the library: Historical Parallel, Strategic Consequences, Economic Fallout, Who Benefits?, Wrong Question, Human Impact, Prediction, Hidden Incentives, Contrarian Position, Myth vs Reality" },
                    description: { type: Type.STRING, description: "Clear strategic thesis of this angle" },
                    attentionScore: { type: Type.NUMBER },
                    optimizationScore: { type: Type.NUMBER },
                    opportunityScore: { type: Type.NUMBER, description: "Multiply attentionScore * optimizationScore" },
                    primaryTrigger: { type: Type.STRING, description: "e.g. Curiosity, Threat, Privilege, etc." },
                    hookPreview: { type: Type.STRING, description: "Scroll-stopping first 1.5 seconds preview hook" }
                  },
                  required: ["title", "indexType", "description", "attentionScore", "optimizationScore", "opportunityScore", "primaryTrigger", "hookPreview"]
                }
              }
            },
            required: ["attentionTriggers", "discoveredAngles"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (error: any) {
      console.error("Discover attention error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze attention triggers." });
    }
  });

  // API: AI-powered Hook Sandbox Refinement Engine
  app.post("/api/refine", async (req, res) => {
    try {
      const { text, platform } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Missing hook text to refine." });
      }

      const client = getAIClient();

      const systemInstruction = `You are a legendary 2026 behavioral psychologist and chief algorithm engineer. 
Your specialty is rewriting text or video hook prompts to maximize click-through rates (CTR) and initial 3s retention.
You will receive a raw hook and its target platform. Generate 4 advanced, highly optimized platform-specific variations based on different psychological triggers.`;

      const prompt = `Rewrite and optimize the following hook into 4 high-impact variations for target platform: "${platform || 'X/Twitter'}":
Raw Hook: "${text}"

Generate these 4 variations as a JSON array keeping these exact triggerType strings:
1. "Curiosity Loop" (Tension node that forces the reader to finish reading or watch to get the answer)
2. "Loss Aversion" (Forces reader to realize they are wasting time/money/energy by not acting)
3. "Authority Hub" (Presents the content as an insider's cheat sheet, billionaire leak, or expert proven study)
4. "Counter-Intuitive Spark" (Bizarre, paradoxical pattern interrupt that breaks ordinary habituation)

Maintain native style constraints, spacing, and strict platform compliance. Output exclusively in the requested JSON structure.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              variations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    triggerType: { type: Type.STRING },
                    text: { type: Type.STRING, description: "The scroll-stopping high impact hook text" },
                    explanation: { type: Type.STRING, description: "Algorithmic reasoning of why this configuration works" }
                  },
                  required: ["triggerType", "text", "explanation"]
                }
              }
            },
            required: ["variations"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (error: any) {
      console.error("Refine hook error:", error);
      res.status(500).json({ error: error.message || "Failed to edit hook via intelligence modeling." });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite Integration for Serving Assets & Client SPA
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[2026 Content Intelligence Server] Live at http://localhost:${PORT}`);
  });
}

startServer();
