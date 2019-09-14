using System;
using System.Linq;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Factory.Infrastructure.EntityConfigurations
{
    public class ProductionLineConfiguration : IEntityTypeConfiguration<ProductionLine>
    {
        public void Configure(EntityTypeBuilder<ProductionLine> builder)
        {
            
            //builder.ToTable("production_line", FactoryContext.DEFAULT_SCHEMA);

            builder.HasKey(o => o.Id);

            //builder.Property(o => o.Id)
            //    .ForSqlServerUseSequenceHiLo("productionLineSeq", FactoryContext.DEFAULT_SCHEMA);

            //builder.Property(o => o.Description);
            //builder.Property(o => o.ProductionName);
        }
    }
}