import React from 'react';

/**
 * Reusable Glassmorphic Container
 * Provides a consistent background, border, and blur effect.
 */
export default function GlassPanel({ 
  children, 
  className = '', 
  style = {}, 
  accent = false,
  padding = 20,
  header = null,
  headerActions = null
}) {
  return (
    <div 
      className={`card ${accent ? 'card-accent' : ''} ${className}`} 
      style={{ padding, ...style }}
    >
      {(header || headerActions) && (
        <div className="card-header">
          {typeof header === 'string' ? (
            <span className="card-title">{header}</span>
          ) : (
            header
          )}
          {headerActions && <div className="card-header-actions">{headerActions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
