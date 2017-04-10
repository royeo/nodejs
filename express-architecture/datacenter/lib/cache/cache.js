'use strict';

const Redis = require('ioredis');

/**
 * 缓存类
 * @constructor
 */
class Cache {
  constructor(options) {
    this._client = new Redis(options.redis);
  }

  set(key, content, expire) {
    return this._client.set(key, JSON.stringify(content || '')).then(() => {
      if (expire) {
        return this._client.expire(key, expire);
      } else {
        return null;
      }
    });
  }

  get(key, fun, expire, refresh) {
    return this._client.get(key).then(detail => {
      if (!refresh && detail) {
        return JSON.parse(detail);
      } else {
        if (typeof fun === 'function') {
          return fun().then(content => {
            this.set(key, content, expire).finally(() => content);
          });
        } else {
          return null;
        }
      }
    });
  }

  hset(key, field, content, expire) {
    return this._client.hset(key, field, JSON.stringify(content || '')).then(() => {
      if (expire) {
        return this._client.expire(key, expire);
      } else {
        return null;
      }
    });
  }

  hget(key, field, func, expire, refresh) {
    return this._client.hget(key, field).then(detail => {
      if (!refresh && detail) {
        return JSON.parse(detail);
      } else {
        if (typeof func === 'function') {
          return func().then(content => {
            this.hset(key, field, content, expire);
            return content;
          });
        } else {
          return null;
        }
      }
    });
  }

  del(key) {
    return this._client.del(key);
  }
}

module.exports = new Cache({redis: config.redis});
