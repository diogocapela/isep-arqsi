using System.ComponentModel.DataAnnotations;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.SeedWork;
using System.ComponentModel.DataAnnotations.Schema;

namespace Factory.Domain.AggregatesModel.MachineAggregate
{
    [Table("Machine")]
    public class Machine : Entity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string MachineName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public virtual MachineType MachineType { get; set; }
        
        [Required]
        public bool Active { get; set; }
    }
}