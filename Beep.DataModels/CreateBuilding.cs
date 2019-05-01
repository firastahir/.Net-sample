using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beep.DataModels
{
    class CreateBuilding
    {
        [JsonProperty("epmBuildingId")]
        public string EPMBuildingId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("constructionStatus")]
        public string ConstructionStatus { get; set; }
        [JsonProperty("function")]
        public string Function { get; set; }
        [JsonProperty("floorArea")]
        public int FloorArea { get; set; }
        [JsonProperty("yearBuilt")]
        public int YearBuilt { get; set; }
        [JsonProperty("addressLine1")]
        public string AddressLine1 { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("state")]
        public string State { get; set; }
        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }
        [JsonProperty("occupancyPercent")]
        public float OccupancyPercent { get; set; }
        [JsonProperty("comments")]
        public string Comments { get; set; }
        //[JsonProperty("premiseList")]
        //public int[] PremiseList { get; set; }
        [JsonProperty("premiseList")]
        public Premise[] PremiseList { get; set; }
        public class Premise {
            public Int32 PremiseID { get; set; } 
        }
    }

}
//{
//   "name": "Central Administration",
//    "constructionStatus": "Existing",
//    "function": "Office",
//    "floorArea": 60000,
//    "yearBuilt": 2008,
//    "addressLine1": "1 Central Street",
//    "city": "St. Louis",
//    "state": "MO",
//    "zipCode": "63013",
//    "occupancyPercent": 98.5,
//    "comments": "Renovated in 2007",
//    "premiseList": [
//        {
//            "premiseId": 320932092
//        },
//        {
//            "premiseId": 320932154
//        }
//    ]
//}