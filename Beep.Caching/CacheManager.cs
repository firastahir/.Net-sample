using Beep.Contracts;
using Microsoft.AspNetCore.Http;
using System;
using System.Runtime.Caching;
using System.Web;

namespace Beep.DAL
{
    public class CacheManager : ICacheManager
    {
        private static object _CacheLock = new object();
        MemoryCache _cache = MemoryCache.Default;
        string cacheName = "eCustomerDataCache";

        public CacheManager()
        {
            TimeoutMinutes = 60;
        }

        private HttpContext _context { get; set; }

        public double TimeoutMinutes { get; set; }

        public void Add(object cacheObject, string key)
        {
            this.Add(cacheObject, key, this.TimeoutMinutes);
        }

        public void Add(object cacheObject, string key, double minutes)
        {
            CacheItemPolicy policy = new CacheItemPolicy();
            policy.AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(minutes);

            _cache.Set(key, cacheObject, policy);
        }

        public void Remove(string key)
        {
            _cache.Remove(key);
        }

        public bool Exist(string key)
        {
            return _cache[key] != null;
        }

        public virtual T Get<T>(string key) where T : class
        {
            return _cache[key] as T;
        }

        public virtual T Get<T>(string key, Func<T> fn) where T : class
        {
            return this.Get<T>(key, this.TimeoutMinutes, fn);
        }

        public virtual T Get<T>(string key, double timeoutminutes, Func<T> fn) where T : class
        {
            var obj = this.Get<T>(key);
            if (obj == default(T))
            {
                obj = fn();
                this.Add(obj, key, timeoutminutes);
            }

            return obj;
        }
    }
}
