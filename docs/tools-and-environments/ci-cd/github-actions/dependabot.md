---
title: Dependabot
description: |
  Notes on using dependabot and items to know about Dependabot.
---

## Dependabot: Rebase vs. Recreate

When Dependabot PRs have conflicts—especially in `pnpm-lock.yaml`—you can either **rebase** or **recreate** the PR.

---

### 1️⃣ `@dependabot rebase`
✅ **What it does:**  
- Merges the latest changes from the base branch **into the existing PR**.  
- **Keeps commit history, comments, and approvals.**  
- Does **not** regenerate `pnpm-lock.yaml`, just updates it.  

🔹 **Use when:**  
- Simple merge conflicts in `pnpm-lock.yaml`.  
- You want to **keep** the PR history and approvals.  

🔹 **Command:**  
```sh
@dependabot rebase
```

### 2️⃣ @dependabot recreate
✅ **What it does:**

- Closes the old PR and creates a new one.
- Fetches the latest dependencies and fully regenerates pnpm-lock.yaml.
- Deletes all previous comments and approvals.

🔹 **Use when:**

- @dependabot rebase fails.
- The lockfile is too broken to merge manually.
- You need a completely fresh dependency resolution.

🔹 **Command:**

```sh
@dependabot recreate
```

### Best Practice for Conflicts

- do `@rebase` first then do `@recreate`

### Comparison Table

| Command  | Keeps PR History? | Resolves Merge Conflicts? | Resets `pnpm-lock.yaml`? | Use When… |
|----------|-----------------|------------------------|-------------------|-----------|
| `@dependabot rebase` | ✅ Yes | ✅ Yes (if simple) | ❌ No | Lockfile has a small conflict |
| `@dependabot recreate` | ❌ No | ✅ Yes (more aggressive) | ✅ Yes | Lockfile is too broken to fix manually |
