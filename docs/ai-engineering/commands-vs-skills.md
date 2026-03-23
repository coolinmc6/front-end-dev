---
title: Commands vs Skills vs Plugins
sidebar_position: 1
---

# Commands vs Skills vs Plugins

Both Claude Code and Codex CLI use slash commands, but the concepts
underneath are different. This doc breaks down what each term means
and how the two tools compare.

## Core Concepts

### Commands (Built-in)

Fixed-logic operations that ship with the tool. You type `/command`
and it executes immediately — no AI reasoning involved.

**Claude Code examples**: `/help`, `/clear`, `/compact`, `/cost`,
`/config`, `/model`, `/resume`, `/permissions`, `/plan`, `/diff`

**Codex CLI examples**: `/review`, `/fork`, `/permissions`, `/skills`

Commands cannot be customized or extended by users.

### Skills (Prompt-based Workflows)

Skills are **instructions that teach the AI how to do something**.
They're defined in markdown files and the AI decides when and how to
follow them.

Key difference from commands: skills are **model-driven**. The AI
reads the instructions and executes them using its available tools.
Commands are **code-driven** — they run fixed logic regardless of the
AI.

**Claude Code**: Skills live in `SKILL.md` files with YAML frontmatter.

```
.claude/skills/my-skill/SKILL.md
```

```yaml
---
name: my-skill
description: When to auto-trigger this skill
allowed-tools: Read, Grep, Edit
---

Instructions for Claude go here...
```

**Codex CLI**: Skills also use `SKILL.md` files with a similar
structure. Currently feature-gated (`codex --enable skills`).

### Plugins (Distributable Packages)

Plugins bundle skills, agents, hooks, MCP servers, and config into a
shareable package. Think of a plugin as a "skill pack" with extras.

**Claude Code**: Mature plugin ecosystem with an official marketplace.

```bash
# Install from marketplace
/plugin marketplace add EveryInc/compound-engineering-plugin

# Or install from a git URL
/plugin install https://github.com/user/my-plugin
```

**Codex CLI**: Plugin/marketplace system is still emerging.

## Side-by-Side Comparison

| Concept | Claude Code | Codex CLI |
|---------|-------------|-----------|
| **Built-in commands** | ~50+ (`/help`, `/clear`, etc.) | Smaller set (`/review`, `/fork`) |
| **Skills** | Mature, auto-discovered from SKILL.md | Gated feature, growing catalog |
| **Plugins** | Marketplace + manual install | Emerging |
| **Auto-trigger** | Yes — Claude reads skill descriptions and decides when to use them | Yes — implicit skill matching |
| **Skill location** | `~/.claude/skills/` (personal) or `.claude/skills/` (project) | Similar directory structure |
| **Namespacing** | Plugin skills: `/plugin-name:skill-name` | N/A currently |

## Autonomy / Permission Models

Both tools have tiered permission systems controlling what the AI
can do without asking.

### Claude Code

Permissions are configured in `settings.json` with allow/deny lists
for specific tools:

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob"],
    "deny": []
  }
}
```

Can also run in "bypass permissions" mode where all tools are
auto-approved. Individual skills can restrict their own tool access
via `allowed-tools` in frontmatter.

### Codex CLI

Three named modes:

| Mode | Reads | Writes | Commands | Network |
|------|-------|--------|----------|---------|
| **Suggest** (default) | Yes | No | No | No |
| **Auto Edit** | Yes | Yes | No | No |
| **Full Auto** | Yes | Yes | Yes | Yes |

## Planning vs Execution

### Claude Code

No built-in plan-then-build separation in vanilla Claude Code. The
`/plan` command enters "plan mode" where Claude explores and writes a
plan before implementing.

**Compound Engineering plugin** adds this formally:
- `/ce:plan` — Research + write a `plan.md`
- `/ce:work` — Execute from a `plan.md`
- `/ce:brainstorm` — Explore ideas before planning

### Codex CLI

Built-in plan-then-execute flow:
1. Agent reads the codebase
2. Develops a plan and streams it
3. Proposes edits (approval in most modes)
4. Executes and tests iteratively

## Performance and Strengths

| Area | Claude Code | Codex CLI |
|------|-------------|-----------|
| **Complex refactors** | Stronger autonomy and consistency | Improving |
| **Terminal/DevOps tasks** | Good | Leads (77.3% Terminal-Bench 2.0) |
| **Context window** | Large (varies by model, up to 1M) | Smaller (4K for 5.4 mini) |
| **Multi-agent** | Skills can spawn parallel agents | Single agent |
| **IDE integration** | VS Code, Zed, JetBrains | Terminal only |

## Key Takeaways

1. **Commands** = fixed operations, same in both tools
2. **Skills** = AI-readable instructions. Claude Code's are more
   mature; Codex's are catching up
3. **Plugins** = packaged bundles of skills + config. Claude Code
   has a marketplace; Codex doesn't yet
4. **Planning** = Codex has it built-in; Claude Code gets it via the
   Compound Engineering plugin
5. **Permissions** = Both have tiered autonomy. Claude Code is more
   granular (per-tool allow/deny). Codex has named modes.
