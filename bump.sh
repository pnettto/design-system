#!/bin/bash

# Check if the first argument ($1) is empty
if [ -z "$1" ]; then
  echo "Error: Missing description."
  echo "Usage: npm run bump \"A description here\""
  exit 1
fi

# Make sure we're on the main branch and not in a detached HEAD state
git checkout main

# Stage all changes
git add .

# Using npm version
# npm version patch - Bug fixes and backward-compatible changes. (1.0.1)
# npm version minor - New features, backward-compatible. (1.1.0)
# npm version major - Breaking changes, not backward-compatible. (2.0.0)

# --force to allow running with a dirty tree :)
npm version patch -m "Chore: bump version to %s - $1" --force

# Pushes the current branch and all new tags to GitHub
git push origin HEAD --tags