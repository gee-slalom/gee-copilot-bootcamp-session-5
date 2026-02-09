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
---

## Pattern: Toggle State with Boolean Negation

### Name
Boolean toggle pattern using negation operator

### Context
API endpoints that need to toggle a boolean state (e.g., completed status in todos).

### Problem
Hardcoding `todo.completed = true` doesn't toggle - it always sets to true, breaking the ability to mark items as incomplete.

### Solution
Use boolean negation to toggle: `todo.completed = !todo.completed`

### Example
```js
// Bad - always sets to true
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = true;  // ❌ Not a toggle!
  res.json(todo);
});

// Good - properly toggles
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed;  // ✓ Toggles between true/false
  res.json(todo);
});
```

### Related files
- packages/backend/src/app.js

---

## Pattern: REST API Input Validation

### Name
Early validation with 400 status for missing/invalid input

### Context
POST/PUT endpoints that accept user input.

### Problem
Without validation, invalid data enters the system causing runtime errors or inconsistent state.

### Solution
- Validate required fields early in the handler
- Return 400 (Bad Request) for validation failures
- Provide descriptive error messages
- Sanitize input (e.g., trim whitespace)

### Example
```js
// Good - validates and sanitizes
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),  // Sanitize
    completed: false,
    createdAt: new Date().toISOString(),
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

### Related files
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js

---

## Pattern: 404 Handling for Resource Not Found

### Name
Consistent 404 error responses

### Context
API endpoints that operate on specific resources by ID.

### Problem
Inconsistent error handling makes debugging harder and breaks API contracts.

### Solution
- Always check if resource exists before operating on it
- Return 404 status with descriptive error message
- Use consistent error response shape: `{ error: 'message' }`

### Example
```js
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted' });
});
```

### Related files
- packages/backend/src/app.js