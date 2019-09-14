using System.Collections.Generic;

namespace Production.Domain.AggregatesModel.ManufacturingPlanAggregate
{
    public class OutManufacturingPlanDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<int> operations { get; set; }

    }
}