using System;
using System.Collections.Generic;
using System.Text;

namespace Factory.Domain.AggregatesModel.OperationAggregate
{
    public class InOperationDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int TimeTakes { get; set; }

        public int StartupTime { get; set; }
        public string Tool { set; get; }
    }
}
