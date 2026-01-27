# Patterns Discovered

## Purpose

This file documents recurring code and workflow patterns discovered during development.

- It is an **accumulating** set of learnings over time.
- It is **committed to git** so patterns persist across sessions.

---

## Pattern Template

### Name
<short name>

### Context
Where/when this pattern applies (API endpoint, React Query hook, test setup, etc.).

### Problem
What goes wrong without the pattern? What failure mode does it prevent?

### Solution
What to do (and what to avoid).

### Example
A short example (pseudo-code is fine if needed).

### Related files
- <path(s)>

---

## Example Pattern: Service Initialization (empty array vs null)

### Name
Service initialization: prefer `[]` over `null`

### Context
Backend in-memory storage and service setup.

### Problem
When `todos` is `null` or undefined, route handlers and tests may crash (e.g., calling `.push`, `.find`, `.filter`) or behave inconsistently across requests.

### Solution
Initialize the in-memory store to an empty array `[]` and treat it as always-defined.

- Prefer:
  - `let todos = [];`
- Avoid:
  - `let todos = null;`

### Example
```js
// Good
let todos = [];

function addTodo(todo) {
  todos.push(todo);
}
```

### Related files
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js
