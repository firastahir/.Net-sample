using Beep.DataModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Beep.APIClient
{
    public class BeepAPIClient
    {
        private readonly HttpClient _httpClient;
        public BeepAPIClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<ApiResponse> CallAPI(APIRequest apiRequest, object model = null)
        {
            var request = GetApiRequest(apiRequest);
            var response = _httpClient.SendAsync(request).Result;
            string jsonString = await response.Content
            .ReadAsStringAsync();
            var apiResponse = new ApiResponse()
            {
                Success = response.IsSuccessStatusCode,
                ErrorMessage = !response.IsSuccessStatusCode? response.Content?.ReadAsStringAsync()?.Result:"",
                StatusCode = response.StatusCode
            };
            if (response.IsSuccessStatusCode)
                apiResponse.ResponseString = jsonString;
            return apiResponse;
        }


        private HttpRequestMessage GetApiRequest(APIRequest apiRequest, object model = null)
        {
            string url = apiRequest.endpoint;

            url += url.Contains("?") ? "" : "?";

            foreach (var q in apiRequest.QueryParameters)
            {
                url += $"&{q.Key}={q.Value}";
            }
            var request = new HttpRequestMessage(apiRequest.httpMethod, url);
            if (request.Method != HttpMethod.Get && model != null)
            {
                request.Content = new StringContent(JsonConvert.SerializeObject(model,
                Formatting.None,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                }),
                Encoding.UTF8,
                "application/json");
            }

            foreach (var h in apiRequest.HeaderParameters)
            {
                request.Headers.Add(h.Key, h.Value);
            }
            return request;
        }
    }
}
