using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.SeedWork;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Factory.Domain.AggregatesModel.ToolAggregate;

namespace Factory.Domain.AggregatesModel.OperationAggregate
{
    [Table("Operation")]
    public class Operation : Entity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string OperationName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int TimeTakes { get; set; }
        [Required]
        public Tool Tool { get; set; }
        [Required]
        public int StartupTime { get; set; }
        [Required]

        public virtual ICollection<MachineTypeOperation> MachineTypeOperations { get; set; }
    }
}