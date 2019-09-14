using System;
using System.Collections.Generic;
using System.Text;

namespace Factory.Domain.AggregatesModel.MachineTypeAggregate
{
    public class InMachineTypeDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> Operations { get; set; }
    }
}
