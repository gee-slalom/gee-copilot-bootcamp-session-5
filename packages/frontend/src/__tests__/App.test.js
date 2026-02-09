import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

const mockTodos = [
  { id: 1, title: 'Test Todo 1', completed: false },
  { id: 2, title: 'Test Todo 2', completed: true },
  { id: 3, title: 'Test Todo 3', completed: false },
];

beforeEach(() => {
  fetch.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('displays todos when data is loaded', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 3')).toBeInTheDocument();
  });
});

test('calculates and displays correct stats', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    // 2 incomplete (ids 1 and 3), 1 completed (id 2)
    expect(screen.getByText('2 items left')).toBeInTheDocument();
    expect(screen.getByText('1 completed')).toBeInTheDocument();
  });
});

test('deletes a todo when delete button is clicked', async () => {
  // Initial fetch
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  const testQueryClient = createTestQueryClient();
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await waitFor(() => {
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
  });

  // Mock delete response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({}),
  });

  // Mock refetch after delete
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos.filter((t) => t.id !== 1),
  });

  // Click delete button for first todo
  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  await user.click(deleteButtons[0]);

  // Verify fetch was called with DELETE method
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('displays error message when API fails', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'));

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/failed to load todos/i)).toBeInTheDocument();
  });
});

test('handles API error response', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => ({ error: 'Server error' }),
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/failed to load todos/i)).toBeInTheDocument();
  });
});
