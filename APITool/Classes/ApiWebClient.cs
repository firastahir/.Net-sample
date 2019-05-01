using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APITool.Model;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Specialized;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using static System.Net.HttpStatusCode;
using System.Collections;
using System.Net;

namespace APITool
{
    public class ApiWebClient : IApiWebClient
    {
        #region Private Variables
        private ICacheManager _cacheManager = new CacheManager();
        private readonly string _oAuthClientSecret;
        private const string _tokenValueKey = "API_TOKEN_KEY";
        private readonly string _pingFedUrl;
        private readonly string _baseUrl;
        private string _dbEnvironment = "DEFAULT";
        private static HttpClient _httpClientInstanceSystem;

        private static int _retrieveTokenAttempts = 0;
        private HttpClient HttpClientInstanceSystem => _httpClientInstanceSystem ?? (_httpClientInstanceSystem = CreateHttpClient(_baseUrl));
        #endregion

        #region Public Methods
        public ApiWebClient(string baseUrl, bool usingOAuth = true, string OAuthClientSecret = null, string pingFedUrl = "https://sso.ameren.com")
        {
            try
            {
                _baseUrl = baseUrl;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;

                if (usingOAuth)
                {
                    _oAuthClientSecret = OAuthClientSecret;
                    _pingFedUrl = pingFedUrl;

                    GetAuthenticationToken();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error Initializing WebClient: " + ex);
            }
        }

        public void AddEnvironment(string dbEnvironment) // PTST, SUPP, STAG, TRAIN, PERF
        {
            _dbEnvironment = dbEnvironment;
            HttpClientInstanceSystem.DefaultRequestHeaders.Add("amrnenv", _dbEnvironment);
        }

        public async Task<ApiResponse<T>> Get<T>(APIRequest request)
        {
            var apiResponse = new ApiResponse<T>();
            string jsonString = "";
           
                string url = FormattedUrl(request.endpoint, request.QueryParameters);

                var response = ExecuteHttpClientGet(url, request.HeaderParameters);

            if (!response.IsSuccessStatusCode)
            {
                if ((response.StatusCode == Unauthorized || response.StatusCode == BadRequest || response.StatusCode == Forbidden) && _retrieveTokenAttempts < 3 && _oAuthClientSecret != null)
                {
                    _retrieveTokenAttempts++;
                    GetAuthenticationToken();

                    return await Get<T>(request);
                }
                else
                {
                    apiResponse.ErrorCode = $"{(int)response.StatusCode}: {response.StatusCode.ToString()} - {response.ReasonPhrase}";
                    apiResponse.ErrorMessage = $"API GET Error: Description: {url} Response: {response.Content.ReadAsStringAsync().Result}";
                    apiResponse.Success = false;

                    return apiResponse;
                }
            }
            else
            {
                try
                {
                    jsonString = await response.Content.ReadAsStringAsync();
                    apiResponse.Data = JsonConvert.DeserializeObject<T>(jsonString);
                }
                catch (Exception ex)
                {
                    apiResponse.ErrorMessage = $"API GET Error: Description Response: {jsonString}";
                    apiResponse.Exception = ex.ToString();
                    apiResponse.Success = false;

                    return apiResponse;
                }

                apiResponse.Success = true;
            }
            _retrieveTokenAttempts = 0;

            return apiResponse;

        }

        public async Task<ApiResponse<T>> Post<T>(T Model, APIRequest request)
        {
            var apiResponse = new ApiResponse<T>();
            string jsonString = "";
            string url = FormattedUrl(request.endpoint, request.QueryParameters);

            var response = ExecuteHttpClientPost(Model, url, request.HeaderParameters);

            if (!response.IsSuccessStatusCode)
            {
                if ((response.StatusCode == Unauthorized || response.StatusCode == BadRequest || response.StatusCode == Forbidden) && _retrieveTokenAttempts < 3 && _oAuthClientSecret != null)
                {
                    _retrieveTokenAttempts++;
                    GetAuthenticationToken();

                    return await Post<T>(Model, request);
                }
                else
                {
                    apiResponse.ErrorCode = $"{(int)response.StatusCode}: {response.StatusCode.ToString()} - {response.ReasonPhrase}";
                    apiResponse.ErrorMessage = $"API POST Error: {url} \n Response: {response.Content.ReadAsStringAsync().Result}";
                    apiResponse.Success = false;

                    return apiResponse;
                }
            }
            else
            {
                try
                {
                    jsonString = await response.Content.ReadAsStringAsync();
                    apiResponse.ResponseString = jsonString;
                }
                catch (Exception ex)
                {
                    apiResponse.ErrorMessage = $"API POST Error: Description: {url} Response: {jsonString}";
                    apiResponse.Exception = ex.ToString();
                    apiResponse.Success = false;

                    return apiResponse;
                }

                apiResponse.Status = response.StatusCode.ToString();
                apiResponse.Success = true;
            }
            _retrieveTokenAttempts = 0;

            return apiResponse;
        }

        public async Task<ApiResponse<T>> Put<T>(T Model, APIRequest request)
        {
            var apiResponse = new ApiResponse<T>();
            string jsonString = "";

            string url = FormattedUrl(request.endpoint, request.QueryParameters);

            var response = ExecuteHttpClientPut(Model, url, request.HeaderParameters);

            if (!response.IsSuccessStatusCode)
            {
                if ((response.StatusCode == Unauthorized || response.StatusCode == BadRequest || response.StatusCode == Forbidden) && _retrieveTokenAttempts < 3 && _oAuthClientSecret != null)
                {
                    _retrieveTokenAttempts++;
                    GetAuthenticationToken();

                    return await Put<T>(Model, request);
                }
                else
                {
                    apiResponse.ErrorCode = $"{(int)response.StatusCode}: {response.StatusCode.ToString()} - {response.ReasonPhrase}";
                    apiResponse.ErrorMessage = $"API PUT Error: Description: {url} \n Response: {response.Content.ReadAsStringAsync().Result}";
                    apiResponse.Success = false;

                    return apiResponse;
                }
            }
            else
            {
                try
                {
                    jsonString = await response.Content.ReadAsStringAsync();
                    //apiResponse = JsonConvert.DeserializeObject<ApiResponse<T>>(jsonString);
                    apiResponse.ResponseString = jsonString;
                }
                catch (Exception ex)
                {
                    apiResponse.ErrorMessage = $"API PUT Error: Description: {url} \n Response {jsonString}";
                    apiResponse.Exception = ex.ToString();
                    apiResponse.Success = false;

                    return apiResponse;
                }

                apiResponse.Status = response.StatusCode.ToString();
                apiResponse.Success = true;
            }
            _retrieveTokenAttempts = 0;

            return apiResponse;

        }

        public async Task<ApiResponse<T>> Delete<T>(T Model, APIRequest request)
        {
            var apiResponse = new ApiResponse<T>();
            string jsonString = "";

            string url = FormattedUrl(request.endpoint, request.QueryParameters);

            var response = ExecuteHttpClientDelete(Model, url, request.HeaderParameters);

            if (!response.IsSuccessStatusCode)
            {
                if ((response.StatusCode == Unauthorized || response.StatusCode == BadRequest || response.StatusCode == Forbidden) && _retrieveTokenAttempts < 3 && _oAuthClientSecret != null)
                {
                    _retrieveTokenAttempts++;
                    GetAuthenticationToken();

                    return await Delete<T>(Model, request);
                }
                else
                {
                    apiResponse.ErrorCode = $"{(int)response.StatusCode}: {response.StatusCode.ToString()} - {response.ReasonPhrase}";
                    apiResponse.ErrorMessage = $"API DELETE Error: Request: {url} \n Response: {response.Content.ReadAsStringAsync().Result}; ";
                    apiResponse.Success = false;

                    return apiResponse;
                }
            }
            else
            {
                try
                {
                    jsonString = await response.Content.ReadAsStringAsync();
                    //apiResponse = JsonConvert.DeserializeObject<ApiResponse<T>>(jsonString);
                    apiResponse.ResponseString = jsonString;
                }
                catch (Exception ex)
                {
                    apiResponse.ErrorMessage = $"API DELETE Error: Description: {url} \n Response {jsonString}";
                    apiResponse.Exception = ex.ToString();
                    apiResponse.Success = false;

                    return apiResponse;
                }

                apiResponse.Status = response.StatusCode.ToString();
                apiResponse.Success = true;
            }

            _retrieveTokenAttempts = 0;

            return apiResponse;

        }
        #endregion

        #region Private Methods 
        private HttpClient CreateHttpClient(string baseUrl)
        {
            var handler = new HttpClientHandler
            {
                UseDefaultCredentials = true
            };

            var client = new HttpClient(handler) { BaseAddress = new Uri(baseUrl) };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }

        private string FormattedUrl(string endpoint, Dictionary<string, string> query)
        {
            var formattedUrl = $"{_baseUrl}/{endpoint}";
            formattedUrl += formattedUrl.Contains("?") ? "" : "?";
            foreach (var q in query)
            {
                formattedUrl += $"&{q.Key}={q.Value}";
            }

            return formattedUrl;
        }

        private HttpResponseMessage ExecuteHttpClientGet(string url, Dictionary<string, string> headers)
        {
            var response = new HttpResponseMessage();

            var request = new HttpRequestMessage(HttpMethod.Get, url);

            foreach (var h in headers)
            {
                request.Headers.Add(h.Key, h.Value);
            }

            response = HttpClientInstanceSystem.SendAsync(request).Result;

            return response;
        }

        private HttpResponseMessage ExecuteHttpClientPost<T>(T model, string url, Dictionary<string, string> headers)
        {
            var response = new HttpResponseMessage();

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(url),
                Content = new StringContent(JsonConvert.SerializeObject(model,
                Formatting.None,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                }),
                Encoding.UTF8,
                "application/json")
            };

