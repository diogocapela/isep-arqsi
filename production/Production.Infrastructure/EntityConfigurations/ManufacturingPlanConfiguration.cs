using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Infrastructure.Persistence;

namespace Production.Infrastructure.EntityConfigurations
{
    public class ManufacturingPlanConfiguration : IEntityTypeConfiguration<ManufacturingPlan>
    {
        public void Configure(EntityTypeBuilder<ManufacturingPlan> config)
        {
           
        }
    }
}