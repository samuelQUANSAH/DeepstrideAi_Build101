export interface SystemCard {
  title: string;
  description: string;
  category: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export interface TechnicalHighlight {
  title: string;
  description: string;
}

export interface GovernanceRule {
  title: string;
  description: string;
}

export const siteContent = {
  brand: "BlindLabs.Dev",
  tagline: "AI-native engineering for the physical frontier.",
  subtagline: "We design autonomous AI systems that reason, coordinate, and execute across digital and physical environments.",
  
  mission: {
    title: "From intelligence to execution.",
    body: "BlindLabs.Dev builds agentic systems that go beyond static automation. Our systems plan, retrieve, reason, validate, coordinate tools, and prepare actions for real-world deployment."
  },

  offerings: [
    {
      title: "Agentic AI Systems",
      description: "State-of-the-art reasoning engines capable of planning and executing multi-step workflows autonomously.",
      category: "core"
    },
    {
      title: "Multi-Agent Orchestration",
      description: "Coordinated systems of specialized agents working together to solve complex computational and operational tasks.",
      category: "core"
    },
    {
      title: "RAG Intelligence Layers",
      description: "Secure, cost-aware retrieval pipelines that query custom knowledge bases with maximum accuracy and speed.",
      category: "data"
    },
    {
      title: "Physical Deployment Workflows",
      description: "Interface adapters designed to translate agent-level reasoning output into actual physical-world APIs.",
      category: "physical"
    },
    {
      title: "Observability & Governance",
      description: "Complete trace logs, audit trails, and strict guardrails that monitor agent actions in real time.",
      category: "governance"
    },
    {
      title: "Quantum AI Research",
      description: "Future-facing exploration of quantum-inspired optimization methods for agent planning and routing.",
      category: "research"
    }
  ] as SystemCard[],

  physicalLayer: {
    title: "Physical Deployment Layer",
    tagline: "AI that does not stop at chat.",
    safetyWarning: "HUMAN-IN-THE-LOOP REQUIRED: Critical actions require validation. Our systems utilize policy guardrails and human approval gates to ensure safe physical execution.",
    cases: [
      { title: "Robotics Workflows", description: "Standardizing API bridges from digital planning nodes to physical manipulation hardware." },
      { title: "Industrial Automation", description: "Agent-managed scheduling, monitoring, and tuning of automated factory floors." },
      { title: "Field Operations", description: "Real-time routing, dispatching, and safety validation for autonomous vehicles and machinery." },
      { title: "Logistics Coordination", description: "Multi-agent optimization for global supply chains, inventory planning, and shipping loops." },
      { title: "Smart Infrastructure", description: "Energy distribution optimization and preventative maintenance agents for complex grid networks." }
    ] as UseCase[]
  },

  quantumHorizon: {
    title: "Quantum is the horizon.",
    tagline: "Quantum-aware research direction.",
    body: "BlindLabs.Dev explores quantum-inspired methods for optimization, search, and future agentic planning architectures. Our near-term systems are classical, observable, and deployable; our research direction is built for the next compute frontier."
  },

  technicalEdge: [
    { title: "Multi-Agent Orchestration", description: "Dynamic task allocation across localized LLMs and cloud APIs." },
    { title: "Secure RAG Pipelines", description: "State-of-the-art vector stores integrated with end-to-end encryption." },
    { title: "Tool-Using Agents", description: "Direct execution of code, database actions, and network transactions." },
    { title: "Human-in-the-Loop Control", description: "Granular validation steps that pause execution for user sign-off." },
    { title: "Observability Traces", description: "Full OpenTelemetry tracing for prompt budgets and agent steps." },
    { title: "Cost-Aware Retrieval", description: "Real-time token cost estimation and adaptive model routing." }
  ] as TechnicalHighlight[],

  governance: {
    title: "Control before autonomy.",
    coreRule: "No critical action executes without validation.",
    rules: [
      { title: "RBAC (Role-Based Access Control)", description: "Strict identity verification mapping human users to allowed agent operations." },
      { title: "Secrets Isolation", description: "Environment variables and API credentials are kept isolated from agent direct context." },
      { title: "Auditing & Traceability", description: "Immutable logs recording every decision step, model output, and environment state." },
      { title: "Cost Guardrails", description: "Hard token budgets and monthly spend caps preventing runaway prompt cost loops." }
    ] as GovernanceRule[]
  },

  founder: {
    name: "Samuel Quansah",
    title: "Founder & Chief Architect",
    bio: "Samuel Quansah is a forward-deployed systems builder focused on autonomous agentic systems, secure LLM architectures, real-time observability, and high-fidelity client-ready products."
  }
};
