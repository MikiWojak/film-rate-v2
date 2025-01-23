import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import type { Cache } from 'cache-manager';

export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async del(pattern: string) {
        const keys = await this.cacheManager.store.keys();
        const matchingKeys = keys.filter((key: string) =>
            key.startsWith(pattern)
        );

        for (const key of matchingKeys) {
            await this.cacheManager.del(key);
        }
    }
}
