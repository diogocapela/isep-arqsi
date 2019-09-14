using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;

namespace Production.Domain.AggregatesModel.ProductAggregate
{
    public class OutProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public ManufacturingPlan ManufacturingPlan { get; set; }
    }
}