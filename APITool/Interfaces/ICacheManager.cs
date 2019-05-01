using System;
using System.Web.Caching;

namespace APITool
{
    public interface ICacheManager
    {
        bool Exist(string key);
        void Remove(string key);
        void Add(object cacheObject, string keyName);
        void Add(object cacheObject, string key, double minutes);
        T Get<T>(string key) where T : class;
        T Get<T>(string key, Func<T> fn) where T : class;
        T Get<T>(string key, double timeoutminutes, Func<T> fn) where T : class;       
        
    }
}
