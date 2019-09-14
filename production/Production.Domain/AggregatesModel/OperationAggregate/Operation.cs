using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;
using Production.Domain.SeedWork;

namespace Production.Domain.AggregatesModel.OperationAggregate
{
    [Table("Operation")]
    public class Operation : Entity
    {
        [Key] 
        public int Id { set; get; }

        [Required]
        public string OperationName { set; get; }
        
        public virtual ICollection<OperationManufacturingPlan> operationManufacturingPlans { get; set; }


    }
}