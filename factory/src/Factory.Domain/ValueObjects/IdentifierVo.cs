using System;

namespace Factory.Domain.ValueObjects
{
    public class IdentifierVo
    {
        public IdentifierVo(Guid guid)
        {
            Guid = guid;
        }

        public Guid Guid { get; set; }
    }
}