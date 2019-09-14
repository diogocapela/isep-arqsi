using System.Collections.Generic;

namespace Factory.Domain.AggregatesModel.ProductionLineAggregate
{
    public class OutProductionLineDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> Machines { get; set; }
    }
}