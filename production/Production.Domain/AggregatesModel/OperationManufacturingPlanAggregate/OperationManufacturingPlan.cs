using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.OperationAggregate;

namespace Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate
{
    [Table("OperationManufacturingPlan")]
    public class OperationManufacturingPlan
    {
        [Key]
        public int OperationId { set; get; }
        public Operation operation { get; set; }
        
        [Key]
        public int ManufacturingPlanId { set; get; }
        public ManufacturingPlan manufacturingPlan { get; set; }
        
    }
}