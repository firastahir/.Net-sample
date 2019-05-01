using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beep.DataModels
{
    class User
    {
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("oldPassword")]
        public string OldPassword { get; set; }
        [JsonProperty("secretQuestion")]
        public string SecretQuestion { get; set; }
        [JsonProperty("secretQuestionAnswer")]
        public string SecretQuestionAnswer { get; set; }
        [JsonProperty("userRole")]
        public string UserRole { get; set; }
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("hasExistingEPMAccount")]
        public bool HasExistingEPMAccount { get; set; }
        [JsonProperty("epmUserName")]
        public string EPMUserName { get; set; }
        [JsonProperty("epmPassword")]
        public string EPMPassword { get; set; }//not sure what you want to do about this
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("company")]
        public string Company { get; set; }
        [JsonProperty("TaxID")]
        public int TaxID { get; set; }
        [JsonProperty("jobTitle")]
        public string JobTitle { get; set; }
        [JsonProperty("primaryBusiness")]
        public string PrimaryBusiness { get; set; }
        [JsonProperty("isEnergyStarPartner")]
        public bool IsEnergyStarPartner { get; set; }
        [JsonProperty("energyStarPartnerType")]
        public string EnergyStarPartnerType { get; set; }
        [JsonProperty("addressLine1")]
        public string AddressLine1 { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("state")]
        public string State { get; set; }
        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("emailOptIn")]
        public bool EmailOptIn { get; set; }
    }
}
//create user url {{conn}}/exp/beep/v1/benchmarking/user?
//create user (non-Benchmarking)
//{
//  "userName": "testUser",
//  "hasExistingEPMAccount": false,
//  "epmUserName": "testUser",
//  "epmPassword": "testPass1",
//  "userRole": "Benchmarking",
//  "firstName": "John",
//  "lastName": "Doe",
//  "company": "Acme Corporation",
//  "taxID": 320230920,
//  "jobTitle": "Building Administrator",
//  "primaryBusiness": "Hotel",
//  "isEnergyStarPartner": true,
//  "energyStarPartnerType": "Small Businesses",
//  "addressLine1": "123 Main Street",
//  "city": "St. Louis",
//  "state": "MO", 
//  "zipCode": "63103",
//  "phone": "123-1234-9876",
//  "email": "customer@website.com",
//  "emailOptIn": true
//}


//create user (No EPM Account, Benchmarking)
//{
//  "userName": "testUser",
//  "hasExistingEPMAccount": false,
//  "epmUserName": "testUser",
//  "epmPassword": "testPass1",
//  "userRole": "Benchmarking",
//  "firstName": "John",
//  "lastName": "Doe",
//  "company": "Acme Corporation",
//  "taxID": 320230920,
//  "jobTitle": "Building Administrator",
//  "primaryBusiness": "Hotel",
//  "isEnergyStarPartner": true,
//  "energyStarPartnerType": "Small Businesses",
//  "addressLine1": "123 Main Street",
//  "city": "St. Louis",
//  "state": "MO", 
//  "zipCode": "63103",
//  "phone": "123-1234-9876",
//  "email": "customer@website.com",
//  "emailOptIn": true
//}

//create user (Existing EPM Account)
//{
//  "userName": "testUser",
//  "hasExistingEPMAccount": false,
//  "epmUserId": 3092181,
//  "userRole": "Benchmarking",
//  "taxID": 320230920,
//  "emailOptIn": true
//}

//edit user url {{conn}}/exp/beep/v1/benchmarking/user/userId/
//edit user
//{
//  "userRole": "Benchmarking",
//  "firstName": "John",
//  "lastName": "Doe",
//  "company": "Acme Corporation",
//  "jobTitle": "Building Administrator",
//  "primaryBusiness": "Hotel",
//  "isEnergyStarPartner": false,
//  "addressLine1": "123 Main Street",
//  "city": "St. Louis",
//  "state": "MO", 
//  "zipCode": "63103",
//  "phone": "123-1234-9876",
//  "email": "customer@website.com",
//  "emailOptIn": true
//}

//edit user(change password)
//{
//  "password": "testPass2",
//  "oldPassword": "testPass1",
//  "userRole": "NonBenchmarking",
//  "firstName": "John",
//  "lastName": "Doe",
//  "company": "Acme Corporation",
//  "jobTitle": "Building Administrator",
//  "primaryBusiness": "Hotel",
//  "isEnergyStarPartner": false,
//  "addressLine1": "123 Main Street",
//  "city": "St. Louis",
//  "state": "MO", 
//  "zipCode": "63103",
//  "phone": "123-1234-9876",
//  "email": "customer@website.com",
//  "emailOptIn": true
//}

//edit user(change secret question)
//{
//  "secretQuestion": "What is your quest",
//  "secretQuestionAnswer": "To seek the Holy Grail",
//  "userRole": "Benchmarking",
//  "firstName": "John",
//  "lastName": "Doe",
//  "company": "Acme Corporation",
//  "jobTitle": "Building Administrator",
//  "primaryBusiness": "Hotel",
//  "isEnergyStarPartner": false,
//  "addressLine1": "123 Main Street",
//  "city": "St. Louis",
//  "state": "MO", 
//  "zipCode": "63103",
//  "phone": "123-1234-9876",
//  "email": "customer@website.com",
//  "emailOptIn": true
//}
