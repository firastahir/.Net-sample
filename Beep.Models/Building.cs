using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beep.Models
{
    public class Building
    {
        public string BuildingID { get; set; }
        public string Description { get; set; }
        public string BuildingType { get; set; }
        public int SqFeet { get; set; }
        public string ElectricMeterID { get; set; }
        public string GasMeterID { get; set; }
        public List<Location> Locations { get; set; }

        public int LocationCount { get; set; }
        public Address Address { get; set; }
    }
}
