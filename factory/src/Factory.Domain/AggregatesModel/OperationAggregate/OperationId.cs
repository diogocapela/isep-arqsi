using System.Collections.Generic;
using Factory.Domain.SeedWork;

namespace Factory.Domain.AggregatesModel.OperationAggregate
{
    public class OperationId : ValueObject
    {
        public OperationId()
        {
        }

        public OperationId(long id)
        {
            Id = id;
        }

        public long Id { get; set; }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Id;
        }
    }
}