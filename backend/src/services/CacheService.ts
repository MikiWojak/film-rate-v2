// @TODO Command in package.json to flush cache
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';

import type { Cache } from 'cache-manager';

export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async cacheDel(pattern: string) {
        const keys = await this.cacheManager.store.keys();
        const matchingKeys = keys.filter((key: string) =>
            key.startsWith(pattern)
        );

        for (const key of matchingKeys) {
            await this.cacheManager.del(key);
        }
    }
}
