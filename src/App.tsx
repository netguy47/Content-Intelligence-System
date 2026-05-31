/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Share2, 
  Twitter, 
  Video, 
  TrendingUp, 
  Copy, 
  Check, 
  RotateCcw, 
  History, 
  AlertTriangle, 
  Gauge, 
  Info, 
  Bookmark, 
  FileText, 
  Search, 
  Heart, 
  ListTodo, 
  BrainCircuit, 
  ArrowRight,
  Calculator,
  ChevronDown,
  Trash2,
  Calendar,
  Layers
} from "lucide-react";

interface AuditResult {
  bssScore: {
    conversationPotential: number;
    retentionDwellTime: number;
    mediaStrength: number;
    earlyVelocity: number;
    decayMitigation: number;
    calculatedBss: number;
  };
  ksmScore: {
    platformMatch: number;
    firstLinePlacement: number;
    relevance: number;
    calculatedKsm: number;
  };
  finalSuccessProbability: number;
  goDecision: string;
  auditCritique: string;
  reengineeredHook: {
    text: string;
    trigger: string;
    reasoning: string;
  };
  optimizedContent: {
    format: "video" | "text" | string;
    textPosts?: string[];
    videoScript?: Array<{
      timestamp: string;
      visual: string;
      audio: string;
      onScreenText: string;
    }>;
  };
  highWeightAction: {
    target: string;
    mechanism: string;
  };
  goldenHourProtocol: string[];
  imagePrompt: string;
  timestamp?: string;
  topic?: string;
  platform?: string;
  id?: string;
}

interface KeywordsResult {
  primaryKeywords: string[];
  trendingBoosters: string[];
  recommendedHashtags: string[];
  searchVolumeEstimate: string;
}

// Interactive Pre-seeded Content Templates
const TEMPLATES = [
  {
    title: "AI replacement crisis",
    topic: "AI tools will replace junior software developers within the next 30 days unless you learn this specific design pattern",
    platform: "X (Twitter)",
    niche: "Coding & Tech Careers",
    audience: "Junior Devs & CS Students"
  },
  {
    title: "Zero-cost nutrition hack",
    topic: "Storable high-protein budget meals for broke college students that require exact zero cooking",
    platform: "TikTok",
    niche: "Self-care & Nutrition",
    audience: "Gen-Z University Students"
  },
  {
    title: "The secret tax loophole",
    topic: "The hidden capital gains tax penalty only real estate billionaires exploit to wipe out 100% of tax liabilities",
    platform: "YouTube Shorts",
    niche: "Wealth & Finance",
    audience: "Millennial Renters & Investors"
  },
  {
    title: "3 lethal design rules",
    topic: "3 massive UI framing mistakes that are actively killing website conversions within less than a second",
    platform: "Instagram Reels",
    niche: "UI/UX & Web Design",
    audience: "SaaS Founders & Freelancers"
  }
];

