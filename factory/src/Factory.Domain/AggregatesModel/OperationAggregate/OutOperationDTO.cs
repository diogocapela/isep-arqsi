using Factory.Domain.AggregatesModel.ToolAggregate;

namespace Factory.Domain.AggregatesModel.OperationAggregate
{
    public class OutOperationDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TimeTakes { get; set; }
        public int StartupTime { get; set; }

        public string Tool { get; set; }
    }
}