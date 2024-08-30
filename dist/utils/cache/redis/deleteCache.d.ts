import { ClientOptions } from '../../../types/aws';
/**
 * Deletes the cache value from the Redis cache.
 *
 * @param {string} key - The key of the cache value to delete.
 * @param {ClientOptions} clientOpts - Optional client options for Redis connection.
 * @returns A promise that resolves to the deleted cache value.
 * @throws {LesgoException} If there is an error deleting the cache.
 *
 * @example
 * ```typescript
 * import { deleteCache } from 'lesgo/utils/cache/redis';
 *
 * const key = 'myKey';
 *
 * await deleteCache(key);
 */
declare const getCache: (key: string, clientOpts?: ClientOptions) => Promise<number>;
export default getCache;
