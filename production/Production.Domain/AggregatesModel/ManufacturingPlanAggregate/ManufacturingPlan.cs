using System.Collections.Generic;
using Production.Domain.SeedWork;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;

namespace Production.Domain.AggregatesModel.ManufacturingPlanAggregate
{
    [Table("ManufacturingPlan")]
    public class ManufacturingPlan : Entity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

        public virtual ICollection<OperationManufacturingPlan> LstOperations { get; set; }
    }
}