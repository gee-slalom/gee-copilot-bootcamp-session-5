---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and push changes

Input (required): `${input:branch-name}`

## Task
Analyze the current workspace changes, create a conventional commit, and push to the user-specified branch.

## Instructions

1. Validate branch input
   - If `${input:branch-name}` is empty, ask the user for the branch name and stop.
   - You MUST ONLY use the user-provided branch name.
   - DO NOT commit to `main` (or any other branch). Only commit to `${input:branch-name}`.

2. Review changes
   - Use `git status` and `git diff` to understand what changed.
   - Summarize the change set briefly.

3. Generate a commit message
   - Choose a conventional commit prefix based on the changes (see Git Workflow in `.github/copilot-instructions.md`).
   - Produce a concise message in the format: `<type>: <description>`.

4. Switch/create branch
   - If the branch does not exist locally: `git checkout -b ${input:branch-name}`.
   - If it exists: `git checkout ${input:branch-name}`.

5. Stage and commit
   - Stage all changes: `git add .`.
   - Commit with the generated message.

6. Push
   - Push to origin: `git push origin ${input:branch-name}`.

## Output format
- Show the chosen branch name.
- Show the generated commit message.
- Confirm push success (or provide the exact error output and next steps).
