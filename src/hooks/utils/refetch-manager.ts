/**
 * Refetch Manager
 * Handles background refetching on focus, reconnect, and intervals
 */

import { useEffect, useRef } from 'react';
import { getPlatformAdapter } from '../../platform/registry';
import { useSocket } from '../../store/contexts/socket-context';

/**
 * Refetches when app comes to foreground
 * @param enabled - Whether this behavior is enabled
 * @param refetch - Function to call for refetching
 */
export function useRefetchOnFocus(
  enabled: boolean,
  refetch: () => void
): void {
  useEffect(() => {
    if (!enabled) return;
    return getPlatformAdapter().onForeground(refetch);
  }, [enabled, refetch]);
}

/**
 * Refetches when network reconnects
 * @param enabled - Whether this behavior is enabled
 * @param refetch - Function to call for refetching
 */
export function useRefetchOnReconnect(
  enabled: boolean,
  refetch: () => void
): void {
  const { connected } = useSocket();
  const prevConnected = useRef(connected);

  useEffect(() => {
    if (enabled && connected && !prevConnected.current) {
      // Just reconnected
      refetch();
    }
    prevConnected.current = connected;
  }, [connected, enabled, refetch]);
}

/**
 * Refetches at a regular interval
 * @param enabled - Whether polling is enabled
 * @param refetch - Function to call for refetching
 * @param interval - Interval in milliseconds
 */
export function useRefetchInterval(
  enabled: boolean,
  refetch: () => void,
  interval: number
): void {
  useEffect(() => {
    if (!enabled || interval <= 0) return;

    const timer = setInterval(() => {
      refetch();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [enabled, refetch, interval]);
}

