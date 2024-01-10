
# Git Notes

## Cool Git Commands

### Merge Main/Master/Develop into your branch

```sh
# checkout main and pull latest code
git checkout main
git pull

# checkout your branch
git checkout my-branch

# merge the main branch into your branch
git merge main
```

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