            foreach (var h in headers)
            {
                request.Headers.Add(h.Key, h.Value);
            }

            response = HttpClientInstanceSystem.SendAsync(request).Result;

            return response;
        }

        private HttpResponseMessage ExecuteHttpClientPut<T>(T model, string url, Dictionary<string, string> headers)
        {
            var response = new HttpResponseMessage();

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri(url),
                Content = new StringContent(JsonConvert.SerializeObject(model,
                Formatting.None,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                }), Encoding.UTF8, "application/json")
            };

            foreach (var h in headers)
            {
                request.Headers.Add(h.Key, h.Value);
            }

            response = HttpClientInstanceSystem.SendAsync(request).Result;


            return response;
        }

        private HttpResponseMessage ExecuteHttpClientDelete<T>(T model, string url, Dictionary<string, string> headers)
        {
            var response = new HttpResponseMessage();

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(url),
                Content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json")
            };

            foreach (var h in headers)
            {
                request.Headers.Add(h.Key, h.Value);
            }

            response = HttpClientInstanceSystem.SendAsync(request).Result;


            return response;
        }

        private async void GetAuthenticationToken()
        {

            string token = _cacheManager.Get<string>(_tokenValueKey);

            if (string.IsNullOrEmpty(token))
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "/as/token.oauth2");

                var oAuthClientSecret = Encoding.UTF8.GetBytes(_oAuthClientSecret);

                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_pingFedUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(oAuthClientSecret));

                    var formData = new List<KeyValuePair<string, string>>
                        {
                            new KeyValuePair<string, string>("grant_type", "client_credentials"),
                            new KeyValuePair<string, string>("scope", "")
                        };

                    request.Content = new FormUrlEncodedContent(formData);

                    var response = await client.SendAsync(request);
                    var jsonString = await response.Content.ReadAsStringAsync();
                    var apiToken = JsonConvert.DeserializeObject<ApiAccessToken>(jsonString);

                    _cacheManager.Add(apiToken.AccessToken, _tokenValueKey, apiToken.ExpiresIn / (60 + 1));
                    token = apiToken.AccessToken;
                }
            }

            HttpClientInstanceSystem.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        }
        #endregion
    }
}
