﻿using System.Collections.Generic;
 using Factory.Domain.SeedWork;

 namespace Factory.Domain.AggregatesModel.MachineTypeAggregate
{
    public class MachineTypeId : ValueObject
    {
        public MachineTypeId()
        {
        }

        public MachineTypeId(long id)
        {
            Id = id;
        }

        public long Id { get; }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Id;
        }
    }
}