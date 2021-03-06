using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.OperationAggregate;

namespace Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate
{
    public class OutOperationManufacturingPlanDTO
    {
        public OperationDTO oeration { get; set; }
        public InManufacturingPlanDTO manufacturingPlan { get; set; }
    }
}