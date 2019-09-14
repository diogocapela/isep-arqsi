using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Production.Domain.AggregatesModel.OperationAggregate;
using Production.Infrastructure.Persistence;

namespace Production.Infrastructure.EntityConfigurations
{
    public class OperationConfiguration
    {
        public class ProductConfiguration : IEntityTypeConfiguration<Operation>
        {
            public void Configure(EntityTypeBuilder<Operation> config)
            {
  
            }
        }
    }
}