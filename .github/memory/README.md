# Working Memory System

## Purpose

This directory is a lightweight "working memory" system for tracking patterns, decisions, and lessons discovered during development.

It exists to:
- Capture discoveries while debugging (especially during TDD cycles)
- Record decisions so future changes are consistent
- Accumulate reusable patterns (API, tests, error handling, data modeling)
- Reduce repeated rediscovery of the same lessons across sessions

## Two Types of Memory

### 1) Persistent Memory (committed)

**Where:** `.github/copilot-instructions.md`

**What it contains:**
- Foundational project context (architecture, workflow standards)
- Non-negotiable guardrails (testing scope, no e2e tools)
- Default development principles and workflows

**Why:** This is the stable “contract” for how work should be done on this repo.

### 2) Working Memory (this directory)

**Where:** `.github/memory/`

**What it contains:**
- Discoveries that emerge while implementing/fixing features
- Patterns that repeatedly appear (and how to solve them)
- Session-level summaries of what was learned

**Why:** These notes help the AI (and humans) avoid repeating the same investigation and apply the same fixes consistently.

## Directory Structure

- `.github/memory/session-notes.md`
  - **Historical summaries** of completed sessions.
  - Concise and curated.
  - **Committed to git** as a durable record.

- `.github/memory/patterns-discovered.md`
  - **Accumulated patterns** that are useful repeatedly.
  - Grows over time.
  - **Committed to git** so patterns persist.

- `.github/memory/scratch/working-notes.md`
  - **Active session scratchpad**: the “live notebook” during current work.
  - Use it to dump partial thoughts, hypotheses, logs, and investigation breadcrumbs.
  - **Not committed to git** (scratch directory is ignored).

## When to Use Each File

### During TDD (Red → Green → Refactor)

- **While writing/running tests (RED):**
  - Use `scratch/working-notes.md` to capture:
    - failing test names
    - error messages
    - hypotheses about the root cause
    - useful repro steps

- **While implementing (GREEN):**
  - Record key “gotchas” (e.g., data shape expectations, status codes) in `scratch/working-notes.md`.
  - If a fix reveals a reusable pattern, add it to `patterns-discovered.md`.

- **After refactor:**
  - Summarize the essential learning into:
    - `patterns-discovered.md` if it’s repeatable
    - `session-notes.md` if it’s a session-level outcome

### During Linting / Code Quality Work

- Use `scratch/working-notes.md` to track:
  - the lint rule(s) encountered
  - the approach that best matches the repo’s style
  - any decisions (e.g., prefer explicit errors over silent fallbacks)

- Promote recurring fixes into `patterns-discovered.md` (e.g., preferred error-handling shape, logging conventions).

### During Debugging / Integration Fixes

- Capture:
  - steps to reproduce
  - exact request/response payloads
  - environment assumptions
  - root cause analysis

- If the issue reveals a systemic lesson (e.g., initialization rules, ID generation), promote it into `patterns-discovered.md`.

## How AI Uses This Memory

When Copilot reads this repo, these files provide additional context beyond the code:
- `patterns-discovered.md` teaches the AI your preferred solutions to recurring problems
- `session-notes.md` helps the AI understand what has already been tried and what outcomes occurred
- `scratch/working-notes.md` provides immediate context during active work (your current intent, hypotheses, blockers)

**Practical effect:** Future suggestions become more consistent with previous decisions and less likely to reintroduce known mistakes.

## Key Difference: Session Notes vs Scratch Notes

- `session-notes.md`
  - For **completed** session summaries
  - Curated, minimal, and safe to commit
  - **Committed** to git

- `scratch/working-notes.md`
  - For **active**, in-progress work
  - Can include partial thoughts, messy logs, or dead ends
  - **Not committed** to git

At the end of a work session:
1. Extract stable learnings into `session-notes.md`
2. Extract reusable solutions into `patterns-discovered.md`
3. Leave the scratch file as-is or reset it for the next session
