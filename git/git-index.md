
# Git Notes

## Cool Git Commands

### List the commits in the current branch vs. another branch

I found this trying to understand why there were so many commits in my branch (more than usual).
The command has a number of different parts to it (that I don't entirely understand). Here's the command
and some notable parts:

```sh
git log main..HEAD --pretty=oneline
```

- `git log`: just a list of commits
- `main..HEAD`: the commits in the main branch that are not in the HEAD branch
- `--pretty=oneline`: format the output to be more readable