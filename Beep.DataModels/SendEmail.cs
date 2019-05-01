using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beep.DataModels
{
    class SendEmail
    {
        [JsonProperty("fromAddress")]
        public List<Address> FromAddress { get; set; }
        [JsonProperty("toAddress")]
        public List<Address> ToAddress { get; set; }
        [JsonProperty("ccAddress")]
        public List<Address> CCAddress { get; set; }
        [JsonProperty("replyToAddress")]
        public List<Address> ReplyToAddress { get; set; }
        [JsonProperty("substitutions")]
        public List<Substitution> Substitutions { get; set; }
        [JsonProperty("subject")]
        public string Subject { get; set; }
        [JsonProperty("textBody")]
        public string TextBody { get; set; }
        [JsonProperty("displayUnsubscribe")]
        public bool DisplayUnsubscribe { get; set; }
        [JsonProperty("enableClickTracking")]
        public bool EnableClickTracking { get; set; }
        [JsonProperty("enableOpenTracking")]
        public bool EnableOpenTracking { get; set; }
        [JsonProperty("webAPITemplateId")]
        public string WebAPITemplateId { get; set; }
        [JsonProperty("guid")]
        public string Guid { get; set; }
        [JsonProperty("sourceApplication")]
        public string SourceApplication { get; set; }

        public class Address
        {
            public string EmailAddress { get; set; }
            public string DisplayName { get; set; }
        }
        public class Substitution
        {
            public string SubstitutionKey { get; set; }
            public string SubstitutionValueList { get; set; }
        }
    }
}
//{
//  "email": {
//    "fromAddress": [{
//      "emailAddress": "ecustomerdev@ameren.com",
//      "displayName": "Aname"
//    }],
//    "toAddress": [{
//      "emailAddress": "ecustomerdev@ameren.com",
//      "displayName": "Bname"
//    }],
//    "ccAddress": [{
//      "emailAddress": "ecustomerdev@ameren.com",
//      "displayName": "Cname"
//    },
//    {
//      "emailAddress": "ecustomerdev@ameren.com",
//      "displayName": "C1name"
//    }],
//    "replyToAddress": [{
//      "emailAddress": "ecustomerdev@ameren.com",
//      "displayName": "Ename"
//    }],
//    "substitutions":[{
//       "substitutionKey": "PrimaryEmailAddress",
//       "substitutionValueList":[{
//       "substitutionValue": "ecustomerdev@ameren.com"},
//       {
//       "substitutionValue": "ecustomerdev@test.com"}]
//     }],
//    "subject": "Test email",
//    "textBody": "Welcome",
//    "displayUnsubscribe": false,
//    "enableClickTracking": false,
//    "enableOpenTracking": false,
//    "webAPITemplateId": "ABCD1234",
//    "guid":"a123",
//    "sourceApplication":"test",
//    "categoryList": [{"category": "test1"}, {"category": "test2"}]
//  }
//}