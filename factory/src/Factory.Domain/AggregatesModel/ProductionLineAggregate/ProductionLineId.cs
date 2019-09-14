using System.Collections.Generic;
using Factory.Domain.SeedWork;
using ValueObject = Factory.Domain.SeedWork.ValueObject;

namespace Factory.Domain.ProductionLineAR.ValueObjects
{
    public class ProductionLineId : ValueObject
    {
        public ProductionLineId()
        {
        }

        public ProductionLineId(long id)
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