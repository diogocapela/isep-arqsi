using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;

namespace Production.Domain.AggregatesModel.ProductAggregate
{
    public class InProductDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public int manufacturingPlan { get; set; }
    }
}