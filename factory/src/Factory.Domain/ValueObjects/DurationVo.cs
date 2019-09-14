using System.Collections.Generic;

namespace Factory.Domain.ValueObjects
{
    public class DurationVo : ValueObject
    {
        public DurationVo(int duration)
        {
            Duration = duration;
        }

        public int Duration { get; set; }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Duration;
        }
    }
}