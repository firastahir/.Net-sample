using System;
using System.Collections.Generic;
using System.Text;

namespace Beep.DataModels
{
   public class BeepException:Exception
    {
        public BeepException(string message) : base(message)
        {

        }
    }
}
