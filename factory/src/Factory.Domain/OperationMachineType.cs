using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using System;
using System.Collections.Generic;
using System.Text;

namespace Factory.Domain
{
    public class OperationMachineType
    {
        public int OperationId { get; set; }
        public Operation Operation { get; set; }

        public int MachineTypeId { get; set; }
        public MachineType MachineType { get; set; }
    }
}
