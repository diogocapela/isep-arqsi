using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Factory.Infrastructure.EntityConfigurations
{
    public class OperationTypeConfiguration : IEntityTypeConfiguration<Operation>
    {
        public void Configure(EntityTypeBuilder<Operation> operationConfiguration)
        {
            //operationConfiguration.ToTable("operations", FactoryContext.DEFAULT_SCHEMA);

            operationConfiguration.HasKey(o => o.Id);

            //operationConfiguration.Property(o => o.Id)
            //    .ForSqlServerUseSequenceHiLo("operationsSeq", FactoryContext.DEFAULT_SCHEMA);

            //operationConfiguration.Property(o => o.OperationName);
            //operationConfiguration.Property(o => o.Description);
            //operationConfiguration.Property(o => o.TimeTakes);

            
      
        }
    }
}