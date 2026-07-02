---
title: Claude Code
sidebar_position: 1
---

# Claude Code

Notes on Anthropic's Claude Code CLI — plugins, skills, configuration,
and workflows.

## Plugins

### What Are Plugins?

Plugins are distributable extension packages that bundle skills,
agents, hooks, MCP servers, and language servers. They teach Claude
Code new capabilities.

### Where Do They Live?

All installed plugins are cached at:

```
~/.claude/plugins/cache/
```

A plugin's structure on disk looks like:

```
~/.claude/plugins/cache/{marketplace}/{plugin-name}/
├── .claude-plugin/
│   └── plugin.json          ← manifest (name, version, author)
├── skills/                  ← prompt-based workflows
│   └── skill-name/
│       └── SKILL.md
├── agents/                  ← custom subagent definitions
├── hooks/                   ← event handlers (shell commands)
│   └── hooks.json
├── .mcp.json                ← MCP server configs
├── .lsp.json                ← language server configs
└── settings.json            ← default settings
```

### Installation Scopes

When you install a plugin, you choose a **scope** that determines
who can see it:

| Scope | Config file | In git? | Who sees it |
|-------|-------------|---------|-------------|
| **User** | `~/.claude/settings.json` | No | You, all projects |
| **Project** | `.claude/settings.json` | Yes | Anyone who clones the repo |
| **Local** | `.claude/settings.local.json` | No | You, this repo only |

All scopes pull files from the same `~/.claude/plugins/cache/`
directory. The scope just determines which settings file records that
the plugin is enabled.

### How to Install

```bash
# From a marketplace (most common)
/plugin marketplace add EveryInc/compound-engineering-plugin

# Direct install by name
/plugin install compound-engineering

# Verify
/plugin        # opens plugin manager
/skills        # lists available skills
```

### How to Uninstall

```bash
/plugin uninstall plugin-name@marketplace --scope user
```

Plugin files are auto-deleted from cache when removed from the last
scope. Use `--keep-data` to preserve persistent data.

### Can You Trust Them?

**Plugins are not sandboxed.** They run with your full user privileges.
A plugin can:

- Execute shell commands via hooks
- Start MCP servers (external network access)
- Spawn subagents with custom instructions
- Run language servers as subprocesses

**Before installing, audit:**

1. Check the **GitHub repo** linked from the marketplace
2. Read `hooks/hooks.json` — what events trigger scripts?
3. Read `.mcp.json` — what external services does it connect to?
4. Read `agents/` — what custom agents does it define?
5. Check the README for what permissions it needs

The security model is trust-based. Only install plugins from sources
you trust.

## Skills

### What Are Skills?

Skills are prompt-based workflows defined in `SKILL.md` files. Unlike
built-in commands (which are fixed logic), skills are instructions that
Claude reads and follows. Claude can auto-trigger them based on
context.

### Where Do They Live?

| Level | Path | Applies to |
|-------|------|-----------|
| **Personal** | `~/.claude/skills/skill-name/SKILL.md` | All your projects |
| **Project** | `.claude/skills/skill-name/SKILL.md` | This project only |
| **Plugin** | Inside the plugin's `skills/` directory | Where plugin is enabled |

Personal skills override project skills. Plugin skills are namespaced
(`/plugin-name:skill-name`) to avoid conflicts.

### Skill File Format

```yaml
---
name: my-skill
description: When Claude should auto-trigger this skill
allowed-tools: Read, Grep, Edit
---

Your instructions to Claude go here. This is a prompt, not code.
Claude reads this and follows the workflow you describe.
```

Key frontmatter fields:

- `name` — display name (lowercase, hyphens)
- `description` — Claude uses this to decide when to auto-trigger
- `allowed-tools` — restrict which tools the skill can use
- `disable-model-invocation: true` — only manual `/skill-name`, no auto
- `context: fork` — run in an isolated subagent

## Plugin Environment Variables

Useful for plugin/skill development:

- `${CLAUDE_PLUGIN_ROOT}` — plugin's install directory (changes on
  update)
- `${CLAUDE_PLUGIN_DATA}` — persistent data directory at
  `~/.claude/plugins/data/{plugin-id}/` (survives updates)
- `${CLAUDE_SKILL_DIR}` — the skill's directory path
- `$ARGUMENTS` — arguments passed to a skill invocation

## Testing Plugins Locally

```bash
# Run Claude with a local plugin directory (no install needed)
claude --plugin-dir ./my-plugin

# Reload plugins during a session
/reload-plugins
```
