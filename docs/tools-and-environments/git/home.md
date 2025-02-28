---
title: Git Notes
---

# Git Notes

## Table of Contents

- [Cool Git Commands](#cool-git-commands)
  - [Merge Main into Your Branch](#merge-main-into-your-branch)
  - [Squash Commits](#squash-commits)
  - [Reset to the Last Commit](#reset-to-the-last-commit)
  - [Reverting a Commit](#reverting-a-commit)
  - [List the Commits in the Current Branch vs. Another Branch](#list-the-commits-in-the-current-branch-vs-another-branch)
  - [Remove pnpm-lock.yaml File From a Commit](#remove-pnpm-lockyaml-file-from-a-commit)
  - [Use pnpm-lock.yaml File from main](#use-pnpm-lockyaml-file-from-main)
  - [Git Worktree](#git-worktree)

## Cool Git Commands

### Merge Main into your branch

```sh
# checkout main and pull latest code
git checkout main
git pull

# checkout your branch
git checkout my-branch

# merge the main branch into your branch
git merge main
```

### Squash Commits
- I don't typically do this because I like seeing incremental changes but if the git history gets too messy, 
here is a good way to squash some commits:

Let's say that you want to adjust the last 5 commits:

```sh
git rebase -i HEAD~5
```

- And then when the interactive git editor shows up in VS Code, you can select which commit messages to keep
by choosing `pick` and which ones to toss by selecting `squash`.
- You then pick the messages you want to keep. You can write a new message OR just comment out the old ones
with `#` next to it and just leave one message.

### Reset to the last commit
```sh
# reset to the last commit; gets rid of all local changes
git reset --hard
```

### Reverting a commit

```sh
# to see a list of the commits
git log --oneline

# find the commit you want to revert to and copy the hash
75e7912 My awesome commit message

# revert to that commit
git revert 75e7912
git push
```

### List the commits in the current branch vs. another branch

I found this trying to understand why there were so many commits in my branch (more than usual).
The command has a number of different parts to it (that I don't entirely understand). Here's the command and some notable parts:

```sh
git log main..HEAD --pretty=oneline
```

- `git log`: just a list of commits
- `main..HEAD`: the commits in the main branch that are not in the HEAD branch
- `--pretty=oneline`: format the output to be more readable

### Remove pnpm-lock.yaml file from a commit

- I had a situation where I needed to remove changes to the `pnpm-lock.yaml` file. Simply re-running `pnpm i`
wouldn't fix it because there were particular issues with one of our submodules so the best thing to do
was to just remove the changes. After squashing my old commits into one commit, I ran these commands:

```sh
# Unstages the pnpm-lock.yaml from the last commit and restores it to the state before that commit.
git reset HEAD^ -- pnpm-lock.yaml

# Amends the last commit without changing its message, keeping the current staged changes.
git commit --amend --no-edit

# Force-pushes the rewritten commit history to the remote branch.
git push --force
```

### Use pnpm-lock.yaml file from main

```sh
git checkout feature-branch
git checkout origin/main -- pnpm-lock.yaml
git add .
git commit -m "Update pnpm-lock"
git push
```

You can also do a rebase if you want to clean-up the code

### Git Worktree

### Adding an Empty Commit
Sometimes you might want to create an empty commit, which is a commit that doesn't change any files but can be useful for triggering CI/CD pipelines or marking a point in history.

```sh
git commit --allow-empty -m "This is an empty commit"
```

This command creates a commit with the specified message but without any changes to the files.