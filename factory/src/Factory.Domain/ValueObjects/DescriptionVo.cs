using System.Collections.Generic;

namespace Factory.Domain.ValueObjects
{
    public class DescriptionVo : ValueObject
    {
        public DescriptionVo()
        {
        }

        public DescriptionVo(string description)
        {
            Description = description;
        }

        public string Description { get; }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Description;
        }
    }
}