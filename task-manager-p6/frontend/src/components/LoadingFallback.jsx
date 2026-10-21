import React, { useState, useEffect } from 'react';

/**
 * LoadingFallback Component
 * Practical 8: Meaningful fallback UI for Suspense lazy loading.
 * Supplementary Problem: Minimum-delay fallback (300ms) to prevent UI flickering on fast network connections.
 */
function LoadingFallback({ message = 'Loading module chunk...' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 300ms minimum threshold: if chunk loads faster than 300ms, do not flash a spinner.
    // If it takes longer (e.g. 3G or real-world network delay), render a smooth loading state.
    const timer = setTimeout(() => {
      setShow(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return (
      <div className="lazy-fallback-placeholder" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }

  return (
    <div className="lazy-fallback-container" role="status" aria-live="polite">
      <div className="lazy-fallback-card">
        <div className="lazy-spinner-ring"></div>
        <div className="lazy-fallback-text">
          <h4>{message}</h4>
          <p>Fetching JavaScript chunk via dynamic <code>import()</code></p>
        </div>
        <div className="lazy-skeleton-bar"></div>
      </div>
    </div>
  );
}

export default LoadingFallback;

