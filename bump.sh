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

# Commit changes with the description
git commit -m "$1"

# Using npm version
# npm version patch - Bug fixes and backward-compatible changes. (1.0.1)
# npm version minor - New features, backward-compatible. (1.1.0)
# npm version major - Breaking changes, not backward-compatible. (2.0.0)

# --force to allow running with a dirty tree :)
npm version patch -m "Chore: bump version to %s - $1" --force

# Get the new version tag
NEW_TAG=$(git describe --tags --abbrev=0)

# Push the commit first
git push origin main

# Push the tag separately to trigger the workflow
git push origin "$NEW_TAG"

echo "✓ Pushed version $NEW_TAG to trigger deployment"