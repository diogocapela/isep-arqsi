using System;
using System.Collections.Generic;
using System.Text;

namespace Factory.Domain.AggregatesModel.MachineAggregate
{
    public class InMachineDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int MachineType { get; set; }
        
        public bool Active { get; set; }
    }
}
