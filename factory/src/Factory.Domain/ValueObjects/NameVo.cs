using System.Collections.Generic;

namespace Factory.Domain.ValueObjects
{
    public class NameVo : ValueObject
    {
        public NameVo()
        {
        }

        public NameVo(string name)
        {
            Name = name;
        }

        public string Name { set; get; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Name;
        }
    }
}