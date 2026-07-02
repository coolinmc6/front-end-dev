---
title: Anatomy of a Plugin
sidebar_position: 3
---

# Anatomy of a Plugin

This is a breakdown of the **Compound Engineering** plugin from
**Every, Inc.** (authored by Kieran Klaassen). It is the most popular
community plugin for Claude Code and is good at:

- **Structured planning** — turning vague ideas into detailed,
  research-backed implementation plans
- **Plan-first execution** — building features from plan files with
  task tracking and incremental commits
- **Multi-agent code review** — running 12+ parallel agents that each
  review code from a different angle (security, performance,
  architecture, simplicity, etc.)
- **Knowledge compounding** — documenting solved problems so future
  sessions learn from past work
- **Autonomous workflows** — chaining the full ideate → plan → build →
  review → document loop into a single command

The point of this doc is to understand what's inside a plugin and how
a developer can use, modify, or build their own.

---

## Plugin Structure on Disk

Every plugin follows the same directory layout. Here's what Compound
Engineering looks like:

```
compound-engineering-plugin/
├── .claude-plugin/
│   └── plugin.json              ← the manifest (required)
├── .mcp.json                    ← MCP server connections (optional)
├── AGENTS.md                    ← shared instructions for all agents
├── CLAUDE.md                    ← references AGENTS.md
├── README.md
├── LICENSE
│
├── skills/                      ← 42 skills (the slash commands)
│   ├── ce-plan/
│   │   └── SKILL.md
│   ├── ce-work/
│   │   └── SKILL.md
│   ├── ce-brainstorm/
│   │   └── SKILL.md
│   └── ... (39 more)
│
└── agents/                      ← 25+ agent definitions
    ├── review/                  ← 15 review agents
    ├── research/                ← 6 research agents
    ├── design/                  ← 3 design agents
    ├── docs/                    ← 1 docs agent
    └── workflow/                ← 4 workflow agents
```

### The Manifest (`plugin.json`)

This is the only required file. It tells Claude Code what the plugin
is and who made it:

```json
{
  "name": "compound-engineering",
  "version": "2.49.0",
  "description": "AI-powered development tools for code review, research, design, and workflow automation.",
  "author": {
    "name": "Kieran Klaassen",
    "email": "kieran@every.to"
  },
  "repository": "https://github.com/EveryInc/compound-engineering-plugin",
  "license": "MIT",
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

Key things to notice:

- `mcpServers` can declare external services the plugin connects to
  (in this case, Context7 for framework documentation lookup)
- The manifest is how the marketplace displays the plugin's name,
  description, and version

### Skills: The Core of the Plugin

Skills are the `/slash-commands` that users actually interact with.
Each skill is a directory containing a `SKILL.md` file with YAML
frontmatter and markdown instructions.

Here's a simplified version of `/ce:plan`:

```yaml
---
name: ce-plan
description: Transform feature descriptions into well-structured
  markdown plans.
argument-hint: <feature or task description>
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent,
  WebSearch, WebFetch
---
# Instructions

