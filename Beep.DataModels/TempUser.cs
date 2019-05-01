using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beep.DataModels
{
    class TempUser
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }//not sure what you want to do about this
        [JsonProperty("secretQuestion")]
        public string SecretQuestion { get; set; }
        [JsonProperty("secretQuestionAnswer")]
        public string SecretQuestionAnswer { get; set; }
        [JsonProperty("emailVerificationGUID")]
        public string EmailVerificationGUID { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }

    }
}
//{
//  "userName": "testUser1",
//  "password": "testPass1",
//  "secretQuestion": "What is your favorite color",
//  "secretQuestionAnswer": "Blue, wait no...",
//  "emailVerificationGUID": "4H3J938F23F2H98S",
//  "firstName": "John",
//  "lastName": "Doe",
//  "email": "customer@website.com"
//}