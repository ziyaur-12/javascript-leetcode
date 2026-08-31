class TimeLimitedCache {
    constructor() {
        this.cache = new Map(); // key -> { value, expireAt }
    }

    set(key, value, duration) {
        const now = Date.now();
        const existing = this.cache.get(key);
        const hadUnexpired = existing !== undefined && existing.expireAt > now;

        this.cache.set(key, { value, expireAt: now + duration });

        return hadUnexpired;
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return -1;
        if (entry.expireAt <= Date.now()) return -1;
        return entry.value;
    }

    count() {
        const now = Date.now();
        let c = 0;
        for (const entry of this.cache.values()) {
            if (entry.expireAt > now) c++;
        }
        return c;
    }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set("t", 1, 100); // false
 * timeLimitedCache.get("t"); // 1
 * timeLimitedCache.count(); // 1
 */