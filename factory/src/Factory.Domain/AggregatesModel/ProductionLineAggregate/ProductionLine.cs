 using System.Collections.Generic;
 using System.ComponentModel.DataAnnotations;
 using System.ComponentModel.DataAnnotations.Schema;
 using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.SeedWork;


namespace Factory.Domain.AggregatesModel.ProductionLineAggregate
{
    [Table("ProductionLine")]
    public class ProductionLine : Entity

    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ProductionName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public virtual List<Machine> Machines { get; set; }
    }
}