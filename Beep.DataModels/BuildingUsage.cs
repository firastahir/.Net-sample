using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DataModels
{
    public class BuildingUsage
    {
        public string meterType { get; set; }
        public string meterID { get; set; }
        public string meterUsage { get; set; }
        public string dateFrom { get; set; }
        public string dateTo { get; set; }
    }
}
