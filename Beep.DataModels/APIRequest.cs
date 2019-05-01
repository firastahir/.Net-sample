using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DataModels
{
    public class APIRequest
    {         
        public string endpoint { get; }

        public HttpMethod httpMethod { get; }

        public Dictionary<string, string> QueryParameters { get; } = new Dictionary<string, string>();

        public Dictionary<string, string> HeaderParameters { get; } = new Dictionary<string, string>();

        public APIRequest(string Endpoint,HttpMethod HttpMethod)
        {
            endpoint = Endpoint;
            httpMethod = HttpMethod;
        }

        public void AddQueryValue(string key, string value)
        {
            QueryParameters.Add(key, value);
        }

        public void AddHeaderValue(string key, string value)
        {
            HeaderParameters.Add(key, value);
        }

    }
}
