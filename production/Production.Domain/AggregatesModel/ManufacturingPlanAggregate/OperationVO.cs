using System.Collections.Generic;
using Production.Domain.SeedWork;

namespace Production.Domain.AggregatesModel.ManufacturingPlanAggregate
{
    public class OperationVO : ValueObject
    {

        public int operationID { get;  set; }

        public OperationVO(int operationId)
        {
            this.operationID = operationId;
        }
        
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return operationID;
        }
    }
}