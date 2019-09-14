namespace Factory.Domain.AggregatesModel.MachineAggregate
{
    public class OutMachineDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MachineType { get; set; }
        
        public bool Active { get; set; }
    }
}