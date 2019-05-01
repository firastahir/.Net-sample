using APITool.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APITool
{
    interface IApiWebClient
    {
        Task<ApiResponse<T>> Get<T>(APIRequest request);

        Task<ApiResponse<T>> Post<T>(T Model, APIRequest request);

        Task<ApiResponse<T>> Put<T>(T Model, APIRequest request);

        Task<ApiResponse<T>> Delete<T>(T Model, APIRequest request);
    }
}
