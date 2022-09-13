#!/usr/bin/env bash

REPO_DIR=".."

HAS_CHANGES=0
HAS_UNTRACKED=0
git diff --exit-code --quiet -- $REPO_DIR || HAS_CHANGES=1
[[ $(git ls-files --others --exclude-standard $REPO_DIR) ]] && HAS_UNTRACKED=1

if [[ $HAS_CHANGES == 0 ]] && [[ $HAS_UNTRACKED == 0 ]]; then
    echo "No changes, skipping commit."
else
    echo "Updated source modules, pushing commit to repository"

    echo "  Configuring git..."
    git config user.name "kendo-bot"
    git config user.email "kendouiteam@progress.com"
    echo "  Creating commit..."
    git add $REPO_DIR
    git commit -m "docs: update accessibility and keyboard-nav specs"
fi
