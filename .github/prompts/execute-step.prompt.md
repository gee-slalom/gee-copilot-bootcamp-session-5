---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute step instructions

Input (optional): `${input:issue-number}`

You are operating in **tdd-developer** mode and must follow the project’s testing constraints from `.github/copilot-instructions.md` (unit + integration tests only; no e2e frameworks; no browser automation).

## Task
Execute the instructions for the **latest step** in the current exercise GitHub Issue.

## Instructions

1. Determine the issue number
   - If `${input:issue-number}` is empty, use `gh issue list --state open` to find the main exercise issue (title contains "Exercise:").
   - If multiple match, pick the most recently updated.

2. Fetch the full issue content
   - Use `gh issue view <issue-number> --comments`.

3. Parse the latest step instructions
   - Identify the most recent "# Step X-Y:" section in the issue thread.
   - Extract the step’s instructions, especially each ":keyboard: Activity:" section.

4. Execute each :keyboard: Activity section systematically
   - For each Activity:
     - Restate the objective in one sentence.
     - Perform the work in small, test-driven increments.
     - Run the smallest relevant test scope after each meaningful change.
     - Keep a tight Red → Green → Refactor loop.

5. Critical constraints
   - DO NOT commit or push any changes.
   - DO NOT introduce or suggest e2e frameworks (Playwright/Cypress/Selenium) or browser automation tools.
   - Use the existing test infrastructure (Jest + Supertest for backend; React Testing Library for frontend).

6. Stop condition
   - Stop after completing all Activities for the latest step.
   - Summarize what was done and instruct the user to run `/validate-step` next.

## Output format
- Show the detected issue and step number.
- For each Activity: list what you changed and which command(s) you ran.
- End with: "Next: run `/validate-step`".
