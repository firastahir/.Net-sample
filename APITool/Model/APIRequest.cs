using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APITool.Model
{
    public class APIRequest
    {
        public string endpoint { get; }

        public Dictionary<string, string> QueryParameters { get; } = new Dictionary<string, string>();

        public Dictionary<string, string> HeaderParameters { get; } = new Dictionary<string, string>();

        public APIRequest(string Endpoint)
        {
            endpoint = Endpoint;
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
