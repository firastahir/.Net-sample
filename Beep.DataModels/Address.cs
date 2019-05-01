using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beep.DataModels
{
    public class Address
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public int ZipCode { get; set; }
        public string State { get; set; }
        public string City { get; set; }
    }
}
