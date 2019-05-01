using Beep.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beep.Contracts
{
    public interface IBuildingRepository
    {
        List<Building> GetBuildings(string userID);

        Building GetBuilding(int buildingID);
    }
}
