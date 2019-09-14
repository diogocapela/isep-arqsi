using System.ComponentModel.DataAnnotations;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;

namespace Factory.Domain.AggregatesModel.MachineTypeOperationAggregate
{
    public class MachineTypeOperation
    {
        [Key]
        public int MachineTypeId { get; set; }
        public MachineType machinetype { get; set; }
        [Key]
        public int OperationId { get; set; }
        public Operation operation { get; set; }
    }
}