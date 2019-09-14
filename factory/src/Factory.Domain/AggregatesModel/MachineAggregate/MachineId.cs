﻿using System.Collections.Generic;
 using Factory.Domain.SeedWork;

 namespace Factory.Domain.AggregatesModel.MachineAggregate
{
    public class MachineId : ValueObject
    {
        public MachineId()
        {
        }

        public MachineId(long id)
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