1. Research the codebase for relevant patterns
2. Check docs/solutions/ for past learnings
3. Write a structured plan to docs/plans/
4. Present options to the user
```

**What makes this work**: The `description` field is what Claude reads
to decide when to auto-trigger the skill. The body is a prompt — it's
instructions that Claude follows, not code that executes.

#### Key Frontmatter Fields

| Field                      | What it does                  | Example                               |
| -------------------------- | ----------------------------- | ------------------------------------- |
| `name`                     | Display name, used in `/name` | `ce-plan`                             |
| `description`              | When to auto-trigger          | `"Transform feature descriptions..."` |
| `argument-hint`            | Shows in autocomplete         | `<feature description>`               |
| `allowed-tools`            | Which tools the skill can use | `Read, Write, Agent`                  |
| `disable-model-invocation` | Only manual trigger, no auto  | `true`                                |
| `context: fork`            | Run in isolated subagent      | `fork`                                |

### Agents: Specialized Subprocesses

Agents are markdown files that define specialized roles. When a skill
says "launch parallel review agents," it's spawning subagents that
each follow their own agent definition.

For example, `agents/review/security-sentinel.md` would contain
instructions for reviewing code specifically for security issues:
authentication, authorization, injection, data exposure, etc.

The Compound Engineering plugin has 25+ agents organized by role:

- **Review agents** (15) — Each checks code from a different angle.
  Security, performance, architecture, code simplicity, pattern
  consistency, data integrity, deployment verification, etc.
- **Research agents** (6) — Scan the repo, git history, framework
  docs, past learnings, and issue trackers
- **Design agents** (3) — Review design implementation and sync
  with Figma
- **Workflow agents** (4) — Bug reproduction, linting, PR comment
  resolution, spec analysis

### MCP Servers: External Tool Access

The `.mcp.json` file declares external services:

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

This gives skills access to Context7, which provides documentation
for 100+ frameworks. A skill can look up the latest React docs or
Rails conventions without relying on training data.

---

## The Core Workflow

The plugin's philosophy is **80% planning, 20% execution**. The
workflow loop:

```
/ce:ideate      → generate and filter improvement ideas
/ce:brainstorm  → explore what to build (product decisions)
/ce:plan        → research and write a structured plan
/ce:work        → execute the plan (code, test, commit, PR)
/ce:review      → multi-agent code review
/ce:compound    → document what was learned
```

Each step produces an artifact (a markdown file) that the next step
can consume:

| Step       | Produces         | Location            |
| ---------- | ---------------- | ------------------- |
| ideate     | Ideation doc     | `docs/ideation/`    |
| brainstorm | Requirements doc | `docs/brainstorms/` |
| plan       | Plan file        | `docs/plans/`       |
| work       | Code + PR        | Git branch          |
| review     | Review report    | Conversation        |
| compound   | Learning doc     | `docs/solutions/`   |

The plan file is the critical checkpoint. If context is lost or a
session dies, you start a new session and point it at the plan.

### Autonomous Mode

`/lfg` ("Let's Go") chains the entire loop into one
command: plan → deepen → work → review → resolve → test → document.

`/slfg` does the same but parallelizes the execution phase with
swarm agents.

---

## How a Developer Can Use This

### Option 1: Install the Plugin (if your org allows it)

```bash
/plugin marketplace add EveryInc/compound-engineering-plugin
```

### Option 2: Copy Skills Locally

If your enterprise blocks the marketplace, you can
recreate the skills as personal skills:

```
~/.claude/skills/
├── ce-plan/SKILL.md
├── ce-work/SKILL.md
├── ce-brainstorm/SKILL.md
├── ce-review/SKILL.md
├── ce-ideate/SKILL.md
└── ce-compound/SKILL.md
```

Personal skills work across all projects and bypass marketplace
restrictions. You lose automatic updates but gain full control.

### Option 3: Build Your Own

The plugin is just markdown files. You can:

1. Start with one skill (e.g., a custom `/plan` for your team's
   conventions)
2. Add agent definitions as you need specialized reviewers
3. Bundle them into a plugin with a `plugin.json` manifest
4. Share with your team via a git repo

### Adapting for Your Team

The most valuable customization points:

- **Plan template** — Modify the plan structure in `/ce:plan` to
  match your team's ticket format or design doc conventions
- **Review agents** — Add agents for your stack (e.g., an Elixir
  reviewer, a GraphQL schema checker)
- **Docs paths** — Change `docs/plans/`, `docs/solutions/` to
  wherever your team keeps documentation
- **Compound learnings** — Point `/ce:compound` at your team's
  knowledge base location

---

## Key Takeaways

1. **A plugin is just a folder** with a manifest, skills, and
   optionally agents, hooks, and MCP configs
2. **Skills are prompts, not code** — they're instructions Claude
   follows using its available tools
3. **Agents are specialized roles** — markdown files that define
   what a subagent should focus on
4. **The plan file is the checkpoint** — it survives context loss
   and session boundaries
5. **You don't need the plugin to use the workflow** — the ideas
   (plan first, compound learnings, multi-perspective review) work
   with or without the plugin installed
