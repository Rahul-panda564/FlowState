import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Icon from '../components/common/Icon';
import GlassPanel from '../components/common/GlassPanel';

describe('Frontend Accessibility Protocols', () => {
  it('Icon component should have aria-hidden="true"', () => {
    render(<Icon name="grid" />);
    const svg = document.querySelector('svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('GlassPanel should render children within a container', () => {
    render(
      <GlassPanel header="Test Header">
        <div data-testid="child">Child Content</div>
      </GlassPanel>
    );
    expect(screen.getByText('Test Header')).toBeDefined();
    expect(screen.getByTestId('child')).toBeDefined();
  });
});
