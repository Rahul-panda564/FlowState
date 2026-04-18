import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.IntersectionObserver = MockIntersectionObserver;

describe('LandingPage Smoke Test', () => {
  it('renders the main title', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/FLOWSTATE/i).length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Intelligence/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Digital Twin/i).length).toBeGreaterThan(0);
  });

  it('contains call to action buttons', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/ADMIN COMMAND/i)).toBeInTheDocument();
    expect(screen.getByText(/LAUNCH FAN TERMINAL/i)).toBeInTheDocument();
  });
});
