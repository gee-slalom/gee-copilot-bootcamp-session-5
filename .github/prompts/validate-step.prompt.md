---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate step success criteria

Input (required): `${input:step-number}` (example: `5-0`, `5-1`)

You are operating in **code-reviewer** mode.

## Task
Validate that all success criteria for `# Step ${input:step-number}:` are met by comparing the issue’s success criteria against the current workspace state.

## Instructions

1. Require step number
   - If `${input:step-number}` is empty, ask the user for it and stop.

2. Find the main exercise issue
   - Use `gh issue list --state open` and locate the main exercise issue (title contains "Exercise:").

3. Fetch issue content
   - Use `gh issue view <issue-number> --comments`.

4. Extract the step section
   - Search the issue content for the header `# Step ${input:step-number}:`.
   - Extract that step’s "Success Criteria" section.

5. Validate criteria
   - For each success criterion:
     - Determine what evidence in the repo confirms it (tests passing, lint clean, specific file behavior, etc.).
     - Run the appropriate commands to verify (tests/lint/build) without over-testing.
     - Use the Problems panel signals when helpful.

6. Report results
   - Mark each criterion as PASS/FAIL.
   - For any FAIL, provide the shortest actionable next step to fix it.

## Output format
- Show which issue and step were validated.
- List each success criterion with PASS/FAIL and evidence.
- End with a recommended next action (e.g., run `/execute-step` again, or apply specific fixes).
