import React from 'react';
import GlassPanel from './GlassPanel';

/**
 * Multi-purpose Metric Display
 * Supports labels, values, trends, and progress indicators.
 */
export default function StatCard({ 
  label, 
  value, 
  trend = null, 
  trendDirection = 'up',
  progress = null,
  progressColor = 'accent',
  subtext = null,
  compact = false,
  className = '',
  accent = false,
  style = {}
}) {
  return (
    <GlassPanel className={className} accent={accent} padding={compact ? 14 : 20} style={style}>
      <div className="label-caps">{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: compact ? 4 : 8 }}>
        <div className={compact ? 'metric-medium mono' : 'metric-large mono'} style={{ fontWeight: 700 }}>
          {value}
        </div>
        {trend && (
          <span className={`metric-card-trend ${trendDirection}`} style={{ fontSize: '0.82rem' }}>
            {trendDirection === 'up' ? '↗' : '↘'} {trend}
          </span>
        )}
      </div>

      {progress !== null && (
        <>
          <div className="progress-bar" style={{ marginTop: compact ? 8 : 12 }}>
            <div 
              className={`progress-bar-fill ${progressColor}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {subtext && (
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>
              {subtext}
            </div>
          )}
        </>
      )}

      {subtext && progress === null && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 6 }}>
          {subtext}
        </div>
      )}
    </GlassPanel>
  );
}
