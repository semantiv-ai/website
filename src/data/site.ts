export type DecisionRecord = {
  action: string;
  decision: string;
  reason: string[];
  outcome: string[];
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  scenario: string;
  risk: string;
  output: string;
  where: string;
  actions: string[];
  gates: string[];
  decisionRecord: DecisionRecord;
  productValue: string;
  flow: string[];
};

export const navItems = [
  { href: "/platform", label: "Platform" },
  { href: "/method", label: "Method" },
  { href: "/review", label: "Review" },
  { href: "/cases", label: "Cases" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" }
];

export const platformPrimitives = [
  {
    name: "Action Meaning",
    label: "meaning",
    description:
      "Define what an agent action means in the business, technical, legal, or operational system.",
    example: "\"edit file\" -> \"change authentication behavior\""
  },
  {
    name: "Evidence Packet",
    label: "evidence",
    description:
      "Bind important actions to tests, clauses, approvals, source documents, traces, and missing support.",
    example: "tests passed, clause cited, approval missing"
  },
  {
    name: "Authority Context",
    label: "authority",
    description:
      "Clarify who or what can approve, delegate, execute, escalate, or block the action.",
    example: "required approver: security owner"
  },
  {
    name: "Coordination Graph",
    label: "coordination",
    description:
      "Map how work moves across agents, tools, humans, queues, services, and documents.",
    example: "agent -> CI -> reviewer -> merge gate"
  },
  {
    name: "Commitment Model",
    label: "commitment",
    description:
      "Treat contracts, policies, approvals, financial records, and regulated submissions as commitment-bearing artifacts.",
    example: "who owes what, to whom, under which exception"
  },
  {
    name: "Decision Record",
    label: "record",
    description:
      "Preserve what happened, what it meant, what evidence supported it, and why the system allowed, blocked, or escalated.",
    example: "decision: escalate, reason: evidence incomplete"
  }
];

export const reviewOutputs = [
  "Agent and workflow inventory",
  "Tool and data-access map",
  "Behavior trace review",
  "Operational meaning model",
  "Evidence and proof model",
  "Coordination and composition map",
  "Control architecture",
  "Implementation prototype or SDK/API direction"
];

export const methodSteps = [
  {
    step: "Discover",
    artifact: "Behavior trace",
    description:
      "Start from real prompts, logs, tool calls, workflows, approvals, documents, and failure cases."
  },
  {
    step: "Define",
    artifact: "Action contract",
    description:
      "Make the operational meaning of important agent actions explicit enough to reason about."
  },
  {
    step: "Evidence",
    artifact: "Evidence packet",
    description:
      "Identify the support required to trust, block, escalate, or approve autonomous work."
  },
  {
    step: "Compose",
    artifact: "Coordination map",
    description:
      "Model how work, authority, responsibility, and evidence move across systems and people."
  },
  {
    step: "Control",
    artifact: "Decision record",
    description:
      "Design runtime boundaries, approval paths, tool wrappers, escalation logic, and durable records."
  }
];

export const cases: CaseStudy[] = [
  {
    slug: "coding-agents",
    eyebrow: "Case 01",
    title: "Coding Agents / Software Delivery",
    shortTitle: "Coding agents",
    scenario:
      "A devtool startup has an AI coding agent that can read repositories, edit files, open pull requests, request review, and eventually merge approved changes.",
    risk:
      "Enterprise customers want a concrete answer to what the agent is allowed to change before production-impacting actions execute.",
    output:
      "Action contracts, evidence gates, merge authority checks, and decision records for repository work.",
    where:
      "Semantiv sits between the coding agent and GitHub. Before the agent modifies code, opens a pull request, or attempts a merge, Semantiv turns intent into an action contract and runs it through gates.",
    actions: [
      "read repository files",
      "edit files",
      "create branch",
      "open pull request",
      "request review",
      "update pull request",
      "attempt merge",
      "modify protected files"
    ],
    gates: [
      "repository is in scope",
      "file path is allowed",
      "protected files require escalation",
      "generated diff is attached as evidence",
      "tests passed before merge",
      "human approval exists for high-risk actions",
      "merge authority is present"
    ],
    decisionRecord: {
      action: "AttemptMerge PR-482",
      decision: "Escalate",
      reason: [
        "PR touches protected auth files.",
        "Tests passed.",
        "Required security review missing."
      ],
      outcome: ["Merge blocked.", "Review requested from security owner."]
    },
    productValue:
      "No production-impacting agent action executes without a decision record.",
    flow: ["task", "diff", "tests", "authority", "merge gate", "record"]
  },
  {
    slug: "security-operations",
    eyebrow: "Case 02",
    title: "Security Operations / Agentic SOC",
    shortTitle: "Security operations",
    scenario:
      "A security platform is adding agents that triage alerts, investigate incidents, enrich signals, disable users, block IPs, isolate endpoints, and escalate threats.",
    risk:
      "The promise is faster response. The risk is uncontrolled remediation across users, infrastructure, and privileged systems.",
    output:
      "Runtime decision points between investigation and response, with evidence and escalation requirements.",
    where:
      "Semantiv controls the boundary between investigation and response. The agent may investigate freely, but disruptive actions must pass through a runtime decision point.",
    actions: [
      "enrich alert context",
      "query identity logs",
      "mark alert as benign",
      "disable user account",
      "isolate endpoint",
      "block IP address",
      "revoke token",
      "escalate incident"
    ],
    gates: [
      "alert severity meets threshold",
      "affected asset is in scope",
      "identity confidence is high enough",
      "corroborating evidence exists",
      "action is reversible or approved",
      "escalation required for privileged systems",
      "human approval required for disruptive response"
    ],
    decisionRecord: {
      action: "Disable user account j.smith",
      decision: "Escalate",
      reason: [
        "Suspicious login detected.",
        "Endpoint evidence incomplete.",
        "User is in executive group."
      ],
      outcome: [
        "Incident escalated to analyst.",
        "Account remains active pending review."
      ]
    },
    productValue:
      "Security teams can move toward agentic response without giving agents unchecked operational power.",
    flow: ["alert", "investigation", "evidence", "authority", "response gate", "record"]
  },
  {
    slug: "finance-accounting",
    eyebrow: "Case 03",
    title: "Finance / Accounting Operations",
    shortTitle: "Finance operations",
    scenario:
      "A finance automation company has agents that reconcile transactions, classify expenses, prepare reports, draft journal entries, route approvals, and update finance systems.",
    risk:
      "The team wants more automation, but every posting, approval, adjustment, and report change must survive audit.",
    output:
      "Evidence requirements, authority checks, and audit-ready decision records before agents modify systems of record.",
    where:
      "Semantiv controls finance-agent actions before they modify systems of record. The agent can propose work, but postings and approvals require evidence and authority.",
    actions: [
      "classify transaction",
      "propose reconciliation",
      "draft journal entry",
      "update invoice status",
      "approve expense",
      "post adjustment",
      "generate close report",
      "escalate exception"
    ],
    gates: [
      "transaction is in scope",
      "source documents are attached",
      "variance is below threshold",
      "policy applies",
      "approver has authority",
      "month-close state allows change",
      "audit evidence is complete"
    ],
    decisionRecord: {
      action: "Post journal adjustment JE-1937",
      decision: "Block",
      reason: [
        "Supporting invoice missing.",
        "Amount exceeds automated posting threshold.",
        "Close period is locked."
      ],
      outcome: ["Posting prevented.", "Exception routed to controller."]
    },
    productValue:
      "Finance teams can increase agent autonomy while preserving authority, evidence, and auditability.",
    flow: ["transaction", "source docs", "policy", "approval", "posting gate", "audit record"]
  },
  {
    slug: "legal-contract-operations",
    eyebrow: "Case 04",
    title: "Legal / Contract Operations",
    shortTitle: "Legal contracts",
    scenario:
      "A legal AI product helps in-house teams draft contracts, redline clauses, compare terms, route exceptions, and prepare approval packets.",
    risk:
      "Drafting can be flexible. Approval, clause substitution, external communication, and exception routing need explicit gates.",
    output:
      "Commitment models, clause evidence, playbook thresholds, and legal-owner approval paths.",
    where:
      "Semantiv controls contract-agent actions before they affect legal workflow state. Actions against commitments require clear meaning, evidence, and authority.",
    actions: [
      "draft clause",
      "suggest redline",
      "replace fallback language",
      "flag non-standard term",
      "route exception",
      "approve low-risk clause",
      "send document to counterparty",
      "create obligation summary"
    ],
    gates: [
      "contract type is recognized",
      "clause library source is approved",
      "deviation from playbook is within threshold",
      "customer tier permits fallback term",
      "legal owner approval exists",
      "external send is authorized",
      "obligation summary cites source language"
    ],
    decisionRecord: {
      action: "Replace limitation-of-liability clause",
      decision: "Escalate",
      reason: [
        "Proposed language deviates from approved fallback.",
        "Customer is strategic account.",
        "Legal approval required."
      ],
      outcome: ["Redline saved.", "Legal owner notified."]
    },
    productValue:
      "Legal AI products become trusted workflow systems, not just drafting assistants.",
    flow: ["document", "clause", "playbook", "authority", "send gate", "record"]
  },
  {
    slug: "healthcare-admin",
    eyebrow: "Case 05",
    title: "Healthcare Admin / Prior Auth / Claims",
    shortTitle: "Healthcare admin",
    scenario:
      "A healthcare operations company has agents that gather clinical evidence, check payer rules, draft prior authorization packets, submit requests, monitor status, and prepare appeals.",
    risk:
      "The work is structured, expensive, and evidence-heavy. The agent must not submit the wrong request with incomplete support.",
    output:
      "Controlled execution for submissions, appeals, and status changes with required documentation and clinician approval.",
    where:
      "Semantiv controls administrative actions before submission to payers or systems of record. The agent can assemble evidence, but submission requires controlled execution.",
    actions: [
      "identify required prior authorization",
      "gather clinical evidence",
      "draft submission packet",
      "submit authorization request",
      "update patient case status",
      "prepare appeal",
      "route to clinician",
      "close administrative task"
    ],
    gates: [
      "patient and encounter are in scope",
      "payer rule applies",
      "required clinical documentation is attached",
      "clinician approval exists when needed",
      "submission channel is correct",
      "duplicate request does not already exist",
      "audit record is complete"
    ],
    decisionRecord: {
      action: "Submit prior authorization request PA-7721",
      decision: "Block",
      reason: [
        "Required imaging report missing.",
        "Payer rule requires clinician attestation."
      ],
      outcome: ["Submission prevented.", "Clinician task created."]
    },
    productValue:
      "Healthcare AI teams can automate administrative work without losing evidence discipline, approval control, or auditability.",
    flow: ["case", "payer rule", "clinical evidence", "approval", "submission gate", "record"]
  }
];

export const fitSignals = [
  "Agents already touch tools, data, workflows, or documents.",
  "Nobody has a clear map of what agents can access.",
  "Logs show what happened but not what the work meant.",
  "Customers ask how agent actions are controlled.",
  "Approvals are inconsistent or ad hoc.",
  "Contracts, policies, or documents create hidden commitments.",
  "Agents hand work to humans or other agents.",
  "The team needs a technical path to production trust."
];

export const reviewQuestions = [
  "What agents or agent workflows exist?",
  "What systems, tools, data, and documents can they touch?",
  "What do they actually do step by step?",
  "What does each important action mean?",
  "What evidence supports the action?",
  "Where does authority enter the workflow?",
  "How does work compose across agents, tools, humans, and documents?",
  "What should be allowed, blocked, escalated, or recorded?"
];
