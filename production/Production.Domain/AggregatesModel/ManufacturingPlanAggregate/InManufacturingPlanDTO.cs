using System.Collections.Generic;

namespace Production.Domain.AggregatesModel.ManufacturingPlanAggregate
{
    public class InManufacturingPlanDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<int> operations { get; set; }
    }
}