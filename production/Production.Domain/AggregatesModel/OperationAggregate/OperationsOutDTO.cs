namespace Production.Domain.AggregatesModel.ManufacturingPlanAggregate
{
    public class OperationsOutDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TimeTakes { get; set; }
    }
}