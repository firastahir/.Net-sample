using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DataModels
{
    public class ApiResponse
    {
      //  public T Data { get; set; }
        public string ResponseString { get; set; }
        public string ErrorMessage { get; set; }

        public string ErrorCode { get; set; }

        public string Status { get; set; }

        public bool Success { get; set; }

        public string Exception { get; set; }

        public HttpStatusCode StatusCode { get; set; }


        //[JsonProperty("error")]
        //public string Error { get; set; }
        //[JsonProperty("message")]
        //public string Message { get; set; }
        //[JsonProperty("successCode")]
        //public string SuccessCode { get; set; }
        //[JsonProperty("successStatus")]
        //public string SuccessStatus { get; set; }
        //[JsonProperty("successDescription")]
        //public string SuccessDescription { get; set; }
    }
}
