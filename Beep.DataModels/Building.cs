//using Microsoft.AspNet.OData.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DataModels
{
    public class Building
    {
        [JsonProperty("epmBuildingId")]
        public int EpmBuildingId { get; set; }

        [JsonProperty("buildingId")]//api says EPMBuildingId
        public int BuildingId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("function")]
        public string Function { get; set; }

        [JsonProperty("addressLine1")]
        public string AddressLine1 { get; set; }

        [JsonProperty("addressLine2")]
        public string AddressLine2 { get; set; }

        [JsonProperty("zipCode")]
        public int ZipCode { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        public int TotalBuildings { get; set; }
        public int FloorArea { get; set; }

        public string ElectricMeterID { get; set; }

        public string GasMeterID { get; set; }

        public List<Location> Locations { get; set; }

        [JsonProperty("yearBuilt")]
        public int YearBuilt { get; set; }

        [JsonProperty("constructionStatus")]
        public string ConstructionStatus { get; set; }

        [JsonProperty("occupancyPercent")]
        public decimal OccupancyPercent { get; set; }

        public int LocationCount { get; set; }

        public Address Address { get; set; }

        [JsonProperty("comments")]
        public string Comments { get; set; }

        [JsonProperty("premiseList")]
        public Premise[] PremiseList { get; set; }

        public class Premise
        {
            public int PremiseID { get; set; }
        }
    }
}
//Create building url {{conn}}/exp/beep/v1/benchmarking/building/userId/516519?
//create building 
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


// create building (exists in EPM)
//{
//    "epmBuildingId": 496550,
//    "premiseList": [
//        {
//            "premiseId": 320932092
//        },
//        {
//            "premiseId": 320932154
//        }
//    ]
//}

//create bulding (single premise)
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
//        }
//    ]
//}

//Edit building
//{
//    "epmBuildingId": 496550,
//    "name": "Central Administration",
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
//	"autoExportOptIn": false,
//    "premiseList": [
//        {
//            "premiseId": 320932092
//        },
//        {
//            "premiseId": 320932154
//        }
//    ]
//}