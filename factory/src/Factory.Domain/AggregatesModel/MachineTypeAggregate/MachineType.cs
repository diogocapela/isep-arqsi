using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.SeedWork;


namespace Factory.Domain.AggregatesModel.MachineTypeAggregate
{
    [Table("MachineType")]
    public class MachineType : Entity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string NameMachineType { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public virtual ICollection<MachineTypeOperation> machineTypeOperations { get; set; }
    }
}