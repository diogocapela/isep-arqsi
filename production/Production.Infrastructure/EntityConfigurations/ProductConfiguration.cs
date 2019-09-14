using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.ProductAggregate;
using Production.Infrastructure.Persistence;

namespace Production.Infrastructure.EntityConfigurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> config)
        {
            
        }
    }
}