// Heuristic Scoring Metric Analyzer for Interactive Real-Time Playground
const getHeuristicMetrics = (text: string, plat: string) => {
  if (!text.trim()) {
    return { 
      score: 0, 
      wordCount: 0, 
      triggers: [], 
      startsWithDigit: false, 
      isTooShort: true, 
      isTooLong: false,
      bss: 0,
      ksm: 0,
      probability: 0,
      hasRewatch: false,
      hasConversation: false,
      hasShare: false,
      signalCount: 0,
      passesElite: false
    };
  }
  const normalized = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const isTooShort = wordCount < 4;
  const isTooLong = wordCount > 25;
  
  // 1. Cadence & Sizing evaluation (KSM platform weight)
  let lengthScore = 0.8;
  if (plat.includes("X") || plat.includes("Twitter")) {
    if (wordCount >= 8 && wordCount <= 18) lengthScore = 1.0;
    else if (wordCount > 30) lengthScore = 0.5;
  } else {
    if (wordCount >= 5 && wordCount <= 12) lengthScore = 1.0;
    else if (wordCount > 20) lengthScore = 0.4;
  }
  
  // 2. Pattern Interrupt front-loading digits
  const startsWithDigit = /^\s*(\d+|why|stop|how|this|they)/i.test(normalized) || /\d+/.test(text);
  const patternInterruptScore = startsWithDigit ? 1.0 : 0.6;
  
  // 3. Cognitive NLP lists
  const NLP_LOSS_AVERSION = ["replace", "crisis", "killing", "loophole", "stealing", "illegal", "lying", "secret", "penalty", "lose", "scam", "wrong", "mistake", "warning", "ruin", "destroy", "broke", "banned", "waste", "expired"];
  const NLP_AUTHORITY = ["billionaire", "founder", "expert", "99%", "elite", "insider", "study", "proven", "engineer", "google", "insane", "hacks", "secrets", "jailbreak", "unlocked", "y combinator"];
  const NLP_CURIOSITY = ["unless you", "this specific", "this hidden", "the secret to", "why you", "stop doing", "never do", "don't want you", "lies", "how i", "how we"];
  
  let cognitiveBoost = 0;
  const triggers: string[] = [];
  
  if (NLP_LOSS_AVERSION.some(w => normalized.includes(w))) {
    cognitiveBoost += 0.16;
    triggers.push("Loss Aversion Index");
  }
  if (NLP_AUTHORITY.some(w => normalized.includes(w))) {
    cognitiveBoost += 0.16;
    triggers.push("Authority Multiplier");
  }
  if (NLP_CURIOSITY.some(w => normalized.includes(w))) {
    cognitiveBoost += 0.16;
    triggers.push("Curiosity Loop Closure");
  }
  
  // 4. Emotional charging structure (punctuation density which implies tactical pacing pauses)
  const hasStrongPacing = /[\.,-\/#!$%\^&\*;:{}=\-_`~()?]/.test(text);
  const pacingScore = hasStrongPacing ? 1.0 : 0.7;
  
  // 5. 90th Percentile 3-Signal evaluation
  const hasRewatch = ["save", "bookmark", "loop", "repeat", "replay", "re-watch", "checklist", "cheat sheet", "part 1", "guide", "keep this", "don't forget"].some(w => normalized.includes(w));
  const hasConversation = ["comment", "reply", "agree", "disagree", "opinion", "choose", "which one", "who else", "?", "would you", "your thoughts"].some(w => normalized.includes(w)) || normalized.includes("?");
  const hasShare = ["send", "share", "tag", "friend", "forward", "repost", "anyone who", "someone who"].some(w => normalized.includes(w));
  
  let signalCount = 0;
  if (hasRewatch) signalCount++;
  if (hasConversation) signalCount++;
  if (hasShare) signalCount++;
  
  // Calculate Base Success Score (BSS) - Target >= 0.90
  let calculatedBss = 0.55;
  if (hasRewatch) calculatedBss += 0.15;
  if (hasConversation) calculatedBss += 0.15;
  if (hasShare) calculatedBss += 0.15;
  if (wordCount >= 5 && wordCount <= 16) calculatedBss += 0.10;
  else calculatedBss += 0.02;
  const bss = Math.min(Math.max(calculatedBss, 0.40), 0.99);

  // Calculate Keyword Strength Multiplier (KSM) - Target >= 0.95
  let calculatedKsm = 0.55;
  if (startsWithDigit) calculatedKsm += 0.15;
  if (triggers.length > 0) calculatedKsm += 0.20;
  if (lengthScore === 1.0) calculatedKsm += 0.10;
  if (hasStrongPacing) calculatedKsm += 0.10;
  const ksm = Math.min(Math.max(calculatedKsm, 0.40), 0.99);

  // Score Probability
  const probability = bss * ksm;
  const passesElite = bss >= 0.90 && ksm >= 0.95 && probability >= 0.85;

  const overallCalc = (lengthScore * 0.35) + (patternInterruptScore * 0.25) + ((0.52 + cognitiveBoost) * 0.25) + (pacingScore * 0.15);
  const scoreRaw = Math.min(Math.max(overallCalc, 0.40), 0.99) * 100;
  
  return {
    score: Math.round(scoreRaw),
    wordCount,
    triggers,
    startsWithDigit,
    isTooShort,
    isTooLong,
    bss,
    ksm,
    probability,
    hasRewatch,
    hasConversation,
    hasShare,
    signalCount,
    passesElite
  };
};

// Tournament Matcher Algorithm for A/B Testing
const runAbTournamentHeuristics = (hookA: string, hookB: string, plat: string) => {
  if (!hookA.trim() || !hookB.trim()) return null;
  const metricsA = getHeuristicMetrics(hookA, plat);
  const metricsB = getHeuristicMetrics(hookB, plat);
  
  let scoreA = metricsA.score;
  let scoreB = metricsB.score;
  
  const entropyA = (hookA.length * 7) % 5;
  const entropyB = (hookB.length * 11) % 5;
  
  scoreA = Math.min(Math.max(scoreA + (entropyA - 2), 40), 99);
  scoreB = Math.min(Math.max(scoreB + (entropyB - 2), 40), 99);
  
  // Enforce small tiebreaker so result is deterministic and high quality
  if (scoreA === scoreB) {
    if (hookB.length < hookA.length) scoreB += 1;
    else scoreA += 1;
  }
  
  const winner = scoreA > scoreB ? "A" : "B";
  
  const pointsA: string[] = [];
  const pointsB: string[] = [];
  
  if (metricsA.startsWithDigit) pointsA.push("Starts with numeric trigger / semantic disruptors.");
  if (metricsA.triggers.length > 0) pointsA.push(`Aesthetic triggers found: ${metricsA.triggers.join(", ")}.`);
  if (metricsA.isTooLong) pointsA.push("CADENCE DEFICIT: Exceeds standard quick scanning density limit.");
  if (metricsA.wordCount >= 5 && metricsA.wordCount <= 15) pointsA.push("HIGH VELOCITY PACE: Perfectly meets first 3s attention survival lengths.");
  if (pointsA.length === 0) pointsA.push("Standard, linear composition without heavy tension nodes.");

  if (metricsB.startsWithDigit) pointsB.push("Starts with numeric trigger / semantic disruptors.");
  if (metricsB.triggers.length > 0) pointsB.push(`Aesthetic triggers found: ${metricsB.triggers.join(", ")}.`);
  if (metricsB.isTooLong) pointsB.push("CADENCE DEFICIT: Exceeds standard quick scanning density limit.");
  if (metricsB.wordCount >= 5 && metricsB.wordCount <= 14) pointsB.push("HIGH VELOCITY PACE: Meets fast scroll-stopping length requirements.");
  if (pointsB.length === 0) pointsB.push("Standard structural composition.");

  let critique = "";
  if (winner === "B") {
    critique = `Hook B outperforms Hook A by ${scoreB - scoreA}% calculated efficiency. By front-loading optimal attention signals and securing closer Curiosity Loops, Candidate B holds a significantly stronger probability of escaping initial feed testing tiers.`;
  } else {
    critique = `Hook A takes structural superiority over Hook B by ${scoreA - scoreB}% expected CTR conversion. Higher semantic authenticity and optimized sentence padding prevent rapid viewer swipe-away signals.`;
  }
  
  return {
    winner: winner as "A" | "B" | "TIE",
    scoreA,
    scoreB,
    critique,
    pointsA,
    pointsB
  };
};

export default function App() {
  // Main form states
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("X (Twitter)");
  const [niche, setNiche] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [extraContext, setExtraContext] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTab, setCurrentTab] = useState<"attention" | "dashboard" | "keywords" | "library">("attention");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Attention Intelligence states
  const [attentionLoading, setAttentionLoading] = useState(false);
  const [attentionError, setAttentionError] = useState("");
  const [attentionTriggers, setAttentionTriggers] = useState<any[] | null>(null);
  const [discoveredAngles, setDiscoveredAngles] = useState<any[] | null>(null);
  const [selectedAngle, setSelectedAngle] = useState("");
  const [loadStepAttention, setLoadStepAttention] = useState(0);

  const attentionLoadingSteps = [
    "Querying physical and emotional triggers database...",
    "Extracting curiosity multipliers...",
    "Scanning primary friction and conflict zones...",
    "Constructing distinct Angle Library models...",
    "Calculating native attention index metrics...",
    "Ranking optimal opportunities..."
  ];

  // Keyword tool state
  const [keywordTopic, setKeywordTopic] = useState("");
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [keywordsResult, setKeywordsResult] = useState<KeywordsResult | null>(null);
  const [keywordError, setKeywordError] = useState("");

  // Copy states
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedKeywords, setCopiedKeywords] = useState<Record<string, boolean>>({});

  // Library/saved items
  const [savedAudits, setSavedAudits] = useState<AuditResult[]>([]);

  // Golden Hour Interactive checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Interactive High-Fidelity Simulator States
  const [sandboxHook, setSandboxHook] = useState("");
  const [visualizeInteractiveHour, setVisualizeInteractiveHour] = useState(1);
  const [visualizeInteractiveSec, setVisualizeInteractiveSec] = useState(0);

  // Hook Refinement states
  const [refinedVariations, setRefinedVariations] = useState<{ triggerType: string; text: string; explanation: string }[] | null>(null);
  const [refiningHook, setRefiningHook] = useState(false);
  const [refineError, setRefineError] = useState("");

  // Predictive Reach Parameters
  const [feedDensityIndex, setFeedDensityIndex] = useState(65);
  const [adSpendPush, setAdSpendPush] = useState(15);
  const [dwellIntent, setDwellIntent] = useState(50);
  const [predictiveLoading, setPredictiveLoading] = useState(false);
  const [predictiveMetrics, setPredictiveMetrics] = useState<{
    impressions: string;
    velocity: string;
    halfLife: string;
    csr: string;
    completion: string;
    growthCurve: number[];
  } | null>(null);

  // A/B Hook Tournament Arena States
  const [abHookA, setAbHookA] = useState("");
  const [abHookB, setAbHookB] = useState("");
  const [abTesting, setAbTesting] = useState(false);
  const [abMatchupResult, setAbMatchupResult] = useState<{
    winner: "A" | "B" | "TIE";
    scoreA: number;
    scoreB: number;
    critique: string;
    pointsA: string[];
    pointsB: string[];
  } | null>(null);

  // Simulated loading messages for AI auditing
  const loadingSteps = [
    "Siphoning raw content parameters...",
    "Injecting 2026 algorithm formulas (BSS/KSM)...",
    "Running brutal viability constraints on target feeds...",
    "Re-engineering hook using Cognitive Loss Aversion patterns...",
    "Assembling native script timelines and on-screen metrics...",
    "Finalizing launch hour protocol checklists..."
  ];

  useEffect(() => {
    // Load saved workspace campaigns from localStorage
    const saved = localStorage.getItem("content_intelligence_audits");
    if (saved) {
      try {
        setSavedAudits(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Loading stepper timer
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 2500);
    } else {
      setLoadStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Attention loading stepper timer
  useEffect(() => {
    let interval: any;
    if (attentionLoading) {
      interval = setInterval(() => {
        setLoadStepAttention((prev) => (prev < attentionLoadingSteps.length - 1 ? prev + 1 : prev));
      }, 2500);
    } else {
      setLoadStepAttention(0);
    }
    return () => clearInterval(interval);
  }, [attentionLoading]);

  const discoverAttention = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setAttentionError("Please input a raw content topic or select one of our pre-seeded templates.");
      return;
    }

    setAttentionLoading(true);
    setAttentionError("");
    setAttentionTriggers(null);
    setDiscoveredAngles(null);
    setSelectedAngle("");

    try {
      const response = await fetch("/api/discover-attention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platform,
          niche,
          targetAudience,
          extraContext
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Attention analysis was interrupted.");
      }

      const data = await response.json();
      setAttentionTriggers(data.attentionTriggers);
      setDiscoveredAngles(data.discoveredAngles);
    } catch (err: any) {
      setAttentionError(err.message || "Failed to analyze attention hooks. Please retry.");
    } finally {
      setAttentionLoading(false);
    }
  };

  const runAudit = async (e?: React.FormEvent, angleToForce?: string) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage("Please input a raw content topic or select one of our pre-seeded templates.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setAuditResult(null);
    setChecklist({});

    const angle = angleToForce || selectedAngle;

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platform,
          niche,
          targetAudience,
          extraContext,
          selectedAngle: angle
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Auditing process was interrupted.");
      }

      const data: AuditResult = await response.json();
      data.topic = topic;
      data.platform = platform;
      data.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      data.id = `audit-${Date.now()}`;

      setAuditResult(data);
      if (data.reengineeredHook?.text) {
        setSandboxHook(data.reengineeredHook.text);
        setAbHookA(topic.length > 100 ? topic.substring(0, 97) + "..." : topic);
        setAbHookB(data.reengineeredHook.text);
        setAbMatchupResult(null); // Reset previous tournament matchup
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to finalize calculation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const runKeywordsResearch = async () => {
    const target = keywordTopic.trim() || topic.trim();
    if (!target) {
      setKeywordError("Provide a topic to index high-viability keywords.");
      return;
    }

    setKeywordsLoading(true);
    setKeywordError("");
    setKeywordsResult(null);

    try {
      const response = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: target, platform }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch keyword viability statistics.");
      }

      const data = await response.json();
      setKeywordsResult(data);
    } catch (e: any) {
      setKeywordError(e.message || "Error analyzing social indexes.");
    } finally {
      setKeywordsLoading(false);
    }
  };

  const applyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setTopic(tpl.topic);
    setPlatform(tpl.platform);
    setNiche(tpl.niche);
    setTargetAudience(tpl.audience);
    setShowAdvanced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveAuditCampaign = () => {
    if (!auditResult) return;
    const isAlreadySaved = savedAudits.some(item => item.id === auditResult.id);
    if (isAlreadySaved) return;

    const list = [auditResult, ...savedAudits];
    setSavedAudits(list);
    localStorage.setItem("content_intelligence_audits", JSON.stringify(list));
  };

  const deleteSavedAudit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = savedAudits.filter(item => item.id !== id);
    setSavedAudits(filtered);
    localStorage.setItem("content_intelligence_audits", JSON.stringify(filtered));
  };

  const loadSavedAudit = (saved: AuditResult) => {
    setAuditResult(saved);
    setTopic(saved.topic || "");
    setPlatform(saved.platform || "X (Twitter)");
    if (saved.reengineeredHook?.text) {
      setSandboxHook(saved.reengineeredHook.text);
      setAbHookA(saved.topic || "");
      setAbHookB(saved.reengineeredHook.text);
    }
    setAbMatchupResult(null);
    setCurrentTab("dashboard");
  };

  const triggerCopy = (text: string, type: "hook" | "content" | "prompt") => {
    navigator.clipboard.writeText(text);
    if (type === "hook") {
      setCopiedHook(true);
      setTimeout(() => setCopiedHook(false), 2000);
    } else if (type === "content") {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    } else if (type === "prompt") {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const triggerCopyKeyword = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeywords(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedKeywords(prev => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const toggleChecklist = (stepIdx: string) => {
    setChecklist(prev => ({ ...prev, [stepIdx]: !prev[stepIdx] }));
  };

  const handleAbTest = () => {
    if (!abHookA.trim() || !abHookB.trim()) return;
    setAbTesting(true);
    setAbMatchupResult(null);
    setTimeout(() => {
      const res = runAbTournamentHeuristics(abHookA, abHookB, platform);
      setAbMatchupResult(res);
      setAbTesting(false);
    }, 1000);
  };

  const handleRefineHook = async () => {
    if (!sandboxHook.trim()) return;
    setRefiningHook(true);
    setRefinedVariations(null);
    setRefineError("");
    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sandboxHook,
          platform: platform,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to refine hook. Please try again.");
      }
      const data = await response.json();
      if (data.variations) {
        setRefinedVariations(data.variations);
      } else {
        throw new Error("No variations returned.");
      }
    } catch (err: any) {
      setRefineError(err.message || "An unexpected error occurred in calculations.");
    } finally {
      setRefiningHook(false);
    }
  };

  const simulatedReachData = React.useMemo(() => {
    const metrics = getHeuristicMetrics(sandboxHook, platform);
    const score = metrics.score;
    if (score === 0) {
      return {
        impressions: "0",
        velocity: "0.0x",
        halfLife: "0.0h",
        csr: "0.0%",
        completion: "0%",
        growthCurve: [0, 0, 0, 0, 0, 0],
        score: 0
      };
    }
    
    const baseVal = (score * 850) * (feedDensityIndex / 55) * (1 + (adSpendPush * 0.04)) + 500;
    const minImp = Math.round(baseVal * 0.7);
    const maxImp = Math.round(baseVal * 1.4);
    
    const impressionsStr = `${(minImp/1000).toFixed(1)}K - ${(maxImp/1000).toFixed(1)}K`;
    const velocityScale = ((score / 85) * (1.1 + adSpendPush / 35)).toFixed(1);
    const velocityStr = `${velocityScale}x`;
    const halfLifeRaw = Math.min(Math.max((dwellIntent / 10) * (score / 72) * 2.8, 1.0), 36.0);
    const halfLifeStr = `${halfLifeRaw.toFixed(1)}h`;
    const csrBase = (score / 100) * 12 * (1 + (dwellIntent - 50) / 100);
    const csrVal = Math.min(Math.max(csrBase, 1.5), 44.0);
    const csrStr = `${csrVal.toFixed(1)}%`;
    const compBase = (score / 100) * 72 * (dwellIntent / 50);
    const compVal = Math.min(Math.max(compBase, 5.0), 98.0);
    const completionStr = `${compVal.toFixed(0)}%`;
    
    // Curve data point indices for timeline SVG plot
    const curvePoints = [
      0.03,
      Math.min(0.24 * (feedDensityIndex / 50), 0.9),
      Math.min(0.68 * (adSpendPush > 10 ? 1.2 : 0.9), 1.0),
      Math.min(0.92 * (score / 80), 1.0),
      0.97,
      1.0
    ].map(p => Math.round(maxImp * p));
    
    return {
      impressions: impressionsStr,
      velocity: velocityStr,
      halfLife: halfLifeStr,
      csr: csrStr,
      completion: completionStr,
      growthCurve: curvePoints,
      score,
    };
  }, [sandboxHook, platform, feedDensityIndex, adSpendPush, dwellIntent]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#00ff41] selection:text-[#050505] flex flex-col justify-between">
      
      {/* Top Header / Status Bar */}
      <header className="border-b border-[#222] bg-[#0a0a0a] sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#00ff41] rounded-full shadow-[0_0_8px_#00ff41]"></div>
            <div>
              <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white font-mono flex items-center gap-2">
                Vanguard 2026 // Content Intelligence System
                <span className="text-[10px] font-bold text-[#00ff41] bg-[#00ff411b] border border-[#00ff4155] px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  BSS/KSM v.4.2.1
                </span>
              </h1>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#666]">
                Mathematical Re-engineering & Algorithmic Viability Audit Engine
              </p>
            </div>
          </div>

          {/* Active stats bar */}
          <div className="hidden lg:flex gap-8 text-[10px] font-mono text-[#666] uppercase border-l border-[#222] pl-8">
            <span>Session: <span className="text-[#00ff41]">A7-ENGINE-909</span></span>
            <span>Status: <span className="text-[#00ff41]">Active Calculation</span></span>
            <span>Logic: <span className="text-[#00ff41]">SECURE // AES-256</span></span>
          </div>

          {/* Quick Tab switcher */}
          <nav className="flex items-center gap-1 bg-[#111] p-1 rounded-lg border border-[#222]">
            <button
              onClick={() => setCurrentTab("attention")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all ${
                currentTab === "attention"
                  ? "bg-[#00ff4110] text-[#00ff41] border border-[#00ff4144]"
                  : "text-[#888] hover:text-white border border-transparent"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Attention Broker
            </button>
            <button
              onClick={() => setCurrentTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all ${
                currentTab === "dashboard"
                  ? "bg-[#00ff4110] text-[#00ff41] border border-[#00ff4144]"
                  : "text-[#888] hover:text-white border border-transparent"
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              SOP Optimizer
            </button>
            <button
              onClick={() => {
                setCurrentTab("keywords");
                if (topic) setKeywordTopic(topic);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all ${
                currentTab === "keywords"
                  ? "bg-[#00ff4110] text-[#00ff41] border border-[#00ff4144]"
                  : "text-[#888] hover:text-white border border-transparent"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              SEO Indexer
            </button>
            <button
              onClick={() => setCurrentTab("library")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all relative ${
                currentTab === "library"
                  ? "bg-[#00ff4110] text-[#00ff41] border border-[#00ff4144]"
                  : "text-[#888] hover:text-white border border-transparent"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Library
              {savedAudits.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00ff41] text-[#050505] w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold">
                  {savedAudits.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {errorMessage && (
          <div className="mb-6 p-4 bg-[#ff3e3e15] border border-[#ff3e3e55] rounded text-[#ff3e3e] text-sm flex items-start gap-3 font-mono">
            <AlertTriangle className="w-5 h-5 text-[#ff3e3e] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold tracking-wider uppercase">[! CRITICAL ERROR] Execution Stopped</p>
              <p className="opacity-90">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input Workspace Configurator */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Template Brainstormers */}
            <div className="border border-[#222] bg-[#080808] rounded p-5">
              <h3 className="text-[10px] uppercase tracking-widest text-[#666] font-bold mb-3 flex items-center gap-1.5 font-mono">
                <BrainCircuit className="w-3.5 h-3.5 text-[#00ff41]" />
                Inspiration / Seed Variables
              </h3>
              <p className="text-xs text-[#888] mb-4">Click an algorithmic vector to import configuration params:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => applyTemplate(tpl)}
                    className="p-3 text-left bg-[#0c0c0c] hover:bg-[#111] rounded border border-[#222] hover:border-[#333] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-bold text-[#666] uppercase tracking-wider font-mono">
                        {tpl.platform}
                      </span>
                      <span className="text-[9px] font-bold text-[#00ff41] bg-[#00ff4110] px-1.5 py-0.5 rounded font-mono">
                        {tpl.title}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#aaa] group-hover:text-white line-clamp-2 leading-relaxed font-sans">
                      {tpl.topic}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Configuration Form */}
            <div className="border border-[#222] bg-[#080808] rounded p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#00ff41]" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#666] font-mono">WORKSPACE CONSTANTS</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTopic("");
                    setNiche("");
                    setTargetAudience("");
                    setExtraContext("");
                    setAuditResult(null);
                  }}
                  className="text-[9px] uppercase tracking-wider font-mono text-[#666] hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear Space
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentTab === "attention") {
                    discoverAttention();
                  } else {
                    runAudit();
                  }
                }} 
                className="flex flex-col gap-5"
              >
                {/* Topic / Idea Textarea */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-1.5">
                    01. Raw Input Idea or Concept <span className="text-[#ff3e3e] font-mono">*</span>
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter raw creative hypothesis: e.g., Let developers know AI cannot replace senior visual pattern recognition in 2026..."
                    rows={4}
                    className="w-full text-xs font-mono bg-[#0c0c0c] text-white border border-[#222] focus:border-[#444] rounded px-4 py-3 placeholder:text-[#444] focus:outline-none focus:ring-1 focus:ring-[#00ff41]/20 transition-all resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Platform Selector Grid */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">
                    02. Engine Target Platform
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "X (Twitter)", icon: Twitter, color: "text-[#00ff41]" },
                      { name: "TikTok", icon: Video, color: "text-[#00ff41]" },
                      { name: "YouTube Shorts", icon: TrendingUp, color: "text-[#00ff41]" },
                      { name: "Instagram Reels", icon: Sparkles, color: "text-[#00ff41]" },
                      { name: "Quad Hybrid", icon: Layers, color: "text-[#00ff41]" }
                    ].map((plat) => {
                      const IconComp = plat.icon;
                      const isSelected = platform === plat.name;
                      return (
                        <button
                          key={plat.name}
                          type="button"
                          onClick={() => setPlatform(plat.name)}
                          className={`flex items-center gap-2 px-3 py-2 border text-[10px] uppercase font-mono tracking-tight font-bold text-left justify-start transition-all ${
                            isSelected 
                              ? "bg-[#00ff4110] text-[#00ff41] border-[#00ff41] shadow-[0_0_8px_#00ff4130]" 
                              : "bg-[#0a0a0a] hover:bg-[#111] text-[#777] border-[#222]"
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span className="truncate">{plat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Customizable Advanced Fields Toggle */}
                <div className="border-t border-[#1a1a1a] pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between text-[10px] font-bold text-[#666] hover:text-[#bbb] transition-colors uppercase tracking-widest py-1"
                  >
                    <span>03. Contextual Demographics</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden flex flex-col gap-4 pt-4"
                      >
                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-[#666] font-bold mb-1">Niche Sector</label>
                          <input
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g., UI/UX Design, Wealth Management"
                            className="w-full text-xs font-mono bg-[#0c0c0c] text-white border border-[#222] focus:border-[#444] rounded px-3 py-2.5 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-[#666] font-bold mb-1">Target Persona</label>
                          <input
                            type="text"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            placeholder="e.g., Indie Hackers, Crypto Speculators"
                            className="w-full text-xs font-mono bg-[#0c0c0c] text-white border border-[#222] focus:border-[#444] rounded px-3 py-2.5 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-[#666] font-bold mb-1">Additional Framing Directives</label>
                          <input
                            type="text"
                            value={extraContext}
                            onChange={(e) => setExtraContext(e.target.value)}
                            placeholder="e.g., Force pattern interrupts, use aggressive loop templates"
                            className="w-full text-xs font-mono bg-[#0c0c0c] text-white border border-[#222] focus:border-[#444] rounded px-3 py-2.5 focus:outline-none"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Trigger Engine Buttons */}
                <div className="pt-2">
                  <button
                    disabled={loading || attentionLoading}
                    type="submit"
                    className="w-full bg-[#0a0a0a] hover:bg-[#111] text-[#00ff41] border border-[#00ff41] shadow-[0_0_8px_#00ff411a] hover:shadow-[0_0_12px_#00ff412c] font-bold font-mono tracking-widest text-xs py-3 px-6 rounded relative overflow-hidden flex items-center justify-center gap-2 group transition-all cursor-pointer disabled:bg-[#111] disabled:text-[#444] disabled:border-[#222] disabled:shadow-none"
                  >
                    {currentTab === "attention" ? (
                      attentionLoading ? (
                        <div className="flex items-center gap-3">
                          <span className="w-3.5 h-3.5 border-2 border-[#00ff41]/20 border-t-[#00ff41] rounded-full animate-spin" />
                          <span className="animate-pulse">BROKERING DISCOVERY...</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#00ff41] group-hover:scale-110 transition-transform" />
                          <span>1. DISCOVER ATTENTION & ANGLES</span>
                          <ArrowRight className="w-4 h-4 text-[#00ff41]" />
                        </>
                      )
                    ) : (
                      loading ? (
                        <div className="flex items-center gap-3">
                          <span className="w-3.5 h-3.5 border-2 border-[#00ff41]/20 border-t-[#00ff41] rounded-full animate-spin" />
                          <span className="animate-pulse">ENGAGING NEURAL AUDIT...</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#00ff41] group-hover:scale-110 transition-transform" />
                          <span>2. OPTIMIZE SOP CAMPAIGN</span>
                          <ArrowRight className="w-4 h-4 text-[#00ff41]" />
                        </>
                      )
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Quick Context Card */}
            <div className="p-4 bg-[#0a0a0a] text-[#888] border border-[#222] rounded">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                <div className="text-[11px] flex flex-col gap-1.5 font-mono leading-relaxed">
                  <span className="font-bold text-white uppercase tracking-wider">CRITICAL CRITERIA // 2026</span>
                  <p>
                    All synthesized campaigns must surpass a combined viability benchmark of <strong className="text-white">0.80</strong> before target scheduling. Falling below triggers structural rebuild protocols.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* RIGHT COLUMN: Results Dashboard */}
          <section className="lg:col-span-7">

            {/* NEW TAB-0: Attention Discovery and Angle Broker */}
            {currentTab === "attention" && (
              <div className="flex flex-col gap-6">
                
                {/* Attention Loading screen */}
                {attentionLoading && (
                  <div className="border border-[#222] bg-[#080808] rounded p-12 text-center shadow-xs flex flex-col items-center justify-center gap-6 min-h-[500px]">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-4 border-[#00ff41]/10 rounded-full" />
                      <div className="absolute inset-0 border-4 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-3 bg-[#050505] rounded-full flex items-center justify-center">
                        <BrainCircuit className="w-8 h-8 text-[#00ff41] animate-pulse" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] text-[#00ff41] font-mono tracking-[0.25em] font-extrabold uppercase animate-pulse">
                        SOP ATTENTION FUNNEL SYNTHESIS
                      </span>
                      <p className="text-xs text-white font-semibold font-mono tracking-wide">
                        {attentionLoadingSteps[loadStepAttention]}
                      </p>
                      <p className="text-[9px] text-[#444] font-mono mt-1 uppercase">
                        Scanning Platform: {platform}
                      </p>
                    </div>
                  </div>
                )}

                {/* Onboarding Empty state: Showcase Angle Library */}
                {!attentionLoading && !discoveredAngles && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#222] bg-[#080808] rounded p-6 flex flex-col gap-6 min-h-[500px]"
                  >
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                      <div>
                        <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-white mb-1">
                          ATTENTION INTELLIGENCE ENGINE v3.0
                        </h2>
                        <p className="text-xs text-[#888]">
                          "Attention first. Optimization second." The system begins with identifying the highest-leverage visual and psychological angles before drafting copy.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#0e0e0e] border border-dashed border-[#222] rounded text-center">
                      <p className="text-xs text-[#00ff41] font-mono font-bold uppercase tracking-wider mb-1">
                        👉 WORKSPACE PROTOCOL REQUIRED
                      </p>
                      <p className="text-xs text-[#666] max-w-md mx-auto">
                        In the left parameter column, input your raw campaign concept, select your platform, then click <strong className="text-white">1. DISCOVER ATTENTION & ANGLES</strong> to broker high-converting angles.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                      <span className="text-[9px] font-mono text-[#444] uppercase tracking-widest block border-b border-[#1b1b1b] pb-2">
                        THE VANGUARD ANGLE LIBRARY INDEX
                      </span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: "Who Benefits?", desc: "Identifies hidden corporations, licensing managers, or entities gathering wealth from common news trends." },
                          { title: "The Wrong Question", desc: "Dismantles standard popular debate topics, introducing a deeper, more polarizing conflict zone." },
                          { title: "Historical Parallel", desc: "Anchors current tech or lifestyle transitions under historical, high-consequence system shifts." },
                          { title: "Contrarian Position", desc: "Defies consensus industry tips directly using friction-based, hard-earned empirical records." },
                          { title: "Hidden Incentives", desc: "Exposes secondary psychological or economic forces driving standard consumer habituation." },
                          { title: "Myth vs Reality", desc: "Violently debunks heavily-monetized comfort beliefs with stark, low-tox realities." }
                        ].map((ang, idx) => (
                          <div key={idx} className="p-3.5 bg-[#050505] border border-[#222] rounded flex flex-col gap-1.5 font-mono">
                            <span className="text-[10px] text-[#00ff41] font-bold uppercase">
                              INDEX_A7_N0{idx+1} // {ang.title}
                            </span>
                            <p className="text-[11px] text-[#777] font-sans leading-relaxed">
                              {ang.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error state */}
                {attentionError && (
                  <div className="p-4 bg-[#ff3e3e15] border border-[#ff3e3e55] rounded text-[#ff3e3e] text-xs font-mono">
                    [Broker System Exception] {attentionError}
                  </div>
                )}

                {/* Main Attention Analysis View */}
                {!attentionLoading && discoveredAngles && attentionTriggers && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Attention Trigger breakdown */}
                    <div className="border border-[#222] bg-[#080808] rounded p-5 flex flex-col gap-4">
                      <div>
                        <span className="text-[9px] font-bold text-[#666] font-mono tracking-widest block uppercase">
                          PHASE 01: COGNITIVE TRIGGER ANALYSIS
                        </span>
                        <h3 className="text-xs font-bold text-white uppercase font-mono mt-0.5">
                          Detected Emotional & Social Gravitational Pulls
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {attentionTriggers.map((trig: any, i: number) => (
                          <div key={i} className="p-3 bg-[#050505] border border-[#1b1b1b] rounded flex flex-col gap-2 font-mono">
                            <div className="flex justify-between items-center text-[10px] pb-1.5 border-b border-[#111]">
                              <span className="text-white uppercase font-bold">{trig.trigger}</span>
                              <span className="text-[#00ff41] font-bold">{Math.round(trig.score * 100)}% Match</span>
                            </div>
                            
                            <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden border border-[#222] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                              <div className="bg-[#00ff41] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#00ff41aa]" style={{ width: `${trig.score * 100}%` }} />
                            </div>

                            <p className="text-[11px] text-[#888] font-sans leading-relaxed">
                              {trig.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Discovered Angles ranking list */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="text-[9px] font-bold text-[#666] font-mono tracking-widest block uppercase">
                          PHASE 02: HIGH-POTENTIAL STRATEGIC ANGLES
                        </span>
                        <h3 className="text-xs font-bold text-white uppercase font-mono mt-0.5">
                          Ranked Opportunities for platform: "{platform}"
                        </h3>
                      </div>

                      <div className="flex flex-col gap-5">
                        {discoveredAngles.map((ang: any, i: number) => {
                          const opps = Math.round(ang.opportunityScore * 100);
                          const atts = Math.round(ang.attentionScore * 100);
                          const opts = Math.round(ang.optimizationScore * 100);
                          const rankColor = i === 0 ? "border-[#00ff41]" : "border-[#222]";
                          const rankBg = i === 0 ? "bg-[#00ff4102]" : "bg-[#080808]";

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className={`border ${rankColor} ${rankBg} rounded p-5 flex flex-col gap-4 transition-all hover:bg-[#0c0c0c]`}
                            >
                              {/* Header metrics row */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b1b1b] pb-3 font-mono">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                                    i === 0 ? "bg-[#00ff411a] text-[#00ff41]" : "bg-[#222] text-[#888]"
                                  }`}>
                                    Opportunity Rank #0{i+1}
                                  </span>
                                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                                    {ang.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4 text-[10px] text-[#888]">
                                  <div>
                                    <span>Attn: </span>
                                    <span className="text-white font-bold">{atts}%</span>
                                  </div>
                                  <div>
                                    <span>Opt: </span>
                                    <span className="text-white font-bold">{opts}%</span>
                                  </div>
                                  <div className="border-l border-[#222] pl-3">
                                    <span className="text-[#0ff] font-bold">OPPORTUNITY: </span>
                                    <span className="text-[#0ff] font-extrabold text-xs">{opps}%</span>
                                  </div>
                                </div>
                              </div>

                              {/* Description body */}
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-bold text-[#666] font-mono uppercase tracking-wider block">
                                  Strategic Thesis
                                </span>
                                <p className="text-xs text-[#aaa] font-sans leading-relaxed">
                                  {ang.description}
                                </p>
                              </div>

                              {/* Hook Preview slider box */}
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-bold text-[#666] font-mono uppercase tracking-wider block">
                                    First Line Teaser Option
                                  </span>
                                  <span className="text-[8px] font-mono text-[#555] uppercase">
                                    Trigger: {ang.primaryTrigger}
                                  </span>
                                </div>
                                
                                <div className="bg-[#030303] p-3.5 rounded border border-[#1b1b1b] border-dashed font-mono text-xs text-[#e0e0e0] italic leading-relaxed group transition-colors hover:text-white relative">
                                  "{ang.hookPreview}"
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(ang.hookPreview);
                                    }}
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-[#111] hover:bg-[#222] border border-[#333] rounded text-[#888] hover:text-white transition-all duration-150"
                                    title="Copy Hook Teaser"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Selection/Action */}
                              <div className="flex justify-end pt-1 border-t border-[#121212]">
                                <button
                                  onClick={() => {
                                    setSelectedAngle(ang.title);
                                    setCurrentTab("dashboard");
                                    runAudit(undefined, ang.title);
                                  }}
                                  className="px-4 py-2 bg-[#00ff410e] hover:bg-[#00ff4122] text-[#00ff41] border border-[#00ff4144] hover:border-[#00ff41cc] rounded text-[10px] uppercase font-mono font-extrabold tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95 select-none cursor-pointer hover:shadow-[0_0_8px_#00ff412a]"
                                >
                                  <Layers className="w-3.5 h-3.5" />
                                  Select & Optimize Campaign Around This Angle
                                  <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                                </button>
                              </div>

                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                  </motion.div>
                )}

              </div>
            )}

            {/* TAB-1: Core Dashboard Viewer */}
            {currentTab === "dashboard" && (
              <div className="flex flex-col gap-6">

                {/* LOADING STATE VIEW */}
                {loading && (
                  <div className="border border-[#222] bg-[#080808] rounded p-12 text-center shadow-xs flex flex-col items-center justify-center gap-6 min-h-[500px]">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-4 border-[#00ff41]/10 rounded-full" />
                      <div className="absolute inset-0 border-4 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-3 bg-[#050505] rounded-full flex items-center justify-center">
                        <BrainCircuit className="w-8 h-8 text-[#00ff41] animate-pulse" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold font-mono text-white tracking-widest uppercase">Executing Analytical Models</h3>
                      <p className="text-[11px] font-mono text-[#00ff41] bg-[#00ff410d] border border-[#00ff413a] px-3.5 py-1.5 rounded">{loadingSteps[loadStep]}</p>
                    </div>
                    {/* Stepper indicators */}
                    <div className="flex items-center gap-2 max-w-sm mt-3 animate-pulse">
                      {loadingSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === loadStep 
                              ? "w-8 bg-[#00ff41]" 
                              : idx < loadStep 
                              ? "w-3 bg-white" 
                              : "w-2 bg-[#222]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* DEFAULT NO STATE VIEW */}
                {!loading && !auditResult && (
                  <div className="border border-dashed border-[#222] bg-[#080808] rounded p-12 text-center shadow-xs flex flex-col items-center justify-center gap-5 min-h-[500px]">
                    <div className="w-16 h-16 bg-[#111] text-[#444] border border-[#222] rounded flex items-center justify-center">
                      <Layers className="w-8 h-8" />
                    </div>
                    <div className="max-w-md">
                      <h3 className="text-xs uppercase tracking-widest text-[#666] font-bold mb-1 font-mono">Calculation Engine Staged</h3>
                      <p className="text-xs text-[#888] leading-relaxed mb-4">
                        Awaiting raw concept params. Input hypothetical topic metrics to run multi-feed calculations and map BSS/KSM re-engineering.
                      </p>
                    </div>
                    <button
                      type="button" 
                      onClick={() => applyTemplate(TEMPLATES[0])}
                      className="px-4 py-2 border border-[#333] hover:border-[#00ff41] bg-[#0a0a0a] text-xs font-mono text-[#888] hover:text-[#00ff41] rounded transition"
                    >
                      INITIALIZE DEMO MODEL
                    </button>
                  </div>
                )}

                {/* AUDIT DETAILS ACTIVE VIEW */}
                {!loading && auditResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-6"
                  >
                    
                    {/* Final Evaluation Score Card */}
                    <div className="border border-[#222] bg-[#080808] rounded p-6 relative overflow-hidden">
                      {/* Left glowing neon status strip */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                        auditResult.goDecision === "GREENLIGHT" 
                          ? "bg-[#00ff41] shadow-[0_0_8px_#00ff41]" 
                          : auditResult.goDecision === "REVISE" 
                          ? "bg-amber-500" 
                          : "bg-rose-500"
                      }`} />

                      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mt-1 pl-2">
                        <div className="flex flex-col gap-2 max-w-lg">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-[#ff3e3e20] text-[#ff3e3e] text-[9px] font-bold uppercase tracking-widest border border-[#ff3e3e50] font-mono">
                              Audit Result
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider font-mono ${
                              auditResult.goDecision === "GREENLIGHT"
                                ? "bg-[#00ff411b] text-[#00ff41] border border-[#00ff4155]"
                                : auditResult.goDecision === "REVISE"
                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                            }`}>
                              {auditResult.goDecision}
                            </span>
                          </div>
                          <h3 className="text-base font-bold font-mono tracking-wide text-white uppercase mt-1">
                            {auditResult.goDecision === "GREENLIGHT" 
                              ? "OPTIMIZATION ACCEPTED // READY" 
                              : "STRATEGIC CRITIQUE PROTOCOL RETEST"}
                          </h3>
                          <p className="text-sm font-serif leading-relaxed text-[#aaa] italic border-l border-[#333] pl-3">
                            "{auditResult.auditCritique}"
                          </p>
                        </div>

                        {/* Numeric Score display */}
                        <div className="flex items-center gap-4 shrink-0 bg-[#0a0a0a] p-4 rounded border border-[#222]">
                          <div className="text-center font-mono">
                            <span className="text-[10px] uppercase font-mono text-[#666] block mb-1">PROBABILITY</span>
                            <div className={`text-4xl font-extrabold tracking-tighter ${
                              auditResult.goDecision === "GREENLIGHT" ? "text-[#00ff41]" : "text-amber-400"
                            }`}>
                              {auditResult.finalSuccessProbability.toFixed(2)}
                            </div>
                            <span className="text-[9px] text-[#555] uppercase block mt-1">Scaled Base</span>
                          </div>
                        </div>
                      </div>

                      {/* Header save action */}
                      <div className="mt-5 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono text-[#555]">
                        <span>
                          INDEX TIME: <strong className="text-[#888]">{auditResult.timestamp || "Just now"}</strong>
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={saveAuditCampaign}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                              savedAudits.some(item => item.id === auditResult.id)
                                ? "bg-[#00ff4110] border-[#00ff41] text-[#00ff41]"
                                : "bg-[#0a0a0a] border-[#222] text-[#888] hover:text-white hover:border-[#333]"
                            }`}
                          >
                            <Bookmark className="w-3 h-3" />
                            {savedAudits.some(item => item.id === auditResult.id) ? "Blueprint Saved" : "Save Blueprint"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Formula Mathematical Breakdown Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                      
                      {/* BSS Formula Breakdown */}
                      <div className="border border-[#222] bg-[#080808] rounded p-5">
                        <div className="flex items-center gap-2 pb-2.5 border-b border-[#222] mb-3.5">
                          <Calculator className="w-3.5 h-3.5 text-[#00ff41]" />
                          <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#666]">BASE SUCCESS SCORE (BSS)</h4>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "CONVERSATION PROMPTERS", value: auditResult.bssScore.conversationPotential },
                            { label: "DWELL/RETENTION LOOPING", value: auditResult.bssScore.retentionDwellTime },
                            { label: "MEDIA METRIC INDEX", value: auditResult.bssScore.mediaStrength },
                            { label: "FIRST-HOUR VELOCITY", value: auditResult.bssScore.earlyVelocity },
                            { label: "DECAY MITIGATION PROFILE", value: auditResult.bssScore.decayMitigation }
                          ].map((item, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-[10px] text-[#888] mb-1">
                                <span>{item.label}</span>
                                <span className="text-[#00ff41] font-bold">{item.value.toFixed(2)}</span>
                              </div>
                              <div className="w-full bg-[#1c1c1c] h-1">
                                <div 
                                  className="bg-[#00ff41] h-1" 
                                  style={{ width: `${item.value * 100}%` }} 
                                />
                              </div>
                            </div>
                          ))}

                          <div className="mt-2.5 pt-3 border-t border-dashed border-[#222] flex items-center justify-between text-xs">
                            <span className="text-[#666] font-bold">TOTAL BSS</span>
                            <span className="font-bold text-[#00ff41]">
                              {auditResult.bssScore.calculatedBss.toFixed(3)} / 1.000
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* KSM Formula Breakdown */}
                      <div className="border border-[#222] bg-[#080808] rounded p-5">
                        <div className="flex items-center gap-2 pb-2.5 border-b border-[#222] mb-3.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#00ff41]" />
                          <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#666]">KEYWORD STRENGTH (KSM)</h4>
                        </div>

                        <div className="flex flex-col gap-3">
                          {[
                            { label: "NATIVE FORMAT MATCH (0.3)", value: auditResult.ksmScore.platformMatch },
                            { label: "FIRST-3S PLACEMENT (0.4)", value: auditResult.ksmScore.firstLinePlacement },
                            { label: "SEMANTIC AUTHENTICITY (0.3)", value: auditResult.ksmScore.relevance }
                          ].map((item, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-[10px] text-[#888] mb-1">
                                <span>{item.label}</span>
                                <span className="text-[#00ff41] font-bold">{item.value.toFixed(2)}</span>
                              </div>
                              <div className="w-full bg-[#1c1c1c] h-1">
                                <div 
                                  className="bg-[#00ff41] h-1" 
                                  style={{ width: `${item.value * 100}%` }} 
                                />
                              </div>
                            </div>
                          ))}

                          <div className="text-[9px] text-[#555] mt-2 leading-relaxed">
                            (Match * 0.3) + (First Line * 0.4) + (Relevance * 0.3)
                          </div>

                          <div className="mt-1.5 pt-3 border-t border-dashed border-[#222] flex items-center justify-between text-xs">
                            <span className="text-[#666] font-bold">MUTIPLIER KSM</span>
                            <span className="font-bold text-[#00ff41]">
                              × {auditResult.ksmScore.calculatedKsm.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Re-Engineered Hook Scroll Stopper */}
                    <div className="border border-[#222] bg-[#080808] rounded p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#00ff4110] text-[#00ff41] text-[9px] uppercase tracking-widest font-bold px-3 py-1 border-b border-l border-[#222] font-mono">
                        TRIGGER SCHEME
                      </div>

                      <div className="flex items-center gap-2 mb-3 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-[#00ff41]" />
                        <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#666]">RE-ENGINEERED HOOK (0-3S)</h4>
                      </div>

                      {/* Hook block code block style */}
                      <div className="bg-[#0a0a0a] text-white p-4.5 rounded border border-[#222] text-xl font-bold tracking-tight relative group">
                        <p>"{auditResult.reengineeredHook.text}"</p>
                        <button
                          onClick={() => triggerCopy(auditResult.reengineeredHook.text, "hook")}
                          className="absolute bottom-2 right-2 bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white p-1.5 rounded transition opacity-80 flex items-center gap-1 font-mono text-[9px] border border-[#222]"
                          title="Copy Hook"
                        >
                          {copiedHook ? <Check className="w-3 h-3 text-[#00ff41]" /> : <Copy className="w-3 h-3" />}
                          <span>COPY</span>
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row gap-3 text-[11px] font-mono">
                        <div className="bg-[#111] border border-[#222] p-3 rounded flex-1">
                          <span className="text-[#666] uppercase block mb-1">Trigger Classification:</span>
                          <span className="text-[#00ff41] font-bold">
                            {auditResult.reengineeredHook.trigger}
                          </span>
                        </div>
                        <div className="bg-[#111] border border-[#222] p-3 rounded flex-[2]">
                          <span className="text-[#666] uppercase block mb-1">Algorithmic Rationale:</span>
                          <span className="text-[#aaa] leading-relaxed block">{auditResult.reengineeredHook.reasoning}</span>
                        </div>
                      </div>
                    </div>

                    {/* Optimized Content / Native Asset Layout */}
                    <div className="border border-[#222] bg-[#0a0a0a] rounded p-6">
                      
                      <div className="flex items-center justify-between pb-3.5 border-b border-[#222] mb-5 font-mono">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-[#00ff41]" />
                          <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#666]">
                            NATIVE TEMPLATE DISPATCH
                          </h4>
                        </div>
                        <span className="text-[9px] font-bold bg-[#111] text-[#00ff41] px-3 py-1 rounded uppercase tracking-wider border border-[#222]">
                          FORMAT // {auditResult.optimizedContent.format}
                        </span>
                      </div>

                      {/* Video Format Timeline Renderer */}
                      {auditResult.optimizedContent.format === "video" && auditResult.optimizedContent.videoScript && (
                        <div className="flex flex-col gap-4 font-mono">
                          <div className="grid grid-cols-12 gap-3 pb-2 text-[9px] font-bold text-[#666] uppercase tracking-widest border-b border-[#222]">
                            <span className="col-span-2">TIMESTAMP</span>
                            <span className="col-span-5">VISUAL B-ROLL</span>
                            <span className="col-span-5">AUDIO VOICEOVER</span>
                          </div>

                          <div className="flex flex-col gap-4 divide-y divide-[#222]">
                            {auditResult.optimizedContent.videoScript.map((step, idx) => (
                              <div key={idx} className="grid grid-cols-12 gap-3 pt-3 text-[11px] items-start">
                                <span className="col-span-2 font-bold text-[#00ff41] bg-[#00ff4110] border border-[#00ff4130] px-1.5 py-0.5 rounded text-center text-[10px]">
                                  {step.timestamp}
                                </span>
                                <div className="col-span-5 text-[#888] pr-2">
                                  {step.visual}
                                </div>
                                <div className="col-span-5 flex flex-col gap-1.5">
                                  <p className="font-sans text-white font-medium">
                                    "{step.audio}"
                                  </p>
                                  {step.onScreenText && (
                                    <span className="text-[9px] font-extrabold uppercase bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded self-start border border-yellow-500/20">
                                      ON-SCREEN: {step.onScreenText}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Text Format Renderer (X / Substack articles) */}
                      {auditResult.optimizedContent.format === "text" && auditResult.optimizedContent.textPosts && (
                        <div className="flex flex-col gap-4 bg-[#080808] p-4 rounded border border-[#222] relative group">
                          {auditResult.optimizedContent.textPosts.map((post, idx) => (
                            <div key={idx} className="p-3 bg-[#0a0a0a] rounded border border-[#222] relative font-mono">
                              <span className="absolute top-2 right-2 text-[9px] text-[#444]">
                                INDEX #{idx + 1}
                              </span>
                              <p className="text-[11px] text-[#ccc] whitespace-pre-wrap leading-relaxed">
                                {post}
                              </p>
                            </div>
                          ))}

                          <button
                            onClick={() => triggerCopy(auditResult.optimizedContent.textPosts?.join("\n\n---\n\n") || "", "content")}
                            className="absolute top-2.5 right-2.5 bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-[#00ff41] p-2 rounded border border-[#222] transition flex items-center gap-1.5 text-[10px] font-mono uppercase"
                          >
                            {copiedContent ? <Check className="w-3 h-3 text-[#00ff41]" /> : <Copy className="w-3 h-3" />}
                            <span>COPY CAMPAIGN STRING</span>
                          </button>
                        </div>
                      )}

                      {/* Visual Assist asset generation command */}
                      {auditResult.imagePrompt && (
                        <div className="mt-6 pt-5 border-t border-[#222] font-mono">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666] block mb-2 font-mono">
                            HIGH-CONTRAST NEURAL ASSET PROMPT
                          </span>
                          <div className="p-3.5 bg-[#080808] text-[#888] hover:text-white text-[11px] rounded border border-[#222] leading-relaxed relative flex items-center justify-between gap-4 transition-colors">
                            <span className="line-clamp-2 italic">"{auditResult.imagePrompt}"</span>
                            <button
                              onClick={() => triggerCopy(auditResult.imagePrompt, "prompt")}
                              className="bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-[#00ff41] p-2 rounded transition shrink-0 border border-[#222]"
                              title="Copy prompt"
                            >
                              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* High-Weight Action Layering */}
                    <div className="border border-[#00ff412c] bg-[#00ff410d] rounded p-5">
                      <div className="flex gap-4">
                        <div className="bg-[#00ff41] text-[#050505] w-12 h-12 rounded flex items-center justify-center font-mono font-bold text-lg shrink-0 shadow-[0_0_12px_#00ff4155]">
                          150x
                        </div>
                        <div className="text-xs flex flex-col gap-1 inline-block">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#666] font-mono block">
                            HIGH-WEIGHT VELOCITY MECHANISM
                          </span>
                          <span className="text-sm font-bold text-white block my-1">
                            Focus Vector: {auditResult.highWeightAction.target}
                          </span>
                          <p className="text-[#888] leading-relaxed">
                            {auditResult.highWeightAction.mechanism}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* VANGUARD EXPERIMENTAL SIMULATION SUITE */}
                    <div className="border border-[#222] bg-[#080808] rounded p-6 flex flex-col gap-6">
                      <div className="flex items-start justify-between border-b border-[#111] pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 bg-[#00ff41] rounded-full animate-ping shrink-0" />
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                              VANGUARD COGNITIVE RE-ENGINEERING SIMULATOR
                            </h3>
                            <p className="text-[10px] text-[#666] uppercase font-mono mt-0.5">
                              Real-Time Sandbox Editor // 24h Decay Map // 60s Retention Curve // Live Feed View
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold font-mono text-[#00ff41] bg-[#00ff410d] px-2.5 py-1 rounded border border-[#00ff412a]">
                          SIM_LIVE_v2.0
                        </span>
                      </div>

                      {/* SECTION 1: REAL-TIME LINGUISTIC HOOK SANDBOX */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        <div className="lg:col-span-12 p-4.5 bg-[#0a0a0a] border border-[#222] rounded flex flex-col gap-4">
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                              01. Real-Time Hook Sandbox Editor
                            </span>
                            <span className="text-[9px] text-[#555] uppercase">
                              Edit live and see score evolve
                            </span>
                          </div>

                          <div className="flex flex-col md:flex-row gap-5 items-start">
                            {/* Editor textarea */}
                            <div className="flex-1 w-full">
                              <textarea
                                value={sandboxHook}
                                onChange={(e) => setSandboxHook(e.target.value)}
                                rows={3}
                                className="w-full text-sm font-mono bg-[#050505] text-white border border-[#222] focus:border-[#444] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#00ff41]/10 leading-relaxed resize-none"
                                placeholder="Tweak the re-engineered hook text right here..."
                              />
                            </div>

                             {/* Scoring Gauge Display */}
                             {(() => {
                               const metrics = getHeuristicMetrics(sandboxHook, platform);
                               const bssPct = Math.round(metrics.bss * 100);
                               const ksmPct = Math.round(metrics.ksm * 100);
                               const probPct = Math.round(metrics.probability * 100);
                               
                               return (
                                 <div className="w-full md:w-[320px] p-4 bg-[#050505] rounded border border-[#222] flex flex-col gap-3 font-mono shrink-0">
                                   <div className="flex justify-between items-center text-[9px] text-[#666] uppercase tracking-wider">
                                     <span>SOP METRIC ENGINE</span>
                                     <span className={metrics.passesElite ? "text-[#00ff41] font-bold" : "text-amber-500 font-bold"}>
                                       {metrics.passesElite ? "★ ELITE GREENLIGHT" : "REVISE REQUIRED"}
                                     </span>
                                   </div>

                                   {/* Overall Probability Gauge */}
                                   <div className="flex items-center justify-between border-b border-[#111] pb-2">
                                     <span className="text-[10px] text-white uppercase font-bold">VIABILITY PROBABILITY:</span>
                                     <div className="text-xl font-black tracking-tight flex items-baseline gap-1 text-white">
                                       <span className={probPct >= 85 ? "text-[#00ff41]" : "text-amber-500"}>{probPct}%</span>
                                       <span className="text-[10px] text-[#444] font-normal">/ 100%</span>
                                     </div>
                                   </div>

                                   {/* Score Bars for BSS & KSM */}
                                   <div className="flex flex-col gap-2 text-[10px]">
                                     <div>
                                       <div className="flex justify-between mb-1">
                                         <span className="text-[#888]">1. Base Success Score (BSS):</span>
                                         <span className={bssPct >= 90 ? "text-[#00ff41] font-bold" : "text-red-400"}>
                                           {bssPct}% {bssPct >= 90 ? "(ELITE)" : "(MIN 90%)"}
                                         </span>
                                       </div>
                                       <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden">
                                         <div className="bg-[#00ff41]/80 h-1.5 transition-all duration-300 pointer-events-none" style={{ width: `${bssPct}%` }} />
                                       </div>
                                     </div>

                                     <div>
                                       <div className="flex justify-between mb-1">
                                         <span className="text-[#888]">2. Keyword Strength (KSM):</span>
                                         <span className={ksmPct >= 95 ? "text-[#00ff41] font-bold" : "text-red-400"}>
                                           {ksmPct}% {ksmPct >= 95 ? "(ELITE)" : "(MIN 95%)"}
                                         </span>
                                       </div>
                                       <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden">
                                         <div className="bg-amber-500/80 h-1.5 transition-all duration-300 pointer-events-none" style={{ width: `${ksmPct}%` }} />
                                       </div>
                                     </div>
                                   </div>

                                   {/* 3-Signal Auditing Sublayer */}
                                   <div className="p-2.5 bg-[#0a0a0a] rounded border border-[#111] flex flex-col gap-1.5 text-[9px] mt-1">
                                     <div className="flex justify-between items-center text-[10px] font-bold border-b border-[#1b1b1b] pb-1 text-white uppercase uppercase">
                                       <span>3-SIGNAL LOADER LAYER</span>
                                       <span className="text-[#00ff41]">{metrics.signalCount} / 3</span>
                                     </div>
                                     <div className="flex justify-between">
                                       <span className="text-[#555]">🔄 Rewatch Trigger:</span>
                                       <span className={metrics.hasRewatch ? "text-[#00ff41] font-bold" : "text-[#444]"}>
                                         {metrics.hasRewatch ? "LOADED" : "MISSING"}
                                       </span>
                                     </div>
                                     <div className="flex justify-between">
                                       <span className="text-[#555]">💬 Conversation Trigger:</span>
                                       <span className={metrics.hasConversation ? "text-[#00ff41] font-bold" : "text-[#444]"}>
                                         {metrics.hasConversation ? "LOADED" : "MISSING"}
                                       </span>
                                     </div>
                                     <div className="flex justify-between">
                                       <span className="text-[#555]">🔗 Share Trigger:</span>
                                       <span className={metrics.hasShare ? "text-[#00ff41] font-bold" : "text-[#444]"}>
                                         {metrics.hasShare ? "LOADED" : "MISSING"}
                                       </span>
                                     </div>
                                   </div>

                                   {/* General Metrics Checklist */}
                                   <div className="w-full flex justify-between text-[9px] pt-1.5 border-t border-[#1a1a1a]">
                                     <div>
                                       <span className="text-[#555]">Words: </span>
                                       <span className="text-white font-bold">{metrics.wordCount}</span>
                                     </div>
                                     <div>
                                       <span className="text-[#555]">Pattern Disrupt: </span>
                                       <span className={metrics.startsWithDigit ? "text-[#00ff41] font-bold" : "text-[#ff3e3e]"}>
                                         {metrics.startsWithDigit ? "PASSED" : "MISSING"}
                                       </span>
                                     </div>
                                   </div>
                                 </div>
                               );
                             })()}
                          </div>

                          {/* Interactive AI Hook Refiner Panel */}
                          <div className="flex flex-col gap-3 mt-1.5 pt-4 border-t border-[#1a1a1a]">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div>
                                <span className="text-[10px] text-[#888] uppercase font-mono font-bold block">Cognitive Variation Tuning Engine</span>
                                <p className="text-[9px] text-[#444] uppercase font-mono block mt-0.5">Let Gemini restructure your sandbox thesis around optimized performance triggers</p>
                              </div>
                              <button
                                type="button"
                                onClick={handleRefineHook}
                                disabled={refiningHook || !sandboxHook.trim()}
                                className="px-3.5 py-1.5 bg-[#00ff410a] hover:bg-[#00ff411b] text-[#00ff41] border border-[#00ff413a] hover:border-[#00ff4177] rounded text-[10px] uppercase tracking-wider font-mono font-bold transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0 select-none cursor-pointer"
                              >
                                {refiningHook ? (
                                  <>
                                    <span className="w-2.5 h-2.5 rounded-full border border-t-transparent border-[#00ff41] animate-spin inline-block" />
                                    TUNING NEURAL PROFILES...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3.5 h-3.5 text-[#00ff41]" />
                                    Auto-Tune 4 Cognitive Variants
                                  </>
                                )}
                              </button>
                            </div>

                            {refineError && (
                              <div className="text-[10px] text-rose-500 font-mono p-2 bg-rose-500/5 rounded border border-rose-500/20">
                                Refiner Connection Error: {refineError}
                              </div>
                            )}

                            {refinedVariations && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {refinedVariations.map((v, i) => (
                                  <div key={i} className="bg-[#050505] border border-[#1a1a1a] hover:border-[#333] rounded p-4 flex flex-col justify-between gap-4 transition-colors">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest font-mono bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 rounded">
                                          {v.triggerType}
                                        </span>
                                        <span className="text-[8px] text-[#444] font-mono font-bold">VARIANT_SEC_0{i+1}</span>
                                      </div>
                                      <p className="text-xs text-[#e0e0e0] font-mono leading-relaxed bg-[#020202] p-2 rounded border border-[#111] border-dashed">
                                        "{v.text}"
                                      </p>
                                      <p className="text-[10px] text-[#777] leading-relaxed font-sans">
                                        <strong className="text-[#999]">Algorithmic Indexing:</strong> {v.explanation}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSandboxHook(v.text);
                                        setAbHookB(v.text);
                                      }}
                                      className="w-full py-1.5 bg-[#111] hover:bg-[#00ff4109] text-[#888] hover:text-[#00ff41] border border-[#222] hover:border-[#00ff4144] rounded text-[9px] uppercase font-mono font-bold tracking-wider transition cursor-pointer"
                                    >
                                      Deploy to Sandbox & Tournament
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* SECTION 2: ALGORITHMIC DECAY AND AUDIENCE RETENTION MAPS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* 2A: 24h Algorithmic Decay Graph */}
                        <div className="border border-[#222] bg-[#0a0a0a] p-5 rounded font-mono flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                              02. PHENIX TIME-DECAY MATRIX
                            </span>
                            <span className="text-[8px] text-[#666] uppercase">24h Simulation cycle</span>
                          </div>

                          {/* Decay Graph representation (SVG) */}
                          <div className="w-full bg-[#050505] p-3 rounded border border-[#1a1a1a] flex flex-col items-center justify-center relative">
                            <svg viewBox="0 0 380 120" className="w-full h-32 overflow-visible">
                              <defs>
                                <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#00ff41" stopOpacity="0.15" />
                                  <stop offset="100%" stopColor="#00ff41" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              {/* Background grid indicators */}
                              <line x1="10" y1="20" x2="370" y2="20" stroke="#1c1c1c" strokeDasharray="3,3" />
                              <line x1="10" y1="65" x2="370" y2="65" stroke="#1c1c1c" strokeDasharray="3,3" />
                              <line x1="10" y1="110" x2="370" y2="110" stroke="#1c1c1c" strokeDasharray="3,10" />

                              {/* Curve path representation */}
                              <path 
                                d="M 10,110 L 10,75 L 35,25 L 85,32 L 135,55 L 210,85 L 300,100 L 370,108"
                                fill="none"
                                stroke="#1c1c1c"
                                strokeWidth="3"
                              />
                              <path 
                                d="M 10,110 L 10,72 L 35,20 C 60,18 80,28 100,45 C 130,70 170,80 210,92 C 265,108 310,108 370,110"
                                fill="url(#decayGrad)"
                                stroke="#00ff41"
                                strokeWidth="2.5"
                                className="transition-all duration-300"
                              />

                              {/* Interactive clickable ticks */}
                              {[
                                { hour: 1, cx: 35, cy: 20 },
                                { hour: 3, cx: 100, cy: 45 },
                                { hour: 6, cx: 160, cy: 78 },
                                { hour: 12, cx: 210, cy: 92 },
                                { hour: 24, cx: 370, cy: 110 }
                              ].map((pt) => (
                                <g 
                                  key={pt.hour}
                                  className="cursor-pointer group"
                                  onClick={() => setVisualizeInteractiveHour(pt.hour)}
                                >
                                  <circle 
                                    cx={pt.cx} 
                                    cy={pt.cy} 
                                    r={visualizeInteractiveHour === pt.hour ? "7" : "4.5"} 
                                    className={`transition-all duration-150 ${
                                      visualizeInteractiveHour === pt.hour 
                                        ? "fill-[#050505] stroke-[#00ff41] stroke-[2]" 
                                        : "fill-[#050505] stroke-[#333] hover:stroke-[#00ff41]"
                                    }`} 
                                  />
                                  <text x={pt.cx} y={pt.cy - 12} textAnchor="middle" fontSize="8" className="fill-[#555] group-hover:fill-white font-mono shrink-0">
                                    H{pt.hour}
                                  </text>
                                </g>
                              ))}
                            </svg>
                          </div>

                          {/* Time description readout block */}
                          {(() => {
                            const details: Record<number, { title: string; txt: string; scoreImpact: string; activeSignal: string }> = {
                              1: { 
                                title: "Golden Hour Match assessment Gate", 
                                txt: "Algorithmic validation starts immediately. Completion rate metrics determine if content is served beyond early seed demographics.", 
                                scoreImpact: "BSS Variable: Early Velocity (Weight: High)", 
                                activeSignal: "Critical signals: Shares, Immediate replies" 
                              },
                              3: { 
                                title: "Primary Multiplier amplificaton Filter", 
                                txt: "Initial signal density is siphoned. Saves/bookmarks trigger an amplification multiplier of up to 10x relative velocity.", 
                                scoreImpact: "KSM Variable: Native format alignment multiplier", 
                                activeSignal: "Critical signals: Bookmarks" 
                              },
                              6: { 
                                title: "Dwell Filter Indexing check", 
                                txt: "Platform measures overall dwell duration relative to competitive content basins within the primary niche sector.", 
                                scoreImpact: "BSS Variable: Dwell/Retention consistency", 
                                activeSignal: "Critical signals: Rewatch Loops" 
                              },
                              12: { 
                                title: "Secondary Global FYP Scale tier", 
                                txt: "Escapes local demography pools. Explodes content globally inside cross-demographic feeds.", 
                                scoreImpact: "Decay Mitigation: Shield activated", 
                                activeSignal: "Critical signals: DM/External shares" 
                              },
                              24: { 
                                title: "Terminal Phoenix decay Mitigation", 
                                txt: "Exponential time-decay factors are applied. Retaining momentum requires persistent discussion signals & continuous bookmarks recall.", 
                                scoreImpact: "BSS Variable: Decay Mitigation Profile", 
                                activeSignal: "Critical signals: Long-tail saves recall" 
                              }
                            };
                            const info = details[visualizeInteractiveHour] || details[1];
                            return (
                              <div className="p-3 bg-[#050505] rounded border border-[#1a1a1a] flex flex-col gap-1 text-[10px] leading-relaxed transition-all">
                                <div className="flex justify-between items-center text-white pb-1.5 border-b border-[#111] mb-1">
                                  <span className="font-bold uppercase text-[#00ff41]">HOUR {visualizeInteractiveHour}: {info.title}</span>
                                </div>
                                <p className="text-[#888]">{info.txt}</p>
                                <div className="mt-1 flex justify-between font-bold text-[8px] tracking-wider uppercase">
                                  <span className="text-[#666]">{info.scoreImpact}</span>
                                  <span className="text-[#00ff41]">{info.activeSignal}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {/* 2B: 60s Audience Retention Graph (Video scripts) */}
                        <div className="border border-[#222] bg-[#0a0a0a] p-5 rounded font-mono flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                              03. AUDIENCE RETENTION MAP
                            </span>
                            <span className="text-[8px] text-[#666] uppercase">60s Script Timeline</span>
                          </div>

                          {/* Retention graph representation (SVG) */}
                          <div className="w-full bg-[#050505] p-3 rounded border border-[#1a1a1a] flex flex-col items-center justify-center relative">
                            <svg viewBox="0 0 380 120" className="w-full h-32 overflow-visible">
                              <defs>
                                <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#eab308" stopOpacity="0.12" />
                                  <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              {/* Background grid line markers */}
                              <line x1="10" y1="20" x2="370" y2="20" stroke="#1c1c1c" strokeDasharray="3,3" />
                              <line x1="10" y1="65" x2="370" y2="65" stroke="#1c1c1c" strokeDasharray="3,3" />
                              <line x1="10" y1="110" x2="370" y2="110" stroke="#1c1c1c" strokeDasharray="3,10" />

                              {/* Curve line representation */}
                              <path 
                                d="M 10,20 Q 30,30 60,42 T 130,55 T 220,62 T 310,75 C 340,78 355,55 370,55"
                                fill="none"
                                stroke="#1c1c1c"
                                strokeWidth="3"
                              />
                              <path 
                                d="M 10,20 Q 30,30 60,42 T 130,55 T 220,62 T 310,75 C 340,78 355,55 370,55"
                                fill="none"
                                stroke="#eab308"
                                strokeWidth="2.5"
                                className="transition-all duration-300"
                              />
                              <path 
                                d="M 10,20 Q 30,30 60,42 T 130,55 T 220,62 T 310,75 C 340,78 355,55 370,55 L 370,110 L 10,110 Z"
                                fill="url(#retGrad)"
                                className="transition-all duration-300"
                              />

                              {/* Clickable points */}
                              {[
                                { sec: 0, cx: 10, cy: 20 },
                                { sec: 3, cx: 60, cy: 42 },
                                { sec: 15, cx: 130, cy: 55 },
                                { sec: 30, cx: 220, cy: 62 },
                                { sec: 59, cx: 370, cy: 55 }
                              ].map((pt) => (
                                <g 
                                  key={pt.sec}
                                  className="cursor-pointer group"
                                  onClick={() => setVisualizeInteractiveSec(pt.sec)}
                                >
                                  <circle 
                                    cx={pt.cx} 
                                    cy={pt.cy} 
                                    r={visualizeInteractiveSec === pt.sec ? "7" : "4.5"} 
                                    className={`transition-all duration-150 ${
                                      visualizeInteractiveSec === pt.sec 
                                        ? "fill-[#050505] stroke-[#eab308] stroke-[2]" 
                                        : "fill-[#050505] stroke-[#333] hover:stroke-[#eab308]"
                                    }`} 
                                  />
                                  <text x={pt.cx} y={pt.cy - 12} textAnchor="middle" fontSize="8" className="fill-[#555] group-hover:fill-white font-mono shrink-0">
                                    {pt.sec}s
                                  </text>
                                </g>
                              ))}
                            </svg>
                          </div>

                          {/* Second detail readout */}
                          {(() => {
                            const details: Record<number, { title: string; txt: string; cueType: string; status: string }> = {
                              0: { 
                                title: "Frame 1 Visual Shock Interlock", 
                                txt: "Immediately establish polarity. Place high-contrast bold overlays matching the text to stop dynamic thumb swipes under 150 milliseconds.", 
                                cueType: "Pattern interrupt visual trigger", 
                                status: "Expected Retention: 95% - 100%" 
                              },
                              3: { 
                                title: "The 3s Audition Survival Gate", 
                                txt: "The user decides cognitive relevance. Introduce a hard cadence drop, audio level shifts, or dramatic visual angle change to break habituation.", 
                                cueType: "Linguistic urgency trigger", 
                                status: "Expected Retention: 85% - 90%" 
                              },
                              15: { 
                                title: "Topic Re-framing / Contextual spike", 
                                txt: "Avoid the mid-script retention dip. Introduce a sub-hypothesis, contrast statement, or an unexpected visual stat overlay.", 
                                cueType: "Sub-framing argument node", 
                                status: "Expected Retention: 70% - 75%" 
                              },
                              30: { 
                                title: "Payoff Peak / High-Weight call", 
                                txt: "Delivering primary payload value. Trigger a secondary save motive ('Click the bookmark, so you do not lose this setup').", 
                                cueType: "Cognitive loss aversion callback", 
                                status: "Expected Retention: 58% - 64%" 
                              },
                              59: { 
                                title: "Endless Seamless Rewatch Loop", 
                                txt: "Cut spoken audio mid-payoff to match the first frame exactly. This tricks platform algorithms into recording >100% completion rates.", 
                                cueType: "Seamless interloop interlock", 
                                status: "Completion Multiplier: Active" 
                              }
                            };
                            const info = details[visualizeInteractiveSec] || details[0];
                            return (
                              <div className="p-3 bg-[#050505] rounded border border-[#1a1a1a] flex flex-col gap-1 text-[10px] leading-relaxed transition-all">
                                <div className="flex justify-between items-center text-white pb-1.5 border-b border-[#111] mb-1">
                                  <span className="font-bold uppercase text-[#eab308]">{visualizeInteractiveSec === 59 ? "LOOP Interlock (59s)" : `${visualizeInteractiveSec}S CUE: ${info.title}`}</span>
                                </div>
                                <p className="text-[#888]">{info.txt}</p>
                                <div className="mt-1 flex justify-between font-bold text-[8px] tracking-wider uppercase">
                                  <span className="text-[#555]">{info.cueType}</span>
                                  <span className="text-[#eab308]">{info.status}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                      </div>

                      {/* SECTION 3: LIVE SCREEN PREVIEW FEED SIMULATOR */}
                      <div className="border border-[#222] bg-[#0a0a0a] p-5 rounded font-mono flex flex-col gap-4">
                        <div className="flex items-center justify-between font-mono pb-2 border-b border-[#111]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                            04. LIVE PLATFORM FEED SIMULATION MOCKUP
                          </span>
                          <span className="text-[9px] text-[#00ff41] font-bold bg-[#00ff4110] px-2 py-0.5 rounded uppercase font-mono">
                            ACTIVE SCREEN: {platform}
                          </span>
                        </div>

                        {/* Rendering dynamic previews according to the active platform */}
                        <div className="flex items-center justify-center bg-[#050505] p-6 rounded-lg border border-[#111] min-h-[300px]">
                          {(() => {
                            if (platform.includes("X") || platform.includes("Twitter")) {
                              return (
                                <div className="w-full max-w-lg bg-[#000] border border-[#2d2f33] rounded-xl p-4.5 text-left font-sans text-white relative">
                                  {/* Header Info */}
                                  <div className="flex items-start gap-2.5 mb-2.5">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00ff41]/20 to-[#00ff41]/5 border border-[#00ff412a] flex items-center justify-center shrink-0">
                                      <BrainCircuit className="w-4 h-4 text-[#00ff41]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1">
                                        <span className="font-bold text-[14px] text-white hover:underline cursor-pointer block leading-tight">Vanguard Intelligence</span>
                                        <div className="w-3.5 h-3.5 bg-[#1d9bf0] text-white rounded-full flex items-center justify-center text-[7px]" title="Simulation Certified">✓</div>
                                        <span className="text-[13px] text-[#6e767d] block leading-tight ml-1 font-mono">@vanguard_2026</span>
                                      </div>
                                      <span className="text-[11px] text-[#00ff41] font-mono tracking-widest block mt-0.5 uppercase">SYSTEM AUTHORIZED // LIVE</span>
                                    </div>
                                  </div>

                                  {/* Main tweet text preview */}
                                  <div className="text-[15px] font-normal leading-relaxed text-[#e7e9ea] whitespace-pre-wrap pl-11 mb-4 font-mono pr-2">
                                    {sandboxHook || "(Enter sandbox text above...)"}
                                    <span className="text-[#1d9bf0] ml-1 select-none hover:underline cursor-pointer block mt-1">Translate post</span>
                                  </div>

                                  {/* Footer dynamic metrics bar */}
                                  <div className="flex justify-between items-center text-[#6e767d] text-[12px] pt-3 border-t border-[#2f3336] pl-11 max-w-sm ml-0.5 font-mono select-none">
                                    <span className="hover:text-[#1d9bf0] transition cursor-pointer flex items-center gap-1">💬 <strong className="text-white">1.4K</strong></span>
                                    <span className="hover:text-[#00ba7c] transition cursor-pointer flex items-center gap-1">🔁 <strong className="text-white">15.5K</strong></span>
                                    <span className="hover:text-[#f91880] transition cursor-pointer flex items-center gap-1">❤️ <strong className="text-white">84K</strong></span>
                                    <span className="hover:text-[#1d9bf0] transition cursor-pointer flex items-center gap-1">🔖 <strong className="text-white">4.8K</strong></span>
                                  </div>
                                </div>
                              );
                            } else {
                              // Video layout vertical preview for TikTok / Shorts / Reels
                              return (
                                <div className="w-[280px] h-[480px] bg-[#000] border-4 border-[#1a1a1a] rounded-3xl overflow-hidden relative shadow-lg text-white font-sans">
                                  {/* Phone Notch/Header Mock */}
                                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/80 to-transparent z-30 flex items-center justify-between px-6 text-[9px] font-mono select-none">
                                    <span className="text-white font-semibold">9:41</span>
                                    <div className="w-16 h-4 bg-black rounded-b-xl mx-auto absolute left-1/2 -translate-x-1/2 top-0" />
                                    <span className="text-white">📶 LTE</span>
                                  </div>

                                  {/* Immersive vertical simulator preview */}
                                  <div className="absolute inset-0 bg-[#070707] flex flex-col justify-end p-4 pb-6 z-10 relative">
                                    {/* Artificial B-Roll visuals generator indicator */}
                                    <div className="absolute inset-0 opacity-15 flex items-center justify-center select-none bg-gradient-to-tr from-amber-500/10 via-[#00ff41]/5 to-black">
                                      <Video className="w-20 h-20 text-[#00ff41] stroke-[0.5] animate-pulse" />
                                    </div>

                                    {/* Right vertical action float rail */}
                                    <div className="absolute right-3.5 bottom-24 flex flex-col gap-4 items-center z-20 text-center font-mono">
                                      <div className="flex flex-col items-center">
                                        <div className="w-9 h-9 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-bold text-xs text-[#00ff41] mb-1">💡</div>
                                        <span className="text-[9px] text-[#aaa]">88.5K</span>
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <div className="w-9 h-9 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-bold text-xs text-amber-500 mb-1">🔖</div>
                                        <span className="text-[9px] text-[#aaa]">45.2K</span>
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <div className="w-9 h-9 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-bold text-xs text-white mb-1">🔗</div>
                                        <span className="text-[9px] text-[#aaa]">12.4K</span>
                                      </div>
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00ff41] to-black border border-white/20 animate-spin-slow mt-2" />
                                    </div>

                                    {/* On-screen bold typography captions (Interactive Simulator Output) */}
                                    <div className="z-20 max-w-[190px] text-left">
                                      <span className="text-[10px] font-bold text-[#00ff41] bg-[#00ff4110] px-2 py-0.5 rounded uppercase font-mono tracking-wider border border-[#00ff4144] block mb-2 self-start max-w-max">
                                        @creator_pro
                                      </span>
                                      <p className="text-[13px] font-extrabold text-white leading-snug drop-shadow-lg pr-1 font-mono hover:text-[#00ff41] transition-colors">
                                        "{sandboxHook || "(Tweak hook and preview characters here...)"}"
                                      </p>
                                      {/* Loop payoff tags indicator */}
                                      <p className="text-[9px] font-mono text-yellow-400 mt-2 flex items-center gap-1 tracking-tight">
                                        🔄 INFINITE REWATCH LOOP ACTIVE
                                      </p>
                                    </div>
                                  </div>

                                  {/* Translucent overlay matching device footer */}
                                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-black z-30 flex items-center justify-center select-none">
                                    <div className="w-24 h-1 bg-white/40 rounded-full mb-1" />
                                  </div>
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <p className="text-[10px] text-center text-[#555] leading-relaxed">
                          *Mockups illustrate standard mobile and desktop aspect crops. If re-engineered hook text wraps beyond 3-lines, 플랫폼 context calculations suggest early reader retention limits are triggered.
                        </p>
                      </div>

                      {/* SECTION 4: AUDIENCE FEED INTEGRATION & INITIAL VELOCITY PREDICTOR */}
                      <div className="border border-[#222] bg-[#0a0a0a] p-5 rounded font-mono flex flex-col gap-4">
                        <div className="flex items-start gap-3 border-b border-[#111] pb-3">
                          <Layers className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#666] block">
                              04. AUDIENCE VELOCITY & FEED IMPRESSIONS PREDICTOR
                            </span>
                            <span className="text-[11px] font-bold text-white block">
                              Adjust external parameters to predict initial 12h lifecycle impressions & trajectory
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Parameter Sliders */}
                          <div className="lg:col-span-5 p-4 bg-[#050505] rounded border border-[#1a1a1a] flex flex-col gap-4">
                            <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold mb-1">REAL-TIME SLIDER DRIVERS</span>

                            {/* Slider 1: Feed Density Index */}
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-white uppercase">Feed Density Saturation</span>
                                <span className="text-[#00ff41] font-bold">{feedDensityIndex}%</span>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                value={feedDensityIndex}
                                onChange={(e) => setFeedDensityIndex(parseInt(e.target.value))}
                                className="w-full h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#00ff41]"
                              />
                              <div className="flex justify-between text-[8px] text-[#444] uppercase">
                                <span>Quiet Hour</span>
                                <span>Peak Traffic Chaos</span>
                              </div>
                            </div>

                            {/* Slider 2: Push Multiplier */}
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-white uppercase">Traction Boosting Multiplier</span>
                                <span className="text-[#00ff41] font-bold">{adSpendPush}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={adSpendPush}
                                onChange={(e) => setAdSpendPush(parseInt(e.target.value))}
                                className="w-full h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#00ff41]"
                              />
                              <div className="flex justify-between text-[8px] text-[#444] uppercase">
                                <span>Organic Baseline</span>
                                <span>High-Intensity Boost</span>
                              </div>
                            </div>

                            {/* Slider 3: Audience Dwell Intent */}
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-white uppercase">User Attention Dwell Intent</span>
                                <span className="text-[#00ff41] font-bold">{dwellIntent}%</span>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                value={dwellIntent}
                                onChange={(e) => setDwellIntent(parseInt(e.target.value))}
                                className="w-full h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#00ff41]"
                              />
                              <div className="flex justify-between text-[8px] text-[#444] uppercase">
                                <span>Hyperactive Swipe</span>
                                <span>Deep Content Research</span>
                              </div>
                            </div>
                          </div>

                          {/* Metric Displays & Curve Visualizer */}
                          <div className="lg:col-span-7 flex flex-col gap-4">
                            {/* Dial metrics row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="p-3 bg-[#050505] rounded border border-[#1a1a1a] text-center flex flex-col gap-0.5">
                                <span className="text-[8px] text-[#555] uppercase block font-bold">Projected Impressions</span>
                                <span className="text-sm font-black text-[#00ff41] tracking-tight">{simulatedReachData.impressions}</span>
                              </div>
                              <div className="p-3 bg-[#050505] rounded border border-[#1a1a1a] text-center flex flex-col gap-0.5">
                                <span className="text-[8px] text-[#555] uppercase block font-bold">Impression CSR</span>
                                <span className="text-sm font-black text-amber-500 tracking-tight">{simulatedReachData.csr}</span>
                              </div>
                              <div className="p-3 bg-[#050505] rounded border border-[#1a1a1a] text-center flex flex-col gap-0.5">
                                <span className="text-[8px] text-[#555] uppercase block font-bold">Initial Velocity</span>
                                <span className="text-sm font-black text-white tracking-tight">{simulatedReachData.velocity}</span>
                              </div>
                              <div className="p-3 bg-[#050505] rounded border border-[#1a1a1a] text-center flex flex-col gap-0.5">
                                <span className="text-[8px] text-[#555] uppercase block font-bold">Tencent APV Target</span>
                                <span className="text-sm font-black text-[#00ff41] tracking-tight">{simulatedReachData.completion}</span>
                              </div>
                            </div>

                            {/* Live Area Curve (SVG) */}
                            <div className="bg-[#050505] p-4.5 rounded border border-[#1a1a1a] flex flex-col gap-2 flex-1 justify-between relative min-h-[140px]">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] text-[#555] uppercase font-bold tracking-wider">PROJECTED 12h TRACTION LIFECYCLE</span>
                                <span className="text-[8px] text-yellow-500 bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/10 font-bold uppercase">Dynamic Model Estimate</span>
                              </div>

                              <div className="relative w-full h-24 overflow-visible my-1 flex items-end">
                                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                                  <defs>
                                    <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#00ff41" stopOpacity="0.2" />
                                      <stop offset="100%" stopColor="#00ff41" stopOpacity="0" />
                                    </linearGradient>
                                  </defs>
                                  
                                  {/* Grid background */}
                                  <line x1="0" y1="20" x2="400" y2="20" stroke="#111" strokeDasharray="3,3" />
                                  <line x1="0" y1="50" x2="400" y2="50" stroke="#111" strokeDasharray="3,3" />
                                  <line x1="0" y1="80" x2="400" y2="80" stroke="#111" strokeDasharray="3,3" />

                                  {/* Area Projection */}
                                  {(() => {
                                    const p = simulatedReachData.growthCurve;
                                    const maxVal = Math.max(...p, 1);
                                    const points = [
                                      { x: 10, y: 100 - (p[0] / maxVal) * 80 },
                                      { x: 80, y: 100 - (p[1] / maxVal) * 80 },
                                      { x: 160, y: 100 - (p[2] / maxVal) * 80 },
                                      { x: 240, y: 100 - (p[3] / maxVal) * 80 },
                                      { x: 320, y: 100 - (p[4] / maxVal) * 80 },
                                      { x: 390, y: 100 - (p[5] / maxVal) * 80 }
                                    ];

                                    const pathD = `M ${points[0].x},${points[0].y} ` + 
                                                  `C 50,${(points[0].y + points[1].y)/2} 70,${points[1].y} ${points[1].x},${points[1].y} ` +
                                                  `C 120,${points[1].y} 140,${points[2].y} ${points[2].x},${points[2].y} ` +
                                                  `C 200,${points[2].y} 220,${points[3].y} ${points[3].x},${points[3].y} ` +
                                                  `C 280,${points[3].y} 300,${points[4].y} ${points[4].x},${points[4].y} ` +
                                                  `C 360,${points[4].y} 380,${points[5].y} ${points[5].x},${points[5].y}`;

                                    const areaD = `${pathD} L 390,100 L 10,100 Z`;

                                    return (
                                      <>
                                        <path d={areaD} fill="url(#curveGrad)" />
                                        <path d={pathD} fill="none" stroke="#00ff41" strokeWidth="2" />
                                        
                                        {/* Scatter dots */}
                                        {points.map((pt, ind) => (
                                          <g key={ind}>
                                            <circle cx={pt.x} cy={pt.y} r="3.5" fill="#050505" stroke="#00ff41" strokeWidth="1.5" />
                                            <text x={pt.x} y={pt.y - 8} fill="#777" fontSize="7" textAnchor="middle" className="font-mono">
                                              {ind === 0 ? "0h" : `${ind * 2}h`}
                                            </text>
                                          </g>
                                        ))}
                                      </>
                                    );
                                  })()}
                                </svg>
                              </div>

                              <div className="flex justify-between text-[7px] text-[#444] px-1 font-mono uppercase">
                                <span>Upload</span>
                                <span>2 Hours</span>
                                <span>4 Hours</span>
                                <span>6 Hours</span>
                                <span>8 Hours</span>
                                <span>10-12 Hours (Satiation Node)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SECTION 5: THE ULTIMATE A/B MATCHUP TOURNAMENT ARENA */}
                      <div className="border border-[#222] bg-[#0a0a0a] p-5 rounded font-mono flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                          <Calculator className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#666] block">
                              05. AUDIT TOURNAMENT MATCHUP ARENA
                            </span>
                            <span className="text-[11px] font-bold text-white block">
                              Enter Two Campaign Variations to Compare Algorithmic Victory Probabilities
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-[#666] font-bold mb-1.5">VARIATION CANDIDATE A (BASELINE / RAW)</label>
                            <textarea
                              value={abHookA}
                              onChange={(e) => setAbHookA(e.target.value)}
                              rows={2}
                              className="w-full text-xs font-mono bg-[#050505] text-white border border-[#222] focus:border-[#444] rounded p-2.5 outline-none resize-none"
                              placeholder="Enter baseline hook concept..."
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-[#666] font-bold mb-1.5">VARIATION CANDIDATE B (OPTIMIZED / ALTERNATIVE)</label>
                            <textarea
                              value={abHookB}
                              onChange={(e) => setAbHookB(e.target.value)}
                              rows={2}
                              className="w-full text-xs font-mono bg-[#050505] text-white border border-[#222] focus:border-[#444] rounded p-2.5 outline-none resize-none"
                              placeholder="Enter optimized hook alternative..."
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={abTesting || !abHookA.trim() || !abHookB.trim()}
                          onClick={handleAbTest}
                          className="w-full bg-[#050505] hover:bg-[#111] text-white border border-[#eab308]/50 hover:border-[#eab308] text-xs font-mono font-bold tracking-widest py-3 rounded cursor-pointer transition disabled:bg-[#111] disabled:text-[#444] disabled:border-[#222]"
                        >
                          {abTesting ? "STAGE TESTING TOURNAMENT..." : "RUN MATHEMATICAL COMPARISON TOURNAMENT"}
                        </button>

                        <AnimatePresence>
                          {abMatchupResult && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden bg-[#050505] border border-[#1a1a1a] rounded p-4 flex flex-col gap-3 transition-all"
                            >
                              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#111] pb-2 mb-1 gap-2">
                                <span className="text-[10px] uppercase font-bold text-yellow-500">
                                  TOURNAMENT SUMMARY REPORT
                                </span>
                                <div className="flex items-center gap-4 text-[10px] font-bold">
                                  <span>CANDIDATE A: <strong className="text-white">{abMatchupResult.scoreA}%</strong></span>
                                  <span>CANDIDATE B: <strong className="text-[#00ff41]">{abMatchupResult.scoreB}%</strong></span>
                                </div>
                              </div>

                              {/* Critique block */}
                              <div className="text-[11px] bg-[#070707] p-3 text-white leading-relaxed border-l-2 border-[#00ff41] italic font-sans">
                                "{abMatchupResult.critique}"
                              </div>

                              {/* Score Breakdown sides */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] mt-1 pt-1.5 border-t border-[#111]">
                                <div className="flex flex-col gap-1.5">
                                  <span className="font-bold text-[#666] uppercase block mb-1">CANDIDATE A INSIGHTS</span>
                                  {abMatchupResult.pointsA.map((pt, idx) => (
                                    <div key={idx} className="flex gap-2 items-start text-[#aaa] leading-relaxed">
                                      <span className="text-rose-500 shrink-0">•</span>
                                      <span>{pt}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex flex-col gap-1.5 sm:border-l sm:border-[#111] sm:pl-4">
                                  <span className="font-bold text-[#00ff41] uppercase block mb-1">CANDIDATE B INSIGHTS</span>
                                  {abMatchupResult.pointsB.map((pt, idx) => (
                                    <div key={idx} className="flex gap-2 items-start text-[#aaa] leading-relaxed">
                                      <span className="text-[#00ff41] shrink-0">•</span>
                                      <span>{pt}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>

                    {/* Interactive Golden Hour Protocol checklist */}
                    <div className="border border-[#222] bg-[#0a0a0a] p-6 rounded">
                      <div className="flex items-center gap-2 mb-5 font-mono">
                        <ListTodo className="w-4 h-4 text-[#00ff41]" />
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-white font-bold">
                            GOLDEN HOUR DEPLOYMENT PROTOCOL
                          </h4>
                          <span className="text-[9px] text-[#666]">Tactical checkpoints to hold velocity shield during first hour</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5 font-mono">
                        {auditResult.goldenHourProtocol.map((step, idx) => {
                          const isDone = !!checklist[`step-${idx}`];
                          return (
                            <button
                              key={idx}
                              onClick={() => toggleChecklist(`step-${idx}`)}
                              className={`w-full text-left p-3.5 rounded border flex items-start gap-4 transition-all ${
                                isDone 
                                  ? "bg-[#080808] border-[#00ff411b] text-[#555]" 
                                  : "bg-[#080808] hover:bg-[#0f0f0f] border-[#222] text-[#888]"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                                isDone ? "bg-[#00ff41] border-[#00ff41] text-[#050505]" : "border-[#333] bg-[#050505]"
                              }`}>
                                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className={`text-[11px] leading-relaxed ${isDone ? "line-through opacity-50" : "text-[#aaa]"}`}>
                                {step}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </motion.div>
                )}

              </div>
            )}

            {/* TAB-2: Keyword Research Tool */}
            {currentTab === "keywords" && (
              <div className="border border-[#222] bg-[#080808] rounded p-6 flex flex-col gap-6 min-h-[500px]">
                
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-white mb-1">COGNITIVE SEARCH INDEXER</h2>
                    <p className="text-xs text-[#888]">
                      Query high-viability keywords, trending boosters, and optimized tags based on social automated speech engines.
                    </p>
                  </div>
                </div>

                {/* mini query form */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={keywordTopic}
                    onChange={(e) => setKeywordTopic(e.target.value)}
                    placeholder="Enter keywords e.g. software engineering portfolios, low-tox clean living..."
                    className="flex-1 text-xs font-mono bg-[#0c0c0c] text-white border border-[#222] rounded px-4 py-3 focus:outline-none focus:border-[#444] placeholder:text-[#333]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runKeywordsResearch();
                    }}
                  />
                  <button
                    disabled={keywordsLoading}
                    onClick={runKeywordsResearch}
                    className="bg-[#0a0a0a] hover:bg-[#111] text-[#00ff41] border border-[#00ff41] px-5 py-3 rounded font-bold font-mono text-xs transition duration-150 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:bg-[#111] disabled:text-[#444] disabled:border-[#222]"
                  >
                    {keywordsLoading ? (
                      <span className="w-3.5 h-3.5 border-2 border-[#00ff41]/20 border-t-[#00ff41] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        RUN COGNITIVE CRYPT
                      </>
                    )}
                  </button>
                </div>

                {keywordError && (
                  <div className="p-3 bg-[#ff3e3e11] text-[#ff3e3e] border border-[#ff3e3e50] rounded-xl text-xs flex items-center gap-2 font-mono">
                    <AlertTriangle className="w-4 h-4" />
                    {keywordError}
                  </div>
                )}

                {/* KEYWORDS RESULTS PANEL */}
                {keywordsResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                    
                    {/* Search Volume Estimate */}
                    <div className="p-4 bg-[#0a0a0a] rounded border border-[#222] flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#666] block font-mono">
                          2024–2026 SEARCH DENSITY ESTIMATION
                        </span>
                        <span className="text-sm font-extrabold text-white font-mono uppercase tracking-wide">
                          {keywordsResult.searchVolumeEstimate}
                        </span>
                      </div>
                      <span className="text-[10px] bg-[#00ff4110] text-[#00ff41] border border-[#00ff4130] px-3 py-1 rounded font-bold uppercase tracking-widest font-mono">
                        HIGH RANKING INDEX
                      </span>
                    </div>

                    {/* Keyword components */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Primary Keywords */}
                      <div className="p-4.5 rounded border border-[#222] bg-[#0a0a0a] flex flex-col gap-3 font-mono">
                        <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider block mb-1">
                          PRIMARY WORD VECTORS
                        </span>
                        
                        <div className="flex flex-col gap-2">
                          {keywordsResult.primaryKeywords.map((kw, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 bg-[#080808] border border-[#222] rounded group">
                              <span className="text-xs font-semibold text-[#ccc]">{kw}</span>
                              <button
                                onClick={() => triggerCopyKeyword(kw, `pk-${i}`)}
                                className="text-xs text-[#555] hover:text-white p-1 rounded hover:bg-[#111] transition"
                                title="Copy"
                              >
                                {copiedKeywords[`pk-${i}`] ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Trending Boosters */}
                      <div className="p-4.5 rounded border border-[#222] bg-[#0a0a0a] flex flex-col gap-3 font-mono">
                        <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider block mb-1">
                          CONTEXTUAL TREND BOOSTERS
                        </span>

                        <div className="flex flex-col gap-2">
                          {keywordsResult.trendingBoosters.map((kw, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 bg-[#080808] border border-[#222] rounded group">
                              <span className="text-xs font-semibold text-[#ccc]">{kw}</span>
                              <button
                                onClick={() => triggerCopyKeyword(kw, `tb-${i}`)}
                                className="text-xs text-[#555] hover:text-white p-1 rounded hover:bg-[#111] transition"
                                title="Copy"
                              >
                                {copiedKeywords[`tb-${i}`] ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Recommended Hashtags */}
                    <div className="p-4.5 border border-[#222] bg-[#0a0a0a] rounded">
                      <span className="text-[10px] font-bold text-[#666] block mb-3 font-mono uppercase tracking-wider">
                        OPTIMIZED SOCIAL TAG STRATAGEMS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {keywordsResult.recommendedHashtags.map((tag, i) => (
                          <div 
                            key={i}
                            className="bg-[#080808] text-[#aaa] hover:text-white text-xs px-3 py-1.5 rounded font-semibold font-mono border border-[#222] flex items-center gap-2 transition-all"
                          >
                            <span>{tag}</span>
                            <button
                              onClick={() => triggerCopyKeyword(tag, `tag-${i}`)}
                              className="text-[#555] hover:text-[#00ff41] transition"
                            >
                              {copiedKeywords[`tag-${i}`] ? <Check className="w-3 h-3 text-[#00ff41]" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                )}

                {!keywordsResult && !keywordsLoading && (
                  <div className="flex flex-col items-center justify-center text-center p-12 text-[#444] flex-1">
                    <Search className="w-12 h-12 mb-3 text-[#222]" />
                    <p className="text-xs text-[#666] font-mono">Input a creative hypothesis above to run indexing parameters.</p>
                  </div>
                )}

              </div>
            )}

            {/* TAB-3: Saved Blueprints Library */}
            {currentTab === "library" && (
              <div className="border border-[#222] bg-[#080808] rounded p-6 flex flex-col gap-6 min-h-[500px]">
                <div className="flex items-start gap-3 mb-2">
                  <Bookmark className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-white mb-1">SAVED BLUEPRINTS ARCHIVE</h2>
                    <p className="text-xs text-[#888]">
                      Access, review, and synchronize past successful content optimization campaigns stored in local persistence.
                    </p>
                  </div>
                </div>

                {savedAudits.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-16 text-[#444] my-auto">
                    <History className="w-12 h-12 mb-3 text-[#222]" />
                    <p className="text-xs font-bold text-[#666] uppercase font-mono mb-1">Vault currently empty</p>
                    <p className="text-xs text-[#555] max-w-sm font-sans mb-4">
                      Create optimized campaign blue prints. Use the Save Blueprint button to secure viable calculations here.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 font-mono">
                    {savedAudits.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => loadSavedAudit(item)}
                        className="p-4 bg-[#0a0a0a] hover:bg-[#0f0f0f] border border-[#222] rounded text-left transition-all cursor-pointer flex justify-between items-center group shadow-sm"
                      >
                        <div className="flex flex-col gap-1.5 max-w-lg">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-bold text-[#666] uppercase tracking-widest">
                              {item.platform}
                            </span>
                            <span className="text-[10px] bg-[#00ff4110] border border-[#00ff4130] text-[#00ff41] px-2 py-0.5 rounded font-bold">
                              PROB; {Math.round(item.finalSuccessProbability * 100)}%
                            </span>
                            <span className="text-[9px] text-[#444]">
                              {item.timestamp || "Just now"}
                            </span>
                          </div>
                          
                          <h4 className="text-xs font-bold text-white truncate max-w-md uppercase tracking-wide">
                            Raw: "{item.topic || 'Untitled campaign'}"
                          </h4>
                          
                          <p className="text-[11px] text-[#888] line-clamp-1 italic">
                            "{item.reengineeredHook.text}"
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => deleteSavedAudit(item.id || "", e)}
                            className="p-2 text-[#444] hover:text-[#ff3e3e] hover:bg-[#ff3e3e15] border border-transparent hover:border-[#ff3e3e33] rounded transition-all shrink-0"
                            title="Delete Saved Audit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </section>

        </div>
      </main>

      {/* Elegant System Coordinates / Status Footer */}
      <footer className="border-t border-[#222] bg-[#0a0a0a] py-6 mt-16 text-[10px] font-mono text-[#444] tracking-wider">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            <span>SYSTEM COORDINATES: 40.7128° N, 74.0060° W</span>
            <span className="hidden md:inline-block border-l border-[#222] pl-4">HASH: SHA-256-AE</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <span>ENCRYPTION: AES-256-X</span>
            <span className="animate-pulse text-[#00ff41]">● RECEIVING LIVE FEED...</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
