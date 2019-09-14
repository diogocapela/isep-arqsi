using System.Collections.Generic;

namespace Production.Domain.AggregatesModel.ManufacturingPlanAggregate
{
    public class OutManufacturingPlanDtoWithOps
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<OperationsOutDTO> operations { get; set; }
    }
}