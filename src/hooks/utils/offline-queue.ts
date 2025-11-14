/**
 * Offline Queue for Mutations
 * Queues mutations when offline and replays them when connection is restored
 */

import uuid from 'react-native-uuid';
import { Route } from '../../types';

// Import MMKV storage (has set, getString methods)
let storage: any;
try {
  storage = require('../../utils/storage').default;
} catch (e) {
  // Fallback if storage not available
  storage = {
    set: () => {},
    getString: () => undefined,
  };
}

export interface QueuedMutation {
  id: string;
  route: Route;
  variables: Record<string, any>;
  timestamp: number;
  retries: number;
  maxRetries: number;
}

const STORAGE_KEY = 'offline_mutation_queue';
const DEFAULT_MAX_RETRIES = 3;

/**
 * Offline Mutation Queue
 * Persists mutations to local storage and processes them when online
 */
export class OfflineQueue {
  private queue: QueuedMutation[] = [];
  private isProcessing = false;

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Adds a mutation to the queue
   */
  async enqueue(
    mutation: Omit<QueuedMutation, 'id' | 'timestamp' | 'retries' | 'maxRetries'>
  ): Promise<string> {
    const item: QueuedMutation = {
      ...mutation,
      id: uuid.v4() as string,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: DEFAULT_MAX_RETRIES,
    };

    this.queue.push(item);
    await this.persist();

    return item.id;
  }

  /**
   * Processes the queue
   */
  async processQueue(
    onProcess: (item: QueuedMutation) => Promise<void>
  ): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue[0];

      try {
        await onProcess(item);
        // Success - remove from queue
        this.queue.shift();
        await this.persist();
      } catch (error) {
        // Failure - increment retries
        item.retries++;

        if (item.retries >= item.maxRetries) {
          // Give up on this item
          console.warn(`[OfflineQueue] Giving up on mutation ${item.id} after ${item.retries} retries`);
          this.queue.shift();
          await this.persist();
        } else {
          // Stop processing, will retry later
          break;
        }
      }
    }

    this.isProcessing = false;
  }

  /**
   * Gets the current queue
   */
  getQueue(): ReadonlyArray<QueuedMutation> {
    return [...this.queue];
  }

  /**
   * Gets the queue size
   */
  size(): number {
    return this.queue.length;
  }

  /**
   * Clears the entire queue
   */
  async clear(): Promise<void> {
    this.queue = [];
    await this.persist();
  }

  /**
   * Removes a specific mutation from the queue
   */
  async remove(id: string): Promise<boolean> {
    const index = this.queue.findIndex((item) => item.id === id);
    if (index > -1) {
      this.queue.splice(index, 1);
      await this.persist();
      return true;
    }
    return false;
  }

  /**
   * Persists queue to storage
   */
  private async persist(): Promise<void> {
    try {
      storage.set(STORAGE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error('[OfflineQueue] Failed to persist queue:', error);
    }
  }

  /**
   * Loads queue from storage
   */
  private loadFromStorage(): void {
    try {
      const stored = storage.getString(STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('[OfflineQueue] Failed to load queue:', error);
      this.queue = [];
    }
  }
}

// Singleton instance
let queueInstance: OfflineQueue | null = null;

/**
 * Gets the singleton queue instance
 */
export function getOfflineQueue(): OfflineQueue {
  if (!queueInstance) {
    queueInstance = new OfflineQueue();
  }
  return queueInstance;
}

