using System.Collections.Generic;

namespace Factory.Domain.AggregatesModel.ProductionLineAggregate
{
    public class InProductionLineDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> Machines { get; set; }
    }
}